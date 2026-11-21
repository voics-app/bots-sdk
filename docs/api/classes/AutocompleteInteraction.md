[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / AutocompleteInteraction

# Class: AutocompleteInteraction

A user typing into an autocomplete-enabled option.

## Extends

- [`BaseInteraction`](BaseInteraction.md)

## Constructors

### Constructor

> **new AutocompleteInteraction**(`raw`, `rest`): `AutocompleteInteraction`

#### Parameters

##### raw

[`ApiInteraction`](../interfaces/ApiInteraction.md)

##### rest

[`RestClient`](RestClient.md)

#### Returns

`AutocompleteInteraction`

#### Overrides

[`BaseInteraction`](BaseInteraction.md).[`constructor`](BaseInteraction.md#constructor)

## Properties

### applicationId

> `readonly` **applicationId**: `string`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`applicationId`](BaseInteraction.md#applicationid)

***

### appPermissions

> `readonly` **appPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the bot in the channel, when provided.

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`appPermissions`](BaseInteraction.md#apppermissions)

***

### channelId

> `readonly` **channelId**: `string` \| `null`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`channelId`](BaseInteraction.md#channelid)

***

### commandName

> `readonly` **commandName**: `string`

***

### guildId

> `readonly` **guildId**: `string` \| `null`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`guildId`](BaseInteraction.md#guildid)

***

### id

> `readonly` **id**: `string`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`id`](BaseInteraction.md#id)

***

### locale

> `readonly` **locale**: `string` \| `undefined`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`locale`](BaseInteraction.md#locale)

***

### member

> `readonly` **member**: [`ApiGuildMember`](../interfaces/ApiGuildMember.md) & `object` \| `null`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`member`](BaseInteraction.md#member)

***

### memberPermissions

> `readonly` **memberPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the invoking member in the channel, or `null` outside guilds.

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`memberPermissions`](BaseInteraction.md#memberpermissions)

***

### options

> `readonly` **options**: [`CommandOptions`](CommandOptions.md)

***

### raw

> `readonly` **raw**: [`ApiInteraction`](../interfaces/ApiInteraction.md)

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`raw`](BaseInteraction.md#raw)

***

### token

> `readonly` **token**: `string`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`token`](BaseInteraction.md#token)

***

### user

> `readonly` **user**: [`ApiUser`](../interfaces/ApiUser.md)

The invoking user (from `member.user` in guilds, `user` in DMs).

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`user`](BaseInteraction.md#user)

## Methods

### inGuild()

> **inGuild**(): `this is AutocompleteInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Returns

`this is AutocompleteInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`inGuild`](BaseInteraction.md#inguild)

***

### respond()

> **respond**(`choices`): `Promise`\<`void`\>

Sends up to 25 suggestions (callback type 8).

#### Parameters

##### choices

[`ApiApplicationCommandOptionChoice`](../interfaces/ApiApplicationCommandOptionChoice.md)[]

#### Returns

`Promise`\<`void`\>
