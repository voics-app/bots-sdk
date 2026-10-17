import { describe, expect, it } from "vitest";
import { InteractionResponseState } from "../../src/domain/interactions/response-state.js";
import { CommandOptions } from "../../src/domain/interactions/command-options.js";
import { buildCustomId, matchCustomId } from "../../src/domain/interactions/custom-id.js";
import { ApplicationCommandOptionTypes as T } from "../../src/contracts/index.js";

describe("InteractionResponseState", () => {
  it("allows exactly one initial response", () => {
    const state = new InteractionResponseState("command");
    state.transition("reply");
    expect(state.acknowledged).toBe(true);
    expect(() => state.transition("reply")).toThrow(/already been acknowledged/);
    expect(() => state.transition("defer")).toThrow(/already been acknowledged/);
  });

  it("requires an acknowledgement before editing or following up", () => {
    const state = new InteractionResponseState("command");
    expect(() => state.transition("editReply")).toThrow(/not been acknowledged/);
    expect(() => state.transition("followUp")).toThrow(/not been acknowledged/);
    state.transition("defer");
    state.transition("editReply");
    state.transition("followUp");
    state.transition("deleteReply");
  });

  it("restricts update and deferUpdate to components and modal submits", () => {
    expect(() => new InteractionResponseState("command").transition("update")).toThrow(/cannot update/);
    new InteractionResponseState("component").transition("update");
    new InteractionResponseState("modal").transition("deferUpdate");
  });

  it("does not show a modal in response to a modal", () => {
    expect(() => new InteractionResponseState("modal").transition("showModal")).toThrow(/cannot showModal/);
    new InteractionResponseState("component").transition("showModal");
  });

  it("allows only autocomplete results for autocomplete interactions", () => {
    expect(() => new InteractionResponseState("autocomplete").transition("reply")).toThrow(/cannot reply/);
    new InteractionResponseState("autocomplete").transition("respond");
    expect(() => new InteractionResponseState("command").transition("respond")).toThrow(/cannot respond/);
  });
});

describe("CommandOptions", () => {
  const resolved = {
    users: { "5": { id: "5", username: "spammer", avatar: null } },
    members: { "5": { roles: [], joined_at: "2026-01-02T00:00:00Z" } },
    roles: { "8": { id: "8", name: "mods", color: 0, hoist: false, position: 1, permissions: "0", managed: false, mentionable: true } },
    channels: { "9": { id: "9", type: 0 as const, name: "general" } },
  };

  it("reads typed primitive options", () => {
    const options = new CommandOptions([
      { name: "reason", type: T.String, value: "spam" },
      { name: "count", type: T.Integer, value: 10 },
      { name: "silent", type: T.Boolean, value: true },
      { name: "ratio", type: T.Number, value: 0.5 },
    ]);
    expect(options.getString("reason")).toBe("spam");
    expect(options.getInteger("count", true)).toBe(10);
    expect(options.getBoolean("silent")).toBe(true);
    expect(options.getNumber("ratio")).toBe(0.5);
    expect(options.getString("missing")).toBeNull();
  });

  it("throws for missing required options and type mismatches", () => {
    const options = new CommandOptions([{ name: "count", type: T.Integer, value: 1 }]);
    expect(() => options.getString("reason", true)).toThrow(/required option "reason"/i);
    expect(() => options.getString("count")).toThrow(/not of type/i);
  });

  it("resolves users, members, roles and channels", () => {
    const options = new CommandOptions(
      [
        { name: "user", type: T.User, value: "5" },
        { name: "role", type: T.Role, value: "8" },
        { name: "channel", type: T.Channel, value: "9" },
      ],
      resolved,
    );
    expect(options.getUser("user", true).username).toBe("spammer");
    expect(options.getMember("user")?.joined_at).toBe("2026-01-02T00:00:00Z");
    expect(options.getRole("role")?.name).toBe("mods");
    expect(options.getChannel("channel")?.name).toBe("general");
  });

  it("hoists subcommand groups and subcommands", () => {
    const options = new CommandOptions([
      {
        name: "warn",
        type: T.SubcommandGroup,
        options: [{ name: "add", type: T.Subcommand, options: [{ name: "reason", type: T.String, value: "rude" }] }],
      },
    ]);
    expect(options.getSubcommandGroup()).toBe("warn");
    expect(options.getSubcommand()).toBe("add");
    expect(options.getString("reason")).toBe("rude");
  });

  it("requires a subcommand only when asked", () => {
    const options = new CommandOptions([]);
    expect(options.getSubcommand(false)).toBeNull();
    expect(() => options.getSubcommand()).toThrow(/subcommand/i);
  });

  it("finds the focused option for autocomplete", () => {
    const options = new CommandOptions([{ name: "query", type: T.String, value: "ki", focused: true }]);
    expect(options.getFocused()).toEqual({ name: "query", value: "ki" });
  });
});

describe("custom ids", () => {
  it("builds colon-separated ids and rejects ids over 100 characters", () => {
    expect(buildCustomId("kick", "confirm", "42")).toBe("kick:confirm:42");
    expect(() => buildCustomId("x".repeat(101))).toThrow(/100/);
  });

  it("matches exact ids and prefixes with arguments", () => {
    expect(matchCustomId("kick", "kick")).toEqual([]);
    expect(matchCustomId("kick", "kick:confirm:42")).toEqual(["confirm", "42"]);
    expect(matchCustomId("kick", "kicker")).toBeNull();
  });

  it("matches regular expressions and returns capture groups", () => {
    expect(matchCustomId(/^page-(\d+)$/, "page-3")).toEqual(["3"]);
    expect(matchCustomId(/^page-(\d+)$/, "nope")).toBeNull();
  });
});
