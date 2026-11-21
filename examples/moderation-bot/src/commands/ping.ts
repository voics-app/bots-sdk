import { SlashCommandBuilder, type InteractionRouter } from "@voics-app/bots";
import type { CommandContext } from "./context.js";

export const pingCommand = new SlashCommandBuilder().setName("ping").setDescription("Check that the bot is alive");

export function registerPing(router: InteractionRouter, { latencyMs }: CommandContext): void {
  router.command("ping", (interaction) => {
    const latency = latencyMs();
    return interaction.reply({
      content: `Pong! Gateway latency: ${latency === null ? "measuring…" : `${latency} ms`}`,
      ephemeral: true,
    });
  });
}
