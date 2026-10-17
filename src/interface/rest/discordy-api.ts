import type {
  ApiApplication,
  ApiApplicationCommand,
  ApiApplicationCommandCreateBody,
  ApiChannel,
  ApiGuild,
  ApiGuildMember,
  ApiInvite,
  ApiMessage,
  ApiRole,
  ApiUser,
  ApiWebhook,
  Snowflake,
} from "../../contracts/index.js";
import { toJSONValue, type JSONEncodable } from "../../domain/builders/assert.js";
import { toMessageBody, type MessagePayload } from "../message-payload.js";
import type { RestClient } from "./rest-client.js";
import { Routes } from "./routes.js";

export type CommandData = ApiApplicationCommandCreateBody | JSONEncodable<ApiApplicationCommandCreateBody>;

export interface MessageQuery {
  before?: Snowflake;
  after?: Snowflake;
  around?: Snowflake;
  /** 1-100, default 50. */
  limit?: number;
}

export interface ReasonOption {
  reason?: string;
}

/** Typed helpers for the bot-relevant P9 endpoints. Anything else is reachable through {@link RestClient}. */
export class DiscordyApi {
  constructor(private readonly rest: RestClient) {}

  readonly users = {
    me: () => this.rest.get<ApiUser>(Routes.user("@me")),
    get: (userId: Snowflake) => this.rest.get<ApiUser>(Routes.user(userId)),
    /** Opens (or returns) a DM channel with the given users. */
    createDM: (recipientIds: Snowflake[]) => this.rest.post<ApiChannel>(Routes.userChannels(), { body: { recipient_ids: recipientIds } }),
  };

  readonly channels = {
    get: (channelId: Snowflake) => this.rest.get<ApiChannel>(Routes.channel(channelId)),
    edit: (channelId: Snowflake, body: Partial<ApiChannel>, { reason }: ReasonOption = {}) =>
      this.rest.patch<ApiChannel>(Routes.channel(channelId), { body, reason }),
    delete: (channelId: Snowflake, { reason }: ReasonOption = {}) => this.rest.delete<ApiChannel>(Routes.channel(channelId), { reason }),
    typing: (channelId: Snowflake) => this.rest.post<undefined>(Routes.channelTyping(channelId)),
    createInvite: (channelId: Snowflake, body: { max_age?: number; max_uses?: number; temporary?: boolean } = {}) =>
      this.rest.post<ApiInvite>(Routes.channelInvites(channelId), { body }),
    createWebhook: (channelId: Snowflake, body: { name: string; avatar?: string | null }, { reason }: ReasonOption = {}) =>
      this.rest.post<ApiWebhook>(Routes.channelWebhooks(channelId), { body, reason }),
    editPermission: (channelId: Snowflake, overwriteId: Snowflake, body: { type: 0 | 1; allow?: string; deny?: string }, { reason }: ReasonOption = {}) =>
      this.rest.put<undefined>(Routes.channelPermission(channelId, overwriteId), { body, reason }),
    deletePermission: (channelId: Snowflake, overwriteId: Snowflake, { reason }: ReasonOption = {}) =>
      this.rest.delete<undefined>(Routes.channelPermission(channelId, overwriteId), { reason }),
  };

  readonly messages = {
    list: (channelId: Snowflake, query: MessageQuery = {}) => this.rest.get<ApiMessage[]>(Routes.channelMessages(channelId), { query: { ...query } }),
    get: (channelId: Snowflake, messageId: Snowflake) => this.rest.get<ApiMessage>(Routes.channelMessage(channelId, messageId)),
    send: (channelId: Snowflake, payload: MessagePayload) => this.rest.post<ApiMessage>(Routes.channelMessages(channelId), { body: toMessageBody(payload) }),
    edit: (channelId: Snowflake, messageId: Snowflake, payload: MessagePayload) =>
      this.rest.patch<ApiMessage>(Routes.channelMessage(channelId, messageId), { body: toMessageBody(payload) }),
    delete: (channelId: Snowflake, messageId: Snowflake, { reason }: ReasonOption = {}) =>
      this.rest.delete<undefined>(Routes.channelMessage(channelId, messageId), { reason }),
    /** Deletes 2-100 messages at once. */
    bulkDelete: (channelId: Snowflake, messageIds: Snowflake[], { reason }: ReasonOption = {}) =>
      this.rest.post<undefined>(Routes.channelBulkDelete(channelId), { body: { messages: messageIds }, reason }),
    react: (channelId: Snowflake, messageId: Snowflake, emoji: string) => this.rest.put<undefined>(Routes.channelMessageOwnReaction(channelId, messageId, emoji)),
    unreact: (channelId: Snowflake, messageId: Snowflake, emoji: string) =>
      this.rest.delete<undefined>(Routes.channelMessageOwnReaction(channelId, messageId, emoji)),
    pins: (channelId: Snowflake) => this.rest.get<ApiMessage[]>(Routes.channelPins(channelId)),
    pin: (channelId: Snowflake, messageId: Snowflake, { reason }: ReasonOption = {}) => this.rest.put<undefined>(Routes.channelPin(channelId, messageId), { reason }),
    unpin: (channelId: Snowflake, messageId: Snowflake, { reason }: ReasonOption = {}) =>
      this.rest.delete<undefined>(Routes.channelPin(channelId, messageId), { reason }),
  };

