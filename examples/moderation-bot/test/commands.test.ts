import { describe, expect, it } from "vitest";
import { DiscordyApi, InteractionRouter, RestClient, snowflakeFromTimestamp, type ApiInteraction } from "@voics-app/bots";
import { registerCommands, commandDefinitions } from "../src/commands/index.js";
import { FakeTransport, InstantClock, type FakeReply } from "../../../test/support/fakes.js";
import { commandInteraction, componentInteraction } from "../../../test/support/interactions.js";

const NOW = Date.parse("2026-10-16T12:00:00Z");

function setup(fallback?: (req: { method: string; url: string }) => FakeReply) {
  const transport = new FakeTransport(fallback);
  const rest = new RestClient({ token: "tok", baseUrl: "https://api.test/api/v1", transport, clock: new InstantClock() });
  const router = new InteractionRouter(rest);
  registerCommands(router, { api: new DiscordyApi(rest), latencyMs: () => 42, now: () => NOW });
  return { transport, router };
}

const json = (transport: FakeTransport, i: number) => JSON.parse(transport.requests[i]?.body ?? "null") as Record<string, unknown>;

describe("moderation bot command definitions", () => {
  it("defines /ping, /kick and /purge with default permissions", () => {
    const commands = commandDefinitions.map((c) => c.toJSON());
    expect(commands.map((c) => c.name)).toEqual(["ping", "kick", "purge"]);
    expect(commands[1]?.default_member_permissions).toBe("2");
    expect(commands[2]?.default_member_permissions).toBe("8192");
  });
});

describe("/ping", () => {
  it("replies ephemerally with the gateway latency", async () => {
    const { router, transport } = setup();
    await router.handle(commandInteraction("ping"));
    expect(json(transport, 0)).toEqual({ type: 4, data: { content: "Pong! Gateway latency: 42 ms", flags: 64 } });
  });
});

describe("/kick", () => {
  const kickInteraction = (userId = "5", reason = "spam"): ApiInteraction => {
    const options = [
      { name: "user", type: 6 as const, value: userId },
      { name: "reason", type: 3 as const, value: reason },
    ];
    const resolved = { users: { [userId]: { id: userId, username: userId === "42" ? "mod" : "spammer", avatar: null } } };
    return commandInteraction("kick", options, { data: { id: "c1", name: "kick", type: 1, options, resolved } });
  };

  it("asks for confirmation with buttons bound to the invoker", async () => {
    const { router, transport } = setup();
    await router.handle(kickInteraction());
    const body = json(transport, 0) as { type: number; data: { flags: number; embeds: { fields: unknown[] }[]; components: { components: { custom_id: string }[] }[] } };
    expect(body.type).toBe(4);
    expect(body.data.flags).toBe(64);
    expect(body.data.embeds[0]?.fields).toEqual([{ name: "Reason", value: "spam" }]);
    expect(body.data.components[0]?.components.map((c) => c.custom_id)).toEqual(["kick:confirm:42:5", "kick:cancel:42"]);
  });

  it("refuses to kick yourself", async () => {
    const { router, transport } = setup();
    await router.handle(kickInteraction("42"));
    expect(json(transport, 0)).toMatchObject({ type: 4, data: { content: "You cannot kick yourself.", flags: 64 } });
  });

  it("kicks with an audit-log reason when the invoker confirms", async () => {
    const { router, transport } = setup();
    const message = { embeds: [{ fields: [{ name: "Reason", value: "spam" }] }] } as never;
    await router.handle(componentInteraction("kick:confirm:42:5", { message }));
    expect(transport.requests[0]).toMatchObject({ method: "DELETE", url: "https://api.test/api/v1/guilds/100/members/5" });
    expect(transport.requests[0]?.headers["X-Audit-Log-Reason"]).toBe(encodeURIComponent("spam (by mod)"));
    expect(json(transport, 1)).toEqual({ type: 7, data: { content: "Kicked <@5>.", embeds: [], components: [] } });
  });

  it("ignores clicks from anyone but the invoker", async () => {
    const { router, transport } = setup();
    const other = { user: { id: "77", username: "other", avatar: null }, roles: [], joined_at: "2026-01-01T00:00:00Z", permissions: "0" };
    await router.handle(componentInteraction("kick:confirm:42:5", { member: other }));
    expect(transport.requests).toHaveLength(1);
    expect(json(transport, 0)).toMatchObject({ type: 4, data: { content: "Only the moderator who ran /kick can confirm it.", flags: 64 } });
  });

  it("reports missing permissions instead of crashing", async () => {
    const { router, transport } = setup((req) => (req.method === "DELETE" ? { status: 403, body: { code: 50013, message: "Missing Permissions" } } : { status: 204 }));
    await router.handle(componentInteraction("kick:confirm:42:5"));
    expect(json(transport, 1)).toMatchObject({ type: 7, data: { content: "I don't have permission to kick <@5>." } });
  });

  it("cancels", async () => {
    const { router, transport } = setup();
    await router.handle(componentInteraction("kick:cancel:42"));
    expect(json(transport, 0)).toEqual({ type: 7, data: { content: "Kick cancelled.", embeds: [], components: [] } });
  });
});

describe("/purge", () => {
  const recent = (offsetMs: number) => snowflakeFromTimestamp(NOW - offsetMs);

  it("defers, bulk-deletes recent messages and skips ones older than 14 days", async () => {
    const messages = [{ id: recent(1000) }, { id: recent(60_000) }, { id: recent(15 * 86_400_000) }];
    const { router, transport } = setup((req) => (req.method === "GET" ? { status: 200, body: messages } : { status: 204 }));
    await router.handle(commandInteraction("purge", [{ name: "count", type: 4, value: 3 }]));
    expect(json(transport, 0)).toEqual({ type: 5, data: { flags: 64 } });
    expect(transport.requests[1]).toMatchObject({ method: "GET", url: "https://api.test/api/v1/channels/200/messages?limit=3" });
    expect(transport.requests[2]).toMatchObject({ method: "POST", url: "https://api.test/api/v1/channels/200/messages/bulk-delete" });
    expect(json(transport, 2)).toEqual({ messages: [messages[0]?.id, messages[1]?.id] });
    expect(json(transport, 3)).toEqual({ content: "Deleted 2 messages (1 older than 14 days skipped)." });
  });

  it("deletes a single message individually", async () => {
    const { router, transport } = setup((req) => (req.method === "GET" ? { status: 200, body: [{ id: recent(10) }] } : { status: 204 }));
    await router.handle(commandInteraction("purge", [{ name: "count", type: 4, value: 2 }]));
    expect(transport.requests[2]?.method).toBe("DELETE");
    expect(json(transport, 3)).toEqual({ content: "Deleted 1 message." });
  });
});
