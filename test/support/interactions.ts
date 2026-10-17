import type { ApiInteraction, ApiInteractionDataOption } from "../../src/contracts/index.js";

const member = {
  user: { id: "42", username: "mod", avatar: null },
  roles: [],
  joined_at: "2026-01-01T00:00:00Z",
  permissions: "2",
};

export function commandInteraction(name: string, options: ApiInteractionDataOption[] = [], extra: Partial<ApiInteraction> = {}): ApiInteraction {
  return {
    id: "1000",
    application_id: "800",
    type: 2,
    token: "itoken",
    version: 1,
    guild_id: "100",
    channel_id: "200",
    member,
    data: { id: "c1", name, type: 1, options },
    ...extra,
  };
}

export function componentInteraction(customId: string, extra: Partial<ApiInteraction> = {}): ApiInteraction {
  return {
    id: "1001",
    application_id: "800",
    type: 3,
    token: "ctoken",
    version: 1,
    guild_id: "100",
    channel_id: "200",
    member,
    data: { custom_id: customId, component_type: 2 },
    ...extra,
  };
}

export function modalInteraction(customId: string, values: Record<string, string>): ApiInteraction {
  return {
    id: "1002",
    application_id: "800",
    type: 5,
    token: "mtoken",
    version: 1,
    user: { id: "42", username: "mod", avatar: null },
    data: {
      custom_id: customId,
      components: Object.entries(values).map(([id, value]) => ({ type: 1, components: [{ type: 4, custom_id: id, value }] })),
    },
  };
}
