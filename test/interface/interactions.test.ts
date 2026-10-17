import { describe, expect, it, vi } from "vitest";
import { InteractionRouter } from "../../src/interface/interactions/interaction-router.js";
import { RestClient } from "../../src/interface/rest/rest-client.js";
import type { CommandInteraction } from "../../src/interface/interactions/interactions.js";
import { WebhookClient, parseWebhookUrl } from "../../src/interface/webhooks/webhook-client.js";
import { ModalBuilder, TextInputBuilder } from "../../src/domain/builders/modal.js";
import { EmbedBuilder } from "../../src/domain/builders/embed.js";
import { ApplicationCommandOptionTypes as T } from "../../src/contracts/index.js";
import { FakeTransport, InstantClock } from "../support/fakes.js";
import { commandInteraction, componentInteraction, modalInteraction } from "../support/interactions.js";

const setup = () => {
  const transport = new FakeTransport((req) => (req.method === "GET" ? { status: 200, body: [] } : req.method === "POST" && req.url.includes("/webhooks/") ? { status: 200, body: { id: "m1" } } : { status: 204 }));
  const rest = new RestClient({ token: "tok", baseUrl: "https://api.test/api/v1", transport, clock: new InstantClock() });
  return { transport, rest, router: new InteractionRouter(rest) };
};

const body = (transport: FakeTransport, i: number) => JSON.parse(transport.requests[i]?.body ?? "null") as unknown;

describe("InteractionRouter", () => {
  it("routes commands by name and replies through the callback endpoint", async () => {
    const { router, transport } = setup();
    router.command("ping", (i) => i.reply({ content: "Pong!", ephemeral: true, embeds: [new EmbedBuilder().setTitle("t")] }));
    const handled = await router.handle(commandInteraction("ping"));
    expect((handled as CommandInteraction).replied).toBe(true);
    expect(transport.requests[0]?.url).toBe("https://api.test/api/v1/interactions/1000/itoken/callback");
    expect(body(transport, 0)).toEqual({ type: 4, data: { content: "Pong!", flags: 64, embeds: [{ title: "t" }] } });
  });

  it("prefers the most specific subcommand handler", async () => {
    const { router } = setup();
    const calls: string[] = [];
    router.command("warn", () => calls.push("warn")).command("warn add", () => calls.push("warn add"));
    await router.handle(commandInteraction("warn", [{ name: "add", type: T.Subcommand, options: [] }]));
    await router.handle(commandInteraction("warn", [{ name: "list", type: T.Subcommand, options: [] }]));
    expect(calls).toEqual(["warn add", "warn"]);
  });

  it("returns null when nothing matches", async () => {
    const { router } = setup();
    expect(await router.handle(commandInteraction("unknown"))).toBeNull();
    expect(await router.handle(componentInteraction("nothing"))).toBeNull();
  });

  it("defers, edits the original response and follows up via the interaction webhook", async () => {
    const { router, transport } = setup();
    router.command("purge", async (i) => {
      await i.deferReply({ ephemeral: true });
      await i.editReply("Deleted 5 messages");
      await i.followUp({ content: "done", ephemeral: true });
      expect(i.deferred).toBe(true);
    });
    await router.handle(commandInteraction("purge"));
    expect(body(transport, 0)).toEqual({ type: 5, data: { flags: 64 } });
    expect(transport.requests[1]).toMatchObject({ method: "PATCH", url: "https://api.test/api/v1/webhooks/800/itoken/messages/@original" });
    expect(body(transport, 1)).toEqual({ content: "Deleted 5 messages" });
    expect(transport.requests[2]).toMatchObject({ method: "POST", url: "https://api.test/api/v1/webhooks/800/itoken?wait=true" });
    expect(body(transport, 2)).toEqual({ content: "done", flags: 64 });
  });

  it("routes components by custom-id prefix and exposes the arguments", async () => {
    const { router, transport } = setup();
    let args: string[] = [];
    router.component("kick", async (i) => {
      args = i.args;
      await i.update({ content: "Kicked", components: [] });
    });
    await router.handle(componentInteraction("kick:confirm:5"));
    expect(args).toEqual(["confirm", "5"]);
    expect(body(transport, 0)).toEqual({ type: 7, data: { content: "Kicked", components: [] } });
  });

  it("shows modals and reads submitted values", async () => {
    const { router, transport } = setup();
    router.command("report", (i) =>
      i.showModal(new ModalBuilder().setCustomId("report").setTitle("Report").addTextInputs(new TextInputBuilder().setCustomId("why").setLabel("Why").setStyle("Short"))),
    );
    let reason = "";
    router.modal("report", async (i) => {
      reason = i.getTextInputValue("why");
      await i.reply("Thanks");
    });
    await router.handle(commandInteraction("report"));
    await router.handle(modalInteraction("report", { why: "spam" }));
    expect(body(transport, 0)).toMatchObject({ type: 9, data: { custom_id: "report", title: "Report" } });
    expect(reason).toBe("spam");
  });

  it("answers autocomplete with at most 25 choices", async () => {
    const { router, transport } = setup();
    router.autocomplete("search", (i) => i.respond(Array.from({ length: 30 }, (_, n) => ({ name: `${i.options.getFocused()?.value}${n}`, value: n }))));
    await router.handle({ ...commandInteraction("search", [{ name: "q", type: T.String, value: "ab", focused: true }]), type: 4 });
    const sent = body(transport, 0) as { type: number; data: { choices: unknown[] } };
    expect(sent.type).toBe(8);
    expect(sent.data.choices).toHaveLength(25);
  });

  it("reports handler errors, including double replies, to the error handler", async () => {
    const { router } = setup();
    const onError = vi.fn();
    router.onError(onError).command("twice", async (i) => {
      await i.reply("one");
      await i.reply("two");
    });
    await router.handle(commandInteraction("twice"));
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ name: "InteractionStateError" }), expect.anything());
  });

  it("exposes the invoker and member permissions", async () => {
    const { router } = setup();
    router.command("who", (i) => {
      expect(i.user.id).toBe("42");
      expect(i.memberPermissions?.has("KickMembers")).toBe(true);
      expect(i.inGuild()).toBe(true);
    });
    await router.handle(commandInteraction("who"));
  });
});

describe("WebhookClient", () => {
  it("executes a webhook without the bot token", async () => {
    const transport = new FakeTransport().reply({ status: 200, body: { id: "m1" } });
    const webhook = new WebhookClient({ url: "https://discordy-api.voics.nl/api/v1/webhooks/55/abc-DEF" }, { restOptions: { baseUrl: "https://api.test/api/v1", transport, clock: new InstantClock() } });
    const message = await webhook.send("deploy finished", { username: "CI", threadId: "9" });
    expect(message).toEqual({ id: "m1" });
    expect(transport.requests[0]?.url).toBe("https://api.test/api/v1/webhooks/55/abc-DEF?wait=true&thread_id=9");
    expect(transport.requests[0]?.headers.Authorization).toBeUndefined();
    expect(JSON.parse(transport.requests[0]?.body ?? "")).toEqual({ content: "deploy finished", username: "CI" });
  });

  it("parses webhook URLs", () => {
    expect(parseWebhookUrl("https://x/api/v1/webhooks/1/t")).toEqual({ id: "1", token: "t" });
    expect(() => parseWebhookUrl("https://x/nope")).toThrow(/webhook url/i);
  });
});
