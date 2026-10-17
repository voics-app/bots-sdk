import { describe, expect, it } from "vitest";
import { RestClient } from "../../src/interface/rest/rest-client.js";
import { DiscordyApiError } from "../../src/interface/rest/discordy-api-error.js";
import { FakeTransport, InstantClock } from "../support/fakes.js";

const make = (transport: FakeTransport) =>
  new RestClient({ token: "Ym90.secret", baseUrl: "https://api.test/api/v1", transport, clock: new InstantClock() });

describe("RestClient", () => {
  it("authenticates with the Bot scheme and sends JSON", async () => {
    const transport = new FakeTransport().reply({ status: 200, body: { id: "1" } });
    const result = await make(transport).post<{ id: string }>("/channels/5/messages", { body: { content: "hi" } });
    expect(result).toEqual({ id: "1" });
    const [req] = transport.requests;
    expect(req?.url).toBe("https://api.test/api/v1/channels/5/messages");
    expect(req?.method).toBe("POST");
    expect(req?.headers).toMatchObject({ Authorization: "Bot Ym90.secret", "Content-Type": "application/json" });
    expect(req?.headers["User-Agent"]).toMatch(/^DiscordyBot \(.+, \d+\.\d+\.\d+\)$/);
    expect(req?.body).toBe('{"content":"hi"}');
  });

  it("encodes query parameters and audit-log reasons", async () => {
    const transport = new FakeTransport();
    await make(transport).delete("/guilds/1/members/2", { reason: "spam & abuse" });
    await make(transport).get("/channels/1/messages", { query: { limit: 50, before: "99", after: undefined } });
    expect(transport.requests[0]?.headers["X-Audit-Log-Reason"]).toBe("spam%20%26%20abuse");
    expect(transport.requests[1]?.url).toBe("https://api.test/api/v1/channels/1/messages?limit=50&before=99");
  });

  it("omits the Authorization header for unauthenticated webhook calls", async () => {
    const transport = new FakeTransport();
    await make(transport).post("/webhooks/1/tok", { body: {}, auth: false });
    expect(transport.requests[0]?.headers.Authorization).toBeUndefined();
  });

  it("returns undefined for 204 responses", async () => {
    expect(await make(new FakeTransport()).delete("/channels/1")).toBeUndefined();
  });

  it("maps error bodies to DiscordyApiError", async () => {
    const transport = new FakeTransport().reply({ status: 403, body: { code: 50013, message: "Missing Permissions" } });
    const error = await make(transport).delete("/guilds/1/members/2").catch((e: unknown) => e);
    expect(error).toBeInstanceOf(DiscordyApiError);
    expect(error).toMatchObject({ status: 403, code: 50013, method: "DELETE", path: "/guilds/1/members/2" });
    expect((error as Error).message).toContain("Missing Permissions");
  });

  it("maps non-JSON errors with the HTTP status", async () => {
    const transport = new FakeTransport().reply({ status: 404, body: "not found" });
    await expect(make(transport).get("/users/1")).rejects.toMatchObject({ status: 404, code: 0 });
  });

  it("refuses to authenticate without a token", async () => {
    const rest = new RestClient({ baseUrl: "https://api.test/api/v1", transport: new FakeTransport(), clock: new InstantClock() });
    await expect(rest.get("/users/@me")).rejects.toThrow(/token/i);
    rest.setToken("abc");
    await expect(rest.get("/users/@me")).resolves.toBeUndefined();
  });
});
