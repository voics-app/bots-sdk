import {
  GatewayOpcodes as Op,
  type ApiInteraction,
  type ApiUser,
  type GatewayDispatchPayloads,
  type GatewayPresenceUpdateData,
  type GatewayReadyData,
  type GatewayRequestGuildMembersData,
  type GatewayVoiceStateUpdateData,
  type Snowflake,
} from "../contracts/index.js";
import { TypedEmitter } from "../application/events/typed-emitter.js";
import { GatewayConnection, type ReconnectingEvent } from "../application/gateway/gateway-connection.js";
import type { BackoffOptions } from "../domain/gateway/backoff.js";
import type { Clock, RandomSource } from "../application/ports/clock.js";
import type { GatewaySocketFactory } from "../application/ports/gateway-socket.js";
import { Intents, type IntentResolvable } from "../domain/bitfield/intents.js";
import { defaultClock, defaultRandom, defaultSocketFactory } from "../composition-root.js";
import type { WebSocketConstructor } from "../infrastructure/websocket-gateway-socket.js";
import { InteractionRouter } from "./interactions/interaction-router.js";
import { DiscordyApi, type CommandData } from "./rest/discordy-api.js";
import { RestClient, type RestClientOptions } from "./rest/rest-client.js";
import { BRAND } from "../brand.js";
import { SDK_NAME, SDK_VERSION } from "./version.js";

/** Default gateway URL (P7 under the default `discordy-gateway` hostname). */
export const DEFAULT_GATEWAY_URL: string = BRAND.gatewayUrl;

export interface ClientOptions {
  /** Bot token from the application's Bot page. */
  token: string;
  /** Gateway intents: names, bits or a bitfield. Privileged intents must be enabled on the application. */
  intents: IntentResolvable;
  /** Application id; learned from READY when omitted. Needed only to register commands before login. */
  applicationId?: Snowflake;
  /** Gateway URL without query string (default {@link DEFAULT_GATEWAY_URL}). */
  gatewayUrl?: string;
  /** REST options; `token` is filled in from {@link ClientOptions.token}. */
  rest?: Omit<RestClientOptions, "token">;
  /** Initial presence sent with IDENTIFY. */
  presence?: GatewayPresenceUpdateData;
  /** Device id sent with IDENTIFY. Bots have no device, so this defaults to `null`. */
  deviceId?: Snowflake | null;
  /** WebSocket implementation for runtimes without a global one. */
  WebSocket?: WebSocketConstructor;
  backoff?: BackoffOptions;
  /** Advanced: replace the transport-level adapters (used by tests). */
  adapters?: { socketFactory?: GatewaySocketFactory; clock?: Clock; random?: RandomSource };
}

export type DispatchEvents = { [K in keyof GatewayDispatchPayloads]: [data: GatewayDispatchPayloads[K]] };

/** Events emitted by {@link Client}: lifecycle events plus every gateway dispatch by its P7 name. */
export type ClientEvents = DispatchEvents & {
  ready: [data: GatewayReadyData];
  resumed: [];
  reconnecting: [event: ReconnectingEvent];
  /** Every dispatch, typed or not. */
  raw: [event: string, data: unknown];
  error: [error: unknown];
  debug: [message: string];
};

/**
 * A Discordy bot: one gateway session plus REST, typed API helpers and an interaction router.
 *
 * ```ts
 * const client = new Client({ token, intents: ["Guilds"] });
 * client.interactions.command("ping", (i) => i.reply("Pong!"));
 * await client.login();
 * ```
 */
export class Client extends TypedEmitter<ClientEvents> {
  readonly rest: RestClient;
  readonly api: DiscordyApi;
  readonly interactions: InteractionRouter;
  /** The bot user, available after READY. */
  user: ApiUser | null = null;
  applicationId: Snowflake | null;
  private readonly gateway: GatewayConnection;

  constructor(options: ClientOptions) {
    super();
    this.applicationId = options.applicationId ?? null;
    this.rest = new RestClient({ ...options.rest, token: options.token });
    this.api = new DiscordyApi(this.rest);
    this.interactions = new InteractionRouter(this.rest).onError((error) => this.reportError(error));
    this.gateway = new GatewayConnection({
      url: options.gatewayUrl ?? DEFAULT_GATEWAY_URL,
      token: options.token,
      intents: Intents.resolve(options.intents),
      properties: { os: globalThis.process?.platform ?? "unknown", client: SDK_NAME, version: SDK_VERSION },
      deviceId: options.deviceId ?? null,
      presence: options.presence,
      socketFactory: options.adapters?.socketFactory ?? defaultSocketFactory(options.WebSocket),
      clock: options.adapters?.clock ?? defaultClock(),
      random: options.adapters?.random ?? defaultRandom(),
      backoff: options.backoff,
    });
    this.wireGateway();
  }

  get isReady(): boolean {
    return this.gateway.isReady;
  }

  /** Heartbeat round trip in milliseconds. */
  get latencyMs(): number | null {
    return this.gateway.latencyMs;
  }

  /** Connects to the gateway and resolves with the READY payload, or rejects on a fatal close. */
  login(): Promise<GatewayReadyData> {
    return new Promise((resolve, reject) => {
      const onReady = (data: GatewayReadyData) => {
        this.gateway.off("fatal", onFatal);
        resolve(data);
      };
      const onFatal = (error: Error) => {
        this.gateway.off("ready", onReady);
        reject(error);
      };
      this.gateway.once("ready", onReady);
      this.gateway.once("fatal", onFatal);
      this.gateway.connect();
    });
  }

  /** Disconnects and ends the session. */
  destroy(): void {
    this.gateway.destroy();
  }

  setPresence(presence: GatewayPresenceUpdateData): void {
    this.gateway.send(Op.PresenceUpdate, presence);
  }

  updateVoiceState(state: GatewayVoiceStateUpdateData): void {
    this.gateway.send(Op.VoiceStateUpdate, state);
  }

  /** Members arrive as GUILD_MEMBERS_CHUNK events (requires the GuildMembers intent). */
  requestGuildMembers(request: GatewayRequestGuildMembersData): void {
    this.gateway.send(Op.RequestGuildMembers, request);
  }

  /** Bulk-overwrites the application's commands, globally or in one guild (instant, good for development). */
  registerCommands(commands: CommandData[], options: { guildId?: Snowflake } = {}) {
    if (!this.applicationId) throw new Error("applicationId is unknown: pass it in the options or call login() first");
    return this.api.commands.set(this.applicationId, commands, options.guildId);
  }

  private wireGateway(): void {
    this.gateway.on("debug", (message) => this.emit("debug", message));
    this.gateway.on("reconnecting", (event) => this.emit("reconnecting", event));
    this.gateway.on("fatal", (error) => this.reportError(error));
    this.gateway.on("resumed", () => this.emit("resumed"));
    this.gateway.on("ready", (data) => {
      this.user = data.user;
      this.applicationId ??= data.application?.id ?? null;
      this.emit("ready", data);
    });
    this.gateway.on("dispatch", (event, data) => {
      this.emit("raw", event, data);
      if (event === "INTERACTION_CREATE") void this.interactions.handle(data as ApiInteraction).catch((error: unknown) => this.reportError(error));
      (this.emit as (event: string, data: unknown) => boolean)(event, data);
    });
  }

  private reportError(error: unknown): void {
    if (!this.emit("error", error)) console.error(`[${SDK_NAME}]`, error);
  }
}
