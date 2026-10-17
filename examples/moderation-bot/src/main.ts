/** Composition root of the example moderation bot. */
import { Client } from "@discordy-voics/bots";
import { commandDefinitions, registerCommands } from "./commands/index.js";
import { loadConfig } from "./config.js";

const config = loadConfig();

const client = new Client({
  token: config.token,
  applicationId: config.applicationId,
  intents: ["Guilds"],
  gatewayUrl: config.gatewayUrl,
  rest: { baseUrl: config.apiUrl },
});

registerCommands(client.interactions, { api: client.api, latencyMs: () => client.latencyMs, now: () => Date.now() });

client.on("ready", async (ready) => {
  console.log(`Logged in as ${ready.user.username} (${ready.user.id})`);
  await client.registerCommands(commandDefinitions, { guildId: config.guildId });
  console.log(`Registered ${commandDefinitions.length} commands ${config.guildId ? `in guild ${config.guildId}` : "globally"}`);
});
client.on("reconnecting", ({ delayMs, resume, reason }) => console.warn(`Reconnecting in ${delayMs} ms (resume: ${resume}): ${reason}`));
client.on("error", (error) => console.error("Bot error:", error));

const shutdown = () => {
  client.destroy();
  process.exit(0);
};
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

await client.login();
