import { GatewayIntentBits, PrivilegedIntentNames, type GatewayIntentName } from "../../contracts/index.js";
import { ValidationError } from "../errors.js";

export type IntentResolvable = number | GatewayIntentName | readonly (number | GatewayIntentName)[];

const INTENT_ENTRIES = Object.entries(GatewayIntentBits) as [GatewayIntentName, number][];

function resolve(intents: IntentResolvable): number {
  if (typeof intents === "number") return intents;
  if (typeof intents === "string") {
    const bit = (GatewayIntentBits as Record<string, number>)[intents];
    if (bit === undefined) throw new ValidationError(`Unknown intent "${intents}"`);
    return bit;
  }
  return intents.reduce<number>((all, intent) => all | resolve(intent), 0);
}

function toArray(bits: number): GatewayIntentName[] {
  return INTENT_ENTRIES.filter(([, bit]) => (bits & bit) === bit).map(([name]) => name);
}

/** Helpers for gateway intent bitfields (P7). */
export const Intents = {
  Flags: GatewayIntentBits,
  /** Every intent that needs no approval on the application. */
  NonPrivileged: INTENT_ENTRIES.filter(([name]) => !PrivilegedIntentNames.includes(name)).reduce((all, [, bit]) => all | bit, 0),
  resolve,
  toArray,
  privileged(bits: number): GatewayIntentName[] {
    return toArray(bits).filter((name) => PrivilegedIntentNames.includes(name));
  },
} as const;
