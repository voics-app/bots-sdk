[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ApiApplicationCommand

# Interface: ApiApplicationCommand

Body used to create or bulk-overwrite application commands.

## Extends

- [`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md)

## Properties

### application\_id

> **application\_id**: `string`

***

### contexts?

> `optional` **contexts?**: [`InteractionContextType`](../type-aliases/InteractionContextType.md)[]

#### Inherited from

[`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md).[`contexts`](ApiApplicationCommandCreateBody.md#contexts)

***

### default\_member\_permissions?

> `optional` **default\_member\_permissions?**: `string` \| `null`

#### Inherited from

[`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md).[`default_member_permissions`](ApiApplicationCommandCreateBody.md#default_member_permissions)

***

### description?

> `optional` **description?**: `string`

#### Inherited from

[`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md).[`description`](ApiApplicationCommandCreateBody.md#description)

***

### guild\_id?

> `optional` **guild\_id?**: `string`

***

### id

> **id**: `string`

***

### name

> **name**: `string`

#### Inherited from

[`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md).[`name`](ApiApplicationCommandCreateBody.md#name)

***

### nsfw?

> `optional` **nsfw?**: `boolean`

#### Inherited from

[`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md).[`nsfw`](ApiApplicationCommandCreateBody.md#nsfw)

***

### options?

> `optional` **options?**: [`ApiApplicationCommandOption`](ApiApplicationCommandOption.md)[]

#### Inherited from

[`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md).[`options`](ApiApplicationCommandCreateBody.md#options)

***

### type?

> `optional` **type?**: [`ApplicationCommandType`](../type-aliases/ApplicationCommandType.md)

#### Inherited from

[`ApiApplicationCommandCreateBody`](ApiApplicationCommandCreateBody.md).[`type`](ApiApplicationCommandCreateBody.md#type)

***

### version

> **version**: `string`
