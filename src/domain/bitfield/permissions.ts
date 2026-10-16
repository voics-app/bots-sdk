import { PermissionFlagsBits, type PermissionName } from "../../contracts/index.js";
import type { ApiPermissionOverwrite, Snowflake } from "../../contracts/index.js";
import { ValidationError } from "../errors.js";

/** Anything that can be turned into a permission bitfield. */
export type PermissionResolvable = bigint | `${bigint}` | PermissionName | Permissions | readonly PermissionResolvable[];

export interface PermissionCheckOptions {
  /** Treat ADMINISTRATOR as granting every permission (default `true`). */
  checkAdmin?: boolean;
}

const FLAG_ENTRIES = Object.entries(PermissionFlagsBits) as [PermissionName, bigint][];

/** Immutable 64-bit permission bitfield using Discord's bit values. */
export class Permissions {
  static readonly Flags = PermissionFlagsBits;
  static readonly All: bigint = FLAG_ENTRIES.reduce((all, [, bit]) => all | bit, 0n);
  static readonly None = 0n;

  readonly bitfield: bigint;

  constructor(permissions: PermissionResolvable = 0n) {
    this.bitfield = Permissions.resolve(permissions);
  }

  static resolve(permissions: PermissionResolvable): bigint {
    if (typeof permissions === "bigint") return permissions;
    if (permissions instanceof Permissions) return permissions.bitfield;
    if (Array.isArray(permissions)) {
      return (permissions as readonly PermissionResolvable[]).reduce<bigint>((all, p) => all | Permissions.resolve(p), 0n);
    }
    if (typeof permissions === "string") {
      if (/^\d+$/.test(permissions)) return BigInt(permissions);
      const bit = (PermissionFlagsBits as Record<string, bigint>)[permissions];
      if (bit === undefined) throw new ValidationError(`Unknown permission "${permissions}"`);
      return bit;
    }
    throw new ValidationError(`Cannot resolve permissions from ${String(permissions)}`);
  }

  has(permissions: PermissionResolvable, { checkAdmin = true }: PermissionCheckOptions = {}): boolean {
    if (checkAdmin && this.isAdministrator()) return true;
    const wanted = Permissions.resolve(permissions);
    return (this.bitfield & wanted) === wanted;
  }

  any(permissions: PermissionResolvable, { checkAdmin = true }: PermissionCheckOptions = {}): boolean {
    if (checkAdmin && this.isAdministrator()) return true;
    return (this.bitfield & Permissions.resolve(permissions)) !== 0n;
  }

  missing(permissions: PermissionResolvable, options: PermissionCheckOptions = {}): PermissionName[] {
    return new Permissions(permissions).toArray().filter((name) => !this.has(name, options));
  }

  add(...permissions: PermissionResolvable[]): Permissions {
    return new Permissions(this.bitfield | Permissions.resolve(permissions));
  }

  remove(...permissions: PermissionResolvable[]): Permissions {
    return new Permissions(this.bitfield & ~Permissions.resolve(permissions));
  }

  equals(permissions: PermissionResolvable): boolean {
    return this.bitfield === Permissions.resolve(permissions);
  }

  toArray(): PermissionName[] {
    return FLAG_ENTRIES.filter(([, bit]) => (this.bitfield & bit) === bit).map(([name]) => name);
  }

  toString(): string {
    return this.bitfield.toString();
  }

  toJSON(): string {
    return this.toString();
  }

  private isAdministrator(): boolean {
    return (this.bitfield & PermissionFlagsBits.Administrator) === PermissionFlagsBits.Administrator;
  }
}

export interface PermissionContext {
  guild: { id: Snowflake; owner_id: Snowflake; roles: readonly { id: Snowflake; permissions: string }[] };
  member: { user_id: Snowflake; roles: readonly Snowflake[] };
  channel?: { permission_overwrites?: readonly ApiPermissionOverwrite[] };
}

/**
 * Computes a member's effective permissions using Discord's algorithm (P9):
 * base from @everyone and roles, owner/ADMINISTRATOR grants all, then channel overwrites
 * (@everyone, role denies, role allows, member), and nothing without VIEW_CHANNEL.
 */
export function computePermissions({ guild, member, channel }: PermissionContext): Permissions {
  const base = computeBasePermissions(guild, member);
  if (base === Permissions.All || !channel) return new Permissions(base);
  return new Permissions(applyOverwrites(base, guild.id, member, channel.permission_overwrites ?? []));
}

function computeBasePermissions(guild: PermissionContext["guild"], member: PermissionContext["member"]): bigint {
  if (guild.owner_id === member.user_id) return Permissions.All;
  const memberRoles = new Set([guild.id, ...member.roles]);
  const base = guild.roles
    .filter((role) => memberRoles.has(role.id))
    .reduce((all, role) => all | BigInt(role.permissions), 0n);
  return (base & PermissionFlagsBits.Administrator) !== 0n ? Permissions.All : base;
}

interface OverwriteBits {
  allow: bigint;
  deny: bigint;
}

function toBits(overwrite: ApiPermissionOverwrite): OverwriteBits {
  return { allow: BigInt(overwrite.allow), deny: BigInt(overwrite.deny) };
}

function applyOverwrite(perms: bigint, overwrite: OverwriteBits | undefined): bigint {
  return overwrite ? (perms & ~overwrite.deny) | overwrite.allow : perms;
}

function applyOverwrites(
  base: bigint,
  guildId: Snowflake,
  member: PermissionContext["member"],
  overwrites: readonly ApiPermissionOverwrite[],
): bigint {
  const everyone = overwrites.find((o) => o.type === 0 && o.id === guildId);
  const roles = overwrites
    .filter((o) => o.type === 0 && o.id !== guildId && member.roles.includes(o.id))
    .map(toBits)
    .reduce<OverwriteBits>((acc, o) => ({ allow: acc.allow | o.allow, deny: acc.deny | o.deny }), { allow: 0n, deny: 0n });
  const memberOverwrite = overwrites.find((o) => o.type === 1 && o.id === member.user_id);

  let perms = applyOverwrite(base, everyone && toBits(everyone));
  perms = applyOverwrite(perms, roles);
  perms = applyOverwrite(perms, memberOverwrite && toBits(memberOverwrite));
  return (perms & PermissionFlagsBits.ViewChannel) === 0n ? 0n : perms;
}
