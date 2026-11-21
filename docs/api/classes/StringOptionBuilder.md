[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / StringOptionBuilder

# Class: StringOptionBuilder

## Extends

- `ChoiceOptionBuilder`\<`string`\>

## Constructors

### Constructor

> **new StringOptionBuilder**(): `StringOptionBuilder`

#### Returns

`StringOptionBuilder`

#### Inherited from

`ChoiceOptionBuilder<string>.constructor`

## Accessors

### isRequired

#### Get Signature

> **get** **isRequired**(): `boolean`

##### Returns

`boolean`

#### Inherited from

`ChoiceOptionBuilder.isRequired`

***

### optionName

#### Get Signature

> **get** **optionName**(): `string` \| `undefined`

The option name, used to detect duplicates.

##### Returns

`string` \| `undefined`

#### Inherited from

`ChoiceOptionBuilder.optionName`

## Methods

### addChoices()

> **addChoices**(...`choices`): `this`

#### Parameters

##### choices

...`object`[]

#### Returns

`this`

#### Inherited from

`ChoiceOptionBuilder.addChoices`

***

### setAutocomplete()

> **setAutocomplete**(`autocomplete?`): `this`

#### Parameters

##### autocomplete?

`boolean` = `true`

#### Returns

`this`

#### Inherited from

`ChoiceOptionBuilder.setAutocomplete`

***

### setDescription()

> **setDescription**(`description`): `this`

#### Parameters

##### description

`string`

#### Returns

`this`

#### Inherited from

`ChoiceOptionBuilder.setDescription`

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

### setName()

> **setName**(`name`): `this`

#### Parameters

##### name

`string`

#### Returns

`this`

#### Inherited from

`ChoiceOptionBuilder.setName`

***

### setRequired()

> **setRequired**(`required?`): `this`

#### Parameters

##### required?

`boolean` = `true`

#### Returns

`this`

#### Inherited from

`ChoiceOptionBuilder.setRequired`

***

### toJSON()

> **toJSON**(): [`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Returns

[`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Inherited from

`ChoiceOptionBuilder.toJSON`
