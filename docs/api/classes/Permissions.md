[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / Permissions

# Class: Permissions

Immutable 64-bit permission bitfield using Discord's bit values.

## Constructors

### Constructor

> **new Permissions**(`permissions?`): `Permissions`

#### Parameters

##### permissions?

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md) = `0n`

#### Returns

`Permissions`

## Properties

### bitfield

> `readonly` **bitfield**: `bigint`

***

### All

> `readonly` `static` **All**: `bigint`

***

### Flags

> `readonly` `static` **Flags**: `object` = `PermissionFlagsBits`

#### AddReactions

> `readonly` **AddReactions**: `bigint`

#### Administrator

> `readonly` **Administrator**: `bigint`

#### AttachFiles

> `readonly` **AttachFiles**: `bigint`

#### BanMembers

> `readonly` **BanMembers**: `bigint`

#### ChangeNickname

> `readonly` **ChangeNickname**: `bigint`

#### Connect

> `readonly` **Connect**: `bigint`

#### CreateEvents

> `readonly` **CreateEvents**: `bigint`

#### CreateGuildExpressions

> `readonly` **CreateGuildExpressions**: `bigint`

#### CreateInstantInvite

> `readonly` **CreateInstantInvite**: `bigint`

#### CreatePrivateThreads

> `readonly` **CreatePrivateThreads**: `bigint`

#### CreatePublicThreads

> `readonly` **CreatePublicThreads**: `bigint`

#### DeafenMembers

> `readonly` **DeafenMembers**: `bigint`

#### EmbedLinks

> `readonly` **EmbedLinks**: `bigint`

#### KickMembers

> `readonly` **KickMembers**: `bigint`

#### ManageChannels

> `readonly` **ManageChannels**: `bigint`

#### ManageEvents

> `readonly` **ManageEvents**: `bigint`

#### ManageGuild

> `readonly` **ManageGuild**: `bigint`

#### ManageGuildExpressions

> `readonly` **ManageGuildExpressions**: `bigint`

#### ManageMessages

> `readonly` **ManageMessages**: `bigint`

#### ManageNicknames

> `readonly` **ManageNicknames**: `bigint`

#### ManageRoles

> `readonly` **ManageRoles**: `bigint`

#### ManageThreads

> `readonly` **ManageThreads**: `bigint`

#### ManageWebhooks

> `readonly` **ManageWebhooks**: `bigint`

#### MentionEveryone

> `readonly` **MentionEveryone**: `bigint`

#### ModerateMembers

> `readonly` **ModerateMembers**: `bigint`

#### MoveMembers

> `readonly` **MoveMembers**: `bigint`

#### MuteMembers

> `readonly` **MuteMembers**: `bigint`

#### PrioritySpeaker

> `readonly` **PrioritySpeaker**: `bigint`

#### ReadMessageHistory

> `readonly` **ReadMessageHistory**: `bigint`

#### RequestToSpeak

> `readonly` **RequestToSpeak**: `bigint`

#### SendMessages

> `readonly` **SendMessages**: `bigint`

#### SendMessagesInThreads

> `readonly` **SendMessagesInThreads**: `bigint`

#### SendPolls

> `readonly` **SendPolls**: `bigint`

#### SendTTSMessages

> `readonly` **SendTTSMessages**: `bigint`

#### SendVoiceMessages

> `readonly` **SendVoiceMessages**: `bigint`

#### Speak

> `readonly` **Speak**: `bigint`

#### Stream

> `readonly` **Stream**: `bigint`

#### UseApplicationCommands

> `readonly` **UseApplicationCommands**: `bigint`

#### UseEmbeddedActivities

> `readonly` **UseEmbeddedActivities**: `bigint`

#### UseExternalApps

> `readonly` **UseExternalApps**: `bigint`

#### UseExternalEmojis

> `readonly` **UseExternalEmojis**: `bigint`

#### UseExternalSounds

> `readonly` **UseExternalSounds**: `bigint`

#### UseExternalStickers

> `readonly` **UseExternalStickers**: `bigint`

#### UseSoundboard

> `readonly` **UseSoundboard**: `bigint`

#### UseVAD

> `readonly` **UseVAD**: `bigint`

#### ViewAuditLog

> `readonly` **ViewAuditLog**: `bigint`

#### ViewChannel

