import type { GatewaySocket, GatewaySocketFactory, GatewaySocketHandlers } from "../application/ports/gateway-socket.js";

/** Minimal shape of a WHATWG WebSocket constructor (Node 22+ global, browsers, or the `ws` package). */
export type WebSocketConstructor = new (url: string) => WebSocket;

/** Creates gateway sockets on top of a WHATWG `WebSocket` implementation (defaults to the global one). */
export function createWebSocketFactory(Impl: WebSocketConstructor | undefined = globalThis.WebSocket): GatewaySocketFactory {
  if (!Impl) throw new Error("No WebSocket implementation available: use Node.js 22+ or pass one in the client options");
  return (url: string, handlers: GatewaySocketHandlers): GatewaySocket => {
    const socket = new Impl(url);
    socket.addEventListener("open", () => handlers.onOpen());
    socket.addEventListener("message", (event: MessageEvent) => handlers.onMessage(typeof event.data === "string" ? event.data : String(event.data)));
    socket.addEventListener("close", (event: CloseEvent) => handlers.onClose(event.code, event.reason));
    socket.addEventListener("error", () => handlers.onError(new Error(`WebSocket error on ${url}`)));
    return {
      send: (data) => socket.send(data),
      close: (code, reason) => {
        if (socket.readyState === socket.CLOSING || socket.readyState === socket.CLOSED) return;
        socket.close(code, reason);
      },
    };
  };
}
