import { describe, expect, it } from "vitest";
import { GatewayCloseCodes, GatewayIntentBits, GatewayOpcodes, PermissionFlagsBits } from "../../src/contracts/index.js";

describe("contracts golden values", () => {
  it("matches Discord permission bits pinned in P9", () => {
    expect(PermissionFlagsBits.Administrator).toBe(8n);
    expect(PermissionFlagsBits.ViewChannel).toBe(1024n);
    expect(PermissionFlagsBits.Connect).toBe(1048576n);
    expect(PermissionFlagsBits.UseApplicationCommands).toBe(1n << 31n);
    expect(PermissionFlagsBits.SendMessagesInThreads).toBe(1n << 38n);
  });

  it("matches the intent bits pinned in P7", () => {
    expect(GatewayIntentBits.Guilds).toBe(1);
    expect(GatewayIntentBits.GuildMessages).toBe(512);
    expect(GatewayIntentBits.MessageContent).toBe(32768);
  });

  it("matches the opcodes and close codes pinned in P7", () => {
    expect(GatewayOpcodes).toMatchObject({ Dispatch: 0, Heartbeat: 1, Identify: 2, Resume: 6, Reconnect: 7, InvalidSession: 9, Hello: 10, HeartbeatAck: 11 });
    expect(GatewayCloseCodes.AuthenticationFailed).toBe(4004);
    expect(GatewayCloseCodes.DisallowedIntents).toBe(4014);
  });
});
