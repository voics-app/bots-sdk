/**
 * REST object shapes and enums (pinned interface P9, Discord API v10 field names).
 *
 * Local mirror of `@discordy-voics/contracts`; replace with the generated package once published.
 * @module
 */

/** Snowflake IDs travel as decimal strings (P5). */
export type Snowflake = string;

/** Base path of the public REST API. */
export const API_BASE_PATH = "/api/v1";

/** Rate-limit response headers (P9). */
export const RateLimitHeaders = {
  Limit: "x-ratelimit-limit",
  Remaining: "x-ratelimit-remaining",
  Reset: "x-ratelimit-reset",
  ResetAfter: "x-ratelimit-reset-after",
  Bucket: "x-ratelimit-bucket",
  Global: "x-ratelimit-global",
  RetryAfter: "retry-after",
} as const;

/** Discordy/Discord JSON error codes (P9). */
export const ApiErrorCodes = {
  UnknownChannel: 10003,
  UnknownGuild: 10004,
  UnknownMessage: 10008,
  UnknownUser: 10013,
  MissingAccess: 50001,
  MissingPermissions: 50013,
  InvalidFormBody: 50035,
  VerificationRequired: 40002,
  DeliveryModeConflict: 50160,
  RateLimited: 429,
} as const;

export interface ApiErrorBody {
  code: number;
  message: string;
  errors?: Record<string, unknown>;
}

export interface ApiRateLimitBody {
  message: string;
  retry_after: number;
  global?: boolean;
  code?: number;
}

export const ChannelTypes = {
  GuildText: 0,
  DM: 1,
  GuildVoice: 2,
  GroupDM: 3,
  GuildCategory: 4,
  GuildAnnouncement: 5,
  AnnouncementThread: 10,
  PublicThread: 11,
  PrivateThread: 12,
  GuildStageVoice: 13,
  GuildForum: 15,
} as const;
export type ChannelType = (typeof ChannelTypes)[keyof typeof ChannelTypes];

export type DeliveryMode = "standard" | "ephemeral" | "p2p";

export interface ApiUser {
  id: Snowflake;
  username: string;
  discriminator?: string;
  global_name?: string | null;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
}

export interface ApiRole {
  id: Snowflake;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
}

export interface ApiGuildMember {
  user?: ApiUser;
  nick?: string | null;
  avatar?: string | null;
  roles: Snowflake[];
  joined_at: string;
  deaf?: boolean;
  mute?: boolean;
  pending?: boolean;
  permissions?: string;
  communication_disabled_until?: string | null;
}

export interface ApiPermissionOverwrite {
  id: Snowflake;
  /** 0 = role, 1 = member. */
  type: 0 | 1;
  allow: string;
  deny: string;
}

export interface ApiChannel {
  id: Snowflake;
  type: ChannelType;
  guild_id?: Snowflake;
  position?: number;
  permission_overwrites?: ApiPermissionOverwrite[];
  name?: string | null;
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: Snowflake | null;
  parent_id?: Snowflake | null;
  recipients?: ApiUser[];
  owner_id?: Snowflake;
  delivery_mode?: DeliveryMode;
  voice_region?: string | null;
}

export interface ApiEmoji {
  id: Snowflake | null;
  name: string | null;
  animated?: boolean;
  roles?: Snowflake[];
}

export interface ApiGuild {
  id: Snowflake;
  name: string;
  icon: string | null;
  owner_id: Snowflake;
  roles: ApiRole[];
  emojis?: ApiEmoji[];
  channels?: ApiChannel[];
  members?: ApiGuildMember[];
  voice_region?: string | null;
  member_count?: number;
  unavailable?: boolean;
}

export interface ApiUnavailableGuild {
  id: Snowflake;
  unavailable: true;
}

export interface ApiAttachment {
  id: Snowflake;
  filename: string;
  size: number;
  url: string;
  proxy_url?: string;
  content_type?: string;
  width?: number | null;
  height?: number | null;
}

export interface ApiEmbedFooter {
  text: string;
  icon_url?: string;
}

export interface ApiEmbedAuthor {
  name: string;
  url?: string;
  icon_url?: string;
}

export interface ApiEmbedMedia {
  url: string;
  height?: number;
  width?: number;
}

export interface ApiEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface ApiEmbed {
  title?: string;
  type?: "rich";
  description?: string;
  url?: string;
  timestamp?: string;
  color?: number;
  footer?: ApiEmbedFooter;
  image?: ApiEmbedMedia;
  thumbnail?: ApiEmbedMedia;
  author?: ApiEmbedAuthor;
  fields?: ApiEmbedField[];
}

export interface ApiReaction {
  count: number;
  me: boolean;
  emoji: ApiEmoji;
}

export interface ApiMessageReference {
  message_id?: Snowflake;
  channel_id?: Snowflake;
  guild_id?: Snowflake;
  fail_if_not_exists?: boolean;
}

