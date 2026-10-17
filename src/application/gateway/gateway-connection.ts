import {
  GATEWAY_VERSION,
  GatewayOpcodes as Op,
  type GatewayFrame,
  type GatewayHelloData,
  type GatewayIdentifyProperties,
  type GatewayPresenceUpdateData,
  type GatewayReadyData,
  type Snowflake,
} from "../../contracts/index.js";
import { ExponentialBackoff, type BackoffOptions } from "../../domain/gateway/backoff.js";
import { classifyClose } from "../../domain/gateway/close-policy.js";
import { GatewaySession } from "../../domain/gateway/gateway-session.js";
import { HeartbeatTracker } from "../../domain/gateway/heartbeat-tracker.js";
import { SendBudget } from "../../domain/gateway/send-budget.js";
import { TypedEmitter } from "../events/typed-emitter.js";
import type { Clock, RandomSource, TimerHandle } from "../ports/clock.js";
import type { GatewaySocket, GatewaySocketFactory } from "../ports/gateway-socket.js";

export interface GatewayConnectionOptions {
  /** Gateway URL without query, e.g. `wss://discordy-gateway.voics.nl/gateway`. */
  url: string;
  token: string;
  intents: number;
  properties: GatewayIdentifyProperties;
  deviceId: Snowflake | null;
  presence?: GatewayPresenceUpdateData;
  socketFactory: GatewaySocketFactory;
  clock: Clock;
  random: RandomSource;
  backoff?: BackoffOptions;
  /** Random wait range before re-identifying after INVALID_SESSION (default 1-5 s). */
  invalidSessionDelayMs?: [number, number];
}

export interface ReconnectingEvent {
  attempt: number;
  delayMs: number;
  resume: boolean;
  reason: string;
}

export type GatewayConnectionEvents = {
  ready: [data: GatewayReadyData];
  resumed: [];
  dispatch: [event: string, data: unknown, seq: number | null];
  reconnecting: [event: ReconnectingEvent];
  fatal: [error: GatewayFatalError];
  debug: [message: string];
};

/** The gateway closed with a code that makes reconnecting pointless (bad token, bad intents). */
export class GatewayFatalError extends Error {
  override readonly name = "GatewayFatalError";
  constructor(
    readonly code: number,
    message: string,
  ) {
    super(message);
  }
}

const DEFAULT_BACKOFF: BackoffOptions = { baseMs: 1000, maxMs: 60_000, jitter: 0.3 };
/** P7 allows 120 sends per 60 s; keep headroom for heartbeats, which bypass the budget. */
const SEND_LIMIT = 110;
const SEND_WINDOW_MS = 60_000;
/** Client-initiated close codes: 1000 ends the session, 3000 keeps it resumable. */
const CLOSE_NORMAL = 1000;
const CLOSE_RESUMABLE = 3000;

type State = "idle" | "connecting" | "handshaking" | "ready" | "waiting" | "destroyed";

/**
 * One gateway session: HELLO → IDENTIFY/RESUME → READY, heartbeats with zombie detection,
 * automatic resume and re-identify with exponential backoff, and a rate-limited send queue.
 */
export class GatewayConnection extends TypedEmitter<GatewayConnectionEvents> {
  private readonly session = new GatewaySession();
  private readonly heartbeat = new HeartbeatTracker();
  private readonly budget = new SendBudget(SEND_LIMIT, SEND_WINDOW_MS);
  private readonly backoff: ExponentialBackoff;
  private readonly outbox: string[] = [];
  private socket: GatewaySocket | null = null;
  private generation = 0;
  private attempts = 0;
  private state: State = "idle";
  private heartbeatTimer: TimerHandle | null = null;
  private reconnectTimer: TimerHandle | null = null;
  private drainTimer: TimerHandle | null = null;

  constructor(private readonly options: GatewayConnectionOptions) {
    super();
    this.backoff = new ExponentialBackoff(options.backoff ?? DEFAULT_BACKOFF);
  }

