import type { ApiEmbed, ApiEmbedField } from "../../contracts/index.js";
import { ValidationError } from "../errors.js";
import { assertLength, assertMaxItems, assertRange, type JSONEncodable } from "./assert.js";

const MAX_FIELDS = 25;
const MAX_TOTAL_CHARACTERS = 6000;

/** A color as a 24-bit integer or a `#rrggbb` hex string. */
export type ColorResolvable = number | `#${string}`;

export interface EmbedAuthorInput {
  name: string;
  url?: string;
  iconURL?: string;
}

export interface EmbedFooterInput {
  text: string;
  iconURL?: string;
}

function resolveColor(color: ColorResolvable): number {
  if (typeof color === "number") return assertRange("color", color, 0, 0xffffff);
  if (/^#[0-9a-f]{6}$/i.test(color)) return Number.parseInt(color.slice(1), 16);
  throw new ValidationError(`Invalid color "${String(color)}": use a number or #rrggbb`);
}

function validateField(field: ApiEmbedField): ApiEmbedField {
  assertLength("field name", field.name, 1, 256);
  assertLength("field value", field.value, 1, 1024);
  return field.inline === undefined ? { name: field.name, value: field.value } : { ...field };
}

/** Builds a rich embed within Discord's per-field and 6000-character total limits. */
export class EmbedBuilder implements JSONEncodable<ApiEmbed> {
  private data: ApiEmbed = {};

  setTitle(title: string | null): this {
    return this.set("title", title === null ? undefined : assertLength("title", title, 1, 256));
  }

  setDescription(description: string | null): this {
    return this.set("description", description === null ? undefined : assertLength("description", description, 1, 4096));
  }

  setURL(url: string | null): this {
    return this.set("url", url ?? undefined);
  }

  setColor(color: ColorResolvable | null): this {
    return this.set("color", color === null ? undefined : resolveColor(color));
  }

  setTimestamp(timestamp: Date | number | null = Date.now()): this {
    return this.set("timestamp", timestamp === null ? undefined : new Date(timestamp).toISOString());
  }

  setAuthor(author: EmbedAuthorInput | null): this {
    if (author === null) return this.set("author", undefined);
    assertLength("author name", author.name, 1, 256);
    return this.set("author", { name: author.name, ...(author.url ? { url: author.url } : {}), ...(author.iconURL ? { icon_url: author.iconURL } : {}) });
  }

  setFooter(footer: EmbedFooterInput | null): this {
    if (footer === null) return this.set("footer", undefined);
    assertLength("footer text", footer.text, 1, 2048);
    return this.set("footer", { text: footer.text, ...(footer.iconURL ? { icon_url: footer.iconURL } : {}) });
  }

  setImage(url: string | null): this {
    return this.set("image", url === null ? undefined : { url });
  }

  setThumbnail(url: string | null): this {
    return this.set("thumbnail", url === null ? undefined : { url });
  }

  addFields(...fields: ApiEmbedField[]): this {
    const current = this.data.fields ?? [];
    assertMaxItems("fields", current.length + fields.length, MAX_FIELDS);
    return this.set("fields", [...current, ...fields.map(validateField)]);
  }

  setFields(fields: ApiEmbedField[]): this {
    assertMaxItems("fields", fields.length, MAX_FIELDS);
    return this.set("fields", fields.map(validateField));
  }

  toJSON(): ApiEmbed {
    const total =
      (this.data.title?.length ?? 0) +
      (this.data.description?.length ?? 0) +
      (this.data.footer?.text.length ?? 0) +
      (this.data.author?.name.length ?? 0) +
      (this.data.fields ?? []).reduce((sum, f) => sum + f.name.length + f.value.length, 0);
    if (total > MAX_TOTAL_CHARACTERS) throw new ValidationError(`Embeds may contain at most ${MAX_TOTAL_CHARACTERS} characters (got ${total})`);
    return structuredClone(this.data);
  }

  private set<K extends keyof ApiEmbed>(key: K, value: ApiEmbed[K] | undefined): this {
    if (value === undefined) {
      const { [key]: _removed, ...rest } = this.data;
      this.data = rest;
    } else {
      this.data = { ...this.data, [key]: value };
    }
    return this;
  }
}
