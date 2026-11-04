import type { ApiErrorBody } from "../../contracts/index.js";

/** A non-2xx REST response, carrying the P9 error envelope `{ code, message, errors? }`. */
export class DiscordyApiError extends Error {
  override readonly name = "DiscordyApiError";
  /** Voics/Discord JSON error code, or 0 when the body was not an error envelope. */
  readonly code: number;
  readonly errors: Record<string, unknown> | undefined;

  constructor(
    readonly status: number,
    readonly method: string,
    readonly path: string,
    body: Partial<ApiErrorBody> | undefined,
  ) {
    super(`${method} ${path} failed with ${status}: ${body?.message ?? "no error message"}`);
    this.code = body?.code ?? 0;
    this.errors = body?.errors;
  }
}
