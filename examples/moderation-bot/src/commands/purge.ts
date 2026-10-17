import { SlashCommandBuilder, snowflakeTimestamp, type InteractionRouter } from "@discordy-voics/bots";
import type { CommandContext } from "./context.js";

/** Bulk delete only accepts messages younger than 14 days (Discord parity). */
const BULK_DELETE_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;

export const purgeCommand = new SlashCommandBuilder()
  .setName("purge")
  .setDescription("Delete recent messages in this channel")
  .setDefaultMemberPermissions("ManageMessages")
  .setContexts("Guild")
  .addIntegerOption((o) => o.setName("count").setDescription("How many messages (2-100)").setRequired(true).setMinValue(2).setMaxValue(100));

export function registerPurge(router: InteractionRouter, { api, now }: CommandContext): void {
  router.command("purge", async (interaction) => {
    const count = interaction.options.getInteger("count", true);
    const channelId = interaction.channelId;
    if (!channelId) {
      await interaction.reply({ content: "Run this in a channel.", ephemeral: true });
      return;
    }
    await interaction.deferReply({ ephemeral: true });

    const messages = await api.messages.list(channelId, { limit: count });
    const cutoff = now() - BULK_DELETE_MAX_AGE_MS;
    const deletable = messages.filter((m) => snowflakeTimestamp(m.id) > cutoff).map((m) => m.id);
    const skipped = messages.length - deletable.length;

    const [onlyId] = deletable;
    if (deletable.length === 1 && onlyId) await api.messages.delete(channelId, onlyId, { reason: "purge" });
    else if (deletable.length > 1) await api.messages.bulkDelete(channelId, deletable, { reason: "purge" });

    const noun = deletable.length === 1 ? "message" : "messages";
    const suffix = skipped > 0 ? ` (${skipped} older than 14 days skipped)` : "";
    await interaction.editReply(`Deleted ${deletable.length} ${noun}${suffix}.`);
  });
}
