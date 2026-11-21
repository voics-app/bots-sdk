import type { DiscordyApi } from "@voics-app/bots";

/** What command handlers need from the outside world, injected by the composition root. */
export interface CommandContext {
  api: DiscordyApi;
  /** Gateway heartbeat latency. */
  latencyMs: () => number | null;
  /** Current Unix time in milliseconds. */
  now: () => number;
}
