import {
  ButtonStyles,
  ComponentTypes,
  type ApiActionRow,
  type ApiButton,
  type ApiPartialEmoji,
  type ApiSelectMenu,
  type ApiSelectOption,
  type ApiTextInput,
  type ButtonStyle,
  type ChannelType,
} from "../../contracts/index.js";
import { ValidationError } from "../errors.js";
import { assertDefined, assertLength, assertMaxItems, assertRange, type JSONEncodable } from "./assert.js";

const MAX_CUSTOM_ID = 100;
const MAX_ROW_COMPONENTS = 5;

/** A button style name or its numeric value. */
export type ButtonStyleResolvable = keyof typeof ButtonStyles | ButtonStyle;

/** Builds a clickable button. Link buttons take a URL; every other style takes a custom id. */
export class ButtonBuilder implements JSONEncodable<ApiButton> {
  private style?: ButtonStyle;
  private label?: string;
  private emoji?: ApiPartialEmoji;
  private customId?: string;
  private url?: string;
  private disabled = false;

  setStyle(style: ButtonStyleResolvable): this {
    this.style = typeof style === "number" ? style : ButtonStyles[style];
    return this;
  }

  setLabel(label: string): this {
    this.label = assertLength("label", label, 1, 80);
    return this;
  }

  setEmoji(emoji: ApiPartialEmoji | string): this {
    this.emoji = typeof emoji === "string" ? { name: emoji } : emoji;
    return this;
  }

  setCustomId(customId: string): this {
    this.customId = assertLength("custom_id", customId, 1, MAX_CUSTOM_ID);
    return this;
  }

  setURL(url: string): this {
    this.url = url;
    return this;
  }

  setDisabled(disabled = true): this {
    this.disabled = disabled;
    return this;
  }

  toJSON(): ApiButton {
    const style = assertDefined("style", this.style);
    if (style === ButtonStyles.Link) {
      if (!this.url) throw new ValidationError("Link buttons require a url");
      if (this.customId) throw new ValidationError("Link buttons cannot have a custom_id");
    } else {
      if (!this.customId) throw new ValidationError("Non-link buttons require a custom_id");
      if (this.url) throw new ValidationError("Only link buttons can have a url");
    }
    if (!this.label && !this.emoji) throw new ValidationError("Buttons require a label or an emoji");
    return {
      type: ComponentTypes.Button,
      style,
      ...(this.customId ? { custom_id: this.customId } : {}),
      ...(this.url ? { url: this.url } : {}),
      ...(this.label ? { label: this.label } : {}),
      ...(this.emoji ? { emoji: this.emoji } : {}),
      disabled: this.disabled,
    };
  }
}

/** Shared settings of every select menu type. */
abstract class SelectMenuBuilder implements JSONEncodable<ApiSelectMenu> {
  protected abstract readonly type: ApiSelectMenu["type"];
  private customId?: string;
  private placeholder?: string;
  private minValues?: number;
  private maxValues?: number;
  private disabled = false;

  setCustomId(customId: string): this {
    this.customId = assertLength("custom_id", customId, 1, MAX_CUSTOM_ID);
    return this;
  }

  setPlaceholder(placeholder: string): this {
    this.placeholder = assertLength("placeholder", placeholder, 1, 150);
    return this;
  }

  setMinValues(min: number): this {
    this.minValues = assertRange("min_values", min, 0, 25);
    return this;
  }

  setMaxValues(max: number): this {
    this.maxValues = assertRange("max_values", max, 1, 25);
    return this;
  }

  setDisabled(disabled = true): this {
    this.disabled = disabled;
    return this;
  }

  toJSON(): ApiSelectMenu {
    return {
      type: this.type,
      custom_id: assertDefined("custom_id", this.customId),
      ...(this.placeholder ? { placeholder: this.placeholder } : {}),
      ...(this.minValues !== undefined ? { min_values: this.minValues } : {}),
      ...(this.maxValues !== undefined ? { max_values: this.maxValues } : {}),
      disabled: this.disabled,
      ...this.extra(),
    };
  }

  protected extra(): Partial<ApiSelectMenu> {
    return {};
  }
}

/** A select menu with developer-defined options. */
export class StringSelectMenuBuilder extends SelectMenuBuilder {
  protected readonly type = ComponentTypes.StringSelect;
  private readonly options: ApiSelectOption[] = [];

  addOptions(...options: ApiSelectOption[]): this {
    assertMaxItems("options", this.options.length + options.length, 25);
    for (const option of options) {
      assertLength("option label", option.label, 1, 100);
      assertLength("option value", option.value, 1, 100);
      if (option.description !== undefined) assertLength("option description", option.description, 1, 100);
    }
    this.options.push(...options);
    return this;
  }

  protected override extra(): Partial<ApiSelectMenu> {
    if (this.options.length === 0) throw new ValidationError("String select menus require at least one option");
    return { options: [...this.options] };
  }
}

export class UserSelectMenuBuilder extends SelectMenuBuilder {
  protected readonly type = ComponentTypes.UserSelect;
}

export class RoleSelectMenuBuilder extends SelectMenuBuilder {
  protected readonly type = ComponentTypes.RoleSelect;
}

export class MentionableSelectMenuBuilder extends SelectMenuBuilder {
  protected readonly type = ComponentTypes.MentionableSelect;
}

export class ChannelSelectMenuBuilder extends SelectMenuBuilder {
  protected readonly type = ComponentTypes.ChannelSelect;
  private channelTypes: ChannelType[] = [];

  setChannelTypes(...types: ChannelType[]): this {
    this.channelTypes = types;
    return this;
  }

  protected override extra(): Partial<ApiSelectMenu> {
    return this.channelTypes.length > 0 ? { channel_types: [...this.channelTypes] } : {};
  }
}

/** Any component that can sit inside an action row. */
export type RowComponentBuilder = JSONEncodable<ApiButton | ApiSelectMenu | ApiTextInput>;

/** A horizontal row of up to five buttons, or a single select menu or text input. */
export class ActionRowBuilder<C extends RowComponentBuilder = RowComponentBuilder> {
  private readonly components: C[] = [];

  addComponents(...components: C[]): this {
    this.components.push(...components);
    return this;
  }

  setComponents(...components: C[]): this {
    this.components.splice(0, this.components.length, ...components);
    return this;
  }

  toJSON(): ApiActionRow<ReturnType<C["toJSON"]>> {
    const components = this.components.map((c) => c.toJSON()) as ReturnType<C["toJSON"]>[];
    assertMaxItems("action row components", components.length, MAX_ROW_COMPONENTS);
    if (components.length > 1 && components.some((c) => c.type !== ComponentTypes.Button)) {
      throw new ValidationError("A select menu or text input must be alone in its action row");
    }
    return { type: ComponentTypes.ActionRow, components };
  }
}
