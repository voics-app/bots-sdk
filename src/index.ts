/**
 * `@voics-app/bots` — a lean SDK for Voics bots.
 *
 * - {@link Client}: gateway session (intents, heartbeat, resume, reconnect) plus REST and interactions.
 * - {@link RestClient} / {@link DiscordyApi} / {@link Routes}: rate-limited REST for the P9 endpoints.
 * - Builders for slash commands, components, modals and embeds.
 * - {@link InteractionRouter}, {@link WebhookClient}, {@link Permissions}, {@link Intents}.
 * @module
 */

// Wire contracts (P7, P9)
export * from "./contracts/index.js";

// Domain helpers
export { Permissions, computePermissions } from "./domain/bitfield/permissions.js";
export type { PermissionResolvable, PermissionCheckOptions, PermissionContext } from "./domain/bitfield/permissions.js";
export { Intents } from "./domain/bitfield/intents.js";
export type { IntentResolvable } from "./domain/bitfield/intents.js";
export { DISCORDY_EPOCH, snowflakeTimestamp, snowflakeFromTimestamp } from "./domain/snowflake.js";
export { buildInviteUrl, DEFAULT_WEB_URL } from "./domain/invite-url.js";
export type { InviteUrlOptions, OAuth2Scope } from "./domain/invite-url.js";
export { ValidationError, InteractionStateError } from "./domain/errors.js";
export type { BackoffOptions } from "./domain/gateway/backoff.js";
export { CommandOptions } from "./domain/interactions/command-options.js";
export { buildCustomId, matchCustomId } from "./domain/interactions/custom-id.js";
export type { CustomIdPattern } from "./domain/interactions/custom-id.js";

// Builders
export { SlashCommandBuilder, SubcommandBuilder, SubcommandGroupBuilder } from "./domain/builders/slash-command.js";
export type { InteractionContextResolvable } from "./domain/builders/slash-command.js";
export {
  StringOptionBuilder,
  IntegerOptionBuilder,
  NumberOptionBuilder,
  BooleanOptionBuilder,
  UserOptionBuilder,
  ChannelOptionBuilder,
  RoleOptionBuilder,
  MentionableOptionBuilder,
  AttachmentOptionBuilder,
} from "./domain/builders/command-options.js";
export { ContextMenuCommandBuilder } from "./domain/builders/context-menu-command.js";
export {
  ActionRowBuilder,
  ButtonBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  RoleSelectMenuBuilder,
  MentionableSelectMenuBuilder,
  ChannelSelectMenuBuilder,
} from "./domain/builders/components.js";
export type { ButtonStyleResolvable, RowComponentBuilder } from "./domain/builders/components.js";
export { ModalBuilder, TextInputBuilder } from "./domain/builders/modal.js";
export { EmbedBuilder } from "./domain/builders/embed.js";
export type { ColorResolvable, EmbedAuthorInput, EmbedFooterInput } from "./domain/builders/embed.js";
export type { JSONEncodable } from "./domain/builders/assert.js";

// Application ports (for custom adapters)
export type { Clock, RandomSource, TimerHandle } from "./application/ports/clock.js";
export type { HttpMethod, HttpRequest, HttpResponse, HttpTransport } from "./application/ports/http-transport.js";
export type { GatewaySocket, GatewaySocketFactory, GatewaySocketHandlers } from "./application/ports/gateway-socket.js";
export { TypedEmitter } from "./application/events/typed-emitter.js";
export type { EventMap } from "./application/events/typed-emitter.js";
export { GatewayConnection, GatewayFatalError } from "./application/gateway/gateway-connection.js";
export type { GatewayConnectionEvents, GatewayConnectionOptions, ReconnectingEvent } from "./application/gateway/gateway-connection.js";
export type { RateLimitedEvent } from "./application/rest/rate-limited-requester.js";

// Interface
export { Client, DEFAULT_GATEWAY_URL } from "./interface/client.js";
export type { ClientEvents, ClientOptions } from "./interface/client.js";
export { RestClient, DEFAULT_API_URL } from "./interface/rest/rest-client.js";
export type { RestClientOptions, RequestOptions, QueryValue } from "./interface/rest/rest-client.js";
export { DiscordyApiError } from "./interface/rest/discordy-api-error.js";
export { DiscordyApi } from "./interface/rest/discordy-api.js";
export type { CommandData, MessageQuery, ReasonOption } from "./interface/rest/discordy-api.js";
export { Routes } from "./interface/rest/routes.js";
export { toMessageBody } from "./interface/message-payload.js";
export type { MessageOptions, MessagePayload } from "./interface/message-payload.js";
export { InteractionRouter } from "./interface/interactions/interaction-router.js";
export type { AnyInteraction, InteractionErrorHandler } from "./interface/interactions/interaction-router.js";
export {
  BaseInteraction,
  RepliableInteraction,
  CommandInteraction,
  ComponentInteraction,
  ModalSubmitInteraction,
  AutocompleteInteraction,
} from "./interface/interactions/interactions.js";
export { WebhookClient, parseWebhookUrl } from "./interface/webhooks/webhook-client.js";
export type { WebhookCredentials, WebhookSendOptions } from "./interface/webhooks/webhook-client.js";
export { SDK_VERSION } from "./interface/version.js";
export type { WebSocketConstructor } from "./infrastructure/websocket-gateway-socket.js";

// Supporting types referenced by the public API
export type { Configure, ChildBuilder } from "./domain/builders/slash-command.js";
export { NamedOptionBuilder, ValueOptionBuilder } from "./domain/builders/command-options.js";
export { InteractionResponseState } from "./domain/interactions/response-state.js";
export type { InteractionKind, InteractionAction } from "./domain/interactions/response-state.js";
export type { HeaderReader } from "./domain/ratelimit/rate-limit-headers.js";
export type { Listener } from "./application/events/typed-emitter.js";
export type { Handler } from "./interface/interactions/interaction-router.js";
export type { DispatchEvents } from "./interface/client.js";
