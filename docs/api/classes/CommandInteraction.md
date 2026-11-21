[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / CommandInteraction

# Class: CommandInteraction

A slash command or context-menu command invocation.

## Extends

- [`RepliableInteraction`](RepliableInteraction.md)

## Constructors

### Constructor

> **new CommandInteraction**(`raw`, `rest`): `CommandInteraction`

#### Parameters

##### raw

[`ApiInteraction`](../interfaces/ApiInteraction.md)

##### rest

[`RestClient`](RestClient.md)

#### Returns

`CommandInteraction`

#### Overrides

[`RepliableInteraction`](RepliableInteraction.md).[`constructor`](RepliableInteraction.md#constructor)

## Properties

### applicationId

> `readonly` **applicationId**: `string`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`applicationId`](RepliableInteraction.md#applicationid)

***

### appPermissions

> `readonly` **appPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the bot in the channel, when provided.

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`appPermissions`](RepliableInteraction.md#apppermissions)

***

### channelId

> `readonly` **channelId**: `string` \| `null`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`channelId`](RepliableInteraction.md#channelid)

***

### commandId

> `readonly` **commandId**: `string`

***

### commandName

> `readonly` **commandName**: `string`

***

### commandType

> `readonly` **commandType**: [`ApplicationCommandType`](../type-aliases/ApplicationCommandType.md)

***

### guildId

> `readonly` **guildId**: `string` \| `null`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`guildId`](RepliableInteraction.md#guildid)

***

### id

> `readonly` **id**: `string`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`id`](RepliableInteraction.md#id)

***

### locale

> `readonly` **locale**: `string` \| `undefined`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`locale`](RepliableInteraction.md#locale)

***

### member

> `readonly` **member**: [`ApiGuildMember`](../interfaces/ApiGuildMember.md) & `object` \| `null`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`member`](RepliableInteraction.md#member)

***

### memberPermissions

> `readonly` **memberPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the invoking member in the channel, or `null` outside guilds.

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`memberPermissions`](RepliableInteraction.md#memberpermissions)

***

### options

> `readonly` **options**: [`CommandOptions`](CommandOptions.md)

***

### raw

> `readonly` **raw**: [`ApiInteraction`](../interfaces/ApiInteraction.md)

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`raw`](RepliableInteraction.md#raw)

***

### targetId

> `readonly` **targetId**: `string` \| `null`

Target user or message id of a context-menu command.

***

### token

> `readonly` **token**: `string`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`token`](RepliableInteraction.md#token)

***

### user

> `readonly` **user**: [`ApiUser`](../interfaces/ApiUser.md)

The invoking user (from `member.user` in guilds, `user` in DMs).

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`user`](RepliableInteraction.md#user)

## Accessors

### deferred

#### Get Signature

> **get** **deferred**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`deferred`](RepliableInteraction.md#deferred)

***

### replied

#### Get Signature

> **get** **replied**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`replied`](RepliableInteraction.md#replied)

## Methods

### deferReply()

> **deferReply**(`options?`): `Promise`\<`void`\>

Acknowledges now and shows "thinking…"; finish with [editReply](RepliableInteraction.md#editreply) (callback type 5).

#### Parameters

##### options?

###### ephemeral?

`boolean`

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`deferReply`](RepliableInteraction.md#deferreply)

***

### deleteReply()

> **deleteReply**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`deleteReply`](RepliableInteraction.md#deletereply)

***

### editReply()

> **editReply**(`payload`): `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

Edits the original response.

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`editReply`](RepliableInteraction.md#editreply)

***

### followUp()

> **followUp**(`payload`): `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

Sends an additional message after the interaction was acknowledged.

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`followUp`](RepliableInteraction.md#followup)

***

### inGuild()

> **inGuild**(): `this is CommandInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Returns

`this is CommandInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`inGuild`](RepliableInteraction.md#inguild)

***

### reply()

> **reply**(`payload`): `Promise`\<`void`\>

Responds with a message (callback type 4).

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`RepliableInteraction`](RepliableInteraction.md).[`reply`](RepliableInteraction.md#reply)

***

### showModal()

> **showModal**(`modal`): `Promise`\<`void`\>

#### Parameters

##### modal

[`ApiModal`](../interfaces/ApiModal.md) \| [`JSONEncodable`](../interfaces/JSONEncodable.md)\<[`ApiModal`](../interfaces/ApiModal.md)\>

#### Returns

`Promise`\<`void`\>
