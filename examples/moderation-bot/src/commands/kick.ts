import {
  ActionRowBuilder,
  ApiErrorCodes,
  ButtonBuilder,
  DiscordyApiError,
  EmbedBuilder,
  SlashCommandBuilder,
  buildCustomId,
  type ComponentInteraction,
  type InteractionRouter,
} from "@discordy-voics/bots";
import type { CommandContext } from "./context.js";

const REASON_FIELD = "Reason";
const NO_REASON = "No reason given";

export const kickCommand = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Remove a member from the server (asks for confirmation)")
  .setDefaultMemberPermissions("KickMembers")
  .setContexts("Guild")
  .addUserOption((o) => o.setName("user").setDescription("Member to kick").setRequired(true))
  .addStringOption((o) => o.setName("reason").setDescription("Shown in the audit log").setMaxLength(400));

export function registerKick(router: InteractionRouter, { api }: CommandContext): void {
  router.command("kick", async (interaction) => {
    const target = interaction.options.getUser("user", true);
    const reason = interaction.options.getString("reason") ?? NO_REASON;
    if (target.id === interaction.user.id) {
      await interaction.reply({ content: "You cannot kick yourself.", ephemeral: true });
      return;
    }
    const invoker = interaction.user.id;
    await interaction.reply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setTitle(`Kick ${target.username}?`)
          .setDescription(`<@${target.id}> will be removed from the server. They can rejoin with an invite.`)
          .setColor("#ed4245")
          .addFields({ name: REASON_FIELD, value: reason }),
      ],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder().setCustomId(buildCustomId("kick", "confirm", invoker, target.id)).setLabel("Kick").setStyle("Danger"),
          new ButtonBuilder().setCustomId(buildCustomId("kick", "cancel", invoker)).setLabel("Cancel").setStyle("Secondary"),
        ),
      ],
    });
  });

  router.component("kick", async (interaction) => {
    const [action, invoker, targetId] = interaction.args;
    if (interaction.user.id !== invoker) {
      await interaction.reply({ content: "Only the moderator who ran /kick can confirm it.", ephemeral: true });
      return;
    }
    if (action === "confirm" && targetId && interaction.guildId) {
      await confirmKick(interaction, api, interaction.guildId, targetId);
      return;
    }
    await interaction.update({ content: "Kick cancelled.", embeds: [], components: [] });
  });
}

async function confirmKick(interaction: ComponentInteraction, api: CommandContext["api"], guildId: string, targetId: string): Promise<void> {
  const reason = interaction.message?.embeds[0]?.fields?.find((f) => f.name === REASON_FIELD)?.value ?? NO_REASON;
  try {
    await api.guilds.kick(guildId, targetId, { reason: `${reason} (by ${interaction.user.username})` });
    await interaction.update({ content: `Kicked <@${targetId}>.`, embeds: [], components: [] });
  } catch (error) {
    if (error instanceof DiscordyApiError && error.code === ApiErrorCodes.MissingPermissions) {
      await interaction.update({ content: `I don't have permission to kick <@${targetId}>.`, embeds: [], components: [] });
      return;
    }
    throw error;
  }
}
