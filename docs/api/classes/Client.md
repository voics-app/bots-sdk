[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / Client

# Class: Client

A Voics bot: one gateway session plus REST, typed API helpers and an interaction router.

```ts
const client = new Client({ token, intents: ["Guilds"] });
client.interactions.command("ping", (i) => i.reply("Pong!"));
await client.login();
```

## Extends

- [`TypedEmitter`](TypedEmitter.md)\<[`ClientEvents`](../type-aliases/ClientEvents.md)\>

## Constructors

### Constructor

> **new Client**(`options`): `Client`

#### Parameters

##### options

[`ClientOptions`](../interfaces/ClientOptions.md)

#### Returns

`Client`

#### Overrides

[`TypedEmitter`](TypedEmitter.md).[`constructor`](TypedEmitter.md#constructor)

## Properties

### api

> `readonly` **api**: [`DiscordyApi`](DiscordyApi.md)

***

### applicationId

> **applicationId**: `string` \| `null`

***

### interactions

> `readonly` **interactions**: [`InteractionRouter`](InteractionRouter.md)

***

### rest

> `readonly` **rest**: [`RestClient`](RestClient.md)

***

### user

> **user**: [`ApiUser`](../interfaces/ApiUser.md) \| `null` = `null`

The bot user, available after READY.

## Accessors

### isReady

#### Get Signature

> **get** **isReady**(): `boolean`

##### Returns

`boolean`

***

### latencyMs

#### Get Signature

> **get** **latencyMs**(): `number` \| `null`

Heartbeat round trip in milliseconds.

##### Returns

`number` \| `null`

## Methods

### destroy()

> **destroy**(): `void`

Disconnects and ends the session.

#### Returns

`void`

***

### emit()

> **emit**\<`K`\>(`event`, ...`args`): `boolean`

#### Type Parameters

##### K

`K` *extends* `"error"` \| `"ready"` \| `"resumed"` \| `"reconnecting"` \| `"debug"` \| keyof GatewayDispatchPayloads \| `"raw"`

#### Parameters

##### event

`K`

##### args

...[`ClientEvents`](../type-aliases/ClientEvents.md)\[`K`\]

#### Returns

`boolean`

whether at least one listener was called.

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`emit`](TypedEmitter.md#emit)

***

### listenerCount()

> **listenerCount**(`event`): `number`

#### Parameters

##### event

`"error"` \| `"ready"` \| `"resumed"` \| `"reconnecting"` \| `"debug"` \| keyof GatewayDispatchPayloads \| `"raw"`

#### Returns

`number`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`listenerCount`](TypedEmitter.md#listenercount)

***

### login()

> **login**(): `Promise`\<[`GatewayReadyData`](../interfaces/GatewayReadyData.md)\>

Connects to the gateway and resolves with the READY payload, or rejects on a fatal close.

#### Returns

`Promise`\<[`GatewayReadyData`](../interfaces/GatewayReadyData.md)\>

***

### off()

> **off**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* `"error"` \| `"ready"` \| `"resumed"` \| `"reconnecting"` \| `"debug"` \| keyof GatewayDispatchPayloads \| `"raw"`

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`ClientEvents`](../type-aliases/ClientEvents.md)\[`K`\]\>

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`off`](TypedEmitter.md#off)

***

### on()

> **on**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* `"error"` \| `"ready"` \| `"resumed"` \| `"reconnecting"` \| `"debug"` \| keyof GatewayDispatchPayloads \| `"raw"`

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`ClientEvents`](../type-aliases/ClientEvents.md)\[`K`\]\>

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`on`](TypedEmitter.md#on)

***

### once()

> **once**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* `"error"` \| `"ready"` \| `"resumed"` \| `"reconnecting"` \| `"debug"` \| keyof GatewayDispatchPayloads \| `"raw"`

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`ClientEvents`](../type-aliases/ClientEvents.md)\[`K`\]\>

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`once`](TypedEmitter.md#once)

***

### registerCommands()

> **registerCommands**(`commands`, `options?`): `Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)[]\>

Bulk-overwrites the application's commands, globally or in one guild (instant, good for development).

#### Parameters

##### commands

[`CommandData`](../type-aliases/CommandData.md)[]

##### options?

###### guildId?

`string`

#### Returns

`Promise`\<[`ApiApplicationCommand`](../interfaces/ApiApplicationCommand.md)[]\>

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

#### Parameters

##### event?

`"error"` \| `"ready"` \| `"resumed"` \| `"reconnecting"` \| `"debug"` \| keyof GatewayDispatchPayloads \| `"raw"`

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`removeAllListeners`](TypedEmitter.md#removealllisteners)

***

### requestGuildMembers()

> **requestGuildMembers**(`request`): `void`

Members arrive as GUILD_MEMBERS_CHUNK events (requires the GuildMembers intent).

#### Parameters

##### request

[`GatewayRequestGuildMembersData`](../interfaces/GatewayRequestGuildMembersData.md)

#### Returns

`void`

***

### setPresence()

> **setPresence**(`presence`): `void`

#### Parameters

##### presence

[`GatewayPresenceUpdateData`](../interfaces/GatewayPresenceUpdateData.md)

#### Returns

`void`

***

### updateVoiceState()

> **updateVoiceState**(`state`): `void`

#### Parameters

##### state

[`GatewayVoiceStateUpdateData`](../interfaces/GatewayVoiceStateUpdateData.md)

#### Returns

`void`
