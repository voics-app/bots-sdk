[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / ModalBuilder

# Class: ModalBuilder

A popup form with up to five text inputs, shown in response to a command or component.

## Implements

- [`JSONEncodable`](../interfaces/JSONEncodable.md)\<[`ApiModal`](../interfaces/ApiModal.md)\>

## Constructors

### Constructor

> **new ModalBuilder**(): `ModalBuilder`

#### Returns

`ModalBuilder`

## Methods

### addTextInputs()

> **addTextInputs**(...`inputs`): `this`

Adds text inputs; each one is placed in its own action row.

#### Parameters

##### inputs

...[`TextInputBuilder`](TextInputBuilder.md)[]

#### Returns

`this`

***

### setCustomId()

> **setCustomId**(`customId`): `this`

#### Parameters

##### customId

`string`

#### Returns

`this`

***

### setTitle()

> **setTitle**(`title`): `this`

#### Parameters

##### title

`string`

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiModal`](../interfaces/ApiModal.md)

#### Returns

[`ApiModal`](../interfaces/ApiModal.md)

#### Implementation of

[`JSONEncodable`](../interfaces/JSONEncodable.md).[`toJSON`](../interfaces/JSONEncodable.md#tojson)
