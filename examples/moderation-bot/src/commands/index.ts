import type { InteractionRouter } from "@voics-app/bots";
import type { CommandContext } from "./context.js";
import { kickCommand, registerKick } from "./kick.js";
import { pingCommand, registerPing } from "./ping.js";
import { purgeCommand, registerPurge } from "./purge.js";

/** Every command the bot registers with Voics. */
export const commandDefinitions = [pingCommand, kickCommand, purgeCommand];

/** Attaches every command and component handler to the router. */
export function registerCommands(router: InteractionRouter, context: CommandContext): void {
  registerPing(router, context);
  registerKick(router, context);
  registerPurge(router, context);
}
