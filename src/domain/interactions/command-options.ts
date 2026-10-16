import {
  ApplicationCommandOptionTypes as T,
  type ApiAttachment,
  type ApiGuildMember,
  type ApiInteractionDataOption,
  type ApiResolvedData,
  type ApiRole,
  type ApiUser,
  type ApplicationCommandOptionType,
} from "../../contracts/index.js";
import { ValidationError } from "../errors.js";

type ResolvedChannel = NonNullable<ApiResolvedData["channels"]>[string];

/** Typed access to the options of a slash-command interaction, with subcommands hoisted. */
export class CommandOptions {
  private readonly group: string | null = null;
  private readonly subcommand: string | null = null;
  private readonly options: readonly ApiInteractionDataOption[];

  constructor(
    options: readonly ApiInteractionDataOption[] = [],
    private readonly resolved: ApiResolvedData = {},
  ) {
    let current = options;
    const first = current[0];
    if (first?.type === T.SubcommandGroup) {
      this.group = first.name;
      current = first.options ?? [];
    }
    const sub = current[0];
    if (sub?.type === T.Subcommand) {
      this.subcommand = sub.name;
      current = sub.options ?? [];
    }
    this.options = current;
  }

  getSubcommand(required?: true): string;
  getSubcommand(required: false): string | null;
  getSubcommand(required = true): string | null {
    if (required && this.subcommand === null) throw new ValidationError("The interaction has no subcommand");
    return this.subcommand;
  }

  getSubcommandGroup(): string | null {
    return this.group;
  }

  getString(name: string, required: true): string;
  getString(name: string, required?: false): string | null;
  getString(name: string, required = false): string | null {
    return this.value(name, [T.String], required) as string | null;
  }

  getInteger(name: string, required: true): number;
  getInteger(name: string, required?: false): number | null;
  getInteger(name: string, required = false): number | null {
    return this.value(name, [T.Integer], required) as number | null;
  }

  getNumber(name: string, required: true): number;
  getNumber(name: string, required?: false): number | null;
  getNumber(name: string, required = false): number | null {
    return this.value(name, [T.Number], required) as number | null;
  }

  getBoolean(name: string, required: true): boolean;
  getBoolean(name: string, required?: false): boolean | null;
  getBoolean(name: string, required = false): boolean | null {
    return this.value(name, [T.Boolean], required) as boolean | null;
  }

  getUser(name: string, required: true): ApiUser;
  getUser(name: string, required?: false): ApiUser | null;
  getUser(name: string, required = false): ApiUser | null {
    return this.lookup(name, [T.User, T.Mentionable], required, this.resolved.users);
  }

  /** The guild member behind a user option (without its `user` field), when resolved. */
  getMember(name: string): Omit<ApiGuildMember, "user"> | null {
    const id = this.value(name, [T.User, T.Mentionable], false) as string | null;
    return id === null ? null : (this.resolved.members?.[id] ?? null);
  }

  getRole(name: string, required: true): ApiRole;
  getRole(name: string, required?: false): ApiRole | null;
  getRole(name: string, required = false): ApiRole | null {
    return this.lookup(name, [T.Role, T.Mentionable], required, this.resolved.roles);
  }

  getChannel(name: string, required: true): ResolvedChannel;
  getChannel(name: string, required?: false): ResolvedChannel | null;
  getChannel(name: string, required = false): ResolvedChannel | null {
    return this.lookup(name, [T.Channel], required, this.resolved.channels);
  }

  getAttachment(name: string, required: true): ApiAttachment;
  getAttachment(name: string, required?: false): ApiAttachment | null;
  getAttachment(name: string, required = false): ApiAttachment | null {
    return this.lookup(name, [T.Attachment], required, this.resolved.attachments);
  }

  /** The option the user is typing in, for autocomplete interactions. */
  getFocused(): { name: string; value: string | number | boolean } | null {
    const focused = this.options.find((option) => option.focused);
    return focused ? { name: focused.name, value: focused.value ?? "" } : null;
  }

  private value(name: string, types: readonly ApplicationCommandOptionType[], required: boolean): string | number | boolean | null {
    const option = this.options.find((o) => o.name === name);
    if (!option || option.value === undefined) {
      if (required) throw new ValidationError(`Missing required option "${name}"`);
      return null;
    }
    if (!types.includes(option.type)) throw new ValidationError(`Option "${name}" is not of type ${types.join("|")}`);
    return option.value;
  }

  private lookup<V>(
    name: string,
    types: readonly ApplicationCommandOptionType[],
    required: boolean,
    source: Record<string, V> | undefined,
  ): V | null {
    const id = this.value(name, types, required);
    if (id === null) return null;
    const found = source?.[String(id)];
    if (!found && required) throw new ValidationError(`Option "${name}" was not resolved`);
    return found ?? null;
  }
}
