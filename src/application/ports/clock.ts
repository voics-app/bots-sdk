/** Opaque handle returned by {@link Clock.setTimeout}. */
export type TimerHandle = unknown;

/** Time and timers, injected so that rate limiting and heartbeats are testable. */
export interface Clock {
  /** Current Unix time in milliseconds. */
  now(): number;
  sleep(ms: number): Promise<void>;
  setTimeout(callback: () => void, ms: number): TimerHandle;
  clearTimeout(handle: TimerHandle): void;
}

/** Source of uniformly distributed numbers in [0, 1). */
export type RandomSource = () => number;
