import type { ApiRateLimitBody } from "../../contracts/index.js";
import { RateLimitBucket } from "../../domain/ratelimit/rate-limit-bucket.js";
import { parseRateLimitHeaders, retryAfterMs } from "../../domain/ratelimit/rate-limit-headers.js";
import { routeOf } from "../../domain/ratelimit/route.js";
import type { Clock } from "../ports/clock.js";
import type { HttpRequest, HttpResponse, HttpTransport } from "../ports/http-transport.js";

/** A request plus the API path used to derive its rate-limit bucket. */
export interface RoutedRequest extends HttpRequest {
  /** Path relative to the API base, e.g. `/channels/1/messages`. */
  path: string;
}

export interface RateLimitedEvent {
  route: string;
  major: string;
  retryAfterMs: number;
  global: boolean;
}

export interface RateLimitedRequesterOptions {
  transport: HttpTransport;
  clock: Clock;
  /** Retries for 429 and transient 5xx responses (default 3). */
  retries?: number;
  onRateLimited?: (event: RateLimitedEvent) => void;
}

const TRANSIENT_STATUSES = new Set([500, 502, 503, 504]);
const SERVER_ERROR_BASE_DELAY_MS = 500;

/**
 * Sends REST requests through per-bucket FIFO queues, honouring `X-RateLimit-*` headers,
 * retrying 429 (bucket and global) and transient server errors.
 */
export class RateLimitedRequester {
  private readonly queues = new Map<string, Promise<unknown>>();
  private readonly buckets = new Map<string, RateLimitBucket>();
  private readonly bucketHashes = new Map<string, string>();
  private globalResetAt = 0;
  private readonly retries: number;

  constructor(private readonly options: RateLimitedRequesterOptions) {
    this.retries = options.retries ?? 3;
  }

  execute(request: RoutedRequest): Promise<HttpResponse> {
    const { route, major } = routeOf(request.method, request.path);
    return this.enqueue(this.bucketKey(route, major), () => this.send(request, route, major));
  }

  private enqueue<T>(key: string, task: () => Promise<T>): Promise<T> {
    const previous = this.queues.get(key) ?? Promise.resolve();
    const result = previous.then(task, task);
    const tail = result.catch(() => undefined);
    this.queues.set(key, tail);
    void tail.then(() => {
      if (this.queues.get(key) === tail) this.queues.delete(key);
    });
    return result;
  }

  private async send(request: RoutedRequest, route: string, major: string): Promise<HttpResponse> {
    const { clock, transport } = this.options;
    for (let attempt = 0; ; attempt++) {
      await this.waitForGlobalReset();
      const bucket = this.bucketFor(route, major);
      const wait = bucket.waitTime(clock.now());
      if (wait > 0) await clock.sleep(wait);
      bucket.consume(clock.now());

      const { method, url, headers, body } = request;
      const response = await transport.send({ method, url, headers, body });
      this.recordHeaders(response, route, major);

      const canRetry = attempt < this.retries;
      if (response.status === 429) {
        if (!canRetry) return response;
        await this.backOffFromRateLimit(response, route, major);
      } else if (TRANSIENT_STATUSES.has(response.status) && canRetry) {
        await clock.sleep(SERVER_ERROR_BASE_DELAY_MS * 2 ** attempt);
      } else {
        return response;
      }
    }
  }

  private async backOffFromRateLimit(response: HttpResponse, route: string, major: string): Promise<void> {
    const body = parseRateLimitBody(response.body);
    const delay = retryAfterMs(response.header, body);
    const global = body?.global === true || response.header("x-ratelimit-global") === "true";
    this.options.onRateLimited?.({ route, major, retryAfterMs: delay, global });
    if (global) this.globalResetAt = this.options.clock.now() + delay;
    else await this.options.clock.sleep(delay);
  }

  private async waitForGlobalReset(): Promise<void> {
    const wait = this.globalResetAt - this.options.clock.now();
    if (wait > 0) await this.options.clock.sleep(wait);
  }

  private recordHeaders(response: HttpResponse, route: string, major: string): void {
    const now = this.options.clock.now();
    const info = parseRateLimitHeaders(response.header, now);
    if (!info) return;
    if (info.bucket) this.bucketHashes.set(route, info.bucket);
    this.bucketFor(route, major).update(info, now);
  }

  private bucketKey(route: string, major: string): string {
    return `${this.bucketHashes.get(route) ?? route}|${major}`;
  }

  private bucketFor(route: string, major: string): RateLimitBucket {
    const key = this.bucketKey(route, major);
    let bucket = this.buckets.get(key);
    if (!bucket) {
      bucket = new RateLimitBucket();
      this.buckets.set(key, bucket);
    }
    return bucket;
  }
}

function parseRateLimitBody(body: string): ApiRateLimitBody | undefined {
  try {
    const parsed: unknown = JSON.parse(body);
    return typeof parsed === "object" && parsed !== null && "retry_after" in parsed ? (parsed as ApiRateLimitBody) : undefined;
  } catch {
    return undefined;
  }
}
