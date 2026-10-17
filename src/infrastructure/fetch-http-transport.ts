import type { HttpRequest, HttpResponse, HttpTransport } from "../application/ports/http-transport.js";

/** {@link HttpTransport} backed by the WHATWG `fetch` (global in Node.js 18+). */
export class FetchHttpTransport implements HttpTransport {
  constructor(private readonly fetchImpl: typeof fetch = globalThis.fetch) {}

  async send(request: HttpRequest): Promise<HttpResponse> {
    const response = await this.fetchImpl(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });
    const body = await response.text();
    return { status: response.status, header: (name) => response.headers.get(name), body };
  }
}
