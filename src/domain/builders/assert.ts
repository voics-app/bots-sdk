import { ValidationError } from "../errors.js";

export function assertLength(field: string, value: string, min: number, max: number): string {
  if (value.length < min || value.length > max) {
    throw new ValidationError(`${field} must be ${min}-${max} characters (got ${value.length})`);
  }
  return value;
}

export function assertRange(field: string, value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new ValidationError(`${field} must be between ${min} and ${max} (got ${value})`);
  }
  return value;
}

export function assertMaxItems(field: string, count: number, max: number): void {
  if (count > max) throw new ValidationError(`${field} accepts at most ${max} items (got ${count})`);
}

export function assertDefined<V>(field: string, value: V | undefined): V {
  if (value === undefined) throw new ValidationError(`${field} is required`);
  return value;
}

/** Objects that serialize to API JSON. */
export interface JSONEncodable<T> {
  toJSON(): T;
}

export function toJSONValue<T>(value: T | JSONEncodable<T>): T {
  return typeof value === "object" && value !== null && "toJSON" in value && typeof value.toJSON === "function"
    ? (value as JSONEncodable<T>).toJSON()
    : (value as T);
}
