[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / InteractionRouter

# Class: InteractionRouter

Routes INTERACTION_CREATE payloads to handlers:
commands by name (optionally `"name subcommand"` or `"name group subcommand"`),
components and modals by custom id (exact, `prefix:` with arguments, or RegExp),
and autocomplete by command name.

## Constructors

### Constructor

> **new InteractionRouter**(`rest`): `InteractionRouter`

#### Parameters

##### rest

[`RestClient`](RestClient.md)

#### Returns

`InteractionRouter`

## Methods

### autocomplete()

> **autocomplete**(`commandName`, `handler`): `this`

#### Parameters

##### commandName

`string`

##### handler

[`Handler`](../type-aliases/Handler.md)\<[`AutocompleteInteraction`](AutocompleteInteraction.md)\>

#### Returns

`this`

***

### command()

> **command**(`name`, `handler`): `this`

#### Parameters

##### name

`string`

`"ping"`, `"warn add"` or `"config roles set"`

##### handler

[`Handler`](../type-aliases/Handler.md)\<[`CommandInteraction`](CommandInteraction.md)\>

#### Returns

`this`

***

### component()

> **component**(`pattern`, `handler`): `this`

#### Parameters

##### pattern

[`CustomIdPattern`](../type-aliases/CustomIdPattern.md)

##### handler

[`Handler`](../type-aliases/Handler.md)\<[`ComponentInteraction`](ComponentInteraction.md)\>

#### Returns

`this`

***

### handle()

> **handle**(`raw`): `Promise`\<[`AnyInteraction`](../type-aliases/AnyInteraction.md) \| `null`\>

Builds the interaction context and runs the matching handler.

#### Parameters

##### raw

[`ApiInteraction`](../interfaces/ApiInteraction.md)

#### Returns

`Promise`\<[`AnyInteraction`](../type-aliases/AnyInteraction.md) \| `null`\>

the context, or `null` when no handler matched.

***

### modal()

> **modal**(`pattern`, `handler`): `this`

#### Parameters

##### pattern

[`CustomIdPattern`](../type-aliases/CustomIdPattern.md)

##### handler

[`Handler`](../type-aliases/Handler.md)\<[`ModalSubmitInteraction`](ModalSubmitInteraction.md)\>

#### Returns

`this`

***

### onError()

> **onError**(`handler`): `this`

Called when a handler throws or rejects. Defaults to rethrowing.

#### Parameters

##### handler

[`InteractionErrorHandler`](../type-aliases/InteractionErrorHandler.md)

#### Returns

`this`
