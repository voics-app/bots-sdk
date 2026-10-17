[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / DiscordyApi

# Class: DiscordyApi

Typed helpers for the bot-relevant P9 endpoints. Anything else is reachable through [RestClient](RestClient.md).

## Constructors

### Constructor

> **new DiscordyApi**(`rest`): `DiscordyApi`

#### Parameters

##### rest

[`RestClient`](RestClient.md)

#### Returns

`DiscordyApi`

## Properties

### applications

> `readonly` **applications**: `object`

#### get

> **get**: (`applicationId`) => `Promise`\<[`ApiApplication`](../interfaces/ApiApplication.md)\>

##### Parameters

###### applicationId

`string`

##### Returns

`Promise`\<[`ApiApplication`](../interfaces/ApiApplication.md)\>

***

### channels

> `readonly` **channels**: `object`

#### createInvite

> **createInvite**: (`channelId`, `body`) => `Promise`\<[`ApiInvite`](../interfaces/ApiInvite.md)\>

##### Parameters

###### channelId

`string`

###### body?

###### max_age?

`number`

###### max_uses?

`number`

###### temporary?

`boolean`

##### Returns

`Promise`\<[`ApiInvite`](../interfaces/ApiInvite.md)\>

#### createWebhook

> **createWebhook**: (`channelId`, `body`, `__namedParameters`) => `Promise`\<[`ApiWebhook`](../interfaces/ApiWebhook.md)\>

##### Parameters

###### channelId

`string`

###### body

###### avatar?

`string` \| `null`

###### name

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<[`ApiWebhook`](../interfaces/ApiWebhook.md)\>

#### delete

> **delete**: (`channelId`, `__namedParameters`) => `Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

##### Parameters

###### channelId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

#### deletePermission

> **deletePermission**: (`channelId`, `overwriteId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

###### overwriteId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### edit

> **edit**: (`channelId`, `body`, `__namedParameters`) => `Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

##### Parameters

###### channelId

`string`

###### body

`Partial`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

#### editPermission

> **editPermission**: (`channelId`, `overwriteId`, `body`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

###### overwriteId

`string`

###### body

###### allow?

`string`

###### deny?

`string`

###### type

`0` \| `1`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### get

> **get**: (`channelId`) => `Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

##### Parameters

###### channelId

`string`

##### Returns

`Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

#### typing

> **typing**: (`channelId`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

##### Returns

`Promise`\<`undefined`\>

***

### commands

> `readonly` **commands**: `object`

#### create

> **create**: (`applicationId`, `command`, `guildId?`) => `Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)\>

##### Parameters

###### applicationId

`string`

###### command

[`CommandData`](../type-aliases/CommandData.md)

###### guildId?

`string`

##### Returns

`Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)\>

#### delete

> **delete**: (`applicationId`, `commandId`, `guildId?`) => `Promise`\<`undefined`\>

##### Parameters

###### applicationId

`string`

###### commandId

`string`

###### guildId?

`string`

##### Returns

`Promise`\<`undefined`\>

#### edit

> **edit**: (`applicationId`, `commandId`, `command`, `guildId?`) => `Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)\>

##### Parameters

###### applicationId

`string`

###### commandId

`string`

###### command

`Partial`\<[`ApiApplicationCommandCreateBody`](../interfaces/ApiApplicationCommandCreateBody.md)\>

###### guildId?

`string`

##### Returns

`Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)\>

#### list

> **list**: (`applicationId`, `guildId?`) => `Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)[]\>

##### Parameters

###### applicationId

`string`

###### guildId?

`string`

##### Returns

`Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)[]\>

#### set

> **set**: (`applicationId`, `commands`, `guildId?`) => `Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)[]\>

Replaces every command (global, or in one guild) with `commands` in a single call.

##### Parameters

###### applicationId

`string`

###### commands

[`CommandData`](../type-aliases/CommandData.md)[]

###### guildId?

`string`

##### Returns

`Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)[]\>

***

### guilds

> `readonly` **guilds**: `object`

#### addMemberRole

> **addMemberRole**: (`guildId`, `userId`, `roleId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### guildId

`string`

###### userId

`string`

###### roleId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### ban

> **ban**: (`guildId`, `userId`, `body`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### guildId

`string`

###### userId

`string`

###### body?

###### delete_message_seconds?

`number`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### channels

> **channels**: (`guildId`) => `Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)[]\>

##### Parameters

###### guildId

`string`

##### Returns

`Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)[]\>

#### createChannel

> **createChannel**: (`guildId`, `body`, `__namedParameters`) => `Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

##### Parameters

###### guildId

`string`

###### body

`Partial`\<[`ApiChannel`](../interfaces/ApiChannel.md)\> & `object`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

#### editMember

> **editMember**: (`guildId`, `userId`, `body`, `__namedParameters`) => `Promise`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md)\>

##### Parameters

###### guildId

`string`

###### userId

`string`

###### body

`Partial`\<`Pick`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md), `"nick"` \| `"roles"` \| `"mute"` \| `"deaf"` \| `"communication_disabled_until"`\>\>

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md)\>

#### get

> **get**: (`guildId`) => `Promise`\<[`ApiGuild`](../interfaces/ApiGuild.md)\>

##### Parameters

###### guildId

`string`

##### Returns

`Promise`\<[`ApiGuild`](../interfaces/ApiGuild.md)\>

#### kick

> **kick**: (`guildId`, `userId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### guildId

