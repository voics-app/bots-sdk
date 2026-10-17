/** Callbacks a gateway socket reports to. */
export interface GatewaySocketHandlers {
  onOpen(): void;
  onMessage(data: string): void;
  onClose(code: number, reason: string): void;
  onError(error: Error): void;
}

/** A text WebSocket connected to the gateway. */
export interface GatewaySocket {
  send(data: string): void;
  close(code: number, reason?: string): void;
}

/** Opens a WebSocket to `url` and wires it to `handlers`. */
export type GatewaySocketFactory = (url: string, handlers: GatewaySocketHandlers) => GatewaySocket;
