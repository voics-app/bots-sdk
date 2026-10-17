[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / Routes

# Variable: Routes

> `const` **Routes**: `object`

Path builders for every public REST endpoint in P9, relative to `/api/v1`.
Use them with [RestClient](../classes/RestClient.md): `rest.get(Routes.channel(id))`.

## Type Declaration

### application

> `readonly` **application**: (`applicationId`) => `string`

#### Parameters

##### applicationId

`string`

#### Returns

`string`

### applicationBotResetToken

> `readonly` **applicationBotResetToken**: (`applicationId`) => `string`

#### Parameters

##### applicationId

`string`

#### Returns

`string`

### applicationCommand

> `readonly` **applicationCommand**: (`applicationId`, `commandId`) => `string`

#### Parameters

##### applicationId

`string`

##### commandId

`string`

#### Returns

`string`

### applicationCommands

> `readonly` **applicationCommands**: (`applicationId`) => `string`

#### Parameters

##### applicationId

`string`

#### Returns

`string`

### applicationGuildCommand

> `readonly` **applicationGuildCommand**: (`applicationId`, `guildId`, `commandId`) => `string`

#### Parameters

##### applicationId

`string`

##### guildId

`string`

##### commandId

`string`

#### Returns

`string`

### applicationGuildCommands

> `readonly` **applicationGuildCommands**: (`applicationId`, `guildId`) => `string`

#### Parameters

##### applicationId

`string`

##### guildId

`string`

#### Returns

`string`

### applications

> `readonly` **applications**: () => `string`

#### Returns

`string`

### authLogin

> `readonly` **authLogin**: () => `string`

#### Returns

`string`

### authLogout

> `readonly` **authLogout**: () => `string`

#### Returns

`string`

### authRefresh

> `readonly` **authRefresh**: () => `string`

#### Returns

`string`

### authRegister

> `readonly` **authRegister**: () => `string`

#### Returns

`string`

### channel

> `readonly` **channel**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelAttachments

> `readonly` **channelAttachments**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelBulkDelete

> `readonly` **channelBulkDelete**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelInvites

> `readonly` **channelInvites**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelMessage

> `readonly` **channelMessage**: (`channelId`, `messageId`) => `string`

#### Parameters

##### channelId

`string`

##### messageId

`string`

#### Returns

`string`

### channelMessageAck

> `readonly` **channelMessageAck**: (`channelId`, `messageId`) => `string`

#### Parameters

##### channelId

`string`

##### messageId

`string`

#### Returns

`string`

### channelMessageOwnReaction

> `readonly` **channelMessageOwnReaction**: (`channelId`, `messageId`, `emoji`) => `string`

#### Parameters

##### channelId

`string`

##### messageId

`string`

##### emoji

`string`

#### Returns

`string`

### channelMessages

> `readonly` **channelMessages**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelPermission

> `readonly` **channelPermission**: (`channelId`, `overwriteId`) => `string`

#### Parameters

##### channelId

`string`

##### overwriteId

`string`

#### Returns

`string`

### channelPin

> `readonly` **channelPin**: (`channelId`, `messageId`) => `string`

#### Parameters

##### channelId

`string`

##### messageId

`string`

#### Returns

`string`

### channelPins

> `readonly` **channelPins**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelThreads

> `readonly` **channelThreads**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelTyping

> `readonly` **channelTyping**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### channelWebhooks

> `readonly` **channelWebhooks**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### claimKeyPackage

> `readonly` **claimKeyPackage**: (`userId`, `deviceId`) => `string`

#### Parameters

##### userId

`string`

##### deviceId

`string`

#### Returns

`string`

### deviceKeyPackages

> `readonly` **deviceKeyPackages**: (`deviceId`) => `string`

#### Parameters

##### deviceId

`string`

#### Returns

`string`

### devices

> `readonly` **devices**: () => `string`

#### Returns

`string`

### guild

> `readonly` **guild**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### guildAuditLogs

> `readonly` **guildAuditLogs**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### guildBan

> `readonly` **guildBan**: (`guildId`, `userId`) => `string`

#### Parameters

##### guildId

`string`

##### userId

`string`

#### Returns

`string`

### guildChannels

> `readonly` **guildChannels**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### guildEmoji

> `readonly` **guildEmoji**: (`guildId`, `emojiId`) => `string`

#### Parameters

##### guildId

`string`

##### emojiId

`string`

#### Returns

`string`

### guildEmojis

> `readonly` **guildEmojis**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### guildInvites

> `readonly` **guildInvites**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### guildMember

> `readonly` **guildMember**: (`guildId`, `userId`) => `string`

#### Parameters

##### guildId

`string`

##### userId

`string`

#### Returns

`string`

### guildMemberRole

> `readonly` **guildMemberRole**: (`guildId`, `userId`, `roleId`) => `string`

#### Parameters

##### guildId

`string`

##### userId

`string`

##### roleId

`string`

#### Returns

`string`

### guildMembers

> `readonly` **guildMembers**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### guildRole

> `readonly` **guildRole**: (`guildId`, `roleId`) => `string`

#### Parameters

##### guildId

`string`

##### roleId

`string`

#### Returns

`string`

### guildRoles

> `readonly` **guildRoles**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### guilds

> `readonly` **guilds**: () => `string`

#### Returns

`string`

### guildWebhooks

> `readonly` **guildWebhooks**: (`guildId`) => `string`

#### Parameters

##### guildId

`string`

#### Returns

`string`

### interactionCallback

> `readonly` **interactionCallback**: (`interactionId`, `token`) => `string`

#### Parameters

##### interactionId

`string`

##### token

`string`

#### Returns

`string`

### invite

> `readonly` **invite**: (`code`) => `string`

#### Parameters

##### code

`string`

#### Returns

`string`

### oauth2Authorize

> `readonly` **oauth2Authorize**: () => `string`

#### Returns

`string`

### user

> `readonly` **user**: (`userId`) => `string`

#### Parameters

##### userId?

`string` = `"@me"`

#### Returns

`string`

### userChannelDeliveryMode

> `readonly` **userChannelDeliveryMode**: (`channelId`) => `string`

#### Parameters

##### channelId

`string`

#### Returns

`string`

### userChannels

> `readonly` **userChannels**: () => `string`

#### Returns

`string`

### userDevices

> `readonly` **userDevices**: (`userId`) => `string`

#### Parameters

##### userId

`string`

#### Returns

`string`

### userRelationship

> `readonly` **userRelationship**: (`userId`) => `string`

#### Parameters

##### userId

`string`

#### Returns

`string`

### userSettings

> `readonly` **userSettings**: () => `string`

#### Returns

`string`

### voiceRegions

> `readonly` **voiceRegions**: () => `string`

#### Returns

`string`

### webhook

> `readonly` **webhook**: (`webhookId`, `token?`) => `string`

#### Parameters

##### webhookId

`string`

##### token?

`string`

#### Returns

`string`

### webhookOriginalMessage

> `readonly` **webhookOriginalMessage**: (`applicationId`, `token`) => `string`

#### Parameters

##### applicationId

`string`

##### token

`string`

#### Returns

`string`
