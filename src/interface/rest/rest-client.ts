import type { ApiErrorBody } from "../../contracts/index.js";
import type { Clock } from "../../application/ports/clock.js";
import type { HttpMethod, HttpTransport } from "../../application/ports/http-transport.js";
import { RateLimitedRequester, type RateLimitedEvent } from "../../application/rest/rate-limited-requester.js";
import { defaultClock, defaultTransport } from "../../composition-root.js";
import { SDK_URL, SDK_VERSION } from "../version.js";
import { DiscordyApiError } from "./discordy-api-error.js";

/** Default public REST base URL (P9 under the default `discordy-api` hostname). */
export const DEFAULT_API_URL = "https://discordy-api.voics.nl/api/v1";

export interface RestClientOptions {
  /** Bot token, sent as `Authorization: Bot <token>`. Can be set later with {@link RestClient.setToken}. */
  token?: string;
  /** Base URL including `/api/v1` (default {@link DEFAULT_API_URL}). */
  baseUrl?: string;
  /** Retries for 429 and transient 5xx responses (default 3). */
  retries?: number;
  onRateLimited?: (event: RateLimitedEvent) => void;
  /** Custom fetch, e.g. for proxies. Ignored when `transport` is given. */
  fetch?: typeof fetch;
  transport?: HttpTransport;
  clock?: Clock;
}

export type QueryValue = string | number | boolean | undefined | null;

export interface RequestOptions {
  body?: unknown;
  query?: Record<string, QueryValue>;
  /** Audit-log reason, sent URL-encoded as `X-Audit-Log-Reason`. */
  reason?: string;
  /** Send the bot token (default `true`; webhook and interaction follow-up calls use `false`). */
  auth?: boolean;
  headers?: Record<string, string>;
}

/** JSON REST client for the Discordy API with automatic rate-limit handling. */
export class RestClient {
  private token: string | undefined;
  private readonly baseUrl: string;
  private readonly requester: RateLimitedRequester;

  constructor(options: RestClientOptions = {}) {
    this.token = options.token;
    this.baseUrl = (options.baseUrl ?? DEFAULT_API_URL).replace(/\/+$/, "");
    this.requester = new RateLimitedRequester({
      transport: options.transport ?? defaultTransport(options.fetch),
      clock: options.clock ?? defaultClock(),
      retries: options.retries,
      onRateLimited: options.onRateLimited,
    });
  }

  setToken(token: string): this {
    this.token = token;
    return this;
  }

  get<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, options);
  }

  post<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", path, options);
  }

  put<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", path, options);
  }

  patch<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("PATCH", path, options);
  }

  delete<T = unknown>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, options);
  }

  async request<T = unknown>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
      "User-Agent": `DiscordyBot (${SDK_URL}, ${SDK_VERSION})`,
      ...options.headers,
    };
    if (options.auth !== false) {
      if (!this.token) throw new Error("A bot token is required: pass `token` or call setToken()");
      headers.Authorization = `Bot ${this.token}`;
    }
    if (options.reason !== undefined) headers["X-Audit-Log-Reason"] = encodeURIComponent(options.reason);
    let body: string | undefined;
    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(options.body);
    }

    const response = await this.requester.execute({ method, path, url: this.baseUrl + path + queryString(options.query), headers, body });
    const parsed = parseJson(response.body);
    if (response.status >= 400) throw new DiscordyApiError(response.status, method, path, isErrorBody(parsed) ? parsed : undefined);
    return parsed as T;
  }
}

function queryString(query: Record<string, QueryValue> | undefined): string {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) if (value !== undefined && value !== null) params.append(key, String(value));
  const encoded = params.toString();
  return encoded ? `?${encoded}` : "";
}

function parseJson(body: string): unknown {
  if (body === "") return undefined;
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

function isErrorBody(value: unknown): value is Partial<ApiErrorBody> {
  return typeof value === "object" && value !== null && ("message" in value || "code" in value);
}
