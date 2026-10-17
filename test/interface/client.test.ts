import { afterEach, describe, expect, it } from "vitest";
import { Client } from "../../src/interface/client.js";
import { SlashCommandBuilder } from "../../src/domain/builders/slash-command.js";
import { GatewayOpcodes as Op } from "../../src/contracts/index.js";
import { FakeGateway } from "../support/fake-gateway.js";
import { FakeTransport, InstantClock } from "../support/fakes.js";
import { commandInteraction } from "../support/interactions.js";

describe("Client", () => {
  let gateway: FakeGateway;
  let client: Client;
  let transport: FakeTransport;

  const start = async (options: { autoReady?: boolean } = {}) => {
    gateway = await FakeGateway.start({ heartbeatInterval: 60_000, ...options });
    transport = new FakeTransport((req) => ({ status: req.method === "PUT" ? 200 : 204, body: req.method === "PUT" ? [] : undefined }));
    client = new Client({
      token: "Ym90.secret",
      intents: ["Guilds", "GuildMessages", "MessageContent"],
      gatewayUrl: gateway.url,
      rest: { baseUrl: "https://api.test/api/v1", transport, clock: new InstantClock() },
      backoff: { baseMs: 10, maxMs: 20, jitter: 0 },
    });
    return client;
  };

  afterEach(async () => {
    client?.destroy();
    await gateway?.stop();
  });

  it("logs in, identifies with resolved intents and exposes the bot user", async () => {
    await start();
    const ready = await client.login();
    expect(ready.session_id).toBe("session-1");
    expect(client.user?.username).toBe("modbot");
    expect(client.applicationId).toBe("800");
    expect(client.isReady).toBe(true);
    expect(gateway.received(Op.Identify)[0]?.d).toMatchObject({ token: "Ym90.secret", intents: 1 | 512 | 32768, properties: { client: "@discordy-voics/bots" } });
  });

  it("emits typed dispatch events and raw events", async () => {
    await start();
    await client.login();
    const message = new Promise<string>((resolve) => client.once("MESSAGE_CREATE", (m) => resolve(m.content)));
    const raw = new Promise<string>((resolve) => client.once("raw", (event) => resolve(event)));
    gateway.dispatch("MESSAGE_CREATE", { id: "1", channel_id: "2", content: "hello", author: { id: "3" } });
    expect(await message).toBe("hello");
    expect(await raw).toBe("MESSAGE_CREATE");
  });

  it("routes INTERACTION_CREATE to the interaction router", async () => {
    await start();
    const handled = new Promise<void>((resolve) =>
      client.interactions.command("ping", async (i) => {
        await i.reply("Pong!");
        resolve();
      }),
    );
    await client.login();
    gateway.dispatch("INTERACTION_CREATE", commandInteraction("ping"));
    await handled;
    expect(transport.requests.at(-1)).toMatchObject({ method: "POST", url: "https://api.test/api/v1/interactions/1000/itoken/callback" });
  });

  it("emits handler errors as client errors", async () => {
    await start();
    client.interactions.command("boom", () => {
      throw new Error("kaboom");
    });
    const error = new Promise<unknown>((resolve) => client.once("error", resolve));
    await client.login();
    gateway.dispatch("INTERACTION_CREATE", commandInteraction("boom"));
    expect(await error).toMatchObject({ message: "kaboom" });
  });

  it("rejects login on a fatal close code", async () => {
    await start({ autoReady: false });
    client.on("error", () => undefined);
    const login = client.login();
    await gateway.waitFor(() => gateway.received(Op.Identify).length === 1);
    gateway.close(4004);
    await expect(login).rejects.toMatchObject({ name: "GatewayFatalError", code: 4004 });
  });

  it("registers commands with a bulk overwrite", async () => {
    await start();
    await client.login();
    await client.registerCommands([new SlashCommandBuilder().setName("ping").setDescription("Ping")], { guildId: "100" });
    const request = transport.requests.at(-1);
    expect(request).toMatchObject({ method: "PUT", url: "https://api.test/api/v1/applications/800/guilds/100/commands" });
    expect(JSON.parse(request?.body ?? "")).toEqual([expect.objectContaining({ name: "ping", type: 1 })]);
  });

  it("refuses to register commands before the application id is known", async () => {
    await start();
    expect(() => client.registerCommands([])).toThrow(/applicationId/);
  });

  it("sends presence updates through the gateway", async () => {
    await start();
    await client.login();
    client.setPresence({ status: "idle", activities: [{ name: "the mod queue", type: 3 }], afk: false });
    await gateway.waitFor(() => gateway.received(Op.PresenceUpdate).length === 1);
  });
});
