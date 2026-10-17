import { InteractionTypes, type ApiApplicationCommandInteractionData, type ApiInteraction } from "../../contracts/index.js";
import { matchCustomId, type CustomIdPattern } from "../../domain/interactions/custom-id.js";
import type { RestClient } from "../rest/rest-client.js";
import {
  AutocompleteInteraction,
  CommandInteraction,
  ComponentInteraction,
  ModalSubmitInteraction,
  type BaseInteraction,
} from "./interactions.js";

type Handler<I> = (interaction: I) => unknown;

export type AnyInteraction = CommandInteraction | ComponentInteraction | ModalSubmitInteraction | AutocompleteInteraction;

export type InteractionErrorHandler = (error: unknown, interaction: BaseInteraction) => void;

interface PatternRoute<I> {
  pattern: CustomIdPattern;
  handler: Handler<I>;
}

/**
 * Routes INTERACTION_CREATE payloads to handlers:
 * commands by name (optionally `"name subcommand"` or `"name group subcommand"`),
 * components and modals by custom id (exact, `prefix:` with arguments, or RegExp),
 * and autocomplete by command name.
 */
export class InteractionRouter {
  private readonly commands = new Map<string, Handler<CommandInteraction>>();
  private readonly autocompletes = new Map<string, Handler<AutocompleteInteraction>>();
  private readonly components: PatternRoute<ComponentInteraction>[] = [];
  private readonly modals: PatternRoute<ModalSubmitInteraction>[] = [];
  private errorHandler: InteractionErrorHandler = (error) => {
    throw error;
  };

  constructor(private readonly rest: RestClient) {}

  /** @param name `"ping"`, `"warn add"` or `"config roles set"` */
  command(name: string, handler: Handler<CommandInteraction>): this {
    this.commands.set(normalize(name), handler);
    return this;
  }

  component(pattern: CustomIdPattern, handler: Handler<ComponentInteraction>): this {
    this.components.push({ pattern, handler });
    return this;
  }

  modal(pattern: CustomIdPattern, handler: Handler<ModalSubmitInteraction>): this {
    this.modals.push({ pattern, handler });
    return this;
  }

  autocomplete(commandName: string, handler: Handler<AutocompleteInteraction>): this {
    this.autocompletes.set(normalize(commandName), handler);
    return this;
  }

  /** Called when a handler throws or rejects. Defaults to rethrowing. */
  onError(handler: InteractionErrorHandler): this {
    this.errorHandler = handler;
    return this;
  }

  /**
   * Builds the interaction context and runs the matching handler.
   * @returns the context, or `null` when no handler matched.
   */
  async handle(raw: ApiInteraction): Promise<AnyInteraction | null> {
    const routed = this.resolve(raw);
    if (!routed) return null;
    try {
      await routed.run();
    } catch (error) {
      this.errorHandler(error, routed.interaction);
    }
    return routed.interaction;
  }

  private resolve(raw: ApiInteraction): { interaction: AnyInteraction; run: () => unknown } | null {
    switch (raw.type) {
      case InteractionTypes.ApplicationCommand: {
        const interaction = new CommandInteraction(raw, this.rest);
        const handler = lookupCommand(this.commands, raw.data as ApiApplicationCommandInteractionData, interaction);
        return handler ? { interaction, run: () => handler(interaction) } : null;
      }
      case InteractionTypes.ApplicationCommandAutocomplete: {
        const interaction = new AutocompleteInteraction(raw, this.rest);
        const handler = lookupCommand(this.autocompletes, raw.data as ApiApplicationCommandInteractionData, interaction);
        return handler ? { interaction, run: () => handler(interaction) } : null;
      }
      case InteractionTypes.MessageComponent:
        return this.resolvePattern(this.components, new ComponentInteraction(raw, this.rest));
      case InteractionTypes.ModalSubmit:
        return this.resolvePattern(this.modals, new ModalSubmitInteraction(raw, this.rest));
      default:
        return null;
    }
  }

  private resolvePattern<I extends ComponentInteraction | ModalSubmitInteraction>(
    routes: PatternRoute<I>[],
    interaction: I,
  ): { interaction: I; run: () => unknown } | null {
    for (const route of routes) {
      const args = matchCustomId(route.pattern, interaction.customId);
      if (args) {
        interaction.args = args;
        return { interaction, run: () => route.handler(interaction) };
      }
    }
    return null;
  }
}

function normalize(name: string): string {
  return name.trim().split(/\s+/).join(" ");
}

function lookupCommand<I>(
  handlers: Map<string, Handler<I>>,
  data: ApiApplicationCommandInteractionData,
  interaction: CommandInteraction | AutocompleteInteraction,
): Handler<I> | undefined {
  const group = interaction.options.getSubcommandGroup();
  const sub = interaction.options.getSubcommand(false);
  const candidates = [[data.name, group, sub], [data.name, sub], [data.name]].map((parts) => parts.filter(Boolean).join(" "));
  for (const key of candidates) {
    const handler = handlers.get(key);
    if (handler) return handler;
  }
  return undefined;
}