`string`

###### userId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### member

> **member**: (`guildId`, `userId`) => `Promise`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md)\>

##### Parameters

###### guildId

`string`

###### userId

`string`

##### Returns

`Promise`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md)\>

#### members

> **members**: (`guildId`, `query`) => `Promise`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md)[]\>

##### Parameters

###### guildId

`string`

###### query?

###### after?

`string`

###### limit?

`number`

##### Returns

`Promise`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md)[]\>

#### removeMemberRole

> **removeMemberRole**: (`guildId`, `userId`, `roleId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### guildId

`string`

###### userId

`string`

###### roleId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### roles

> **roles**: (`guildId`) => `Promise`\<[`ApiRole`](../interfaces/ApiRole.md)[]\>

##### Parameters

###### guildId

`string`

##### Returns

`Promise`\<[`ApiRole`](../interfaces/ApiRole.md)[]\>

#### unban

> **unban**: (`guildId`, `userId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### guildId

`string`

###### userId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### webhooks

> **webhooks**: (`guildId`) => `Promise`\<[`ApiWebhook`](../interfaces/ApiWebhook.md)[]\>

##### Parameters

###### guildId

`string`

##### Returns

`Promise`\<[`ApiWebhook`](../interfaces/ApiWebhook.md)[]\>

***

### messages

> `readonly` **messages**: `object`

#### bulkDelete

> **bulkDelete**: (`channelId`, `messageIds`, `__namedParameters`) => `Promise`\<`undefined`\>

Deletes 2-100 messages at once.

##### Parameters

###### channelId

`string`

###### messageIds

`string`[]

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### delete

> **delete**: (`channelId`, `messageId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

###### messageId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### edit

> **edit**: (`channelId`, `messageId`, `payload`) => `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

##### Parameters

###### channelId

`string`

###### messageId

`string`

###### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

##### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

#### get

> **get**: (`channelId`, `messageId`) => `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

##### Parameters

###### channelId

`string`

###### messageId

`string`

##### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

#### list

> **list**: (`channelId`, `query`) => `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)[]\>

##### Parameters

###### channelId

`string`

###### query?

[`MessageQuery`](../interfaces/MessageQuery.md) = `{}`

##### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)[]\>

#### pin

> **pin**: (`channelId`, `messageId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

###### messageId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### pins

> **pins**: (`channelId`) => `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)[]\>

##### Parameters

###### channelId

`string`

##### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)[]\>

#### react

> **react**: (`channelId`, `messageId`, `emoji`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

###### messageId

`string`

###### emoji

`string`

##### Returns

`Promise`\<`undefined`\>

#### send

> **send**: (`channelId`, `payload`) => `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

##### Parameters

###### channelId

`string`

###### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

##### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

#### unpin

> **unpin**: (`channelId`, `messageId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

###### messageId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### unreact

> **unreact**: (`channelId`, `messageId`, `emoji`) => `Promise`\<`undefined`\>

##### Parameters

###### channelId

`string`

###### messageId

`string`

###### emoji

`string`

##### Returns

`Promise`\<`undefined`\>

***

### users

> `readonly` **users**: `object`

#### createDM

> **createDM**: (`recipientIds`) => `Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

Opens (or returns) a DM channel with the given users.

##### Parameters

###### recipientIds

`string`[]

##### Returns

`Promise`\<[`ApiChannel`](../interfaces/ApiChannel.md)\>

#### get

> **get**: (`userId`) => `Promise`\<[`ApiUser`](../interfaces/ApiUser.md)\>

##### Parameters

###### userId

`string`

##### Returns

`Promise`\<[`ApiUser`](../interfaces/ApiUser.md)\>

#### me

> **me**: () => `Promise`\<[`ApiUser`](../interfaces/ApiUser.md)\>

##### Returns

`Promise`\<[`ApiUser`](../interfaces/ApiUser.md)\>

***

### webhooks

> `readonly` **webhooks**: `object`

#### delete

> **delete**: (`webhookId`, `__namedParameters`) => `Promise`\<`undefined`\>

##### Parameters

###### webhookId

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<`undefined`\>

#### edit

> **edit**: (`webhookId`, `body`, `__namedParameters`) => `Promise`\<[`ApiWebhook`](../interfaces/ApiWebhook.md)\>

##### Parameters

###### webhookId

`string`

###### body

###### avatar?

`string` \| `null`

###### channel_id?

`string`

###### name?

`string`

###### \_\_namedParameters?

[`ReasonOption`](../interfaces/ReasonOption.md) = `{}`

##### Returns

`Promise`\<[`ApiWebhook`](../interfaces/ApiWebhook.md)\>
