import type { Snowflake } from "../contracts/index.js";

/** Milliseconds of 2026-01-01T00:00:00Z, the epoch of Voics snowflakes (P5). */
export const DISCORDY_EPOCH = 1_767_225_600_000;

const TIMESTAMP_SHIFT = 22n;

/** Unix time in milliseconds at which a snowflake was generated. */
export function snowflakeTimestamp(id: Snowflake): number {
  return Number(BigInt(id) >> TIMESTAMP_SHIFT) + DISCORDY_EPOCH;
}

/** The smallest snowflake that could have been generated at `timestamp` (ms). Useful for range queries. */
export function snowflakeFromTimestamp(timestamp: number): Snowflake {
  return (BigInt(timestamp - DISCORDY_EPOCH) << TIMESTAMP_SHIFT).toString();
}
