# Moderation bot example

A small Voics bot built with `@discordy-voics/bots`.

| Command | What it does | Default permission |
|---|---|---|
| `/ping` | Replies (only to you) with the gateway heartbeat latency | everyone |
| `/kick user [reason]` | Shows a confirmation embed with **Kick** / **Cancel** buttons. Only the moderator who ran the command can confirm. The reason goes to the audit log | Kick Members |
| `/purge count` | Defers, then deletes the last 2–100 messages (bulk delete; messages older than 14 days are skipped) | Manage Messages |

The bot also needs these permissions in the guild: **Kick Members**, **Manage Messages**, **Read Message History**, **View Channel**. See [the getting-started guide](../../docs/getting-started.md) for the invite URL.

## Run it

From the repository root:

```bash
pnpm install
pnpm build                                   # the example imports the built package
cp examples/moderation-bot/.env.example examples/moderation-bot/.env   # then fill in your values
pnpm --filter @discordy-voics/moderation-bot-example start
```

`start` connects to the gateway and registers the commands on READY. To register commands without starting the bot:

```bash
pnpm --filter @discordy-voics/moderation-bot-example register
```

## Configuration

| Variable | Required | Description |
|---|---|---|
| `DISCORDY_BOT_TOKEN` | yes | Bot token from the application's **Bot** page |
| `DISCORDY_APPLICATION_ID` | yes | The application id |
| `DISCORDY_GUILD_ID` | no | Register commands in this guild only (instant). Omit to register globally |
| `DISCORDY_API_URL` | no | REST base URL, default `https://discordy-api.voics.nl/api/v1` |
| `DISCORDY_GATEWAY_URL` | no | Gateway URL, default `wss://discordy-gateway.voics.nl/gateway` |

## Layout

- `src/main.ts`: composition root (client, handlers, login).
- `src/config.ts`: environment validation.
- `src/commands/*`: one file per command, with its builder and handlers; handlers get their dependencies through `CommandContext`.
- `test/`: handler tests against a mocked REST transport.
