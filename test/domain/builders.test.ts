import { describe, expect, it } from "vitest";
import { SlashCommandBuilder } from "../../src/domain/builders/slash-command.js";
import { ContextMenuCommandBuilder } from "../../src/domain/builders/context-menu-command.js";
import { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ChannelSelectMenuBuilder, UserSelectMenuBuilder } from "../../src/domain/builders/components.js";
import { ModalBuilder, TextInputBuilder } from "../../src/domain/builders/modal.js";
import { EmbedBuilder } from "../../src/domain/builders/embed.js";
import { ApplicationCommandOptionTypes as T, ButtonStyles, ChannelTypes, ComponentTypes, TextInputStyles } from "../../src/contracts/index.js";

describe("SlashCommandBuilder", () => {
  it("serializes a command with typed options and permissions", () => {
    const json = new SlashCommandBuilder()
      .setName("kick")
      .setDescription("Kick a member")
      .setDefaultMemberPermissions(["KickMembers"])
      .setContexts("Guild")
      .addUserOption((o) => o.setName("user").setDescription("Who").setRequired(true))
      .addStringOption((o) => o.setName("reason").setDescription("Why").setMaxLength(200))
      .addIntegerOption((o) => o.setName("days").setDescription("Delete days").setMinValue(0).setMaxValue(7).addChoices({ name: "none", value: 0 }))
      .toJSON();

    expect(json).toEqual({
      type: 1,
      name: "kick",
      description: "Kick a member",
      default_member_permissions: "2",
      contexts: [0],
      nsfw: false,
      options: [
        { type: T.User, name: "user", description: "Who", required: true },
        { type: T.String, name: "reason", description: "Why", required: false, max_length: 200 },
        { type: T.Integer, name: "days", description: "Delete days", required: false, min_value: 0, max_value: 7, choices: [{ name: "none", value: 0 }] },
      ],
    });
  });

  it("serializes subcommands and groups", () => {
    const json = new SlashCommandBuilder()
      .setName("warn")
      .setDescription("Warnings")
      .addSubcommandGroup((g) =>
        g
          .setName("manage")
          .setDescription("Manage")
          .addSubcommand((s) => s.setName("clear").setDescription("Clear").addUserOption((o) => o.setName("user").setDescription("Who").setRequired(true))),
      )
      .addSubcommand((s) => s.setName("list").setDescription("List").addChannelOption((o) => o.setName("in").setDescription("Where").addChannelTypes(ChannelTypes.GuildText)))
      .toJSON();

    expect(json.options?.[0]).toMatchObject({ type: T.SubcommandGroup, name: "manage", options: [{ type: T.Subcommand, name: "clear" }] });
    expect(json.options?.[1]).toMatchObject({ type: T.Subcommand, name: "list", options: [{ type: T.Channel, channel_types: [0] }] });
  });

  it("validates names and descriptions", () => {
    expect(() => new SlashCommandBuilder().setName("Kick")).toThrow(/lowercase/);
    expect(() => new SlashCommandBuilder().setName("has space")).toThrow(/name/);
    expect(() => new SlashCommandBuilder().setName("a".repeat(33))).toThrow(/32/);
    expect(() => new SlashCommandBuilder().setName("ok").setDescription("")).toThrow(/description/);
    expect(() => new SlashCommandBuilder().setName("ok").toJSON()).toThrow(/description/);
  });

  it("requires required options before optional ones", () => {
    const builder = new SlashCommandBuilder()
      .setName("x")
      .setDescription("x")
      .addStringOption((o) => o.setName("a").setDescription("a"))
      .addStringOption((o) => o.setName("b").setDescription("b").setRequired(true));
    expect(() => builder.toJSON()).toThrow(/required options must come before/i);
  });

  it("rejects duplicate option names, too many options and mixed subcommands", () => {
    const dup = new SlashCommandBuilder().setName("x").setDescription("x");
    dup.addStringOption((o) => o.setName("a").setDescription("a"));
    expect(() => dup.addStringOption((o) => o.setName("a").setDescription("a"))).toThrow(/duplicate/i);

    const many = new SlashCommandBuilder().setName("x").setDescription("x");
    for (let i = 0; i < 25; i++) many.addBooleanOption((o) => o.setName(`o${i}`).setDescription("d"));
    expect(() => many.addBooleanOption((o) => o.setName("o25").setDescription("d"))).toThrow(/25/);

    const mixed = new SlashCommandBuilder().setName("x").setDescription("x").addStringOption((o) => o.setName("a").setDescription("a"));
    expect(() => mixed.addSubcommand((s) => s.setName("s").setDescription("s"))).toThrow(/cannot mix/i);
  });

  it("rejects autocomplete together with choices", () => {
    expect(() =>
      new SlashCommandBuilder().setName("x").setDescription("x").addStringOption((o) => o.setName("q").setDescription("q").setAutocomplete(true).addChoices({ name: "a", value: "a" })),
    ).toThrow(/autocomplete/i);
  });

  it("allows clearing default member permissions", () => {
    expect(new SlashCommandBuilder().setName("x").setDescription("x").setDefaultMemberPermissions(null).toJSON().default_member_permissions).toBeNull();
  });
});

describe("ContextMenuCommandBuilder", () => {
  it("serializes user and message commands without descriptions", () => {
    expect(new ContextMenuCommandBuilder().setName("Report User").setType("User").toJSON()).toEqual({ name: "Report User", type: 2, contexts: undefined, default_member_permissions: undefined });
    expect(() => new ContextMenuCommandBuilder().setName("x").toJSON()).toThrow(/type/i);
  });
});

