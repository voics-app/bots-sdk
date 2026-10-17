import {
  ApplicationCommandTypes,
  InteractionContextTypes,
  type ApiApplicationCommandCreateBody,
  type InteractionContextType,
} from "../../contracts/index.js";
import { Permissions, type PermissionResolvable } from "../bitfield/permissions.js";
import { assertDefined, assertLength } from "./assert.js";
import type { InteractionContextResolvable } from "./slash-command.js";

/** Builds a user or message context-menu command (right-click → Apps). */
export class ContextMenuCommandBuilder {
  private name?: string;
  private type?: typeof ApplicationCommandTypes.User | typeof ApplicationCommandTypes.Message;
  private defaultMemberPermissions?: string | null;
  private contexts?: InteractionContextType[];

  /** 1-32 characters; unlike slash commands, spaces and capitals are allowed. */
  setName(name: string): this {
    this.name = assertLength("name", name, 1, 32);
    return this;
  }

  setType(type: "User" | "Message"): this {
    this.type = ApplicationCommandTypes[type];
    return this;
  }

  setDefaultMemberPermissions(permissions: PermissionResolvable | null): this {
    this.defaultMemberPermissions = permissions === null ? null : new Permissions(permissions).toString();
    return this;
  }

  setContexts(...contexts: InteractionContextResolvable[]): this {
    this.contexts = contexts.map((c) => (typeof c === "number" ? c : InteractionContextTypes[c]));
    return this;
  }

  toJSON(): ApiApplicationCommandCreateBody {
    return {
      name: assertDefined("name", this.name),
      type: assertDefined("type", this.type),
      contexts: this.contexts,
      default_member_permissions: this.defaultMemberPermissions,
    };
  }
}
