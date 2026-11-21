[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / SubcommandGroupBuilder

# Class: SubcommandGroupBuilder

A group of subcommands: `/command <group> <subcommand> ...options`.

## Extends

- [`NamedOptionBuilder`](NamedOptionBuilder.md)

## Constructors

### Constructor

> **new SubcommandGroupBuilder**(): `SubcommandGroupBuilder`

#### Returns

`SubcommandGroupBuilder`

#### Inherited from

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`constructor`](NamedOptionBuilder.md#constructor)

## Accessors

### optionName

#### Get Signature

> **get** **optionName**(): `string` \| `undefined`

The option name, used to detect duplicates.

##### Returns

`string` \| `undefined`

#### Inherited from

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`optionName`](NamedOptionBuilder.md#optionname)

## Methods

### addSubcommand()

> **addSubcommand**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`SubcommandBuilder`](SubcommandBuilder.md)\>

#### Returns

`this`

***

### setDescription()

> **setDescription**(`description`): `this`

#### Parameters

##### description

`string`

#### Returns

`this`

#### Inherited from

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`setDescription`](NamedOptionBuilder.md#setdescription)

***

### setName()

> **setName**(`name`): `this`

#### Parameters

##### name

`string`

#### Returns

`this`

#### Inherited from

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`setName`](NamedOptionBuilder.md#setname)

***

### toJSON()

> **toJSON**(): [`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Returns

[`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Overrides

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`toJSON`](NamedOptionBuilder.md#tojson)