  readonly guilds = {
    get: (guildId: Snowflake) => this.rest.get<ApiGuild>(Routes.guild(guildId)),
    channels: (guildId: Snowflake) => this.rest.get<ApiChannel[]>(Routes.guildChannels(guildId)),
    createChannel: (guildId: Snowflake, body: Partial<ApiChannel> & { name: string }, { reason }: ReasonOption = {}) =>
      this.rest.post<ApiChannel>(Routes.guildChannels(guildId), { body, reason }),
    roles: (guildId: Snowflake) => this.rest.get<ApiRole[]>(Routes.guildRoles(guildId)),
    members: (guildId: Snowflake, query: { limit?: number; after?: Snowflake } = {}) =>
      this.rest.get<ApiGuildMember[]>(Routes.guildMembers(guildId), { query: { ...query } }),
    member: (guildId: Snowflake, userId: Snowflake) => this.rest.get<ApiGuildMember>(Routes.guildMember(guildId, userId)),
    editMember: (guildId: Snowflake, userId: Snowflake, body: Partial<Pick<ApiGuildMember, "nick" | "roles" | "mute" | "deaf" | "communication_disabled_until">>, { reason }: ReasonOption = {}) =>
      this.rest.patch<ApiGuildMember>(Routes.guildMember(guildId, userId), { body, reason }),
    kick: (guildId: Snowflake, userId: Snowflake, { reason }: ReasonOption = {}) => this.rest.delete<undefined>(Routes.guildMember(guildId, userId), { reason }),
    ban: (guildId: Snowflake, userId: Snowflake, body: { delete_message_seconds?: number } = {}, { reason }: ReasonOption = {}) =>
      this.rest.put<undefined>(Routes.guildBan(guildId, userId), { body, reason }),
    unban: (guildId: Snowflake, userId: Snowflake, { reason }: ReasonOption = {}) => this.rest.delete<undefined>(Routes.guildBan(guildId, userId), { reason }),
    addMemberRole: (guildId: Snowflake, userId: Snowflake, roleId: Snowflake, { reason }: ReasonOption = {}) =>
      this.rest.put<undefined>(Routes.guildMemberRole(guildId, userId, roleId), { reason }),
    removeMemberRole: (guildId: Snowflake, userId: Snowflake, roleId: Snowflake, { reason }: ReasonOption = {}) =>
      this.rest.delete<undefined>(Routes.guildMemberRole(guildId, userId, roleId), { reason }),
    webhooks: (guildId: Snowflake) => this.rest.get<ApiWebhook[]>(Routes.guildWebhooks(guildId)),
  };

  readonly applications = {
    get: (applicationId: Snowflake) => this.rest.get<ApiApplication>(Routes.application(applicationId)),
  };

  readonly commands = {
    list: (applicationId: Snowflake, guildId?: Snowflake) => this.rest.get<ApiApplicationCommand[]>(this.commandsRoute(applicationId, guildId)),
    create: (applicationId: Snowflake, command: CommandData, guildId?: Snowflake) =>
      this.rest.post<ApiApplicationCommand>(this.commandsRoute(applicationId, guildId), { body: toJSONValue(command) }),
    edit: (applicationId: Snowflake, commandId: Snowflake, command: Partial<ApiApplicationCommandCreateBody>, guildId?: Snowflake) =>
      this.rest.patch<ApiApplicationCommand>(this.commandRoute(applicationId, commandId, guildId), { body: command }),
    delete: (applicationId: Snowflake, commandId: Snowflake, guildId?: Snowflake) =>
      this.rest.delete<undefined>(this.commandRoute(applicationId, commandId, guildId)),
    /** Replaces every command (global, or in one guild) with `commands` in a single call. */
    set: (applicationId: Snowflake, commands: CommandData[], guildId?: Snowflake) =>
      this.rest.put<ApiApplicationCommand[]>(this.commandsRoute(applicationId, guildId), { body: commands.map((c) => toJSONValue(c)) }),
  };

  readonly webhooks = {
    edit: (webhookId: Snowflake, body: { name?: string; avatar?: string | null; channel_id?: Snowflake }, { reason }: ReasonOption = {}) =>
      this.rest.patch<ApiWebhook>(Routes.webhook(webhookId), { body, reason }),
    delete: (webhookId: Snowflake, { reason }: ReasonOption = {}) => this.rest.delete<undefined>(Routes.webhook(webhookId), { reason }),
  };

  private commandsRoute(applicationId: Snowflake, guildId?: Snowflake): string {
    return guildId ? Routes.applicationGuildCommands(applicationId, guildId) : Routes.applicationCommands(applicationId);
  }

  private commandRoute(applicationId: Snowflake, commandId: Snowflake, guildId?: Snowflake): string {
    return guildId ? Routes.applicationGuildCommand(applicationId, guildId, commandId) : Routes.applicationCommand(applicationId, commandId);
  }
}
