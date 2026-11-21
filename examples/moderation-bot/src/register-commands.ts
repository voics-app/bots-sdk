/** One-off script: registers the bot's commands over REST without connecting to the gateway. */
import { DiscordyApi, RestClient } from "@voics-app/bots";
import { commandDefinitions } from "./commands/index.js";
import { loadConfig } from "./config.js";

const config = loadConfig();
const api = new DiscordyApi(new RestClient({ token: config.token, baseUrl: config.apiUrl }));
const registered = await api.commands.set(config.applicationId, commandDefinitions, config.guildId);
console.log(`Registered: ${registered.map((c) => `/${c.name}`).join(", ")}`);
