import {
  InteractionResponseTypes as R,
  MessageFlags,
  type ApiApplicationCommandInteractionData,
  type ApiApplicationCommandOptionChoice,
  type ApiGuildMember,
  type ApiInteraction,
  type ApiInteractionResponse,
  type ApiMessage,
  type ApiMessageComponentInteractionData,
  type ApiModal,
  type ApiModalSubmitInteractionData,
  type ApiUser,
  type ApplicationCommandType,
  type ComponentType,
  type Snowflake,
} from "../../contracts/index.js";
import { Permissions } from "../../domain/bitfield/permissions.js";
import { toJSONValue, type JSONEncodable } from "../../domain/builders/assert.js";
import { ValidationError } from "../../domain/errors.js";
import { CommandOptions } from "../../domain/interactions/command-options.js";
import { InteractionResponseState, type InteractionKind } from "../../domain/interactions/response-state.js";
import { toMessageBody, type MessagePayload } from "../message-payload.js";
import type { RestClient } from "../rest/rest-client.js";
import { Routes } from "../rest/routes.js";
import { WebhookClient } from "../webhooks/webhook-client.js";

/** Fields shared by every interaction. */
export abstract class BaseInteraction {
  readonly id: Snowflake;
  readonly token: string;
  readonly applicationId: Snowflake;
  readonly guildId: Snowflake | null;
  readonly channelId: Snowflake | null;
  /** The invoking user (from `member.user` in guilds, `user` in DMs). */
  readonly user: ApiUser;
  readonly member: (ApiGuildMember & { permissions: string }) | null;
  /** Permissions of the invoking member in the channel, or `null` outside guilds. */
  readonly memberPermissions: Permissions | null;
  /** Permissions of the bot in the channel, when provided. */
  readonly appPermissions: Permissions | null;
  readonly locale: string | undefined;

  constructor(
    readonly raw: ApiInteraction,
    protected readonly rest: RestClient,
  ) {
    this.id = raw.id;
    this.token = raw.token;
    this.applicationId = raw.application_id;
    this.guildId = raw.guild_id ?? null;
    this.channelId = raw.channel_id ?? raw.channel?.id ?? null;
    const user = raw.member?.user ?? raw.user;
    if (!user) throw new ValidationError("Interaction has neither member.user nor user");
    this.user = user;
    this.member = raw.member ?? null;
    this.memberPermissions = raw.member ? new Permissions(BigInt(raw.member.permissions)) : null;
    this.appPermissions = raw.app_permissions ? new Permissions(BigInt(raw.app_permissions)) : null;
    this.locale = raw.locale;
  }

  inGuild(): this is this & { guildId: Snowflake; member: ApiGuildMember & { permissions: string } } {
    return this.guildId !== null && this.member !== null;
  }
}

/** An interaction that can be answered with messages: reply, defer, edit, follow up. */
export abstract class RepliableInteraction extends BaseInteraction {
  protected readonly state: InteractionResponseState;
  private readonly webhook: WebhookClient;

  constructor(raw: ApiInteraction, rest: RestClient, kind: InteractionKind) {
    super(raw, rest);
    this.state = new InteractionResponseState(kind);
    this.webhook = new WebhookClient({ id: raw.application_id, token: raw.token }, { rest });
  }

  get replied(): boolean {
    return this.state.acknowledged && !this.state.deferred;
  }

  get deferred(): boolean {
    return this.state.deferred;
  }

  /** Responds with a message (callback type 4). */
  async reply(payload: MessagePayload): Promise<void> {
    this.state.transition("reply");
    await this.callback({ type: R.ChannelMessageWithSource, data: toMessageBody(payload) });
  }

  /** Acknowledges now and shows "thinking…"; finish with {@link editReply} (callback type 5). */
  async deferReply(options: { ephemeral?: boolean } = {}): Promise<void> {
    this.state.transition("defer");
    await this.callback({ type: R.DeferredChannelMessageWithSource, data: options.ephemeral ? { flags: MessageFlags.Ephemeral } : {} });
  }

  /** Edits the original response. */
  async editReply(payload: MessagePayload): Promise<ApiMessage> {
    this.state.transition("editReply");
    return this.webhook.editOriginal(payload);
  }

  async deleteReply(): Promise<void> {
    this.state.transition("deleteReply");
    await this.webhook.deleteOriginal();
  }

  /** Sends an additional message after the interaction was acknowledged. */
  async followUp(payload: MessagePayload): Promise<ApiMessage> {
    this.state.transition("followUp");
    return this.webhook.send(payload);
  }

