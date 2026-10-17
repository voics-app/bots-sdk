import type { Snowflake } from "../../contracts/index.js";

const enc = encodeURIComponent;

/**
 * Path builders for every public REST endpoint in P9, relative to `/api/v1`.
 * Use them with {@link RestClient}: `rest.get(Routes.channel(id))`.
 */
export const Routes = {
  // Auth and devices (user sessions only; listed for completeness)
  authRegister: () => "/auth/register",
  authLogin: () => "/auth/login",
  authRefresh: () => "/auth/refresh",
  authLogout: () => "/auth/logout",
  devices: () => "/devices",
  deviceKeyPackages: (deviceId: Snowflake) => `/devices/${deviceId}/key-packages`,
  userDevices: (userId: Snowflake) => `/users/${userId}/devices`,
  claimKeyPackage: (userId: Snowflake, deviceId: Snowflake) => `/users/${userId}/devices/${deviceId}/key-packages/claim`,

  // Users
  user: (userId: Snowflake | "@me" = "@me") => `/users/${userId}`,
  userSettings: () => "/users/@me/settings",
  userChannels: () => "/users/@me/channels",
  userRelationship: (userId: Snowflake) => `/users/@me/relationships/${userId}`,
  userChannelDeliveryMode: (channelId: Snowflake) => `/users/@me/channels/${channelId}/delivery-mode`,

  // Guilds
  guilds: () => "/guilds",
  guild: (guildId: Snowflake) => `/guilds/${guildId}`,
  guildChannels: (guildId: Snowflake) => `/guilds/${guildId}/channels`,
  guildRoles: (guildId: Snowflake) => `/guilds/${guildId}/roles`,
  guildRole: (guildId: Snowflake, roleId: Snowflake) => `/guilds/${guildId}/roles/${roleId}`,
  guildMembers: (guildId: Snowflake) => `/guilds/${guildId}/members`,
  guildMember: (guildId: Snowflake, userId: Snowflake) => `/guilds/${guildId}/members/${userId}`,
  guildMemberRole: (guildId: Snowflake, userId: Snowflake, roleId: Snowflake) => `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
  guildBan: (guildId: Snowflake, userId: Snowflake) => `/guilds/${guildId}/bans/${userId}`,
  guildAuditLogs: (guildId: Snowflake) => `/guilds/${guildId}/audit-logs`,
  guildEmojis: (guildId: Snowflake) => `/guilds/${guildId}/emojis`,
  guildEmoji: (guildId: Snowflake, emojiId: Snowflake) => `/guilds/${guildId}/emojis/${emojiId}`,
  guildInvites: (guildId: Snowflake) => `/guilds/${guildId}/invites`,
  guildWebhooks: (guildId: Snowflake) => `/guilds/${guildId}/webhooks`,

  // Channels
  channel: (channelId: Snowflake) => `/channels/${channelId}`,
  channelPermission: (channelId: Snowflake, overwriteId: Snowflake) => `/channels/${channelId}/permissions/${overwriteId}`,
  channelInvites: (channelId: Snowflake) => `/channels/${channelId}/invites`,
  channelTyping: (channelId: Snowflake) => `/channels/${channelId}/typing`,
  channelThreads: (channelId: Snowflake) => `/channels/${channelId}/threads`,
  channelWebhooks: (channelId: Snowflake) => `/channels/${channelId}/webhooks`,

  // Messages (served by the messages service)
  channelMessages: (channelId: Snowflake) => `/channels/${channelId}/messages`,
  channelMessage: (channelId: Snowflake, messageId: Snowflake) => `/channels/${channelId}/messages/${messageId}`,
  channelBulkDelete: (channelId: Snowflake) => `/channels/${channelId}/messages/bulk-delete`,
  channelMessageOwnReaction: (channelId: Snowflake, messageId: Snowflake, emoji: string) =>
    `/channels/${channelId}/messages/${messageId}/reactions/${enc(emoji)}/@me`,
  channelPins: (channelId: Snowflake) => `/channels/${channelId}/pins`,
  channelPin: (channelId: Snowflake, messageId: Snowflake) => `/channels/${channelId}/pins/${messageId}`,
  channelMessageAck: (channelId: Snowflake, messageId: Snowflake) => `/channels/${channelId}/messages/${messageId}/ack`,
  channelAttachments: (channelId: Snowflake) => `/channels/${channelId}/attachments`,

  // Invites
  invite: (code: string) => `/invites/${enc(code)}`,

  // Applications, commands and interactions
  applications: () => "/applications",
  application: (applicationId: Snowflake) => `/applications/${applicationId}`,
  applicationBotResetToken: (applicationId: Snowflake) => `/applications/${applicationId}/bot/reset-token`,
  applicationCommands: (applicationId: Snowflake) => `/applications/${applicationId}/commands`,
  applicationCommand: (applicationId: Snowflake, commandId: Snowflake) => `/applications/${applicationId}/commands/${commandId}`,
  applicationGuildCommands: (applicationId: Snowflake, guildId: Snowflake) => `/applications/${applicationId}/guilds/${guildId}/commands`,
  applicationGuildCommand: (applicationId: Snowflake, guildId: Snowflake, commandId: Snowflake) =>
    `/applications/${applicationId}/guilds/${guildId}/commands/${commandId}`,
  interactionCallback: (interactionId: Snowflake, token: string) => `/interactions/${interactionId}/${enc(token)}/callback`,
  oauth2Authorize: () => "/oauth2/authorize",

  // Webhooks
  webhook: (webhookId: Snowflake, token?: string) => (token ? `/webhooks/${webhookId}/${enc(token)}` : `/webhooks/${webhookId}`),
  webhookOriginalMessage: (applicationId: Snowflake, token: string) => `/webhooks/${applicationId}/${enc(token)}/messages/@original`,

  // Voice
  voiceRegions: () => "/voice/regions",
} as const;
