import type { Clock, TimerHandle } from "../../src/application/ports/clock.js";
import type { HttpRequest, HttpResponse, HttpTransport } from "../../src/application/ports/http-transport.js";

/** A clock whose sleeps complete instantly while advancing virtual time. */
export class InstantClock implements Clock {
  readonly sleeps: number[] = [];
  constructor(public time = 1_000_000) {}

  now(): number {
    return this.time;
  }

  async sleep(ms: number): Promise<void> {
    this.sleeps.push(ms);
    this.time += ms;
  }

  setTimeout(callback: () => void, ms: number): TimerHandle {
    return setTimeout(callback, ms);
  }

  clearTimeout(handle: TimerHandle): void {
    clearTimeout(handle as ReturnType<typeof setTimeout>);
  }
}

export interface FakeReply {
  status?: number;
  headers?: Record<string, string>;
  body?: unknown;
}

/** An HTTP transport that records requests and replies from a script or a handler. */
export class FakeTransport implements HttpTransport {
  readonly requests: HttpRequest[] = [];
  private readonly script: FakeReply[] = [];

  constructor(private readonly fallback: (request: HttpRequest) => FakeReply = () => ({ status: 204 })) {}

  reply(...replies: FakeReply[]): this {
    this.script.push(...replies);
    return this;
  }

  async send(request: HttpRequest): Promise<HttpResponse> {
    this.requests.push(request);
    const reply = this.script.shift() ?? this.fallback(request);
    const headers = Object.fromEntries(Object.entries(reply.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v]));
    return {
      status: reply.status ?? 200,
      header: (name) => headers[name.toLowerCase()] ?? null,
      body: reply.body === undefined ? "" : typeof reply.body === "string" ? reply.body : JSON.stringify(reply.body),
    };
  }
}

export const rateLimitHeaders = (remaining: number, resetAfter: number, bucket = "bucket-a", limit = 5) => ({
  "X-RateLimit-Limit": String(limit),
  "X-RateLimit-Remaining": String(remaining),
  "X-RateLimit-Reset-After": String(resetAfter),
  "X-RateLimit-Bucket": bucket,
});