export interface ApiMessage {
  id: Snowflake;
  channel_id: Snowflake;
  guild_id?: Snowflake;
  author: ApiUser;
  member?: ApiGuildMember;
  content: string;
  timestamp: string;
  edited_timestamp: string | null;
  tts?: boolean;
  mention_everyone?: boolean;
  mentions?: ApiUser[];
  mention_roles?: Snowflake[];
  attachments: ApiAttachment[];
  embeds: ApiEmbed[];
  reactions?: ApiReaction[];
  nonce?: string | number;
  pinned?: boolean;
  webhook_id?: Snowflake;
  type: number;
  flags?: number;
  message_reference?: ApiMessageReference;
  components?: ApiActionRow[];
  interaction_metadata?: { id: Snowflake; type: number; user: ApiUser };
}

export interface ApiAllowedMentions {
  parse?: ("roles" | "users" | "everyone")[];
  roles?: Snowflake[];
  users?: Snowflake[];
  replied_user?: boolean;
}

/** Message flags relevant to bots. */
export const MessageFlags = {
  SuppressEmbeds: 1 << 2,
  Ephemeral: 1 << 6,
  SuppressNotifications: 1 << 12,
} as const;

/** Body of `POST /channels/{id}/messages`, webhook executes and interaction replies. */
export interface ApiMessageCreateBody {
  content?: string;
  nonce?: string;
  tts?: boolean;
  embeds?: ApiEmbed[];
  components?: ApiActionRow[];
  allowed_mentions?: ApiAllowedMentions;
  message_reference?: ApiMessageReference;
  flags?: number;
  attachments?: Partial<ApiAttachment>[];
}

export interface ApiVoiceState {
  guild_id?: Snowflake;
  channel_id: Snowflake | null;
  user_id: Snowflake;
  member?: ApiGuildMember;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  suppress: boolean;
}

export interface ApiInvite {
  code: string;
  guild?: Partial<ApiGuild>;
  channel: Partial<ApiChannel> | null;
  inviter?: ApiUser;
  expires_at?: string | null;
}

export interface ApiApplication {
  id: Snowflake;
  name: string;
  description: string;
  icon: string | null;
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  bot?: ApiUser;
  owner?: ApiUser;
  flags?: number;
}

export interface ApiWebhook {
  id: Snowflake;
  type: 1 | 2 | 3;
  guild_id?: Snowflake | null;
  channel_id: Snowflake | null;
  user?: ApiUser;
  name: string | null;
  avatar: string | null;
  token?: string;
  application_id: Snowflake | null;
  url?: string;
}

// ---------------------------------------------------------------------------
// Application commands
// ---------------------------------------------------------------------------

export const ApplicationCommandTypes = {
  ChatInput: 1,
  User: 2,
  Message: 3,
} as const;
export type ApplicationCommandType = (typeof ApplicationCommandTypes)[keyof typeof ApplicationCommandTypes];

export const ApplicationCommandOptionTypes = {
  Subcommand: 1,
  SubcommandGroup: 2,
  String: 3,
  Integer: 4,
  Boolean: 5,
  User: 6,
  Channel: 7,
  Role: 8,
  Mentionable: 9,
  Number: 10,
  Attachment: 11,
} as const;
export type ApplicationCommandOptionType =
  (typeof ApplicationCommandOptionTypes)[keyof typeof ApplicationCommandOptionTypes];

/** Where a command can be used (Discord interaction context types). */
export const InteractionContextTypes = {
  Guild: 0,
  BotDM: 1,
  PrivateChannel: 2,
} as const;
export type InteractionContextType = (typeof InteractionContextTypes)[keyof typeof InteractionContextTypes];

export interface ApiApplicationCommandOptionChoice {
  name: string;
  value: string | number;
}

export interface ApiApplicationCommandOption {
  type: ApplicationCommandOptionType;
  name: string;
  description: string;
  required?: boolean;
  choices?: ApiApplicationCommandOptionChoice[];
  options?: ApiApplicationCommandOption[];
  channel_types?: ChannelType[];
  min_value?: number;
  max_value?: number;
  min_length?: number;
  max_length?: number;
  autocomplete?: boolean;
}

/** Body used to create or bulk-overwrite application commands. */
export interface ApiApplicationCommandCreateBody {
  name: string;
  description?: string;
  type?: ApplicationCommandType;
  options?: ApiApplicationCommandOption[];
  default_member_permissions?: string | null;
  contexts?: InteractionContextType[];
  nsfw?: boolean;
}

