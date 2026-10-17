/**
 * Composition root: the only place that binds application ports to concrete adapters.
 * Public classes call these factories for any adapter the caller did not inject.
 * @module
 */
import type { Clock, RandomSource } from "./application/ports/clock.js";
import type { GatewaySocketFactory } from "./application/ports/gateway-socket.js";
import type { HttpTransport } from "./application/ports/http-transport.js";
import { FetchHttpTransport } from "./infrastructure/fetch-http-transport.js";
import { systemClock } from "./infrastructure/system-clock.js";
import { createWebSocketFactory, type WebSocketConstructor } from "./infrastructure/websocket-gateway-socket.js";

export function defaultTransport(fetchImpl?: typeof fetch): HttpTransport {
  return new FetchHttpTransport(fetchImpl);
}

export function defaultClock(): Clock {
  return systemClock;
}

export function defaultRandom(): RandomSource {
  return Math.random;
}

export function defaultSocketFactory(WebSocketImpl?: WebSocketConstructor): GatewaySocketFactory {
  return createWebSocketFactory(WebSocketImpl);
}
