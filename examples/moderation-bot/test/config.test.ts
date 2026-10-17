import { describe, expect, it } from "vitest";
import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("reads required and optional variables", () => {
    expect(loadConfig({ DISCORDY_BOT_TOKEN: "t", DISCORDY_APPLICATION_ID: "800", DISCORDY_GUILD_ID: "100", DISCORDY_API_URL: " http://localhost:8000/api/v1 " })).toEqual({
      token: "t",
      applicationId: "800",
      guildId: "100",
      apiUrl: "http://localhost:8000/api/v1",
      gatewayUrl: undefined,
    });
  });

  it("reports every problem at once", () => {
    expect(() => loadConfig({ DISCORDY_GUILD_ID: "abc" })).toThrow(/DISCORDY_BOT_TOKEN is required[\s\S]*DISCORDY_APPLICATION_ID is required[\s\S]*DISCORDY_GUILD_ID must be a snowflake/);
  });
});
