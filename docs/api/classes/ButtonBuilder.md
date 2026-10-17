[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / ButtonBuilder

# Class: ButtonBuilder

Builds a clickable button. Link buttons take a URL; every other style takes a custom id.

## Implements

- [`JSONEncodable`](../interfaces/JSONEncodable.md)\<[`ApiButton`](../interfaces/ApiButton.md)\>

## Constructors

### Constructor

> **new ButtonBuilder**(): `ButtonBuilder`

#### Returns

`ButtonBuilder`

## Methods

### setCustomId()

> **setCustomId**(`customId`): `this`

#### Parameters

##### customId

`string`

#### Returns

`this`

***

### setDisabled()

> **setDisabled**(`disabled?`): `this`

#### Parameters

##### disabled?

`boolean` = `true`

#### Returns

`this`

***

### setEmoji()

> **setEmoji**(`emoji`): `this`

#### Parameters

##### emoji

`string` \| [`ApiPartialEmoji`](../interfaces/ApiPartialEmoji.md)

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

### setStyle()

> **setStyle**(`style`): `this`

#### Parameters

##### style

[`ButtonStyleResolvable`](../type-aliases/ButtonStyleResolvable.md)

#### Returns

`this`

***

### setURL()

> **setURL**(`url`): `this`

#### Parameters

##### url

`string`

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiButton`](../interfaces/ApiButton.md)

#### Returns

[`ApiButton`](../interfaces/ApiButton.md)

#### Implementation of

[`JSONEncodable`](../interfaces/JSONEncodable.md).[`toJSON`](../interfaces/JSONEncodable.md#tojson)
