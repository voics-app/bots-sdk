/** Raised when a value violates a Voics/Discord constraint (builders, resolvers, bitfields). */
export class ValidationError extends RangeError {
  override readonly name = "ValidationError";
}

/** Raised when an interaction is answered in a way its current state does not allow. */
export class InteractionStateError extends Error {
  override readonly name = "InteractionStateError";
}
