[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / StringSelectMenuBuilder

# Class: StringSelectMenuBuilder

A select menu with developer-defined options.

## Extends

- `SelectMenuBuilder`

## Constructors

### Constructor

> **new StringSelectMenuBuilder**(): `StringSelectMenuBuilder`

#### Returns

`StringSelectMenuBuilder`

#### Inherited from

`SelectMenuBuilder.constructor`

## Methods

### addOptions()

> **addOptions**(...`options`): `this`

#### Parameters

##### options

...[`ApiSelectOption`](../interfaces/ApiSelectOption.md)[]

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

#### Inherited from

`SelectMenuBuilder.setCustomId`

***

### setDisabled()

> **setDisabled**(`disabled?`): `this`

#### Parameters

##### disabled?

`boolean` = `true`

#### Returns

`this`

#### Inherited from

`SelectMenuBuilder.setDisabled`

***

### setMaxValues()

> **setMaxValues**(`max`): `this`

#### Parameters

##### max

`number`

#### Returns

`this`

#### Inherited from

`SelectMenuBuilder.setMaxValues`

***

### setMinValues()

> **setMinValues**(`min`): `this`

#### Parameters

##### min

`number`

#### Returns

`this`

#### Inherited from

`SelectMenuBuilder.setMinValues`

***

### setPlaceholder()

> **setPlaceholder**(`placeholder`): `this`

#### Parameters

##### placeholder

`string`

#### Returns

`this`

#### Inherited from

`SelectMenuBuilder.setPlaceholder`

***

### toJSON()

> **toJSON**(): [`ApiSelectMenu`](../interfaces/ApiSelectMenu.md)

#### Returns

[`ApiSelectMenu`](../interfaces/ApiSelectMenu.md)

#### Inherited from

`SelectMenuBuilder.toJSON`