  protected async callback(response: ApiInteractionResponse): Promise<void> {
    await this.rest.post<undefined>(Routes.interactionCallback(this.id, this.token), { body: response });
  }

  protected async showModalResponse(modal: ApiModal | JSONEncodable<ApiModal>): Promise<void> {
    this.state.transition("showModal");
    await this.callback({ type: R.Modal, data: toJSONValue(modal) });
  }
}

/** A slash command or context-menu command invocation. */
export class CommandInteraction extends RepliableInteraction {
  readonly commandId: Snowflake;
  readonly commandName: string;
  readonly commandType: ApplicationCommandType;
  readonly options: CommandOptions;
  /** Target user or message id of a context-menu command. */
  readonly targetId: Snowflake | null;

  constructor(raw: ApiInteraction, rest: RestClient) {
    super(raw, rest, "command");
    const data = raw.data as ApiApplicationCommandInteractionData;
    this.commandId = data.id;
    this.commandName = data.name;
    this.commandType = data.type;
    this.options = new CommandOptions(data.options, data.resolved);
    this.targetId = data.target_id ?? null;
  }

  showModal(modal: ApiModal | JSONEncodable<ApiModal>): Promise<void> {
    return this.showModalResponse(modal);
  }
}

/** Shared behaviour of interactions attached to an existing message (components, modal submits). */
abstract class MessageBoundInteraction extends RepliableInteraction {
  readonly customId: string;
  /** Values captured by the router's custom-id pattern (e.g. `kick:confirm:42` → `["confirm", "42"]`). */
  args: string[] = [];
  readonly message: ApiMessage | null;

  constructor(raw: ApiInteraction, rest: RestClient, kind: InteractionKind, customId: string) {
    super(raw, rest, kind);
    this.customId = customId;
    this.message = raw.message ?? null;
  }

  /** Edits the message the component is attached to (callback type 7). */
  async update(payload: MessagePayload): Promise<void> {
    this.state.transition("update");
    await this.callback({ type: R.UpdateMessage, data: toMessageBody(payload) });
  }

  /** Acknowledges without changing the message yet (callback type 6). */
  async deferUpdate(): Promise<void> {
    this.state.transition("deferUpdate");
    await this.callback({ type: R.DeferredUpdateMessage });
  }
}

/** A button press or select-menu choice. */
export class ComponentInteraction extends MessageBoundInteraction {
  readonly componentType: ComponentType;
  /** Selected values for select menus; empty for buttons. */
  readonly values: string[];

  constructor(raw: ApiInteraction, rest: RestClient) {
    const data = raw.data as ApiMessageComponentInteractionData;
    super(raw, rest, "component", data.custom_id);
    this.componentType = data.component_type;
    this.values = data.values ?? [];
  }

  showModal(modal: ApiModal | JSONEncodable<ApiModal>): Promise<void> {
    return this.showModalResponse(modal);
  }
}

/** A submitted modal. */
export class ModalSubmitInteraction extends MessageBoundInteraction {
  private readonly fields: Map<string, string>;

  constructor(raw: ApiInteraction, rest: RestClient) {
    const data = raw.data as ApiModalSubmitInteractionData;
    super(raw, rest, "modal", data.custom_id);
    this.fields = new Map(data.components.flatMap((row) => row.components.map((c) => [c.custom_id, c.value] as const)));
  }

  getTextInputValue(customId: string): string {
    const value = this.fields.get(customId);
    if (value === undefined) throw new ValidationError(`Modal has no text input "${customId}"`);
    return value;
  }
}

/** A user typing into an autocomplete-enabled option. */
export class AutocompleteInteraction extends BaseInteraction {
  readonly commandName: string;
  readonly options: CommandOptions;
  private readonly state = new InteractionResponseState("autocomplete");

  constructor(raw: ApiInteraction, rest: RestClient) {
    super(raw, rest);
    const data = raw.data as ApiApplicationCommandInteractionData;
    this.commandName = data.name;
    this.options = new CommandOptions(data.options, data.resolved);
  }

  /** Sends up to 25 suggestions (callback type 8). */
  async respond(choices: ApiApplicationCommandOptionChoice[]): Promise<void> {
    this.state.transition("respond");
    await this.rest.post<undefined>(Routes.interactionCallback(this.id, this.token), {
      body: { type: R.ApplicationCommandAutocompleteResult, data: { choices: choices.slice(0, 25) } },
    });
  }
}
