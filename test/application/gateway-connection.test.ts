import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GatewayConnection, type GatewayConnectionOptions } from "../../src/application/gateway/gateway-connection.js";
import { createWebSocketFactory } from "../../src/infrastructure/websocket-gateway-socket.js";
import { systemClock } from "../../src/infrastructure/system-clock.js";
import { GatewayOpcodes as Op } from "../../src/contracts/index.js";
import { FakeGateway, type FakeGatewayOptions } from "../support/fake-gateway.js";

describe("GatewayConnection against a fake gateway", () => {
  let gateway: FakeGateway;
  let connection: GatewayConnection | undefined;

  const start = async (gatewayOptions: FakeGatewayOptions = {}, overrides: Partial<GatewayConnectionOptions> = {}) => {
    gateway = await FakeGateway.start(gatewayOptions);
    connection = new GatewayConnection({
      url: gateway.url,
      token: "Ym90.secret",
      intents: 513,
      properties: { os: "test", client: "@discordy-voics/bots", version: "0.1.0" },
      deviceId: null,
      socketFactory: createWebSocketFactory(),
      clock: systemClock,
      random: () => 0,
      backoff: { baseMs: 10, maxMs: 50, jitter: 0 },
      ...overrides,
    });
    return connection;
  };

  beforeEach(() => {
    connection = undefined;
  });

  afterEach(async () => {
    connection?.destroy();
    await gateway?.stop();
  });

  it("identifies with the token, intents and properties after HELLO", async () => {
    const conn = await start();
    const ready = new Promise((resolve) => conn.once("ready", resolve));
    conn.connect();
    await ready;
    const identify = gateway.received(Op.Identify)[0];
    expect(identify?.d).toEqual({
      token: "Ym90.secret",
      device_id: null,
      intents: 513,
      properties: { os: "test", client: "@discordy-voics/bots", version: "0.1.0" },
    });
    expect(gateway.current.url).toBe("/gateway?v=1&encoding=json");
    expect(conn.sessionId).toBe("session-1");
  });

  it("emits dispatch events and tracks the sequence", async () => {
    const conn = await start();
    const ready = new Promise((resolve) => conn.once("ready", resolve));
    conn.connect();
    await ready;
    const received = new Promise((resolve) => conn.once("dispatch", (t, d) => resolve({ t, d })));
    gateway.dispatch("MESSAGE_CREATE", { id: "1", content: "hi" });
    expect(await received).toEqual({ t: "MESSAGE_CREATE", d: { id: "1", content: "hi" } });
    expect(conn.seq).toBe(2);
  });

  it("sends heartbeats with the last sequence and measures latency", async () => {
    const conn = await start({ heartbeatInterval: 40 });
    conn.connect();
    await gateway.waitFor(() => gateway.received(Op.Heartbeat).length >= 2);
    expect(gateway.received(Op.Heartbeat).at(-1)?.d).toBe(1);
    await gateway.waitFor(() => conn.latencyMs !== null);
  });

  it("answers a server heartbeat request immediately", async () => {
    const conn = await start({ heartbeatInterval: 60_000 });
    const ready = new Promise((resolve) => conn.once("ready", resolve));
    conn.connect();
    await ready;
    gateway.send({ op: Op.Heartbeat });
    await gateway.waitFor(() => gateway.received(Op.Heartbeat).length === 1);
  });

  it("resumes the session after an abnormal disconnect", async () => {
    const conn = await start();
    const ready = new Promise((resolve) => conn.once("ready", resolve));
    conn.connect();
    await ready;
    gateway.dispatch("MESSAGE_CREATE", { id: "1" });
    await gateway.waitFor(() => conn.seq === 2);

    const resumed = new Promise<void>((resolve) => conn.once("resumed", () => resolve()));
    gateway.terminate();
    await resumed;
    expect(gateway.connections).toHaveLength(2);
    expect(gateway.received(Op.Resume)[0]?.d).toEqual({ token: "Ym90.secret", session_id: "session-1", seq: 2 });
  });

  it("reconnects and resumes when the gateway sends RECONNECT", async () => {
    const conn = await start();
    const ready = new Promise((resolve) => conn.once("ready", resolve));
    conn.connect();
    await ready;
    const resumed = new Promise<void>((resolve) => conn.once("resumed", () => resolve()));
    gateway.send({ op: Op.Reconnect });
    await resumed;
    expect(gateway.received(Op.Resume)).toHaveLength(1);
  });

  it("re-identifies after a non-resumable INVALID_SESSION", async () => {
    const conn = await start({}, { invalidSessionDelayMs: [1, 2] });
    let readies = 0;
    conn.on("ready", () => readies++);
    conn.connect();
    await gateway.waitFor(() => readies === 1);
    gateway.send({ op: Op.InvalidSession, d: false });
    await gateway.waitFor(() => readies === 2);
    expect(gateway.received(Op.Identify)).toHaveLength(2);
    expect(gateway.received(Op.Resume)).toHaveLength(0);
    expect(conn.sessionId).toBe("session-2");
  });

  it("re-identifies after close code 4009 (session timed out)", async () => {
    const conn = await start();
    let readies = 0;
    conn.on("ready", () => readies++);
    conn.connect();
    await gateway.waitFor(() => readies === 1);
    gateway.close(4009);
    await gateway.waitFor(() => readies === 2);
    expect(gateway.received(Op.Resume)).toHaveLength(0);
  });

  it("stops and reports fatal close codes", async () => {
    const conn = await start({ autoReady: false });
    const fatal = new Promise<Error>((resolve) => conn.once("fatal", resolve));
    conn.connect();
    await gateway.waitFor(() => gateway.received(Op.Identify).length === 1);
    gateway.close(4014);
    const error = await fatal;
    expect(error.message).toMatch(/disallowed intents/i);
    await new Promise((resolve) => setTimeout(resolve, 60));
    expect(gateway.connections).toHaveLength(1);
  });

  it("treats a missing heartbeat ACK as a zombie connection and resumes", async () => {
    const conn = await start({ heartbeatInterval: 30, autoAck: false });
    const ready = new Promise((resolve) => conn.once("ready", resolve));
    conn.connect();
    await ready;
    await gateway.waitFor(() => gateway.connections.length === 2 && gateway.received(Op.Resume).length === 1);
  });

  it("backs off between failed connection attempts", async () => {
    const conn = await start({ autoReady: false, autoResume: false });
    const reconnecting: number[] = [];
    conn.on("reconnecting", ({ delayMs }) => reconnecting.push(delayMs));
    conn.connect();
    await gateway.waitFor(() => gateway.connections.length === 1);
    gateway.terminate();
    await gateway.waitFor(() => gateway.connections.length === 2);
    gateway.terminate();
    await gateway.waitFor(() => gateway.connections.length === 3);
    expect(reconnecting).toEqual([10, 20]);
  });

  it("sends presence and other ops once connected, and closes cleanly on destroy", async () => {
    const conn = await start();
    const ready = new Promise((resolve) => conn.once("ready", resolve));
    conn.connect();
    await ready;
    conn.send(Op.PresenceUpdate, { status: "dnd", activities: [], afk: false });
    await gateway.waitFor(() => gateway.received(Op.PresenceUpdate).length === 1);
    const closed = new Promise((resolve) => gateway.current.socket.once("close", (code) => resolve(code)));
    conn.destroy();
    expect(await closed).toBe(1000);
    expect(() => conn.send(Op.PresenceUpdate, {})).toThrow(/not connected/i);
  });
});
