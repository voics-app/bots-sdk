import { describe, expect, it } from "vitest";
import { Permissions, computePermissions } from "../../src/domain/bitfield/permissions.js";
import { PermissionFlagsBits as P } from "../../src/contracts/index.js";

describe("Permissions", () => {
  it("resolves names, bigints, decimal strings and arrays", () => {
    expect(Permissions.resolve("KickMembers")).toBe(2n);
    expect(Permissions.resolve(["KickMembers", "BanMembers"])).toBe(6n);
    expect(Permissions.resolve("1024")).toBe(1024n);
    expect(Permissions.resolve(new Permissions(8n))).toBe(8n);
  });

  it("rejects unknown permission names", () => {
    expect(() => Permissions.resolve("Fly" as never)).toThrow(/unknown permission/i);
  });

  it("checks permissions with administrator override by default", () => {
    const admin = new Permissions("Administrator");
    expect(admin.has("BanMembers")).toBe(true);
    expect(admin.has("BanMembers", { checkAdmin: false })).toBe(false);
  });

  it("is immutable when adding and removing", () => {
    const base = new Permissions("SendMessages");
    const more = base.add("ViewChannel");
    expect(base.has("ViewChannel")).toBe(false);
    expect(more.has(["ViewChannel", "SendMessages"])).toBe(true);
    expect(more.remove("SendMessages").toArray()).toEqual(["ViewChannel"]);
  });

  it("reports missing permissions and any()", () => {
    const perms = new Permissions(["ViewChannel"]);
    expect(perms.missing(["ViewChannel", "SendMessages", "ManageMessages"])).toEqual(["SendMessages", "ManageMessages"]);
    expect(perms.any(["SendMessages", "ViewChannel"])).toBe(true);
  });

  it("serializes as a decimal string", () => {
    const perms = new Permissions(["KickMembers", "UseApplicationCommands"]);
    expect(perms.toString()).toBe(String(2n + (1n << 31n)));
    expect(JSON.stringify({ p: perms })).toBe(`{"p":"${perms.toString()}"}`);
  });

  it("exposes the union of all known flags", () => {
    expect(Permissions.All & P.Administrator).toBe(P.Administrator);
    expect(new Permissions(Permissions.All).toArray()).toHaveLength(Object.keys(P).length);
  });
});

describe("computePermissions (P9 algorithm)", () => {
  const guildId = "100";
  const roles = [
    { id: guildId, permissions: String(P.ViewChannel | P.SendMessages) },
    { id: "200", permissions: String(P.KickMembers) },
    { id: "300", permissions: String(P.ManageMessages) },
    { id: "400", permissions: String(P.Administrator) },
  ];
  const guild = { id: guildId, owner_id: "1", roles };

  it("starts from @everyone and ORs in member roles", () => {
    const perms = computePermissions({ guild, member: { user_id: "2", roles: ["200"] } });
    expect(perms.bitfield).toBe(P.ViewChannel | P.SendMessages | P.KickMembers);
  });

  it("grants everything to the owner and to administrators", () => {
    expect(computePermissions({ guild, member: { user_id: "1", roles: [] } }).bitfield).toBe(Permissions.All);
    expect(computePermissions({ guild, member: { user_id: "2", roles: ["400"] } }).bitfield).toBe(Permissions.All);
  });

  it("applies @everyone, then role denies/allows, then member overwrites", () => {
    const channel = {
      permission_overwrites: [
        { id: "2", type: 1 as const, allow: String(P.AttachFiles), deny: "0" },
        { id: "300", type: 0 as const, allow: String(P.EmbedLinks), deny: "0" },
        { id: "200", type: 0 as const, allow: "0", deny: String(P.EmbedLinks | P.SendMessages) },
        { id: guildId, type: 0 as const, allow: "0", deny: String(P.SendMessages) },
      ],
    };
    const perms = computePermissions({ guild, member: { user_id: "2", roles: ["200", "300"] }, channel });
    expect(perms.has("SendMessages")).toBe(false);
    expect(perms.has("EmbedLinks")).toBe(true);
    expect(perms.has("AttachFiles")).toBe(true);
  });

  it("member overwrite wins over role overwrites", () => {
    const channel = {
      permission_overwrites: [
        { id: "200", type: 0 as const, allow: "0", deny: String(P.SendMessages) },
        { id: "2", type: 1 as const, allow: String(P.SendMessages), deny: "0" },
      ],
    };
    expect(computePermissions({ guild, member: { user_id: "2", roles: ["200"] }, channel }).has("SendMessages")).toBe(true);
  });

  it("removes channel permissions when VIEW_CHANNEL is missing", () => {
    const channel = { permission_overwrites: [{ id: guildId, type: 0 as const, allow: "0", deny: String(P.ViewChannel) }] };
    expect(computePermissions({ guild, member: { user_id: "2", roles: [] }, channel }).bitfield).toBe(0n);
  });

  it("ignores overwrites for administrators", () => {
    const channel = { permission_overwrites: [{ id: guildId, type: 0 as const, allow: "0", deny: String(P.ViewChannel) }] };
    expect(computePermissions({ guild, member: { user_id: "2", roles: ["400"] }, channel }).bitfield).toBe(Permissions.All);
  });
});
