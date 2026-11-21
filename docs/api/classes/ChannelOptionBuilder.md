[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ChannelOptionBuilder

# Class: ChannelOptionBuilder

An option that holds a value (not a subcommand).

## Extends

- [`ValueOptionBuilder`](ValueOptionBuilder.md)

## Constructors

### Constructor

> **new ChannelOptionBuilder**(): `ChannelOptionBuilder`

#### Returns

`ChannelOptionBuilder`

#### Inherited from

[`ValueOptionBuilder`](ValueOptionBuilder.md).[`constructor`](ValueOptionBuilder.md#constructor)

## Accessors

### isRequired

#### Get Signature

> **get** **isRequired**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`ValueOptionBuilder`](ValueOptionBuilder.md).[`isRequired`](ValueOptionBuilder.md#isrequired)

***

### optionName

#### Get Signature

> **get** **optionName**(): `string` \| `undefined`

The option name, used to detect duplicates.

##### Returns

`string` \| `undefined`

#### Inherited from

[`ValueOptionBuilder`](ValueOptionBuilder.md).[`optionName`](ValueOptionBuilder.md#optionname)

## Methods

### addChannelTypes()

> **addChannelTypes**(...`types`): `this`

#### Parameters

##### types

...[`ChannelType`](../type-aliases/ChannelType.md)[]

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

[`ValueOptionBuilder`](ValueOptionBuilder.md).[`setDescription`](ValueOptionBuilder.md#setdescription)

***

### setName()

> **setName**(`name`): `this`

#### Parameters

##### name

`string`

#### Returns

`this`

#### Inherited from

[`ValueOptionBuilder`](ValueOptionBuilder.md).[`setName`](ValueOptionBuilder.md#setname)

***

### setRequired()

> **setRequired**(`required?`): `this`

#### Parameters

##### required?

`boolean` = `true`

#### Returns

`this`

#### Inherited from

[`ValueOptionBuilder`](ValueOptionBuilder.md).[`setRequired`](ValueOptionBuilder.md#setrequired)

***

### toJSON()

> **toJSON**(): [`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Returns

[`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Inherited from

[`ValueOptionBuilder`](ValueOptionBuilder.md).[`toJSON`](ValueOptionBuilder.md#tojson)
