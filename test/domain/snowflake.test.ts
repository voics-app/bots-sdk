import { describe, expect, it } from "vitest";
import { DISCORDY_EPOCH, snowflakeFromTimestamp, snowflakeTimestamp } from "../../src/domain/snowflake.js";

describe("snowflake", () => {
  it("uses the Voics epoch 2026-01-01T00:00:00Z", () => {
    expect(DISCORDY_EPOCH).toBe(Date.parse("2026-01-01T00:00:00Z"));
  });

  it("extracts the creation time from the upper 42 bits", () => {
    const ms = 123_456_789;
    const id = ((BigInt(ms) << 22n) | (5n << 12n) | 7n).toString();
    expect(snowflakeTimestamp(id)).toBe(DISCORDY_EPOCH + ms);
  });

  it("builds the smallest snowflake for a timestamp", () => {
    const at = DISCORDY_EPOCH + 1000;
    expect(snowflakeTimestamp(snowflakeFromTimestamp(at))).toBe(at);
    expect(snowflakeFromTimestamp(at)).toBe((1000n << 22n).toString());
  });
});
