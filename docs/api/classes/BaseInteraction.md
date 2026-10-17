[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / BaseInteraction

# Abstract Class: BaseInteraction

Fields shared by every interaction.

## Extended by

- [`RepliableInteraction`](RepliableInteraction.md)
- [`AutocompleteInteraction`](AutocompleteInteraction.md)

## Constructors

### Constructor

> **new BaseInteraction**(`raw`, `rest`): `BaseInteraction`

#### Parameters

##### raw

[`ApiInteraction`](../interfaces/ApiInteraction.md)

##### rest

[`RestClient`](RestClient.md)

#### Returns

`BaseInteraction`

## Properties

### applicationId

> `readonly` **applicationId**: `string`

***

### appPermissions

> `readonly` **appPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the bot in the channel, when provided.

***

### channelId

> `readonly` **channelId**: `string` \| `null`

***

### guildId

> `readonly` **guildId**: `string` \| `null`

***

### id

> `readonly` **id**: `string`

***

### locale

> `readonly` **locale**: `string` \| `undefined`

***

### member

> `readonly` **member**: [`ApiGuildMember`](../interfaces/ApiGuildMember.md) & `object` \| `null`

***

### memberPermissions

> `readonly` **memberPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the invoking member in the channel, or `null` outside guilds.

***

### raw

> `readonly` **raw**: [`ApiInteraction`](../interfaces/ApiInteraction.md)

***

### token

> `readonly` **token**: `string`

***

### user

> `readonly` **user**: [`ApiUser`](../interfaces/ApiUser.md)

The invoking user (from `member.user` in guilds, `user` in DMs).

## Methods

### inGuild()

> **inGuild**(): `this is BaseInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Returns

`this is BaseInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`
