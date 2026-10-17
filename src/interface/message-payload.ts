import {
  MessageFlags,
  type ApiActionRow,
  type ApiAllowedMentions,
  type ApiEmbed,
  type ApiMessageCreateBody,
  type ApiMessageReference,
} from "../contracts/index.js";
import { toJSONValue, type JSONEncodable } from "../domain/builders/assert.js";

/** Message content as accepted by every send/reply/edit method. */
export interface MessageOptions {
  content?: string;
  embeds?: (ApiEmbed | JSONEncodable<ApiEmbed>)[];
  components?: (ApiActionRow | JSONEncodable<ApiActionRow>)[];
  allowed_mentions?: ApiAllowedMentions;
  message_reference?: ApiMessageReference;
  tts?: boolean;
  flags?: number;
  /** Only the invoking user sees the message (interaction replies and follow-ups only). */
  ephemeral?: boolean;
}

/** A plain string is shorthand for `{ content }`. */
export type MessagePayload = string | MessageOptions;

/** Converts a {@link MessagePayload} into the wire body, serializing builders. */
export function toMessageBody(payload: MessagePayload): ApiMessageCreateBody {
  if (typeof payload === "string") return { content: payload };
  const { ephemeral, embeds, components, flags, ...rest } = payload;
  const resolvedFlags = (flags ?? 0) | (ephemeral ? MessageFlags.Ephemeral : 0);
  return {
    ...rest,
    ...(embeds ? { embeds: embeds.map((e) => toJSONValue<ApiEmbed>(e)) } : {}),
    ...(components ? { components: components.map((c) => toJSONValue<ApiActionRow>(c)) } : {}),
    ...(resolvedFlags !== 0 ? { flags: resolvedFlags } : {}),
  };
}
