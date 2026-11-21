[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / GatewayConnection

# Class: GatewayConnection

One gateway session: HELLO → IDENTIFY/RESUME → READY, heartbeats with zombie detection,
automatic resume and re-identify with exponential backoff, and a rate-limited send queue.

## Extends

- [`TypedEmitter`](TypedEmitter.md)\<[`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)\>

## Constructors

### Constructor

> **new GatewayConnection**(`options`): `GatewayConnection`

#### Parameters

##### options

[`GatewayConnectionOptions`](../interfaces/GatewayConnectionOptions.md)

#### Returns

`GatewayConnection`

#### Overrides

[`TypedEmitter`](TypedEmitter.md).[`constructor`](TypedEmitter.md#constructor)

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

##### Returns

`number` \| `null`

***

### seq

#### Get Signature

> **get** **seq**(): `number` \| `null`

##### Returns

`number` \| `null`

***

### sessionId

#### Get Signature

> **get** **sessionId**(): `string` \| `null`

##### Returns

`string` \| `null`

## Methods

### connect()

> **connect**(): `void`

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Closes the connection for good and ends the session.

#### Returns

`void`

***

### emit()

> **emit**\<`K`\>(`event`, ...`args`): `boolean`

#### Type Parameters

##### K

`K` *extends* keyof [`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)

#### Parameters

##### event

`K`

##### args

...[`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)\[`K`\]

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

keyof [`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)

#### Returns

`number`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`listenerCount`](TypedEmitter.md#listenercount)

***

### off()

> **off**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* keyof [`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)\[`K`\]\>

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`off`](TypedEmitter.md#off)

***

### on()

> **on**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* keyof [`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)\[`K`\]\>

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`on`](TypedEmitter.md#on)

***

### once()

> **once**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* keyof [`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<[`GatewayConnectionEvents`](../type-aliases/GatewayConnectionEvents.md)\[`K`\]\>

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`once`](TypedEmitter.md#once)

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

#### Parameters

##### event?

keyof GatewayConnectionEvents

#### Returns

`this`

#### Inherited from

[`TypedEmitter`](TypedEmitter.md).[`removeAllListeners`](TypedEmitter.md#removealllisteners)

***

### send()

> **send**(`op`, `d`): `void`

Queues a frame, respecting the per-session send budget. Throws when not connected.

#### Parameters

##### op

`number`

##### d

`unknown`

#### Returns

`void`
