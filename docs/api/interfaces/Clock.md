[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / Clock

# Interface: Clock

Time and timers, injected so that rate limiting and heartbeats are testable.

## Methods

### clearTimeout()

> **clearTimeout**(`handle`): `void`

#### Parameters

##### handle

`unknown`

#### Returns

`void`

***

### now()

> **now**(): `number`

Current Unix time in milliseconds.

#### Returns

`number`

***

### setTimeout()

> **setTimeout**(`callback`, `ms`): `unknown`

#### Parameters

##### callback

() => `void`

##### ms

`number`

#### Returns

`unknown`

***

### sleep()

> **sleep**(`ms`): `Promise`\<`void`\>

#### Parameters

##### ms

`number`

#### Returns

`Promise`\<`void`\>
