export interface BackoffOptions {
  /** Delay of the first retry in milliseconds. */
  baseMs: number;
  /** Upper bound for any delay in milliseconds. */
  maxMs: number;
  /** Fraction (0..1) of the delay that random jitter may remove. */
  jitter: number;
}

/** Capped exponential backoff with subtractive jitter, used between reconnect attempts. */
export class ExponentialBackoff {
  constructor(private readonly options: BackoffOptions) {}

  /**
   * @param attempt zero-based attempt number
   * @param random a value in [0, 1) from the caller's random source
   */
  delay(attempt: number, random: number): number {
    const exponential = Math.min(this.options.maxMs, this.options.baseMs * 2 ** attempt);
    return Math.round(exponential * (1 - this.options.jitter * random));
  }
}
