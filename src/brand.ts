/**
 * The single source of the product name and default hosts in the SDK. To rebrand, change this file only.
 * Class names such as `DiscordyApi` and the package name are internal identifiers and stay as they are.
 */
export const BRAND = {
  /** Product name; also the stem of the REST User-Agent (`<name>Bot`). */
  name: "Voics",
  /** Public web origin that serves the bot authorization page and invite links. */
  webUrl: "https://discordy.voics.nl",
  /** Default public REST base URL. */
  apiUrl: "https://discordy-api.voics.nl/api/v1",
  /** Default gateway URL without query. */
  gatewayUrl: "wss://discordy-gateway.voics.nl/gateway",
} as const;
