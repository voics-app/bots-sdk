[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / InviteUrlOptions

# Interface: InviteUrlOptions

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Web origin, default [DEFAULT\_WEB\_URL](../variables/DEFAULT_WEB_URL.md).

***

### clientId

> **clientId**: `string`

The application (client) id.

***

### disableGuildSelect?

> `optional` **disableGuildSelect?**: `boolean`

***

### guildId?

> `optional` **guildId?**: `string`

Preselect a guild.

***

### permissions?

> `optional` **permissions?**: [`PermissionResolvable`](../type-aliases/PermissionResolvable.md)

Permissions the bot asks for when it joins.

***

### scopes?

> `optional` **scopes?**: [`OAuth2Scope`](../type-aliases/OAuth2Scope.md)[]

Defaults to `["bot", "applications.commands"]`.
