import { WebSocketServer, type WebSocket } from "ws";
import type { AddressInfo } from "node:net";
import type { GatewayFrame } from "../../src/contracts/index.js";

export interface FakeGatewayOptions {
  heartbeatInterval?: number;
  /** Reply to IDENTIFY with READY automatically (default true). */
  autoReady?: boolean;
  /** Reply to RESUME with RESUMED automatically (default true). */
  autoResume?: boolean;
  /** Acknowledge heartbeats automatically (default true). */
  autoAck?: boolean;
}

export interface FakeConnection {
  socket: WebSocket;
  url: string;
  frames: GatewayFrame[];
}

/** An in-process gateway speaking P7 over a real WebSocket on a random port. */
export class FakeGateway {
  readonly connections: FakeConnection[] = [];
  private readonly server: WebSocketServer;
  private seq = 0;
  private sessionCounter = 0;
  private waiters: { predicate: () => boolean; resolve: () => void }[] = [];

  private constructor(
    server: WebSocketServer,
    private readonly options: Required<FakeGatewayOptions>,
  ) {
    this.server = server;
    server.on("connection", (socket, req) => this.accept(socket, req.url ?? ""));
  }

  static async start(options: FakeGatewayOptions = {}): Promise<FakeGateway> {
    const server = new WebSocketServer({ port: 0, host: "127.0.0.1" });
    await new Promise<void>((resolve) => server.once("listening", () => resolve()));
    return new FakeGateway(server, { heartbeatInterval: 1000, autoReady: true, autoResume: true, autoAck: true, ...options });
  }

  get url(): string {
    return `ws://127.0.0.1:${(this.server.address() as AddressInfo).port}/gateway`;
  }

  get current(): FakeConnection {
    const connection = this.connections.at(-1);
    if (!connection) throw new Error("no connection yet");
    return connection;
  }

  /** All frames received on every connection with the given opcode. */
  received(op: number): GatewayFrame[] {
    return this.connections.flatMap((c) => c.frames.filter((f) => f.op === op));
  }

  send(frame: Partial<GatewayFrame> & { op: number }, connection = this.current): void {
    connection.socket.send(JSON.stringify({ d: null, s: null, t: null, ...frame }));
  }

  dispatch(t: string, d: unknown, connection = this.current): void {
    this.send({ op: 0, t, d, s: ++this.seq }, connection);
  }

  close(code: number, connection = this.current): void {
    connection.socket.close(code, "fake gateway close");
  }

  /** Drops the TCP connection without a close frame (abnormal closure). */
  terminate(connection = this.current): void {
    connection.socket.terminate();
  }

  async waitFor(predicate: () => boolean, timeoutMs = 3000): Promise<void> {
    if (predicate()) return;
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("FakeGateway.waitFor timed out")), timeoutMs);
      this.waiters.push({
        predicate,
        resolve: () => {
          clearTimeout(timer);
          resolve();
        },
      });
    });
  }

  async stop(): Promise<void> {
    for (const c of this.connections) c.socket.terminate();
    await new Promise<void>((resolve) => this.server.close(() => resolve()));
  }

  private accept(socket: WebSocket, url: string): void {
    const connection: FakeConnection = { socket, url, frames: [] };
    this.connections.push(connection);
    socket.on("message", (raw) => {
      const frame = JSON.parse(String(raw)) as GatewayFrame;
      connection.frames.push(frame);
      this.respond(frame, connection);
      this.notify();
    });
    socket.on("close", () => this.notify());
    this.send({ op: 10, d: { heartbeat_interval: this.options.heartbeatInterval } }, connection);
    this.notify();
  }

  private respond(frame: GatewayFrame, connection: FakeConnection): void {
    if (frame.op === 1 && this.options.autoAck) this.send({ op: 11 }, connection);
    if (frame.op === 2 && this.options.autoReady) {
      const sessionId = `session-${++this.sessionCounter}`;
      this.dispatch(
        "READY",
        {
          session_id: sessionId,
          resume_gateway_url: this.url,
          user: { id: "900", username: "modbot", avatar: null, bot: true },
          guilds: [{ id: "100", unavailable: true }],
          application: { id: "800" },
        },
        connection,
      );
    }
    if (frame.op === 6 && this.options.autoResume) this.dispatch("RESUMED", null, connection);
  }

  private notify(): void {
    this.waiters = this.waiters.filter((waiter) => {
      if (!waiter.predicate()) return true;
      waiter.resolve();
      return false;
    });
  }
}
