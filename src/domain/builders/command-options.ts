import {
  ApplicationCommandOptionTypes as T,
  type ApiApplicationCommandOption,
  type ApiApplicationCommandOptionChoice,
  type ApplicationCommandOptionType,
  type ChannelType,
} from "../../contracts/index.js";
import { ValidationError } from "../errors.js";
import { assertDefined, assertLength, assertMaxItems, assertRange } from "./assert.js";

const CHAT_INPUT_NAME = /^[-_\p{L}\p{N}]{1,32}$/u;
const MAX_CHOICES = 25;
/** Discord's limit for options and subcommands per level. */
export const MAX_OPTIONS = 25;

/** Validates a slash-command or option name (1-32 lowercase letters, digits, `-` or `_`). */
export function assertChatInputName(name: string): string {
  assertLength("name", name, 1, 32);
  if (!CHAT_INPUT_NAME.test(name)) throw new ValidationError(`name "${name}" may only contain letters, digits, "-" and "_"`);
  if (name !== name.toLowerCase()) throw new ValidationError(`name "${name}" must be lowercase`);
  return name;
}

export function assertDescription(description: string): string {
  return assertLength("description", description, 1, 100);
}

/** Shared name/description handling for every option-like builder. */
export abstract class NamedOptionBuilder {
  protected name?: string;
  protected description?: string;

  setName(name: string): this {
    this.name = assertChatInputName(name);
    return this;
  }

  setDescription(description: string): this {
    this.description = assertDescription(description);
    return this;
  }

  /** The option name, used to detect duplicates. */
  get optionName(): string | undefined {
    return this.name;
  }

  protected base(type: ApplicationCommandOptionType): ApiApplicationCommandOption {
    return { type, name: assertDefined("name", this.name), description: assertDefined("description", this.description) };
  }

  abstract toJSON(): ApiApplicationCommandOption;
}

/** An option that holds a value (not a subcommand). */
export abstract class ValueOptionBuilder extends NamedOptionBuilder {
  protected required = false;
  protected abstract readonly type: ApplicationCommandOptionType;

  setRequired(required = true): this {
    this.required = required;
    return this;
  }

  get isRequired(): boolean {
    return this.required;
  }

  toJSON(): ApiApplicationCommandOption {
    return { ...this.base(this.type), required: this.required, ...this.extra() };
  }

  protected extra(): Partial<ApiApplicationCommandOption> {
    return {};
  }
}

abstract class ChoiceOptionBuilder<V extends string | number> extends ValueOptionBuilder {
  private choices: ApiApplicationCommandOptionChoice[] = [];
  private autocomplete = false;

  addChoices(...choices: { name: string; value: V }[]): this {
    if (this.autocomplete) throw new ValidationError("An option cannot use autocomplete and choices together");
    assertMaxItems("choices", this.choices.length + choices.length, MAX_CHOICES);
    for (const choice of choices) assertLength("choice name", choice.name, 1, 100);
    this.choices.push(...choices);
    return this;
  }

  setAutocomplete(autocomplete = true): this {
    if (autocomplete && this.choices.length > 0) throw new ValidationError("An option cannot use autocomplete and choices together");
    this.autocomplete = autocomplete;
    return this;
  }

  protected override extra(): Partial<ApiApplicationCommandOption> {
    return {
      ...(this.choices.length > 0 ? { choices: [...this.choices] } : {}),
      ...(this.autocomplete ? { autocomplete: true } : {}),
      ...this.limits(),
    };
  }

  protected abstract limits(): Partial<ApiApplicationCommandOption>;
}

export class StringOptionBuilder extends ChoiceOptionBuilder<string> {
  protected readonly type = T.String;
  private minLength?: number;
  private maxLength?: number;

  setMinLength(length: number): this {
    this.minLength = assertRange("min_length", length, 0, 6000);
    return this;
  }

  setMaxLength(length: number): this {
    this.maxLength = assertRange("max_length", length, 1, 6000);
    return this;
  }

  protected limits(): Partial<ApiApplicationCommandOption> {
    return {
      ...(this.minLength !== undefined ? { min_length: this.minLength } : {}),
      ...(this.maxLength !== undefined ? { max_length: this.maxLength } : {}),
    };
  }
}

abstract class NumericOptionBuilder extends ChoiceOptionBuilder<number> {
  private minValue?: number;
  private maxValue?: number;

  setMinValue(value: number): this {
    this.minValue = assertRange("min_value", value, -(2 ** 53), 2 ** 53);
    return this;
  }

  setMaxValue(value: number): this {
    this.maxValue = assertRange("max_value", value, -(2 ** 53), 2 ** 53);
    return this;
  }

  protected limits(): Partial<ApiApplicationCommandOption> {
    return {
      ...(this.minValue !== undefined ? { min_value: this.minValue } : {}),
      ...(this.maxValue !== undefined ? { max_value: this.maxValue } : {}),
    };
  }
}

export class IntegerOptionBuilder extends NumericOptionBuilder {
  protected readonly type = T.Integer;
}

export class NumberOptionBuilder extends NumericOptionBuilder {
  protected readonly type = T.Number;
}

export class BooleanOptionBuilder extends ValueOptionBuilder {
  protected readonly type = T.Boolean;
}

export class UserOptionBuilder extends ValueOptionBuilder {
  protected readonly type = T.User;
}

export class RoleOptionBuilder extends ValueOptionBuilder {
  protected readonly type = T.Role;
}

export class MentionableOptionBuilder extends ValueOptionBuilder {
  protected readonly type = T.Mentionable;
}

export class AttachmentOptionBuilder extends ValueOptionBuilder {
  protected readonly type = T.Attachment;
}

export class ChannelOptionBuilder extends ValueOptionBuilder {
  protected readonly type = T.Channel;
  private channelTypes: ChannelType[] = [];

  addChannelTypes(...types: ChannelType[]): this {
    this.channelTypes.push(...types);
    return this;
  }

  protected override extra(): Partial<ApiApplicationCommandOption> {
    return this.channelTypes.length > 0 ? { channel_types: [...this.channelTypes] } : {};
  }
}
