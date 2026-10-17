import type { Snowflake } from "../contracts/index.js";
import { Permissions, type PermissionResolvable } from "./bitfield/permissions.js";

/** Default web origin that serves the bot authorization page. */
export const DEFAULT_WEB_URL = "https://discordy.voics.nl";

export type OAuth2Scope = "bot" | "applications.commands";

export interface InviteUrlOptions {
  /** The application (client) id. */
  clientId: Snowflake;
  /** Permissions the bot asks for when it joins. */
  permissions?: PermissionResolvable;
  /** Defaults to `["bot", "applications.commands"]`. */
  scopes?: OAuth2Scope[];
  /** Preselect a guild. */
  guildId?: Snowflake;
  disableGuildSelect?: boolean;
  /** Web origin, default {@link DEFAULT_WEB_URL}. */
  baseUrl?: string;
}

/** Builds the URL a server admin opens to add the bot to a guild with the given permissions. */
export function buildInviteUrl(options: InviteUrlOptions): string {
  const params = new URLSearchParams({
    client_id: options.clientId,
    scope: (options.scopes ?? ["bot", "applications.commands"]).join(" "),
    permissions: new Permissions(options.permissions ?? 0n).toString(),
  });
  if (options.guildId) params.set("guild_id", options.guildId);
  if (options.disableGuildSelect) params.set("disable_guild_select", "true");
  return `${(options.baseUrl ?? DEFAULT_WEB_URL).replace(/\/+$/, "")}/oauth2/authorize?${params.toString()}`;
}
