[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / SubcommandBuilder

# Class: SubcommandBuilder

A subcommand: `/command <subcommand> ...options`.

## Extends

- `OptionHolder`

## Implements

- [`ChildBuilder`](../interfaces/ChildBuilder.md)

## Constructors

### Constructor

> **new SubcommandBuilder**(): `SubcommandBuilder`

#### Returns

`SubcommandBuilder`

#### Inherited from

`OptionHolder.constructor`

## Accessors

### optionName

#### Get Signature

> **get** **optionName**(): `string` \| `undefined`

##### Returns

`string` \| `undefined`

#### Implementation of

[`ChildBuilder`](../interfaces/ChildBuilder.md).[`optionName`](../interfaces/ChildBuilder.md#optionname)

## Methods

### addAttachmentOption()

> **addAttachmentOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`AttachmentOptionBuilder`](AttachmentOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addAttachmentOption`

***

### addBooleanOption()

> **addBooleanOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`BooleanOptionBuilder`](BooleanOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addBooleanOption`

***

### addChannelOption()

> **addChannelOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`ChannelOptionBuilder`](ChannelOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addChannelOption`

***

### addIntegerOption()

> **addIntegerOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`IntegerOptionBuilder`](IntegerOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addIntegerOption`

***

### addMentionableOption()

> **addMentionableOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`MentionableOptionBuilder`](MentionableOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addMentionableOption`

***

### addNumberOption()

> **addNumberOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`NumberOptionBuilder`](NumberOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addNumberOption`

***

### addRoleOption()

> **addRoleOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`RoleOptionBuilder`](RoleOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addRoleOption`

***

### addStringOption()

> **addStringOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`StringOptionBuilder`](StringOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addStringOption`

***

### addUserOption()

> **addUserOption**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`UserOptionBuilder`](UserOptionBuilder.md)\>

#### Returns

`this`

#### Inherited from

`OptionHolder.addUserOption`

***

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

> **toJSON**(): [`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Returns

[`ApiApplicationCommandOption`](../interfaces/ApiApplicationCommandOption.md)

#### Implementation of

[`ChildBuilder`](../interfaces/ChildBuilder.md).[`toJSON`](../interfaces/ChildBuilder.md#tojson)
