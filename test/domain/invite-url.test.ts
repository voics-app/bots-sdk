import { describe, expect, it } from "vitest";
import { buildInviteUrl } from "../../src/domain/invite-url.js";

describe("buildInviteUrl", () => {
  it("builds the default bot invite with permissions as a decimal string", () => {
    expect(buildInviteUrl({ clientId: "800", permissions: ["KickMembers", "ManageMessages"] })).toBe(
      "https://discordy.voics.nl/oauth2/authorize?client_id=800&scope=bot+applications.commands&permissions=8194",
    );
  });

  it("supports a custom origin, scopes and a preselected guild", () => {
    const url = new URL(buildInviteUrl({ clientId: "1", scopes: ["applications.commands"], guildId: "5", disableGuildSelect: true, baseUrl: "http://localhost:5173/" }));
    expect(url.origin + url.pathname).toBe("http://localhost:5173/oauth2/authorize");
    expect(Object.fromEntries(url.searchParams)).toEqual({ client_id: "1", scope: "applications.commands", permissions: "0", guild_id: "5", disable_guild_select: "true" });
  });
});
