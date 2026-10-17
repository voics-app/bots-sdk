import { describe, expect, it } from "vitest";
import { RateLimitedRequester } from "../../src/application/rest/rate-limited-requester.js";
import { FakeTransport, InstantClock, rateLimitHeaders } from "../support/fakes.js";

const request = (path: string, method: "GET" | "POST" | "DELETE" = "GET") => ({
  method,
  path,
  url: `https://api.test/api/v1${path}`,
  headers: {},
});

describe("RateLimitedRequester", () => {
  it("sends requests and returns the response", async () => {
    const transport = new FakeTransport().reply({ status: 200, body: { ok: true } });
    const requester = new RateLimitedRequester({ transport, clock: new InstantClock() });
    const response = await requester.execute(request("/users/@me"));
    expect(response.status).toBe(200);
    expect(transport.requests).toHaveLength(1);
  });

  it("waits for the bucket to reset once it is exhausted", async () => {
    const clock = new InstantClock();
    const transport = new FakeTransport().reply({ headers: rateLimitHeaders(0, 2.5) }, { headers: rateLimitHeaders(4, 5) });
    const requester = new RateLimitedRequester({ transport, clock });
    await requester.execute(request("/channels/1/messages", "POST"));
    await requester.execute(request("/channels/1/messages", "POST"));
    expect(clock.sleeps).toEqual([2500]);
  });

  it("keeps buckets separate per major parameter", async () => {
    const clock = new InstantClock();
    const transport = new FakeTransport(() => ({ headers: rateLimitHeaders(0, 3) }));
    const requester = new RateLimitedRequester({ transport, clock });
    await requester.execute(request("/channels/1/messages", "POST"));
    await requester.execute(request("/channels/2/messages", "POST"));
    expect(clock.sleeps).toEqual([]);
  });

  it("shares a bucket between routes that report the same bucket hash", async () => {
    const clock = new InstantClock();
    const transport = new FakeTransport(() => ({ headers: rateLimitHeaders(0, 1, "shared") }));
    const requester = new RateLimitedRequester({ transport, clock });
    await requester.execute(request("/channels/1/messages/5", "DELETE"));
    await requester.execute(request("/channels/1/messages/6", "DELETE"));
    expect(clock.sleeps).toEqual([1000]);
  });

  it("retries 429 responses after retry_after", async () => {
    const clock = new InstantClock();
    const limited: { retryAfterMs: number; global: boolean }[] = [];
    const transport = new FakeTransport().reply({ status: 429, body: { message: "slow down", retry_after: 0.75 } }, { status: 200 });
    const requester = new RateLimitedRequester({ transport, clock, onRateLimited: (info) => limited.push(info) });
    const response = await requester.execute(request("/users/@me"));
    expect(response.status).toBe(200);
    expect(transport.requests).toHaveLength(2);
    expect(clock.sleeps).toEqual([750]);
    expect(limited).toEqual([expect.objectContaining({ retryAfterMs: 750, global: false })]);
  });

  it("blocks every route after a global 429", async () => {
    const clock = new InstantClock();
    const transport = new FakeTransport().reply({ status: 429, body: { message: "global", retry_after: 2, global: true } }, { status: 200 }, { status: 200 });
    const requester = new RateLimitedRequester({ transport, clock });
    const first = requester.execute(request("/users/@me"));
    await first;
    expect(clock.sleeps).toEqual([2000]);
  });

  it("gives up after the configured number of retries", async () => {
    const transport = new FakeTransport(() => ({ status: 429, body: { message: "no", retry_after: 0.1 } }));
    const requester = new RateLimitedRequester({ transport, clock: new InstantClock(), retries: 2 });
    const response = await requester.execute(request("/users/@me"));
    expect(response.status).toBe(429);
    expect(transport.requests).toHaveLength(3);
  });

  it("retries transient 5xx responses with backoff", async () => {
    const clock = new InstantClock();
    const transport = new FakeTransport().reply({ status: 502 }, { status: 503 }, { status: 200 });
    const requester = new RateLimitedRequester({ transport, clock });
    expect((await requester.execute(request("/users/@me"))).status).toBe(200);
    expect(clock.sleeps).toEqual([500, 1000]);
  });

  it("serializes requests in the same bucket", async () => {
    const order: string[] = [];
    let release!: () => void;
    const gate = new Promise<void>((resolve) => (release = resolve));
    const transport = {
      async send(req: { url: string }) {
        order.push(`start ${req.url.slice(-1)}`);
        if (req.url.endsWith("1")) await gate;
        order.push(`end ${req.url.slice(-1)}`);
        return { status: 200, header: () => null, body: "" };
      },
    };
    const requester = new RateLimitedRequester({ transport, clock: new InstantClock() });
    const a = requester.execute({ ...request("/channels/9/messages"), url: "u1" });
    const b = requester.execute({ ...request("/channels/9/messages"), url: "u2" });
    await Promise.resolve();
    release();
    await Promise.all([a, b]);
    expect(order).toEqual(["start 1", "end 1", "start 2", "end 2"]);
  });
});