  get sessionId(): string | null {
    return this.session.id;
  }

  get seq(): number | null {
    return this.session.seq;
  }

  get latencyMs(): number | null {
    return this.heartbeat.latencyMs;
  }

  get isReady(): boolean {
    return this.state === "ready";
  }

  connect(): void {
    if (this.state === "destroyed") throw new Error("The gateway connection was destroyed");
    if (this.state !== "idle") return;
    this.open();
  }

  /** Queues a frame, respecting the per-session send budget. Throws when not connected. */
  send(op: number, d: unknown): void {
    if (this.state !== "ready") throw new Error("The gateway is not connected");
    this.outbox.push(JSON.stringify({ op, d }));
    this.drain();
  }

  /** Closes the connection for good and ends the session. */
  destroy(): void {
    if (this.state === "destroyed") return;
    this.state = "destroyed";
    this.stopTimers();
    this.detach(CLOSE_NORMAL, "client destroyed");
    this.session.invalidate();
    this.outbox.length = 0;
  }

  private open(): void {
    const base = (this.session.canResume && this.session.resumeUrl) || this.options.url;
    const url = `${base}${base.includes("?") ? "&" : "?"}v=${GATEWAY_VERSION}&encoding=json`;
    const generation = ++this.generation;
    const current = <A extends unknown[]>(fn: (...args: A) => void) => (...args: A) => {
      if (generation === this.generation) fn(...args);
    };
    this.state = "connecting";
    this.emit("debug", `Connecting to ${url}`);
    this.socket = this.options.socketFactory(url, {
      onOpen: current(() => {
        this.state = "handshaking";
      }),
      onMessage: current((data: string) => this.handleMessage(data)),
      onClose: current((code: number, reason: string) => this.handleClose(code, reason)),
      onError: current((error: Error) => this.emit("debug", error.message)),
    });
  }

  private handleMessage(data: string): void {
    let frame: GatewayFrame;
    try {
      frame = JSON.parse(data) as GatewayFrame;
    } catch {
      this.emit("debug", "Ignored a frame that is not valid JSON");
      return;
    }
    switch (frame.op) {
      case Op.Hello:
        this.handleHello(frame.d as GatewayHelloData);
        break;
      case Op.Heartbeat:
        this.sendHeartbeat();
        break;
      case Op.HeartbeatAck:
        this.heartbeat.ack(this.options.clock.now());
        break;
      case Op.Dispatch:
        this.handleDispatch(frame);
        break;
      case Op.Reconnect:
        this.reconnect(true, "Gateway requested a reconnect");
        break;
      case Op.InvalidSession:
        this.handleInvalidSession(frame.d === true);
        break;
      default:
        this.emit("dispatch", String(frame.op), frame.d, frame.s);
    }
  }

  private handleHello({ heartbeat_interval: interval }: GatewayHelloData): void {
    this.heartbeat.reset();
    this.scheduleHeartbeat(interval * this.options.random(), interval);
    if (this.session.canResume) {
      this.emit("debug", `Resuming session ${this.session.id ?? ""}`);
      this.transmit(Op.Resume, this.session.resumePayload(this.options.token));
    } else {
      const { token, intents, properties, deviceId, presence } = this.options;
      this.transmit(Op.Identify, { token, device_id: deviceId, intents, properties, ...(presence ? { presence } : {}) });
    }
  }

  private handleDispatch(frame: GatewayFrame): void {
    this.session.track(frame.s);
    const event = frame.t ?? "";
    if (event === "READY") {
      const ready = frame.d as GatewayReadyData;
      this.session.ready(ready.session_id, ready.resume_gateway_url);
      this.markReady();
      this.emit("ready", ready);
    } else if (event === "RESUMED") {
      this.markReady();
      this.emit("resumed");
    }
    this.emit("dispatch", event, frame.d, frame.s);
  }

