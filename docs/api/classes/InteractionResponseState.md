[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / InteractionResponseState

# Class: InteractionResponseState

Enforces Discord's interaction response rules: one initial callback, and edits or
follow-ups only after an acknowledgement.

## Constructors

### Constructor

> **new InteractionResponseState**(`kind`): `InteractionResponseState`

#### Parameters

##### kind

[`InteractionKind`](../type-aliases/InteractionKind.md)

#### Returns

`InteractionResponseState`

## Accessors

### acknowledged

#### Get Signature

> **get** **acknowledged**(): `boolean`

##### Returns

`boolean`

***

### deferred

#### Get Signature

> **get** **deferred**(): `boolean`

##### Returns

`boolean`

## Methods

### transition()

> **transition**(`action`): `void`

Asserts that `action` is allowed now and records it.

#### Parameters

##### action

[`InteractionAction`](../type-aliases/InteractionAction.md)

#### Returns

`void`
