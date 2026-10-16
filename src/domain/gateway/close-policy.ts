import { GatewayCloseCodes } from "../../contracts/index.js";

/** What the client should do after the gateway connection closed. */
export type CloseAction = "resume" | "reidentify" | "fatal";

export interface CloseDecision {
  action: CloseAction;
  reason: string;
}

const FATAL: Record<number, string> = {
  [GatewayCloseCodes.AuthenticationFailed]: "Authentication failed: the bot token is invalid",
  [GatewayCloseCodes.InvalidIntents]: "Invalid intents: the intents bitfield is malformed",
  [GatewayCloseCodes.DisallowedIntents]: "Disallowed intents: enable the privileged intents for this application first",
};

const REIDENTIFY: Record<number, string> = {
  [GatewayCloseCodes.NotAuthenticated]: "Sent a payload before identifying",
  [GatewayCloseCodes.AlreadyAuthenticated]: "Identified more than once",
  [GatewayCloseCodes.InvalidSeq]: "Invalid sequence number on resume",
  [GatewayCloseCodes.SessionTimedOut]: "Session timed out",
};

/** Maps a WebSocket close code to the recovery strategy defined by the P7 close-code table. */
export function classifyClose(code: number): CloseDecision {
  const fatal = FATAL[code];
  if (fatal) return { action: "fatal", reason: fatal };
  const reidentify = REIDENTIFY[code];
  if (reidentify) return { action: "reidentify", reason: reidentify };
  return { action: "resume", reason: `Connection closed with code ${code}` };
}
