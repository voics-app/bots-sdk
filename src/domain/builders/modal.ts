import { ComponentTypes, TextInputStyles, type ApiModal, type ApiTextInput, type TextInputStyle } from "../../contracts/index.js";
import { ValidationError } from "../errors.js";
import { assertDefined, assertLength, assertMaxItems, assertRange, type JSONEncodable } from "./assert.js";

/** A text input inside a modal. */
export class TextInputBuilder implements JSONEncodable<ApiTextInput> {
  private customId?: string;
  private label?: string;
  private style?: TextInputStyle;
  private minLength?: number;
  private maxLength?: number;
  private required?: boolean;
  private value?: string;
  private placeholder?: string;

  setCustomId(customId: string): this {
    this.customId = assertLength("custom_id", customId, 1, 100);
    return this;
  }

  setLabel(label: string): this {
    this.label = assertLength("label", label, 1, 45);
    return this;
  }

  setStyle(style: keyof typeof TextInputStyles | TextInputStyle): this {
    this.style = typeof style === "number" ? style : TextInputStyles[style];
    return this;
  }

  setMinLength(length: number): this {
    this.minLength = assertRange("min_length", length, 0, 4000);
    return this;
  }

  setMaxLength(length: number): this {
    this.maxLength = assertRange("max_length", length, 1, 4000);
    return this;
  }

  setRequired(required = true): this {
    this.required = required;
    return this;
  }

  setValue(value: string): this {
    this.value = assertLength("value", value, 0, 4000);
    return this;
  }

  setPlaceholder(placeholder: string): this {
    this.placeholder = assertLength("placeholder", placeholder, 1, 100);
    return this;
  }

  toJSON(): ApiTextInput {
    return {
      type: ComponentTypes.TextInput,
      custom_id: assertDefined("custom_id", this.customId),
      label: assertDefined("label", this.label),
      style: assertDefined("style", this.style),
      ...(this.minLength !== undefined ? { min_length: this.minLength } : {}),
      ...(this.maxLength !== undefined ? { max_length: this.maxLength } : {}),
      ...(this.required !== undefined ? { required: this.required } : {}),
      ...(this.value !== undefined ? { value: this.value } : {}),
      ...(this.placeholder !== undefined ? { placeholder: this.placeholder } : {}),
    };
  }
}

/** A popup form with up to five text inputs, shown in response to a command or component. */
export class ModalBuilder implements JSONEncodable<ApiModal> {
  private customId?: string;
  private title?: string;
  private readonly inputs: TextInputBuilder[] = [];

  setCustomId(customId: string): this {
    this.customId = assertLength("custom_id", customId, 1, 100);
    return this;
  }

  setTitle(title: string): this {
    this.title = assertLength("title", title, 1, 45);
    return this;
  }

  /** Adds text inputs; each one is placed in its own action row. */
  addTextInputs(...inputs: TextInputBuilder[]): this {
    assertMaxItems("modal components", this.inputs.length + inputs.length, 5);
    this.inputs.push(...inputs);
    return this;
  }

  toJSON(): ApiModal {
    if (this.inputs.length === 0) throw new ValidationError("A modal requires at least one text input");
    return {
      custom_id: assertDefined("custom_id", this.customId),
      title: assertDefined("title", this.title),
      components: this.inputs.map((input) => ({ type: ComponentTypes.ActionRow, components: [input.toJSON()] })),
    };
  }
}
