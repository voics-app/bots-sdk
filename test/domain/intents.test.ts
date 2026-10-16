import { describe, expect, it } from "vitest";
import { Intents } from "../../src/domain/bitfield/intents.js";

describe("Intents", () => {
  it("resolves names and numbers into a bitfield", () => {
    expect(Intents.resolve(["Guilds", "GuildMessages"])).toBe(1 | 512);
    expect(Intents.resolve([1, "MessageContent"])).toBe(1 | 32768);
    expect(Intents.resolve(7)).toBe(7);
  });

  it("rejects unknown intent names", () => {
    expect(() => Intents.resolve(["Nope" as never])).toThrow(/unknown intent/i);
  });

  it("lists names and privileged intents in a bitfield", () => {
    const bits = Intents.resolve(["Guilds", "GuildMembers", "MessageContent"]);
    expect(Intents.toArray(bits)).toEqual(["Guilds", "GuildMembers", "MessageContent"]);
    expect(Intents.privileged(bits)).toEqual(["GuildMembers", "MessageContent"]);
  });

  it("exposes a non-privileged default set", () => {
    expect(Intents.privileged(Intents.NonPrivileged)).toEqual([]);
    expect(Intents.toArray(Intents.NonPrivileged)).toContain("GuildMessages");
  });
});
