/** Sliding-window budget for outgoing gateway frames (P7: 120 sends per 60 seconds per session). */
export class SendBudget {
  private readonly sentAt: number[] = [];

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  /** Milliseconds to wait before another frame may be sent. */
  waitTime(now: number): number {
    this.evict(now);
    if (this.sentAt.length < this.limit) return 0;
    const oldest = this.sentAt[0] ?? now;
    return oldest + this.windowMs - now;
  }

  consume(now: number): void {
    this.evict(now);
    this.sentAt.push(now);
  }

  private evict(now: number): void {
    while (this.sentAt.length > 0 && (this.sentAt[0] ?? now) + this.windowMs <= now) this.sentAt.shift();
  }
}
