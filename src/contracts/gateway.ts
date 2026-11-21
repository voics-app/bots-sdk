/**
 * Gateway wire protocol (pinned interface P7).
 *
 * Local mirror of `@voics-app/contracts`; replace with the generated package once published.
 * @module
 */
import type {
  ApiApplication,
  ApiChannel,
  ApiGuild,
  ApiGuildMember,
  ApiInteraction,
  ApiMessage,
  ApiRole,
  ApiUnavailableGuild,
  ApiUser,
  ApiVoiceState,
  Snowflake,
} from "./rest.js";

/** Gateway protocol version the SDK speaks. */
export const GATEWAY_VERSION = 1;

/** Gateway opcodes (P7). */
export const GatewayOpcodes = {
  Dispatch: 0,
  Heartbeat: 1,
  Identify: 2,
  PresenceUpdate: 3,
  VoiceStateUpdate: 4,
  Resume: 6,
  Reconnect: 7,
  RequestGuildMembers: 8,
  InvalidSession: 9,
  Hello: 10,
  HeartbeatAck: 11,
  E2eeEnvelope: 20,
  E2eeAck: 21,
  P2pSignal: 22,
  VoiceTelemetry: 23,
  WatchTogether: 24,
} as const;
export type GatewayOpcode = (typeof GatewayOpcodes)[keyof typeof GatewayOpcodes];

/** Close codes sent by the gateway (P7). */
export const GatewayCloseCodes = {
  UnknownError: 4000,
  UnknownOpcode: 4001,
  DecodeError: 4002,
  NotAuthenticated: 4003,
  AuthenticationFailed: 4004,
  AlreadyAuthenticated: 4005,
  InvalidSeq: 4007,
  RateLimited: 4008,
  SessionTimedOut: 4009,
  InvalidIntents: 4013,
  DisallowedIntents: 4014,
} as const;
export type GatewayCloseCode = (typeof GatewayCloseCodes)[keyof typeof GatewayCloseCodes];

/** Every gateway frame: `{ op, d, s, t }`. */
export interface GatewayFrame<D = unknown> {
  op: number;
  d: D;
  s: number | null;
  t: string | null;
}

export interface GatewayHelloData {
  heartbeat_interval: number;
}

export interface GatewayIdentifyProperties {
  os: string;
  client: string;
  version: string;
}

export type PresenceStatus = "online" | "idle" | "dnd" | "invisible";

export interface GatewayActivity {
  name: string;
  type: number;
  url?: string | null;
  state?: string | null;
}

export interface GatewayPresenceUpdateData {
  status: PresenceStatus;
  activities: GatewayActivity[];
  afk: boolean;
}

export interface GatewayIdentifyData {
  token: string;
  device_id: Snowflake | null;
  intents: number;
  properties: GatewayIdentifyProperties;
  presence?: GatewayPresenceUpdateData;
}

export interface GatewayResumeData {
  token: string;
  session_id: string;
  seq: number;
}

export interface GatewayVoiceStateUpdateData {
  guild_id: Snowflake | null;
  channel_id: Snowflake | null;
  self_mute: boolean;
  self_deaf: boolean;
  self_video: boolean;
  self_stream: boolean;
}

export interface GatewayRequestGuildMembersData {
  guild_id: Snowflake;
  query?: string;
  limit: number;
  user_ids?: Snowflake[];
  nonce: string;
}

export interface GatewayReadyData {
  session_id: string;
  resume_gateway_url?: string;
  user: ApiUser;
  guilds: (ApiGuild | ApiUnavailableGuild)[];
  private_channels?: ApiChannel[];
  application?: Pick<ApiApplication, "id"> & Partial<ApiApplication>;
}

export interface GatewayGuildMemberRemoveData {
  guild_id: Snowflake;
  user: ApiUser;
}

export interface GatewayGuildRoleData {
  guild_id: Snowflake;
  role: ApiRole;
}

export interface GatewayGuildRoleDeleteData {
  guild_id: Snowflake;
  role_id: Snowflake;
}

export interface GatewayMessageDeleteData {
  id: Snowflake;
  channel_id: Snowflake;
  guild_id?: Snowflake;
}

export interface GatewayMessageDeleteBulkData {
  ids: Snowflake[];
  channel_id: Snowflake;
  guild_id?: Snowflake;
}

export interface GatewayReactionData {
  user_id: Snowflake;
  channel_id: Snowflake;
  message_id: Snowflake;
  guild_id?: Snowflake;
  emoji: { id: Snowflake | null; name: string | null };
}

export interface GatewayTypingStartData {
  channel_id: Snowflake;
  guild_id?: Snowflake;
  user_id: Snowflake;
  timestamp: number;
}

export interface GatewayPresenceData {
  user: Pick<ApiUser, "id"> & Partial<ApiUser>;
  guild_id?: Snowflake;
  status: PresenceStatus | "offline";
  activities: GatewayActivity[];
}

export interface GatewayVoiceServerUpdateData {
  token: string;
  guild_id: Snowflake | null;
  channel_id: Snowflake;
  endpoint: string;
  region: string;
}

export interface GatewayGuildMembersChunkData {
  guild_id: Snowflake;
  members: ApiGuildMember[];
  nonce?: string;
}

/** Typed payloads for the dispatch events a bot typically consumes. */
export interface GatewayDispatchPayloads {
  READY: GatewayReadyData;
  RESUMED: Record<string, never> | null;
  GUILD_CREATE: ApiGuild;
  GUILD_UPDATE: ApiGuild;
  GUILD_DELETE: ApiUnavailableGuild;
  CHANNEL_CREATE: ApiChannel;
  CHANNEL_UPDATE: ApiChannel;
  CHANNEL_DELETE: ApiChannel;
  GUILD_ROLE_CREATE: GatewayGuildRoleData;
  GUILD_ROLE_UPDATE: GatewayGuildRoleData;
  GUILD_ROLE_DELETE: GatewayGuildRoleDeleteData;
  GUILD_MEMBER_ADD: ApiGuildMember & { guild_id: Snowflake };
  GUILD_MEMBER_UPDATE: ApiGuildMember & { guild_id: Snowflake };
  GUILD_MEMBER_REMOVE: GatewayGuildMemberRemoveData;
  GUILD_BAN_ADD: { guild_id: Snowflake; user: ApiUser };
  GUILD_BAN_REMOVE: { guild_id: Snowflake; user: ApiUser };
  GUILD_MEMBERS_CHUNK: GatewayGuildMembersChunkData;
  MESSAGE_CREATE: ApiMessage;
  MESSAGE_UPDATE: Partial<ApiMessage> & Pick<ApiMessage, "id" | "channel_id">;
  MESSAGE_DELETE: GatewayMessageDeleteData;
  MESSAGE_DELETE_BULK: GatewayMessageDeleteBulkData;
  MESSAGE_REACTION_ADD: GatewayReactionData;
  MESSAGE_REACTION_REMOVE: GatewayReactionData;
  TYPING_START: GatewayTypingStartData;
  PRESENCE_UPDATE: GatewayPresenceData;
  VOICE_STATE_UPDATE: ApiVoiceState;
  VOICE_SERVER_UPDATE: GatewayVoiceServerUpdateData;
  INTERACTION_CREATE: ApiInteraction;
}

export type GatewayDispatchEventName = keyof GatewayDispatchPayloads;