export interface ApiApplicationCommand extends ApiApplicationCommandCreateBody {
  id: Snowflake;
  application_id: Snowflake;
  guild_id?: Snowflake;
  version: Snowflake;
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export const ComponentTypes = {
  ActionRow: 1,
  Button: 2,
  StringSelect: 3,
  TextInput: 4,
  UserSelect: 5,
  RoleSelect: 6,
  MentionableSelect: 7,
  ChannelSelect: 8,
} as const;
export type ComponentType = (typeof ComponentTypes)[keyof typeof ComponentTypes];

export const ButtonStyles = {
  Primary: 1,
  Secondary: 2,
  Success: 3,
  Danger: 4,
  Link: 5,
} as const;
export type ButtonStyle = (typeof ButtonStyles)[keyof typeof ButtonStyles];

export const TextInputStyles = {
  Short: 1,
  Paragraph: 2,
} as const;
export type TextInputStyle = (typeof TextInputStyles)[keyof typeof TextInputStyles];

export interface ApiPartialEmoji {
  id?: Snowflake | null;
  name?: string | null;
  animated?: boolean;
}

export interface ApiButton {
  type: typeof ComponentTypes.Button;
  style: ButtonStyle;
  label?: string;
  emoji?: ApiPartialEmoji;
  custom_id?: string;
  url?: string;
  disabled?: boolean;
}

export interface ApiSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: ApiPartialEmoji;
  default?: boolean;
}

export interface ApiSelectMenu {
  type:
    | typeof ComponentTypes.StringSelect
    | typeof ComponentTypes.UserSelect
    | typeof ComponentTypes.RoleSelect
    | typeof ComponentTypes.MentionableSelect
    | typeof ComponentTypes.ChannelSelect;
  custom_id: string;
  options?: ApiSelectOption[];
  channel_types?: ChannelType[];
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
}

export interface ApiTextInput {
  type: typeof ComponentTypes.TextInput;
  custom_id: string;
  style: TextInputStyle;
  label: string;
  min_length?: number;
  max_length?: number;
  required?: boolean;
  value?: string;
  placeholder?: string;
}

export type ApiMessageComponent = ApiButton | ApiSelectMenu;

export interface ApiActionRow<C = ApiMessageComponent | ApiTextInput> {
  type: typeof ComponentTypes.ActionRow;
  components: C[];
}

export interface ApiModal {
  custom_id: string;
  title: string;
  components: ApiActionRow<ApiTextInput>[];
}

// ---------------------------------------------------------------------------
// Interactions
// ---------------------------------------------------------------------------

export const InteractionTypes = {
  Ping: 1,
  ApplicationCommand: 2,
  MessageComponent: 3,
  ApplicationCommandAutocomplete: 4,
  ModalSubmit: 5,
} as const;
export type InteractionType = (typeof InteractionTypes)[keyof typeof InteractionTypes];

export const InteractionResponseTypes = {
  Pong: 1,
  ChannelMessageWithSource: 4,
  DeferredChannelMessageWithSource: 5,
  DeferredUpdateMessage: 6,
  UpdateMessage: 7,
  ApplicationCommandAutocompleteResult: 8,
  Modal: 9,
} as const;
export type InteractionResponseType = (typeof InteractionResponseTypes)[keyof typeof InteractionResponseTypes];

export interface ApiInteractionDataOption {
  name: string;
  type: ApplicationCommandOptionType;
  value?: string | number | boolean;
  options?: ApiInteractionDataOption[];
  focused?: boolean;
}

export interface ApiResolvedData {
  users?: Record<Snowflake, ApiUser>;
  members?: Record<Snowflake, Omit<ApiGuildMember, "user">>;
  roles?: Record<Snowflake, ApiRole>;
  channels?: Record<Snowflake, Partial<ApiChannel> & Pick<ApiChannel, "id" | "type">>;
  messages?: Record<Snowflake, ApiMessage>;
  attachments?: Record<Snowflake, ApiAttachment>;
}

export interface ApiApplicationCommandInteractionData {
  id: Snowflake;
  name: string;
  type: ApplicationCommandType;
  resolved?: ApiResolvedData;
  options?: ApiInteractionDataOption[];
  guild_id?: Snowflake;
  target_id?: Snowflake;
}

export interface ApiMessageComponentInteractionData {
  custom_id: string;
  component_type: ComponentType;
  values?: string[];
  resolved?: ApiResolvedData;
}

export interface ApiModalSubmitInteractionData {
  custom_id: string;
  components: ApiActionRow<{ type: typeof ComponentTypes.TextInput; custom_id: string; value: string }>[];
}

export interface ApiInteraction {
  id: Snowflake;
  application_id: Snowflake;
  type: InteractionType;
  data?: ApiApplicationCommandInteractionData | ApiMessageComponentInteractionData | ApiModalSubmitInteractionData;
  guild_id?: Snowflake;
  channel_id?: Snowflake;
  channel?: Partial<ApiChannel>;
  member?: ApiGuildMember & { permissions: string; user: ApiUser };
  user?: ApiUser;
  token: string;
  version: number;
  message?: ApiMessage;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
}

export interface ApiInteractionCallbackData extends ApiMessageCreateBody {
  choices?: ApiApplicationCommandOptionChoice[];
  custom_id?: string;
  title?: string;
}

export interface ApiInteractionResponse {
  type: InteractionResponseType;
  data?: ApiInteractionCallbackData | ApiModal;
}
