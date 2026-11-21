[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / RepliableInteraction

# Abstract Class: RepliableInteraction

An interaction that can be answered with messages: reply, defer, edit, follow up.

## Extends

- [`BaseInteraction`](BaseInteraction.md)

## Extended by

- [`CommandInteraction`](CommandInteraction.md)

## Constructors

### Constructor

> **new RepliableInteraction**(`raw`, `rest`, `kind`): `RepliableInteraction`

#### Parameters

##### raw

[`ApiInteraction`](../interfaces/ApiInteraction.md)

##### rest

[`RestClient`](RestClient.md)

##### kind

[`InteractionKind`](../type-aliases/InteractionKind.md)

#### Returns

`RepliableInteraction`

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

## Accessors

### deferred

#### Get Signature

> **get** **deferred**(): `boolean`

##### Returns

`boolean`

***

### replied

#### Get Signature

> **get** **replied**(): `boolean`

##### Returns

`boolean`

## Methods

### deferReply()

> **deferReply**(`options?`): `Promise`\<`void`\>

Acknowledges now and shows "thinking…"; finish with [editReply](#editreply) (callback type 5).

#### Parameters

##### options?

###### ephemeral?

`boolean`

#### Returns

`Promise`\<`void`\>

***

### deleteReply()

> **deleteReply**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### editReply()

> **editReply**(`payload`): `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

Edits the original response.

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

***

### followUp()

> **followUp**(`payload`): `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

Sends an additional message after the interaction was acknowledged.

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

***

### inGuild()

> **inGuild**(): `this is RepliableInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Returns

`this is RepliableInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Inherited from

[`BaseInteraction`](BaseInteraction.md).[`inGuild`](BaseInteraction.md#inguild)

***

### reply()

> **reply**(`payload`): `Promise`\<`void`\>

Responds with a message (callback type 4).

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<`void`\>
