[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ContextMenuCommandBuilder

# Class: ContextMenuCommandBuilder

Builds a user or message context-menu command (right-click → Apps).

## Constructors

### Constructor

> **new ContextMenuCommandBuilder**(): `ContextMenuCommandBuilder`

#### Returns

`ContextMenuCommandBuilder`

## Methods

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

#### Parameters

##### permissions

[`PermissionResolvable`](../type-aliases/PermissionResolvable.md) \| `null`

#### Returns

`this`

***

### setName()

> **setName**(`name`): `this`

1-32 characters; unlike slash commands, spaces and capitals are allowed.

#### Parameters

##### name

`string`

#### Returns

`this`

***

### setType()

> **setType**(`type`): `this`

#### Parameters

##### type

`"User"` \| `"Message"`

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiApplicationCommandCreateBody`](../interfaces/ApiApplicationCommandCreateBody.md)

#### Returns

[`ApiApplicationCommandCreateBody`](../interfaces/ApiApplicationCommandCreateBody.md)
