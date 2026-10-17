[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / GatewaySocketHandlers

# Interface: GatewaySocketHandlers

Callbacks a gateway socket reports to.

## Methods

### onClose()

> **onClose**(`code`, `reason`): `void`

#### Parameters

##### code

`number`

##### reason

`string`

#### Returns

`void`

***

### onError()

> **onError**(`error`): `void`

#### Parameters

##### error

`Error`

#### Returns

`void`

***

### onMessage()

> **onMessage**(`data`): `void`

#### Parameters

##### data

`string`

#### Returns

`void`

***

### onOpen()

> **onOpen**(): `void`

#### Returns

`void`
