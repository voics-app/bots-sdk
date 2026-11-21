[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / SlashCommandBuilder

# Class: SlashCommandBuilder

Builds a chat-input (slash) command for registration.

## Extends

- `OptionHolder`

## Constructors

### Constructor

> **new SlashCommandBuilder**(): `SlashCommandBuilder`

#### Returns

`SlashCommandBuilder`

#### Inherited from

`OptionHolder.constructor`

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

### addSubcommand()

> **addSubcommand**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`SubcommandBuilder`](SubcommandBuilder.md)\>

#### Returns

`this`

***

### addSubcommandGroup()

> **addSubcommandGroup**(`configure`): `this`

#### Parameters

##### configure

[`Configure`](../type-aliases/Configure.md)\<[`SubcommandGroupBuilder`](SubcommandGroupBuilder.md)\>

#### Returns

`this`

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

### setContexts()

> **setContexts**(...`contexts`): `this`

#### Parameters

##### contexts

...[`InteractionContextResolvable`](../type-aliases/InteractionContextResolvable.md)[]

#### Returns

`this`

***

### setDefaultMemberPermissions()

> **setDefaultMemberPermissions**(`permissions`): `this`

Permissions a member needs to see the command by default; `null` clears the requirement.

#### Parameters

##### permissions

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md) \| `null`

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

***

### setName()

> **setName**(`name`): `this`

#### Parameters

##### name

`string`

#### Returns

`this`

***

### setNSFW()

> **setNSFW**(`nsfw?`): `this`

#### Parameters

##### nsfw?

`boolean` = `true`

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiApplicationCommandCreateBody`](../interfaces/ApiApplicationCommandCreateBody.md)

#### Returns

[`ApiApplicationCommandCreateBody`](../interfaces/ApiApplicationCommandCreateBody.md)
