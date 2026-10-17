import type { RateLimitInfo } from "./rate-limit-headers.js";

/** Client-side view of one server rate-limit bucket. */
export class RateLimitBucket {
  private limit = Number.POSITIVE_INFINITY;
  private remaining = Number.POSITIVE_INFINITY;
  private resetAt = 0;

  /** Milliseconds to wait before the next request in this bucket may be sent. */
  waitTime(now: number): number {
    if (this.remaining > 0 || now >= this.resetAt) return 0;
    return this.resetAt - now;
  }

  /** Optimistically counts a request that is about to be sent. */
  consume(now: number): void {
    if (now >= this.resetAt) this.remaining = this.limit;
    this.remaining -= 1;
  }

  update(info: RateLimitInfo, now: number): void {
    this.limit = info.limit;
    this.remaining = info.remaining;
    this.resetAt = now + info.resetAfterMs;
  }
}
