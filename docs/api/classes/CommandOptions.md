[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / CommandOptions

# Class: CommandOptions

Typed access to the options of a slash-command interaction, with subcommands hoisted.

## Constructors

### Constructor

> **new CommandOptions**(`options?`, `resolved?`): `CommandOptions`

#### Parameters

##### options?

readonly [`ApiInteractionDataOption`](../interfaces/ApiInteractionDataOption.md)[] = `[]`

##### resolved?

[`ApiResolvedData`](../interfaces/ApiResolvedData.md) = `{}`

#### Returns

`CommandOptions`

## Methods

### getAttachment()

#### Call Signature

> **getAttachment**(`name`, `required`): [`ApiAttachment`](../interfaces/ApiAttachment.md)

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

[`ApiAttachment`](../interfaces/ApiAttachment.md)

#### Call Signature

> **getAttachment**(`name`, `required?`): [`ApiAttachment`](../interfaces/ApiAttachment.md) \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

[`ApiAttachment`](../interfaces/ApiAttachment.md) \| `null`

***

### getBoolean()

#### Call Signature

> **getBoolean**(`name`, `required`): `boolean`

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

`boolean`

#### Call Signature

> **getBoolean**(`name`, `required?`): `boolean` \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

`boolean` \| `null`

***

### getChannel()

#### Call Signature

> **getChannel**(`name`, `required`): `Partial`\<[`ApiChannel`](../interfaces/ApiChannel.md)\> & `Pick`\<[`ApiChannel`](../interfaces/ApiChannel.md), `"id"` \| `"type"`\>

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

`Partial`\<[`ApiChannel`](../interfaces/ApiChannel.md)\> & `Pick`\<[`ApiChannel`](../interfaces/ApiChannel.md), `"id"` \| `"type"`\>

#### Call Signature

> **getChannel**(`name`, `required?`): `Partial`\<[`ApiChannel`](../interfaces/ApiChannel.md)\> & `Pick`\<[`ApiChannel`](../interfaces/ApiChannel.md), `"id"` \| `"type"`\> \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

`Partial`\<[`ApiChannel`](../interfaces/ApiChannel.md)\> & `Pick`\<[`ApiChannel`](../interfaces/ApiChannel.md), `"id"` \| `"type"`\> \| `null`

***

### getFocused()

> **getFocused**(): \{ `name`: `string`; `value`: `string` \| `number` \| `boolean`; \} \| `null`

The option the user is typing in, for autocomplete interactions.

#### Returns

\{ `name`: `string`; `value`: `string` \| `number` \| `boolean`; \} \| `null`

***

### getInteger()

#### Call Signature

> **getInteger**(`name`, `required`): `number`

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

`number`

#### Call Signature

> **getInteger**(`name`, `required?`): `number` \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

`number` \| `null`

***

### getMember()

> **getMember**(`name`): `Omit`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md), `"user"`\> \| `null`

The guild member behind a user option (without its `user` field), when resolved.

#### Parameters

##### name

`string`

#### Returns

`Omit`\<[`ApiGuildMember`](../interfaces/ApiGuildMember.md), `"user"`\> \| `null`

***

### getNumber()

#### Call Signature

> **getNumber**(`name`, `required`): `number`

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

`number`

#### Call Signature

> **getNumber**(`name`, `required?`): `number` \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

`number` \| `null`

***

### getRole()

#### Call Signature

> **getRole**(`name`, `required`): [`ApiRole`](../interfaces/ApiRole.md)

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

[`ApiRole`](../interfaces/ApiRole.md)

#### Call Signature

> **getRole**(`name`, `required?`): [`ApiRole`](../interfaces/ApiRole.md) \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

[`ApiRole`](../interfaces/ApiRole.md) \| `null`

***

### getString()

#### Call Signature

> **getString**(`name`, `required`): `string`

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

`string`

#### Call Signature

> **getString**(`name`, `required?`): `string` \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

`string` \| `null`

***

### getSubcommand()

#### Call Signature

> **getSubcommand**(`required?`): `string`

##### Parameters

###### required?

`true`

##### Returns

`string`

#### Call Signature

> **getSubcommand**(`required`): `string` \| `null`

##### Parameters

###### required

`false`

##### Returns

`string` \| `null`

***

### getSubcommandGroup()

> **getSubcommandGroup**(): `string` \| `null`

#### Returns

`string` \| `null`

***

### getUser()

#### Call Signature

> **getUser**(`name`, `required`): [`ApiUser`](../interfaces/ApiUser.md)

##### Parameters

###### name

`string`

###### required

`true`

##### Returns

[`ApiUser`](../interfaces/ApiUser.md)

#### Call Signature

> **getUser**(`name`, `required?`): [`ApiUser`](../interfaces/ApiUser.md) \| `null`

##### Parameters

###### name

`string`

###### required?

`false`

##### Returns

[`ApiUser`](../interfaces/ApiUser.md) \| `null`
