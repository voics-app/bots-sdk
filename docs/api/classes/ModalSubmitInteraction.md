[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ModalSubmitInteraction

# Class: ModalSubmitInteraction

A submitted modal.

## Extends

- `MessageBoundInteraction`

## Constructors

### Constructor

> **new ModalSubmitInteraction**(`raw`, `rest`): `ModalSubmitInteraction`

#### Parameters

##### raw

[`ApiInteraction`](../interfaces/ApiInteraction.md)

##### rest

[`RestClient`](RestClient.md)

#### Returns

`ModalSubmitInteraction`

#### Overrides

`MessageBoundInteraction.constructor`

## Properties

### applicationId

> `readonly` **applicationId**: `string`

#### Inherited from

`MessageBoundInteraction.applicationId`

***

### appPermissions

> `readonly` **appPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the bot in the channel, when provided.

#### Inherited from

`MessageBoundInteraction.appPermissions`

***

### args

> **args**: `string`[] = `[]`

Values captured by the router's custom-id pattern (e.g. `kick:confirm:42` → `["confirm", "42"]`).

#### Inherited from

`MessageBoundInteraction.args`

***

### channelId

> `readonly` **channelId**: `string` \| `null`

#### Inherited from

`MessageBoundInteraction.channelId`

***

### customId

> `readonly` **customId**: `string`

#### Inherited from

`MessageBoundInteraction.customId`

***

### guildId

> `readonly` **guildId**: `string` \| `null`

#### Inherited from

`MessageBoundInteraction.guildId`

***

### id

> `readonly` **id**: `string`

#### Inherited from

`MessageBoundInteraction.id`

***

### locale

> `readonly` **locale**: `string` \| `undefined`

#### Inherited from

`MessageBoundInteraction.locale`

***

### member

> `readonly` **member**: [`ApiGuildMember`](../interfaces/ApiGuildMember.md) & `object` \| `null`

#### Inherited from

`MessageBoundInteraction.member`

***

### memberPermissions

> `readonly` **memberPermissions**: [`Permissions`](Permissions.md) \| `null`

Permissions of the invoking member in the channel, or `null` outside guilds.

#### Inherited from

`MessageBoundInteraction.memberPermissions`

***

### message

> `readonly` **message**: [`ApiMessage`](../interfaces/ApiMessage.md) \| `null`

#### Inherited from

`MessageBoundInteraction.message`

***

### raw

> `readonly` **raw**: [`ApiInteraction`](../interfaces/ApiInteraction.md)

#### Inherited from

`MessageBoundInteraction.raw`

***

### token

> `readonly` **token**: `string`

#### Inherited from

`MessageBoundInteraction.token`

***

### user

> `readonly` **user**: [`ApiUser`](../interfaces/ApiUser.md)

The invoking user (from `member.user` in guilds, `user` in DMs).

#### Inherited from

`MessageBoundInteraction.user`

## Accessors

### deferred

#### Get Signature

> **get** **deferred**(): `boolean`

##### Returns

`boolean`

#### Inherited from

`MessageBoundInteraction.deferred`

***

### replied

#### Get Signature

> **get** **replied**(): `boolean`

##### Returns

`boolean`

#### Inherited from

`MessageBoundInteraction.replied`

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

`MessageBoundInteraction.deferReply`

***

### deferUpdate()

> **deferUpdate**(): `Promise`\<`void`\>

Acknowledges without changing the message yet (callback type 6).

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MessageBoundInteraction.deferUpdate`

***

### deleteReply()

> **deleteReply**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MessageBoundInteraction.deleteReply`

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

`MessageBoundInteraction.editReply`

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

`MessageBoundInteraction.followUp`

***

### getTextInputValue()

> **getTextInputValue**(`customId`): `string`

#### Parameters

##### customId

`string`

#### Returns

`string`

***

### inGuild()

> **inGuild**(): `this is ModalSubmitInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Returns

`this is ModalSubmitInteraction & { guildId: string; member: ApiGuildMember & { permissions: string } }`

#### Inherited from

`MessageBoundInteraction.inGuild`

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

`MessageBoundInteraction.reply`

***

### update()

> **update**(`payload`): `Promise`\<`void`\>

Edits the message the component is attached to (callback type 7).

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

`MessageBoundInteraction.update`
