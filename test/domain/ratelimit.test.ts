import { describe, expect, it } from "vitest";
import { parseRateLimitHeaders, retryAfterMs } from "../../src/domain/ratelimit/rate-limit-headers.js";
import { RateLimitBucket } from "../../src/domain/ratelimit/rate-limit-bucket.js";
import { routeOf } from "../../src/domain/ratelimit/route.js";

const headers = (entries: Record<string, string>) => (name: string) => entries[name.toLowerCase()] ?? null;

describe("parseRateLimitHeaders", () => {
  it("reads the P9 X-RateLimit-* headers", () => {
    const info = parseRateLimitHeaders(
      headers({
        "x-ratelimit-limit": "5",
        "x-ratelimit-remaining": "0",
        "x-ratelimit-reset": "1767225601.5",
        "x-ratelimit-reset-after": "1.25",
        "x-ratelimit-bucket": "abcd",
      }),
    );
    expect(info).toEqual({ limit: 5, remaining: 0, resetAfterMs: 1250, bucket: "abcd", global: false });
  });

  it("returns null without rate-limit headers", () => {
    expect(parseRateLimitHeaders(headers({}))).toBeNull();
  });

  it("falls back to the absolute reset when reset-after is absent", () => {
    const info = parseRateLimitHeaders(headers({ "x-ratelimit-limit": "1", "x-ratelimit-remaining": "0", "x-ratelimit-reset": "12" }), 10_000);
    expect(info?.resetAfterMs).toBe(2000);
  });
});

describe("retryAfterMs", () => {
  it("prefers the body retry_after in seconds", () => {
    expect(retryAfterMs(headers({ "retry-after": "9" }), { message: "", retry_after: 0.5 })).toBe(500);
  });

  it("falls back to reset-after, then retry-after, then one second", () => {
    expect(retryAfterMs(headers({ "x-ratelimit-reset-after": "2" }), undefined)).toBe(2000);
    expect(retryAfterMs(headers({ "retry-after": "3" }), undefined)).toBe(3000);
    expect(retryAfterMs(headers({}), undefined)).toBe(1000);
  });
});

describe("RateLimitBucket", () => {
  it("does not wait before anything is known", () => {
    expect(new RateLimitBucket().waitTime(0)).toBe(0);
  });

  it("waits until reset once exhausted", () => {
    const bucket = new RateLimitBucket();
    bucket.update({ limit: 2, remaining: 0, resetAfterMs: 500, bucket: "x", global: false }, 1000);
    expect(bucket.waitTime(1100)).toBe(400);
    expect(bucket.waitTime(1500)).toBe(0);
  });

  it("consumes optimistically between responses", () => {
    const bucket = new RateLimitBucket();
    bucket.update({ limit: 2, remaining: 1, resetAfterMs: 1000, bucket: "x", global: false }, 0);
    bucket.consume(10);
    expect(bucket.waitTime(20)).toBe(980);
  });

  it("refills after the reset passes", () => {
    const bucket = new RateLimitBucket();
    bucket.update({ limit: 2, remaining: 0, resetAfterMs: 100, bucket: "x", global: false }, 0);
    bucket.consume(200);
    expect(bucket.waitTime(200)).toBe(0);
  });
});

describe("routeOf", () => {
  it("keeps the major parameter and templates other ids", () => {
    expect(routeOf("PATCH", "/channels/111/messages/222")).toEqual({ route: "PATCH /channels/:major/messages/:id", major: "111" });
    expect(routeOf("DELETE", "/guilds/9/members/77")).toEqual({ route: "DELETE /guilds/:major/members/:id", major: "9" });
  });

  it("uses webhook id and token as the major parameter", () => {
    expect(routeOf("POST", "/webhooks/5/tok-en_1")).toEqual({ route: "POST /webhooks/:major", major: "5/tok-en_1" });
    expect(routeOf("PATCH", "/webhooks/5/tok/messages/@original").route).toBe("PATCH /webhooks/:major/messages/@original");
  });

  it("groups interaction callbacks and reaction emojis", () => {
    expect(routeOf("POST", "/interactions/1/abc/callback").route).toBe("POST /interactions/:id/:token/callback");
    expect(routeOf("PUT", "/channels/1/messages/2/reactions/%F0%9F%91%8D/@me").route).toBe("PUT /channels/:major/messages/:id/reactions/:emoji/@me");
  });

  it("ignores the query string and handles global routes", () => {
    expect(routeOf("GET", "/users/@me?with=1")).toEqual({ route: "GET /users/@me", major: "global" });
    expect(routeOf("PUT", "/applications/42/commands").route).toBe("PUT /applications/:id/commands");
  });
});