> `readonly` **ViewChannel**: `bigint`

#### ViewCreatorMonetizationAnalytics

> `readonly` **ViewCreatorMonetizationAnalytics**: `bigint`

#### ViewGuildInsights

> `readonly` **ViewGuildInsights**: `bigint`

***

### None

> `readonly` `static` **None**: `0n` = `0n`

## Methods

### add()

> **add**(...`permissions`): `Permissions`

#### Parameters

##### permissions

...[`PermissionResolvable`](../type-aliases/PermissionResolvable.md)[]

#### Returns

`Permissions`

***

### any()

> **any**(`permissions`, `__namedParameters?`): `boolean`

#### Parameters

##### permissions

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md)

##### \_\_namedParameters?

[`PermissionCheckOptions`](../interfaces/PermissionCheckOptions.md) = `{}`

#### Returns

`boolean`

***

### equals()

> **equals**(`permissions`): `boolean`

#### Parameters

##### permissions

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md)

#### Returns

`boolean`

***

### has()

> **has**(`permissions`, `__namedParameters?`): `boolean`

#### Parameters

##### permissions

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md)

##### \_\_namedParameters?

[`PermissionCheckOptions`](../interfaces/PermissionCheckOptions.md) = `{}`

#### Returns

`boolean`

***

### missing()

> **missing**(`permissions`, `options?`): (`"CreateInstantInvite"` \| `"KickMembers"` \| `"BanMembers"` \| `"Administrator"` \| `"ManageChannels"` \| `"ManageGuild"` \| `"AddReactions"` \| `"ViewAuditLog"` \| `"PrioritySpeaker"` \| `"Stream"` \| `"ViewChannel"` \| `"SendMessages"` \| `"SendTTSMessages"` \| `"ManageMessages"` \| `"EmbedLinks"` \| `"AttachFiles"` \| `"ReadMessageHistory"` \| `"MentionEveryone"` \| `"UseExternalEmojis"` \| `"ViewGuildInsights"` \| `"Connect"` \| `"Speak"` \| `"MuteMembers"` \| `"DeafenMembers"` \| `"MoveMembers"` \| `"UseVAD"` \| `"ChangeNickname"` \| `"ManageNicknames"` \| `"ManageRoles"` \| `"ManageWebhooks"` \| `"ManageGuildExpressions"` \| `"UseApplicationCommands"` \| `"RequestToSpeak"` \| `"ManageEvents"` \| `"ManageThreads"` \| `"CreatePublicThreads"` \| `"CreatePrivateThreads"` \| `"UseExternalStickers"` \| `"SendMessagesInThreads"` \| `"UseEmbeddedActivities"` \| `"ModerateMembers"` \| `"ViewCreatorMonetizationAnalytics"` \| `"UseSoundboard"` \| `"CreateGuildExpressions"` \| `"CreateEvents"` \| `"UseExternalSounds"` \| `"SendVoiceMessages"` \| `"SendPolls"` \| `"UseExternalApps"`)[]

#### Parameters

##### permissions

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md)

##### options?

[`PermissionCheckOptions`](../interfaces/PermissionCheckOptions.md) = `{}`

#### Returns

(`"CreateInstantInvite"` \| `"KickMembers"` \| `"BanMembers"` \| `"Administrator"` \| `"ManageChannels"` \| `"ManageGuild"` \| `"AddReactions"` \| `"ViewAuditLog"` \| `"PrioritySpeaker"` \| `"Stream"` \| `"ViewChannel"` \| `"SendMessages"` \| `"SendTTSMessages"` \| `"ManageMessages"` \| `"EmbedLinks"` \| `"AttachFiles"` \| `"ReadMessageHistory"` \| `"MentionEveryone"` \| `"UseExternalEmojis"` \| `"ViewGuildInsights"` \| `"Connect"` \| `"Speak"` \| `"MuteMembers"` \| `"DeafenMembers"` \| `"MoveMembers"` \| `"UseVAD"` \| `"ChangeNickname"` \| `"ManageNicknames"` \| `"ManageRoles"` \| `"ManageWebhooks"` \| `"ManageGuildExpressions"` \| `"UseApplicationCommands"` \| `"RequestToSpeak"` \| `"ManageEvents"` \| `"ManageThreads"` \| `"CreatePublicThreads"` \| `"CreatePrivateThreads"` \| `"UseExternalStickers"` \| `"SendMessagesInThreads"` \| `"UseEmbeddedActivities"` \| `"ModerateMembers"` \| `"ViewCreatorMonetizationAnalytics"` \| `"UseSoundboard"` \| `"CreateGuildExpressions"` \| `"CreateEvents"` \| `"UseExternalSounds"` \| `"SendVoiceMessages"` \| `"SendPolls"` \| `"UseExternalApps"`)[]

