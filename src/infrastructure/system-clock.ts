import type { Clock, TimerHandle } from "../application/ports/clock.js";

/** {@link Clock} backed by `Date.now` and the host timers. Timers never keep the process alive on their own. */
export const systemClock: Clock = {
  now: () => Date.now(),
  sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  setTimeout: (callback, ms) => setTimeout(callback, ms),
  clearTimeout: (handle: TimerHandle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
