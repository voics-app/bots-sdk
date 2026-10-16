import type { GatewayResumeData } from "../../contracts/index.js";

/** Resumable state of a gateway session: its id, last sequence number and resume URL. */
export class GatewaySession {
  private sessionId: string | null = null;
  private sequence: number | null = null;
  private resumeGatewayUrl: string | null = null;

  get id(): string | null {
    return this.sessionId;
  }

  get seq(): number | null {
    return this.sequence;
  }

  get resumeUrl(): string | null {
    return this.resumeGatewayUrl;
  }

  get canResume(): boolean {
    return this.sessionId !== null && this.sequence !== null;
  }

  ready(sessionId: string, resumeUrl?: string): void {
    this.sessionId = sessionId;
    this.resumeGatewayUrl = resumeUrl ?? null;
  }

  track(seq: number | null): void {
    if (seq !== null) this.sequence = seq;
  }

  resumePayload(token: string): GatewayResumeData {
    if (this.sessionId === null || this.sequence === null) throw new Error("Session is not resumable");
    return { token, session_id: this.sessionId, seq: this.sequence };
  }

  invalidate(): void {
    this.sessionId = null;
    this.sequence = null;
    this.resumeGatewayUrl = null;
  }
}
