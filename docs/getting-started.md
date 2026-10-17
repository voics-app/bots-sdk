# Getting started with `@discordy-voics/bots`

This guide takes you from nothing to a running slash-command bot on Discordy.

1. [Create an application](#1-create-an-application)
2. [Get a bot token](#2-get-a-bot-token)
3. [Invite the bot with permissions](#3-invite-the-bot-to-a-guild)
4. [Choose intents](#4-choose-gateway-intents)
5. [Install the SDK](#5-install-the-sdk)
6. [Write the bot](#6-write-your-first-bot)
7. [Going further](#7-going-further)

Hostnames below are the production defaults. On the local compose stack, use `http://localhost:8000/api/v1` for REST and `ws://localhost:8000/gateway` for the gateway.

## 1. Create an application

An **application** owns a **bot user**, its slash commands and its invite settings. You create it with your normal user account. The REST endpoints below take your user access token, which you get from `POST /api/v1/auth/login`:

```bash
API=https://discordy-api.voics.nl/api/v1

# Log in as yourself (add "totp" if you enabled 2FA)
USER_TOKEN=$(curl -s "$API/auth/login" -H 'Content-Type: application/json' \
  -d '{"email":"you@example.com","password":"…"}' | jq -r .access_token)

# Create the application
curl -s "$API/applications" -H "Authorization: Bearer $USER_TOKEN" \
  -H 'Content-Type: application/json' -d '{"name":"Mod Bot","description":"Keeps things tidy"}'
```

The response is a Discord-shaped `Application`. Note its `id`: this is your **application id**, also called the client id.

## 2. Get a bot token

Generate (or rotate) the bot token:

```bash
curl -s -X POST "$API/applications/$APP_ID/bot/reset-token" -H "Authorization: Bearer $USER_TOKEN"
# → { "token": "<base64url(bot_user_id)>.<random>" }
```

Treat the token like a password:

- Store it in an environment variable such as `DISCORDY_BOT_TOKEN` or in a secret manager, never in source control.
- Every request the SDK makes sends it as `Authorization: Bot <token>`.
- If it leaks, call `reset-token` again. The old token stops working immediately.

## 3. Invite the bot to a guild

A bot joins a guild when someone with **Manage Server** authorizes it. Build the authorization URL with the permissions the bot needs:

```ts
import { buildInviteUrl } from "@discordy-voics/bots";

const url = buildInviteUrl({
  clientId: "YOUR_APPLICATION_ID",
  permissions: ["KickMembers", "ManageMessages", "ReadMessageHistory", "ViewChannel", "SendMessages"],
  // scopes default to ["bot", "applications.commands"]
});
// https://discordy.voics.nl/oauth2/authorize?client_id=…&scope=bot+applications.commands&permissions=76802
```

Open the URL, pick a guild, and confirm. Under the hood the page calls `POST /api/v1/oauth2/authorize {client_id, guild_id, permissions, scope}`, which you can also call yourself with a user token.

**Permissions** use Discord's bit values and travel as decimal strings. The `Permissions` helper does the arithmetic:

```ts
import { Permissions, PermissionFlagsBits } from "@discordy-voics/bots";

const perms = new Permissions(["KickMembers", "BanMembers"]);
perms.has("KickMembers");          // true
perms.toString();                  // "6"
PermissionFlagsBits.Administrator; // 8n
```

Ask for the smallest set that works. **Administrator** bypasses every channel overwrite, so a compromised admin bot can do anything.

Choose scopes by what the bot does:

| Scope | Grants |
|---|---|
| `bot` | Adds the bot user to the guild with the requested permissions |
| `applications.commands` | Lets the application register slash commands in the guild |

## 4. Choose gateway intents

Intents decide which gateway events your bot receives. Request only what you use:

| Intent | Bit | Events | Privileged |
|---|---|---|---|
| `Guilds` | 1 << 0 | GUILD_CREATE/UPDATE/DELETE, channels, roles | |
| `GuildMembers` | 1 << 1 | GUILD_MEMBER_ADD/UPDATE/REMOVE | **yes** |
| `GuildModeration` | 1 << 2 | GUILD_BAN_ADD/REMOVE, audit log entries | |
| `GuildEmojis` | 1 << 3 | GUILD_EMOJIS_UPDATE | |
| `GuildIntegrations` | 1 << 4 | integration updates | |
| `GuildWebhooks` | 1 << 5 | webhook updates | |
| `GuildInvites` | 1 << 6 | INVITE_CREATE/DELETE | |
| `GuildVoiceStates` | 1 << 7 | VOICE_STATE_UPDATE | |
| `GuildPresences` | 1 << 8 | PRESENCE_UPDATE | **yes** |
| `GuildMessages` | 1 << 9 | MESSAGE_CREATE/UPDATE/DELETE in guilds | |
| `GuildMessageReactions` | 1 << 10 | reactions in guilds | |
| `GuildMessageTyping` | 1 << 11 | TYPING_START in guilds | |
| `DirectMessages` | 1 << 12 | messages in DMs | |
| `DirectMessageReactions` | 1 << 13 | reactions in DMs | |
| `DirectMessageTyping` | 1 << 14 | TYPING_START in DMs | |
| `MessageContent` | 1 << 15 | `content`, `embeds`, `attachments` and `components` of messages | **yes** |

- **Privileged intents** must be enabled on the application first. Requesting one that isn't enabled closes the connection with code **4014**. The SDK reports this as a fatal error and does not retry.
- **Slash commands need no intents.** Interactions are always delivered to the bot's sessions, so a command-only bot can connect with `intents: ["Guilds"]`, or even `0`.
- **Delivery modes.** Bots only see **Standard** channels. Ephemeral (end-to-end encrypted) and P2P chats never reach bots, and the server rejects sending messages into them with error `50160`.

```ts
import { Intents } from "@discordy-voics/bots";
Intents.resolve(["Guilds", "GuildMessages", "MessageContent"]); // 33281
Intents.privileged(33281); // ["MessageContent"]
```

## 5. Install the SDK

The package is published to GitHub Packages. Point the `@discordy-voics` scope at it and authenticate with a GitHub token that has `read:packages`:

```ini
# .npmrc
@discordy-voics:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @discordy-voics/bots    # or npm install / yarn add
```

Requirements: Node.js 22 or newer, which provides `fetch` and `WebSocket` globally. ESM and CommonJS builds are both included.

## 6. Write your first bot

```ts
// bot.ts
import { Client, SlashCommandBuilder } from "@discordy-voics/bots";

const client = new Client({
  token: process.env.DISCORDY_BOT_TOKEN!,
  intents: ["Guilds"],
  // gatewayUrl: "ws://localhost:8000/gateway",
  // rest: { baseUrl: "http://localhost:8000/api/v1" },
});

const ping = new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");

client.interactions.command("ping", (interaction) => interaction.reply({ content: "Pong!", ephemeral: true }));

client.on("ready", async ({ user }) => {
  console.log(`Logged in as ${user.username}`);
  // Guild commands update instantly; omit guildId to register globally.
  await client.registerCommands([ping], { guildId: process.env.DISCORDY_GUILD_ID });
});

client.on("error", console.error);

await client.login();
```

```bash
DISCORDY_BOT_TOKEN=… DISCORDY_GUILD_ID=… npx tsx bot.ts
```

Type `/ping` in the guild and the bot answers.

## 7. Going further

### Answering interactions

You have **3 seconds** to acknowledge an interaction. Defer if the work takes longer, then edit the reply:

```ts
client.interactions.command("report", async (i) => {
  await i.deferReply({ ephemeral: true });              // shows "thinking…"
  const result = await slowLookup(i.options.getString("query", true));
  await i.editReply(`Found ${result.length} items`);
  await i.followUp({ content: "Anything else?", ephemeral: true });
});
```

| Method | When | Callback type |
|---|---|---|
| `reply(payload)` | first response with a message | 4 |
| `deferReply({ ephemeral })` | first response, answer later | 5 |
| `update(payload)` | first response to a button/select: edit its message | 7 |
| `deferUpdate()` | first response to a button/select: edit later | 6 |
| `showModal(modal)` | first response to a command or component | 9 |
| `respond(choices)` | autocomplete | 8 |
| `editReply` / `deleteReply` / `followUp` | after any message response | webhook |

Calling a second initial response throws `InteractionStateError` before any request is sent.

### Buttons, selects and modals

```ts
import { ActionRowBuilder, ButtonBuilder, ModalBuilder, TextInputBuilder, buildCustomId } from "@discordy-voics/bots";

const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder().setCustomId(buildCustomId("vote", "yes")).setLabel("Yes").setStyle("Success"),
  new ButtonBuilder().setCustomId(buildCustomId("vote", "no")).setLabel("No").setStyle("Danger"),
);
await interaction.reply({ content: "Ship it?", components: [row] });

// "vote" matches "vote" and "vote:<args…>"; the remainder arrives in `args`.
client.interactions.component("vote", (i) => i.update({ content: `You voted ${i.args[0]}`, components: [] }));

client.interactions.command("feedback", (i) =>
  i.showModal(new ModalBuilder().setCustomId("feedback").setTitle("Feedback")
    .addTextInputs(new TextInputBuilder().setCustomId("text").setLabel("Your feedback").setStyle("Paragraph"))),
);
client.interactions.modal("feedback", (i) => i.reply({ content: `Thanks: ${i.getTextInputValue("text")}`, ephemeral: true }));
```

Custom-id patterns can also be regular expressions, in which case the capture groups become `args`. Subcommands route with `"name sub"` or `"name group sub"`, and fall back to the plain command name.

### REST

`client.api` wraps the bot-relevant endpoints, and `client.rest` together with `Routes` reaches every P9 endpoint:

```ts
await client.api.messages.send(channelId, { embeds: [new EmbedBuilder().setTitle("Hello")] });
await client.api.guilds.kick(guildId, userId, { reason: "spam" });   // X-Audit-Log-Reason
const regions = await client.rest.get(Routes.voiceRegions());
```

Rate limits are handled for you:

- Requests are queued per bucket, using the `X-RateLimit-Bucket` header and the major parameter (channel, guild or webhook).
- The client waits for `X-RateLimit-Reset-After` when a bucket is empty.
- 429 responses (bucket or global) and transient 5xx responses are retried up to `retries` times (default 3).
- Failures throw `DiscordyApiError` with `status` and the Discordy error `code`, for example `50013` for missing permissions.

### Webhooks

Posting through a webhook needs no bot token:

```ts
import { WebhookClient } from "@discordy-voics/bots";
const hook = new WebhookClient({ url: process.env.DEPLOY_WEBHOOK_URL! });
await hook.send({ content: "Deploy finished", username: "CI" });
```

### Connection lifecycle

The `Client` keeps the session healthy without any code on your side:

- It sends heartbeats at the interval from HELLO and measures `client.latencyMs`.
- If a heartbeat goes unacknowledged, it treats the connection as a zombie and reconnects.
- After drops, `RECONNECT` and resumable `INVALID_SESSION`, it resumes within the 120-second window. Missed events are replayed.
- After codes 4007/4009 or a non-resumable `INVALID_SESSION`, it identifies again.
- Reconnect attempts back off exponentially with jitter, up to 60 seconds.
- Codes 4004 (bad token), 4013 and 4014 (intents) are fatal: `login()` rejects and `error` is emitted.
- Outgoing gateway sends are throttled under the 120-per-60-seconds limit.

Listen to `reconnecting`, `resumed` and `debug` for visibility.

See the [API reference](api/README.md) for every class and option, and [`examples/moderation-bot`](../examples/moderation-bot) for a complete bot.
