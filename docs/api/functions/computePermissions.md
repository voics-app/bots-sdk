[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / computePermissions

# Function: computePermissions()

> **computePermissions**(`__namedParameters`): [`Permissions`](../classes/Permissions.md)

Computes a member's effective permissions using Discord's algorithm (P9):
base from the everyone role and member roles, owner/ADMINISTRATOR grants all, then channel overwrites
(everyone, role denies, role allows, member), and nothing without VIEW_CHANNEL.

## Parameters

### \_\_namedParameters

[`PermissionContext`](../interfaces/PermissionContext.md)

## Returns

[`Permissions`](../classes/Permissions.md)
