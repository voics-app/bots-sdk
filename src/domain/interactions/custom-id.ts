import { ValidationError } from "../errors.js";

const SEPARATOR = ":";
const MAX_CUSTOM_ID_LENGTH = 100;

/** Joins parts into a component custom id (`kick:confirm:42`), enforcing the 100-character limit. */
export function buildCustomId(...parts: (string | number)[]): string {
  const id = parts.join(SEPARATOR);
  if (id.length === 0 || id.length > MAX_CUSTOM_ID_LENGTH) {
    throw new ValidationError(`custom_id must be 1-${MAX_CUSTOM_ID_LENGTH} characters`);
  }
  return id;
}

/** A pattern routing component and modal interactions by custom id. */
export type CustomIdPattern = string | RegExp;

/**
 * Matches a custom id.
 * - A string matches exactly, or as a prefix followed by `:`; the remainder is split into arguments.
 * - A RegExp returns its capture groups.
 * @returns the arguments, or `null` when it does not match.
 */
export function matchCustomId(pattern: CustomIdPattern, customId: string): string[] | null {
  if (pattern instanceof RegExp) {
    const match = pattern.exec(customId);
    return match ? match.slice(1).map((group) => group ?? "") : null;
  }
  if (customId === pattern) return [];
  if (customId.startsWith(pattern + SEPARATOR)) return customId.slice(pattern.length + 1).split(SEPARATOR);
  return null;
}
