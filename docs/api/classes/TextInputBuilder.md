[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / TextInputBuilder

# Class: TextInputBuilder

A text input inside a modal.

## Implements

- [`JSONEncodable`](../interfaces/JSONEncodable.md)\<[`ApiTextInput`](../interfaces/ApiTextInput.md)\>

## Constructors

### Constructor

> **new TextInputBuilder**(): `TextInputBuilder`

#### Returns

`TextInputBuilder`

## Methods

### setCustomId()

> **setCustomId**(`customId`): `this`

#### Parameters

##### customId

`string`

#### Returns

`this`

***

### setLabel()

> **setLabel**(`label`): `this`

#### Parameters

##### label

`string`

#### Returns

`this`

***

### setMaxLength()

> **setMaxLength**(`length`): `this`

#### Parameters

##### length

`number`

#### Returns

`this`

***

### setMinLength()

> **setMinLength**(`length`): `this`

#### Parameters

##### length

`number`

#### Returns

`this`

***

### setPlaceholder()

> **setPlaceholder**(`placeholder`): `this`

#### Parameters

##### placeholder

`string`

#### Returns

`this`

***

### setRequired()

> **setRequired**(`required?`): `this`

#### Parameters

##### required?

`boolean` = `true`

#### Returns

`this`

***

### setStyle()

> **setStyle**(`style`): `this`

#### Parameters

##### style

`"Short"` \| `"Paragraph"` \| [`TextInputStyle`](../type-aliases/TextInputStyle.md)

#### Returns

`this`

***

### setValue()

> **setValue**(`value`): `this`

#### Parameters

##### value

`string`

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiTextInput`](../interfaces/ApiTextInput.md)

#### Returns

[`ApiTextInput`](../interfaces/ApiTextInput.md)

#### Implementation of

[`JSONEncodable`](../interfaces/JSONEncodable.md).[`toJSON`](../interfaces/JSONEncodable.md#tojson)
