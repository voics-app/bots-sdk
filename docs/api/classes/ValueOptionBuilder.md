[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ValueOptionBuilder

# Abstract Class: ValueOptionBuilder

An option that holds a value (not a subcommand).

## Extends

- [`NamedOptionBuilder`](NamedOptionBuilder.md)

## Extended by

- [`BooleanOptionBuilder`](BooleanOptionBuilder.md)
- [`UserOptionBuilder`](UserOptionBuilder.md)
- [`ChannelOptionBuilder`](ChannelOptionBuilder.md)
- [`RoleOptionBuilder`](RoleOptionBuilder.md)
- [`MentionableOptionBuilder`](MentionableOptionBuilder.md)
- [`AttachmentOptionBuilder`](AttachmentOptionBuilder.md)

## Constructors

### Constructor

> **new ValueOptionBuilder**(): `ValueOptionBuilder`

#### Returns

`ValueOptionBuilder`

#### Inherited from

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`constructor`](NamedOptionBuilder.md#constructor)

## Accessors

### isRequired

#### Get Signature

> **get** **isRequired**(): `boolean`

##### Returns

`boolean`

***

### optionName

#### Get Signature

> **get** **optionName**(): `string` \| `undefined`

The option name, used to detect duplicates.

##### Returns

`string` \| `undefined`

#### Inherited from

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`optionName`](NamedOptionBuilder.md#optionname)

## Methods

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

### setRequired()

> **setRequired**(`required?`): `this`

#### Parameters

##### required?

`boolean` = `true`

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Returns

[`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Overrides

[`NamedOptionBuilder`](NamedOptionBuilder.md).[`toJSON`](NamedOptionBuilder.md#tojson)