  private markReady(): void {
    this.state = "ready";
    this.attempts = 0;
    this.drain();
  }

  private handleInvalidSession(resumable: boolean): void {
    if (!resumable) this.session.invalidate();
    const [min, max] = this.options.invalidSessionDelayMs ?? [1000, 5000];
    const delay = Math.round(min + (max - min) * this.options.random());
    this.reconnect(resumable, "Session invalidated", delay);
  }

  private handleClose(code: number, reason: string): void {
    this.socket = null;
    this.stopHeartbeat();
    const decision = classifyClose(code);
    this.emit("debug", `Gateway closed (${code} ${reason}): ${decision.action}`);
    if (decision.action === "fatal") {
      this.state = "destroyed";
      this.stopTimers();
      this.session.invalidate();
      this.emit("fatal", new GatewayFatalError(code, decision.reason));
      return;
    }
    if (decision.action === "reidentify") this.session.invalidate();
    this.scheduleReconnect(decision.action === "resume", decision.reason);
  }

  private reconnect(resume: boolean, reason: string, delayMs?: number): void {
    if (!resume) this.session.invalidate();
    this.detach(resume ? CLOSE_RESUMABLE : CLOSE_NORMAL, reason);
    this.scheduleReconnect(resume, reason, delayMs);
  }

  private scheduleReconnect(resume: boolean, reason: string, delayMs?: number): void {
    if (this.state === "destroyed") return;
    this.stopHeartbeat();
    const attempt = this.attempts++;
    const delay = delayMs ?? this.backoff.delay(attempt, this.options.random());
    this.state = "waiting";
    this.emit("reconnecting", { attempt, delayMs: delay, resume: resume && this.session.canResume, reason });
    this.reconnectTimer = this.options.clock.setTimeout(() => {
      this.reconnectTimer = null;
      if (this.state === "waiting") this.open();
    }, delay);
  }

  /** Stops listening to the current socket and closes it. */
  private detach(code: number, reason: string): void {
    this.generation++;
    this.stopHeartbeat();
    const socket = this.socket;
    this.socket = null;
    socket?.close(code, reason);
  }

  private scheduleHeartbeat(delay: number, interval: number): void {
    this.heartbeatTimer = this.options.clock.setTimeout(() => {
      if (!this.heartbeat.beat(this.options.clock.now())) {
        this.reconnect(true, "Heartbeat was not acknowledged (zombie connection)");
        return;
      }
      this.transmitRaw({ op: Op.Heartbeat, d: this.session.seq });
      this.scheduleHeartbeat(interval, interval);
    }, delay);
  }

  private sendHeartbeat(): void {
    this.transmitRaw({ op: Op.Heartbeat, d: this.session.seq });
  }

  private transmit(op: number, d: unknown): void {
    this.budget.consume(this.options.clock.now());
    this.transmitRaw({ op, d });
  }

  private transmitRaw(frame: { op: number; d: unknown }): void {
    this.socket?.send(JSON.stringify(frame));
  }

  private drain(): void {
    if (this.drainTimer !== null || this.state !== "ready") return;
    while (this.outbox.length > 0) {
      const wait = this.budget.waitTime(this.options.clock.now());
      if (wait > 0) {
        this.drainTimer = this.options.clock.setTimeout(() => {
          this.drainTimer = null;
          this.drain();
        }, wait);
        return;
      }
      this.budget.consume(this.options.clock.now());
      this.socket?.send(this.outbox.shift() ?? "");
    }
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer !== null) this.options.clock.clearTimeout(this.heartbeatTimer);
    this.heartbeatTimer = null;
  }

  private stopTimers(): void {
    this.stopHeartbeat();
    for (const timer of [this.reconnectTimer, this.drainTimer]) if (timer !== null) this.options.clock.clearTimeout(timer);
    this.reconnectTimer = null;
    this.drainTimer = null;
  }
}
