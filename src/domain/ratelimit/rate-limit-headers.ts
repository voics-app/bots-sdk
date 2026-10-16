import { RateLimitHeaders, type ApiRateLimitBody } from "../../contracts/index.js";

/** Reads a response header by (case-insensitive) name. */
export type HeaderReader = (name: string) => string | null;

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAfterMs: number;
  bucket: string | null;
  global: boolean;
}

const DEFAULT_RETRY_MS = 1000;

function seconds(value: string | null): number | null {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Parses the P9 `X-RateLimit-*` headers.
 * @param now current Unix time in ms, used only when `Reset-After` is missing.
 */
export function parseRateLimitHeaders(header: HeaderReader, now = 0): RateLimitInfo | null {
  const limit = seconds(header(RateLimitHeaders.Limit));
  const remaining = seconds(header(RateLimitHeaders.Remaining));
  if (limit === null || remaining === null) return null;

  const resetAfter = seconds(header(RateLimitHeaders.ResetAfter));
  const resetAt = seconds(header(RateLimitHeaders.Reset));
  const resetAfterMs =
    resetAfter !== null ? Math.ceil(resetAfter * 1000) : resetAt !== null ? Math.max(0, Math.ceil(resetAt * 1000 - now)) : 0;

  return {
    limit,
    remaining,
    resetAfterMs,
    bucket: header(RateLimitHeaders.Bucket),
    global: header(RateLimitHeaders.Global) === "true",
  };
}

/** How long to wait before retrying a 429 response, in milliseconds. */
export function retryAfterMs(header: HeaderReader, body: ApiRateLimitBody | undefined): number {
  const candidates = [body?.retry_after ?? null, seconds(header(RateLimitHeaders.ResetAfter)), seconds(header(RateLimitHeaders.RetryAfter))];
  const first = candidates.find((value): value is number => value !== null);
  return first === undefined ? DEFAULT_RETRY_MS : Math.ceil(first * 1000);
}
