import type { ApiMessage, Snowflake } from "../../contracts/index.js";
import { toMessageBody, type MessagePayload } from "../message-payload.js";
import { RestClient, type RestClientOptions } from "../rest/rest-client.js";
import { Routes } from "../rest/routes.js";

export type WebhookCredentials = { id: Snowflake; token: string } | { url: string };

export interface WebhookSendOptions {
  /** Override the webhook's display name for this message. */
  username?: string;
  avatar_url?: string;
  /** Post into a thread of the webhook's channel. */
  threadId?: Snowflake;
}

const WEBHOOK_URL = /\/webhooks\/(\d+)\/([^/?#]+)/;

/** Parses `https://…/api/v1/webhooks/{id}/{token}` into credentials. */
export function parseWebhookUrl(url: string): { id: Snowflake; token: string } {
  const match = WEBHOOK_URL.exec(url);
  if (!match?.[1] || !match[2]) throw new Error(`Not a webhook URL: ${url}`);
  return { id: match[1], token: decodeURIComponent(match[2]) };
}

/**
 * Executes a webhook with only its id and token (no bot token needed). Also drives interaction
 * webhooks, whose id is the application id, for follow-ups and edits of the original response.
 */
export class WebhookClient {
  readonly id: Snowflake;
  private readonly token: string;
  private readonly rest: RestClient;
  private readonly auth: boolean;

  /**
   * @param rest share a {@link RestClient} (and its rate-limit state); otherwise one is created from `restOptions`.
   */
  constructor(credentials: WebhookCredentials, options: { rest?: RestClient; restOptions?: RestClientOptions } = {}) {
    const { id, token } = "url" in credentials ? parseWebhookUrl(credentials.url) : credentials;
    this.id = id;
    this.token = token;
    this.rest = options.rest ?? new RestClient(options.restOptions);
    this.auth = options.rest !== undefined;
  }

  /** Posts a message and returns it (the request uses `?wait=true`). */
  send(payload: MessagePayload, options: WebhookSendOptions = {}): Promise<ApiMessage> {
    const { threadId, ...overrides } = options;
    return this.rest.post<ApiMessage>(Routes.webhook(this.id, this.token), {
      body: { ...toMessageBody(payload), ...overrides },
      query: { wait: true, thread_id: threadId },
      auth: this.auth,
    });
  }

  /** Edits the original interaction response (interaction webhooks only). */
  editOriginal(payload: MessagePayload): Promise<ApiMessage> {
    return this.rest.patch<ApiMessage>(Routes.webhookOriginalMessage(this.id, this.token), { body: toMessageBody(payload), auth: this.auth });
  }

  /** Deletes the original interaction response (interaction webhooks only). */
  deleteOriginal(): Promise<void> {
    return this.rest.delete<undefined>(Routes.webhookOriginalMessage(this.id, this.token), { auth: this.auth });
  }
}
