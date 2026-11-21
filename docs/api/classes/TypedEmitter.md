[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / TypedEmitter

# Class: TypedEmitter\<E\>

A minimal, dependency-free, fully typed event emitter.

## Extended by

- [`GatewayConnection`](GatewayConnection.md)
- [`Client`](Client.md)

## Type Parameters

### E

`E` *extends* [`EventMap`](../type-aliases/EventMap.md)

## Constructors

### Constructor

> **new TypedEmitter**\<`E`\>(): `TypedEmitter`\<`E`\>

#### Returns

`TypedEmitter`\<`E`\>

## Methods

### emit()

> **emit**\<`K`\>(`event`, ...`args`): `boolean`

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

##### args

...`E`\[`K`\]

#### Returns

`boolean`

whether at least one listener was called.

***

### listenerCount()

> **listenerCount**(`event`): `number`

#### Parameters

##### event

keyof `E`

#### Returns

`number`

***

### off()

> **off**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<`E`\[`K`\]\>

#### Returns

`this`

***

### on()

> **on**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<`E`\[`K`\]\>

#### Returns

`this`

***

### once()

> **once**\<`K`\>(`event`, `listener`): `this`

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### event

`K`

##### listener

[`Listener`](../type-aliases/Listener.md)\<`E`\[`K`\]\>

#### Returns

`this`

***

### removeAllListeners()

> **removeAllListeners**(`event?`): `this`

#### Parameters

##### event?

keyof `E`

#### Returns

`this`
