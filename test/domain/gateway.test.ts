import { describe, expect, it } from "vitest";
import { ExponentialBackoff } from "../../src/domain/gateway/backoff.js";
import { classifyClose } from "../../src/domain/gateway/close-policy.js";
import { HeartbeatTracker } from "../../src/domain/gateway/heartbeat-tracker.js";
import { GatewaySession } from "../../src/domain/gateway/gateway-session.js";
import { SendBudget } from "../../src/domain/gateway/send-budget.js";

describe("ExponentialBackoff", () => {
  const backoff = new ExponentialBackoff({ baseMs: 1000, maxMs: 30_000, jitter: 0.5 });

  it("doubles per attempt without jitter when random is 0", () => {
    expect([0, 1, 2, 3].map((a) => backoff.delay(a, 0))).toEqual([1000, 2000, 4000, 8000]);
  });

  it("caps at the maximum delay", () => {
    expect(backoff.delay(20, 0)).toBe(30_000);
  });

  it("subtracts up to the jitter fraction", () => {
    expect(backoff.delay(1, 1)).toBe(1000);
    expect(backoff.delay(1, 0.5)).toBe(1500);
  });
});

describe("classifyClose", () => {
  it.each([4004, 4013, 4014])("treats %i as fatal", (code) => {
    expect(classifyClose(code).action).toBe("fatal");
  });

  it.each([4003, 4005, 4007, 4009])("re-identifies after %i", (code) => {
    expect(classifyClose(code).action).toBe("reidentify");
  });

  it.each([1001, 1006, 4000, 4001, 4002, 4008])("resumes after %i", (code) => {
    expect(classifyClose(code).action).toBe("resume");
  });

  it("explains fatal codes", () => {
    expect(classifyClose(4014).reason).toMatch(/disallowed intents/i);
  });
});

describe("HeartbeatTracker", () => {
  it("measures latency between beat and ack", () => {
    const hb = new HeartbeatTracker();
    expect(hb.beat(1000)).toBe(true);
    hb.ack(1042);
    expect(hb.latencyMs).toBe(42);
  });

  it("detects a zombie connection when the previous beat was not acknowledged", () => {
    const hb = new HeartbeatTracker();
    expect(hb.beat(0)).toBe(true);
    expect(hb.beat(41_250)).toBe(false);
  });

  it("starts acknowledged after reset", () => {
    const hb = new HeartbeatTracker();
    hb.beat(0);
    hb.reset();
    expect(hb.beat(10)).toBe(true);
    expect(hb.latencyMs).toBeNull();
  });
});

describe("GatewaySession", () => {
  it("is resumable once READY recorded a session id and a sequence", () => {
    const session = new GatewaySession();
    expect(session.canResume).toBe(false);
    session.ready("abc", "wss://resume.example/gateway");
    session.track(5);
    expect(session.canResume).toBe(true);
    expect(session.resumePayload("tok")).toEqual({ token: "tok", session_id: "abc", seq: 5 });
    expect(session.resumeUrl).toBe("wss://resume.example/gateway");
  });

  it("ignores null sequence numbers", () => {
    const session = new GatewaySession();
    session.track(3);
    session.track(null);
    expect(session.seq).toBe(3);
  });

  it("forgets everything on invalidate", () => {
    const session = new GatewaySession();
    session.ready("abc");
    session.track(9);
    session.invalidate();
    expect(session.canResume).toBe(false);
    expect(session.seq).toBeNull();
    expect(() => session.resumePayload("tok")).toThrow();
  });
});

describe("SendBudget", () => {
  it("allows up to the limit inside the window", () => {
    const budget = new SendBudget(2, 1000);
    expect(budget.waitTime(0)).toBe(0);
    budget.consume(0);
    budget.consume(100);
    expect(budget.waitTime(200)).toBe(800);
  });

  it("frees capacity as old sends leave the window", () => {
    const budget = new SendBudget(2, 1000);
    budget.consume(0);
    budget.consume(100);
    expect(budget.waitTime(1000)).toBe(0);
    budget.consume(1000);
    expect(budget.waitTime(1050)).toBe(50);
  });
});