describe("components", () => {
  it("builds buttons in an action row", () => {
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder().setCustomId("kick:confirm").setLabel("Confirm").setStyle("Danger"),
        new ButtonBuilder().setLabel("Docs").setStyle("Link").setURL("https://discordy.voics.nl"),
      )
      .toJSON();
    expect(row).toEqual({
      type: ComponentTypes.ActionRow,
      components: [
        { type: ComponentTypes.Button, style: ButtonStyles.Danger, custom_id: "kick:confirm", label: "Confirm", disabled: false },
        { type: ComponentTypes.Button, style: ButtonStyles.Link, url: "https://discordy.voics.nl", label: "Docs", disabled: false },
      ],
    });
  });

  it("validates buttons", () => {
    expect(() => new ButtonBuilder().setStyle("Primary").setLabel("x").toJSON()).toThrow(/custom_id/);
    expect(() => new ButtonBuilder().setStyle("Link").setLabel("x").toJSON()).toThrow(/url/);
    expect(() => new ButtonBuilder().setStyle("Link").setURL("https://a").setCustomId("a").setLabel("x").toJSON()).toThrow(/custom_id/);
    expect(() => new ButtonBuilder().setStyle("Primary").setCustomId("a").toJSON()).toThrow(/label or an emoji/);
    expect(() => new ButtonBuilder().setLabel("x".repeat(81))).toThrow(/80/);
  });

  it("limits action rows to five buttons or one select", () => {
    const buttons = Array.from({ length: 6 }, (_, i) => new ButtonBuilder().setCustomId(`b${i}`).setLabel("b").setStyle("Primary"));
    expect(() => new ActionRowBuilder().addComponents(...buttons).toJSON()).toThrow(/5/);
    const select = new UserSelectMenuBuilder().setCustomId("u");
    expect(() => new ActionRowBuilder().addComponents(select, new ButtonBuilder().setCustomId("b").setLabel("b").setStyle("Primary")).toJSON()).toThrow(/select menu/i);
  });

  it("builds select menus", () => {
    expect(
      new StringSelectMenuBuilder().setCustomId("color").setPlaceholder("Pick").setMinValues(1).setMaxValues(2).addOptions({ label: "Red", value: "red" }, { label: "Blue", value: "blue", default: true }).toJSON(),
    ).toEqual({
      type: ComponentTypes.StringSelect,
      custom_id: "color",
      placeholder: "Pick",
      min_values: 1,
      max_values: 2,
      disabled: false,
      options: [{ label: "Red", value: "red" }, { label: "Blue", value: "blue", default: true }],
    });
    expect(new ChannelSelectMenuBuilder().setCustomId("c").setChannelTypes(ChannelTypes.GuildVoice).toJSON()).toMatchObject({ type: ComponentTypes.ChannelSelect, channel_types: [2] });
    expect(() => new StringSelectMenuBuilder().setCustomId("x").toJSON()).toThrow(/option/);
    expect(() => new StringSelectMenuBuilder().setCustomId("x").setMaxValues(26)).toThrow(/25/);
  });
});

describe("ModalBuilder", () => {
  it("wraps text inputs in action rows", () => {
    const json = new ModalBuilder()
      .setCustomId("ban-reason")
      .setTitle("Ban reason")
      .addTextInputs(new TextInputBuilder().setCustomId("reason").setLabel("Reason").setStyle("Paragraph").setMaxLength(500).setRequired(true))
      .toJSON();
    expect(json).toEqual({
      custom_id: "ban-reason",
      title: "Ban reason",
      components: [
        { type: ComponentTypes.ActionRow, components: [{ type: ComponentTypes.TextInput, custom_id: "reason", label: "Reason", style: TextInputStyles.Paragraph, max_length: 500, required: true }] },
      ],
    });
  });

  it("validates modal limits", () => {
    expect(() => new ModalBuilder().setCustomId("m").setTitle("t").toJSON()).toThrow(/at least one/);
    expect(() => new ModalBuilder().setTitle("x".repeat(46))).toThrow(/45/);
    expect(() => new TextInputBuilder().setCustomId("a").setLabel("a").setStyle("Short").setMaxLength(4001)).toThrow(/4000/);
  });
});

describe("EmbedBuilder", () => {
  it("serializes an embed", () => {
    const json = new EmbedBuilder()
      .setTitle("Kicked")
      .setDescription("spammer was kicked")
      .setColor("#ff0000")
      .setTimestamp(Date.parse("2026-10-16T00:00:00Z"))
      .setAuthor({ name: "Mod", iconURL: "https://cdn/x.png" })
      .setFooter({ text: "Voics" })
      .addFields({ name: "Reason", value: "spam", inline: true })
      .toJSON();
    expect(json).toEqual({
      title: "Kicked",
      description: "spammer was kicked",
      color: 0xff0000,
      timestamp: "2026-10-16T00:00:00.000Z",
      author: { name: "Mod", icon_url: "https://cdn/x.png" },
      footer: { text: "Voics" },
      fields: [{ name: "Reason", value: "spam", inline: true }],
    });
  });

  it("enforces Discord's embed limits", () => {
    expect(() => new EmbedBuilder().setTitle("x".repeat(257))).toThrow(/256/);
    expect(() => new EmbedBuilder().setColor("blue" as never)).toThrow(/color/i);
    const embed = new EmbedBuilder();
    for (let i = 0; i < 25; i++) embed.addFields({ name: "n", value: "v" });
    expect(() => embed.addFields({ name: "n", value: "v" })).toThrow(/25/);
    const huge = new EmbedBuilder().setDescription("x".repeat(4096)).setTitle("y".repeat(256));
    huge.setFields(Array.from({ length: 2 }, () => ({ name: "n".repeat(256), value: "v".repeat(1024) })));
    expect(() => huge.toJSON()).toThrow(/6000/);
  });
});
