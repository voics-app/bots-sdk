import {
  ApplicationCommandOptionTypes as T,
  ApplicationCommandTypes,
  InteractionContextTypes,
  type ApiApplicationCommandCreateBody,
  type ApiApplicationCommandOption,
  type InteractionContextType,
} from "../../contracts/index.js";
import { Permissions, type PermissionResolvable } from "../bitfield/permissions.js";
import { ValidationError } from "../errors.js";
import { assertDefined, assertMaxItems } from "./assert.js";
import {
  AttachmentOptionBuilder,
  BooleanOptionBuilder,
  ChannelOptionBuilder,
  IntegerOptionBuilder,
  MAX_OPTIONS,
  MentionableOptionBuilder,
  NamedOptionBuilder,
  NumberOptionBuilder,
  RoleOptionBuilder,
  StringOptionBuilder,
  UserOptionBuilder,
  ValueOptionBuilder,
  assertChatInputName,
  assertDescription,
} from "./command-options.js";

export type Configure<B> = (builder: B) => B;
export interface ChildBuilder {
  readonly optionName: string | undefined;
  toJSON(): ApiApplicationCommandOption;
}

/** Where a command may be invoked: a context name or its numeric value. */
export type InteractionContextResolvable = keyof typeof InteractionContextTypes | InteractionContextType;

/** Holds a list of child options and validates names, count and ordering. */
abstract class OptionHolder {
  protected readonly children: ChildBuilder[] = [];

  addStringOption(configure: Configure<StringOptionBuilder>): this {
    return this.addValue(configure(new StringOptionBuilder()));
  }

  addIntegerOption(configure: Configure<IntegerOptionBuilder>): this {
    return this.addValue(configure(new IntegerOptionBuilder()));
  }

  addNumberOption(configure: Configure<NumberOptionBuilder>): this {
    return this.addValue(configure(new NumberOptionBuilder()));
  }

  addBooleanOption(configure: Configure<BooleanOptionBuilder>): this {
    return this.addValue(configure(new BooleanOptionBuilder()));
  }

  addUserOption(configure: Configure<UserOptionBuilder>): this {
    return this.addValue(configure(new UserOptionBuilder()));
  }

  addChannelOption(configure: Configure<ChannelOptionBuilder>): this {
    return this.addValue(configure(new ChannelOptionBuilder()));
  }

  addRoleOption(configure: Configure<RoleOptionBuilder>): this {
    return this.addValue(configure(new RoleOptionBuilder()));
  }

  addMentionableOption(configure: Configure<MentionableOptionBuilder>): this {
    return this.addValue(configure(new MentionableOptionBuilder()));
  }

  addAttachmentOption(configure: Configure<AttachmentOptionBuilder>): this {
    return this.addValue(configure(new AttachmentOptionBuilder()));
  }

  protected addValue(option: ValueOptionBuilder): this {
    if (this.children.some((child) => !(child instanceof ValueOptionBuilder))) {
      throw new ValidationError("Cannot mix subcommands and value options at the same level");
    }
    return this.addChild(option);
  }

  protected addChild(child: ChildBuilder): this {
    assertMaxItems("options", this.children.length + 1, MAX_OPTIONS);
    if (this.children.some((existing) => existing.optionName === child.optionName)) {
      throw new ValidationError(`Duplicate option name "${child.optionName ?? ""}"`);
    }
    this.children.push(child);
    return this;
  }

  protected optionsJSON(): ApiApplicationCommandOption[] {
    let seenOptional = false;
    for (const child of this.children) {
      if (!(child instanceof ValueOptionBuilder)) continue;
      if (!child.isRequired) seenOptional = true;
      else if (seenOptional) throw new ValidationError("Required options must come before optional options");
    }
    return this.children.map((child) => child.toJSON());
  }
}

/** A subcommand: `/command <subcommand> ...options`. */
export class SubcommandBuilder extends OptionHolder implements ChildBuilder {
  private name?: string;
  private description?: string;

  setName(name: string): this {
    this.name = assertChatInputName(name);
    return this;
  }

  setDescription(description: string): this {
    this.description = assertDescription(description);
    return this;
  }

  get optionName(): string | undefined {
    return this.name;
  }

  toJSON(): ApiApplicationCommandOption {
    return {
      type: T.Subcommand,
      name: assertDefined("name", this.name),
      description: assertDefined("description", this.description),
      options: this.optionsJSON(),
    };
  }
}

/** A group of subcommands: `/command <group> <subcommand> ...options`. */
export class SubcommandGroupBuilder extends NamedOptionBuilder {
  private readonly subcommands: SubcommandBuilder[] = [];

  addSubcommand(configure: Configure<SubcommandBuilder>): this {
    const subcommand = configure(new SubcommandBuilder());
    assertMaxItems("subcommands", this.subcommands.length + 1, MAX_OPTIONS);
    if (this.subcommands.some((existing) => existing.optionName === subcommand.optionName)) {
      throw new ValidationError(`Duplicate subcommand name "${subcommand.optionName ?? ""}"`);
    }
    this.subcommands.push(subcommand);
    return this;
  }

  toJSON(): ApiApplicationCommandOption {
    return { ...this.base(T.SubcommandGroup), options: this.subcommands.map((s) => s.toJSON()) };
  }
}

/** Builds a chat-input (slash) command for registration. */
export class SlashCommandBuilder extends OptionHolder {
  private name?: string;
  private description?: string;
  private defaultMemberPermissions?: string | null;
  private contexts?: InteractionContextType[];
  private nsfw = false;

  setName(name: string): this {
    this.name = assertChatInputName(name);
    return this;
  }

  setDescription(description: string): this {
    this.description = assertDescription(description);
    return this;
  }

  /** Permissions a member needs to see the command by default; `null` clears the requirement. */
  setDefaultMemberPermissions(permissions: PermissionResolvable | null): this {
    this.defaultMemberPermissions = permissions === null ? null : new Permissions(permissions).toString();
    return this;
  }

  setContexts(...contexts: InteractionContextResolvable[]): this {
    this.contexts = contexts.map((c) => (typeof c === "number" ? c : InteractionContextTypes[c]));
    return this;
  }

  setNSFW(nsfw = true): this {
    this.nsfw = nsfw;
    return this;
  }

  addSubcommand(configure: Configure<SubcommandBuilder>): this {
    return this.addNested(configure(new SubcommandBuilder()));
  }

  addSubcommandGroup(configure: Configure<SubcommandGroupBuilder>): this {
    return this.addNested(configure(new SubcommandGroupBuilder()));
  }

  toJSON(): ApiApplicationCommandCreateBody {
    return {
      type: ApplicationCommandTypes.ChatInput,
      name: assertDefined("name", this.name),
      description: assertDefined("description", this.description),
      default_member_permissions: this.defaultMemberPermissions,
      contexts: this.contexts,
      nsfw: this.nsfw,
      options: this.optionsJSON(),
    };
  }

  private addNested(child: SubcommandBuilder | SubcommandGroupBuilder): this {
    if (this.children.some((existing) => existing instanceof ValueOptionBuilder)) {
      throw new ValidationError("Cannot mix subcommands and value options at the same level");
    }
    return this.addChild(child);
  }
}
