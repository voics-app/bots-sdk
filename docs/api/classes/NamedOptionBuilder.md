[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / NamedOptionBuilder

# Abstract Class: NamedOptionBuilder

Shared name/description handling for every option-like builder.

## Extended by

- [`SubcommandGroupBuilder`](SubcommandGroupBuilder.md)
- [`ValueOptionBuilder`](ValueOptionBuilder.md)

## Constructors

### Constructor

> **new NamedOptionBuilder**(): `NamedOptionBuilder`

#### Returns

`NamedOptionBuilder`

## Accessors

### optionName

#### Get Signature

> **get** **optionName**(): `string` \| `undefined`

The option name, used to detect duplicates.

##### Returns

`string` \| `undefined`

## Methods

### setDescription()

> **setDescription**(`description`): `this`

#### Parameters

##### description

`string`

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

***

### toJSON()

> `abstract` **toJSON**(): [`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Returns

[`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)
