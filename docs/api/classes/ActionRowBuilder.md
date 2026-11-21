[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ActionRowBuilder

# Class: ActionRowBuilder\<C\>

A horizontal row of up to five buttons, or a single select menu or text input.

## Type Parameters

### C

`C` *extends* [`RowComponentBuilder`](../type-aliases/RowComponentBuilder.md) = [`RowComponentBuilder`](../type-aliases/RowComponentBuilder.md)

## Constructors

### Constructor

> **new ActionRowBuilder**\<`C`\>(): `ActionRowBuilder`\<`C`\>

#### Returns

`ActionRowBuilder`\<`C`\>

## Methods

### addComponents()

> **addComponents**(...`components`): `this`

#### Parameters

##### components

...`C`[]

#### Returns

`this`

***

### setComponents()

> **setComponents**(...`components`): `this`

#### Parameters

##### components

...`C`[]

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiActionRow`](../interfaces/ApiActionRow.md)\<`ReturnType`\<`C`\[`"toJSON"`\]\>\>

#### Returns

[`ApiActionRow`](../interfaces/ApiActionRow.md)\<`ReturnType`\<`C`\[`"toJSON"`\]\>\>
