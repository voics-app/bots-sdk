/**
 * Gateway intent bits (P7, Discord values).
 *
 * Local mirror of `@discordy-voics/contracts`; replace with the generated package once published.
 * @module
 */
export const GatewayIntentBits = {
  Guilds: 1 << 0,
  GuildMembers: 1 << 1,
  GuildModeration: 1 << 2,
  GuildEmojis: 1 << 3,
  GuildIntegrations: 1 << 4,
  GuildWebhooks: 1 << 5,
  GuildInvites: 1 << 6,
  GuildVoiceStates: 1 << 7,
  GuildPresences: 1 << 8,
  GuildMessages: 1 << 9,
  GuildMessageReactions: 1 << 10,
  GuildMessageTyping: 1 << 11,
  DirectMessages: 1 << 12,
  DirectMessageReactions: 1 << 13,
  DirectMessageTyping: 1 << 14,
  MessageContent: 1 << 15,
} as const;

export type GatewayIntentName = keyof typeof GatewayIntentBits;

/** Intents that must be enabled on the application before a bot may request them. */
export const PrivilegedIntentNames: readonly GatewayIntentName[] = ["GuildMembers", "GuildPresences", "MessageContent"];
