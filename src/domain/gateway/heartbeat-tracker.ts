/** Tracks heartbeat acknowledgements to measure latency and detect zombie connections. */
export class HeartbeatTracker {
  private sentAt: number | null = null;
  private acknowledged = true;
  private latency: number | null = null;

  /** Round-trip time of the last acknowledged heartbeat, in milliseconds. */
  get latencyMs(): number | null {
    return this.latency;
  }

  /**
   * Records an outgoing heartbeat.
   * @returns `false` when the previous heartbeat was never acknowledged (zombie connection).
   */
  beat(now: number): boolean {
    if (!this.acknowledged) return false;
    this.acknowledged = false;
    this.sentAt = now;
    return true;
  }

  ack(now: number): void {
    this.acknowledged = true;
    if (this.sentAt !== null) this.latency = now - this.sentAt;
  }

  reset(): void {
    this.sentAt = null;
    this.acknowledged = true;
    this.latency = null;
  }
}
