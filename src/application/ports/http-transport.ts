import type { HeaderReader } from "../../domain/ratelimit/rate-limit-headers.js";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequest {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export interface HttpResponse {
  status: number;
  header: HeaderReader;
  body: string;
}

/** Sends one HTTP request. Implementations must not throw for non-2xx statuses. */
export interface HttpTransport {
  send(request: HttpRequest): Promise<HttpResponse>;
}