***

### remove()

> **remove**(...`permissions`): `Permissions`

#### Parameters

##### permissions

...[`PermissionResolvable`](../type-aliases/PermissionResolvable.md)[]

#### Returns

`Permissions`

***

### toArray()

> **toArray**(): (`"CreateInstantInvite"` \| `"KickMembers"` \| `"BanMembers"` \| `"Administrator"` \| `"ManageChannels"` \| `"ManageGuild"` \| `"AddReactions"` \| `"ViewAuditLog"` \| `"PrioritySpeaker"` \| `"Stream"` \| `"ViewChannel"` \| `"SendMessages"` \| `"SendTTSMessages"` \| `"ManageMessages"` \| `"EmbedLinks"` \| `"AttachFiles"` \| `"ReadMessageHistory"` \| `"MentionEveryone"` \| `"UseExternalEmojis"` \| `"ViewGuildInsights"` \| `"Connect"` \| `"Speak"` \| `"MuteMembers"` \| `"DeafenMembers"` \| `"MoveMembers"` \| `"UseVAD"` \| `"ChangeNickname"` \| `"ManageNicknames"` \| `"ManageRoles"` \| `"ManageWebhooks"` \| `"ManageGuildExpressions"` \| `"UseApplicationCommands"` \| `"RequestToSpeak"` \| `"ManageEvents"` \| `"ManageThreads"` \| `"CreatePublicThreads"` \| `"CreatePrivateThreads"` \| `"UseExternalStickers"` \| `"SendMessagesInThreads"` \| `"UseEmbeddedActivities"` \| `"ModerateMembers"` \| `"ViewCreatorMonetizationAnalytics"` \| `"UseSoundboard"` \| `"CreateGuildExpressions"` \| `"CreateEvents"` \| `"UseExternalSounds"` \| `"SendVoiceMessages"` \| `"SendPolls"` \| `"UseExternalApps"`)[]

#### Returns

(`"CreateInstantInvite"` \| `"KickMembers"` \| `"BanMembers"` \| `"Administrator"` \| `"ManageChannels"` \| `"ManageGuild"` \| `"AddReactions"` \| `"ViewAuditLog"` \| `"PrioritySpeaker"` \| `"Stream"` \| `"ViewChannel"` \| `"SendMessages"` \| `"SendTTSMessages"` \| `"ManageMessages"` \| `"EmbedLinks"` \| `"AttachFiles"` \| `"ReadMessageHistory"` \| `"MentionEveryone"` \| `"UseExternalEmojis"` \| `"ViewGuildInsights"` \| `"Connect"` \| `"Speak"` \| `"MuteMembers"` \| `"DeafenMembers"` \| `"MoveMembers"` \| `"UseVAD"` \| `"ChangeNickname"` \| `"ManageNicknames"` \| `"ManageRoles"` \| `"ManageWebhooks"` \| `"ManageGuildExpressions"` \| `"UseApplicationCommands"` \| `"RequestToSpeak"` \| `"ManageEvents"` \| `"ManageThreads"` \| `"CreatePublicThreads"` \| `"CreatePrivateThreads"` \| `"UseExternalStickers"` \| `"SendMessagesInThreads"` \| `"UseEmbeddedActivities"` \| `"ModerateMembers"` \| `"ViewCreatorMonetizationAnalytics"` \| `"UseSoundboard"` \| `"CreateGuildExpressions"` \| `"CreateEvents"` \| `"UseExternalSounds"` \| `"SendVoiceMessages"` \| `"SendPolls"` \| `"UseExternalApps"`)[]

***

### toJSON()

> **toJSON**(): `string`

#### Returns

`string`

***

### toString()

> **toString**(): `string`

#### Returns

`string`

***

### resolve()

> `static` **resolve**(`permissions`): `bigint`

#### Parameters

##### permissions

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md)

#### Returns

`bigint`
