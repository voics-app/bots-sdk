/**
 * Wire contracts shared by every layer (shared kernel).
 *
 * This module mirrors the pinned interfaces P7 and P9 and is the single place to swap in the
 * generated `@discordy-voics/contracts` package once it is published.
 * @module
 */
export * from "./gateway.js";
export * from "./intents.js";
export * from "./permissions.js";
export * from "./rest.js";
