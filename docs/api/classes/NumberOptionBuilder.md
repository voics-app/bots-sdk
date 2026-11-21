[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / NumberOptionBuilder

# Class: NumberOptionBuilder

## Extends

- `NumericOptionBuilder`

## Constructors

### Constructor

> **new NumberOptionBuilder**(): `NumberOptionBuilder`

#### Returns

`NumberOptionBuilder`

#### Inherited from

`NumericOptionBuilder.constructor`

## Accessors

### isRequired

#### Get Signature

> **get** **isRequired**(): `boolean`

##### Returns

`boolean`

#### Inherited from

`NumericOptionBuilder.isRequired`

***

### optionName

#### Get Signature

> **get** **optionName**(): `string` \| `undefined`

The option name, used to detect duplicates.

##### Returns

`string` \| `undefined`

#### Inherited from

`NumericOptionBuilder.optionName`

## Methods

### addChoices()

> **addChoices**(...`choices`): `this`

#### Parameters

##### choices

...`object`[]

#### Returns

`this`

#### Inherited from

`NumericOptionBuilder.addChoices`

***

### setAutocomplete()

> **setAutocomplete**(`autocomplete?`): `this`

#### Parameters

##### autocomplete?

`boolean` = `true`

#### Returns

`this`

#### Inherited from

`NumericOptionBuilder.setAutocomplete`

***

### setDescription()

> **setDescription**(`description`): `this`

#### Parameters

##### description

`string`

#### Returns

`this`

#### Inherited from

`NumericOptionBuilder.setDescription`

***

### setMaxValue()

> **setMaxValue**(`value`): `this`

#### Parameters

##### value

`number`

#### Returns

`this`

#### Inherited from

`NumericOptionBuilder.setMaxValue`

***

### setMinValue()

> **setMinValue**(`value`): `this`

#### Parameters

##### value

`number`

#### Returns

`this`

#### Inherited from

`NumericOptionBuilder.setMinValue`

***

### setName()

> **setName**(`name`): `this`

#### Parameters

##### name

`string`

#### Returns

`this`

#### Inherited from

`NumericOptionBuilder.setName`

***

### setRequired()

> **setRequired**(`required?`): `this`

#### Parameters

##### required?

`boolean` = `true`

#### Returns

`this`

#### Inherited from

`NumericOptionBuilder.setRequired`

***

### toJSON()

> **toJSON**(): [`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Returns

[`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Inherited from

`NumericOptionBuilder.toJSON`
