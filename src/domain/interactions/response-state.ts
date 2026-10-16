import { InteractionStateError } from "../errors.js";

/** The family of interaction being answered. */
export type InteractionKind = "command" | "component" | "modal" | "autocomplete";

/** Every way an interaction can be answered. */
export type InteractionAction =
  | "reply"
  | "defer"
  | "update"
  | "deferUpdate"
  | "showModal"
  | "respond"
  | "editReply"
  | "followUp"
  | "deleteReply";

const INITIAL_ACTIONS: Record<Exclude<InteractionAction, "editReply" | "followUp" | "deleteReply">, readonly InteractionKind[]> = {
  reply: ["command", "component", "modal"],
  defer: ["command", "component", "modal"],
  update: ["component", "modal"],
  deferUpdate: ["component", "modal"],
  showModal: ["command", "component"],
  respond: ["autocomplete"],
};

/**
 * Enforces Discord's interaction response rules: one initial callback, and edits or
 * follow-ups only after an acknowledgement.
 */
export class InteractionResponseState {
  private initial: InteractionAction | null = null;

  constructor(private readonly kind: InteractionKind) {}

  get acknowledged(): boolean {
    return this.initial !== null;
  }

  get deferred(): boolean {
    return this.initial === "defer" || this.initial === "deferUpdate";
  }

  /** Asserts that `action` is allowed now and records it. */
  transition(action: InteractionAction): void {
    if (action === "editReply" || action === "followUp" || action === "deleteReply") {
      if (!this.initial || this.initial === "showModal" || this.initial === "respond") {
        throw new InteractionStateError(`Cannot ${action}: the interaction has not been acknowledged with a message`);
      }
      return;
    }
    if (!INITIAL_ACTIONS[action].includes(this.kind)) {
      throw new InteractionStateError(`A ${this.kind} interaction cannot ${action}`);
    }
    if (this.initial) throw new InteractionStateError(`Cannot ${action}: the interaction has already been acknowledged`);
    this.initial = action;
  }
}
