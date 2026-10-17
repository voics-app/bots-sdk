/** Configuration read from the environment and validated at startup. */
export interface BotConfig {
  token: string;
  applicationId: string;
  /** Register commands in this guild only (instant updates while developing). */
  guildId: string | undefined;
  apiUrl: string | undefined;
  gatewayUrl: string | undefined;
}

const SNOWFLAKE = /^\d{1,20}$/;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): BotConfig {
  const errors: string[] = [];
  const required = (name: string): string => {
    const value = env[name]?.trim();
    if (!value) errors.push(`${name} is required`);
    return value ?? "";
  };
  const optional = (name: string): string | undefined => env[name]?.trim() || undefined;

  const config: BotConfig = {
    token: required("DISCORDY_BOT_TOKEN"),
    applicationId: required("DISCORDY_APPLICATION_ID"),
    guildId: optional("DISCORDY_GUILD_ID"),
    apiUrl: optional("DISCORDY_API_URL"),
    gatewayUrl: optional("DISCORDY_GATEWAY_URL"),
  };
  if (config.applicationId && !SNOWFLAKE.test(config.applicationId)) errors.push("DISCORDY_APPLICATION_ID must be a snowflake");
  if (config.guildId && !SNOWFLAKE.test(config.guildId)) errors.push("DISCORDY_GUILD_ID must be a snowflake");
  if (errors.length > 0) throw new Error(`Invalid configuration:\n  - ${errors.join("\n  - ")}`);
  return config;
}
