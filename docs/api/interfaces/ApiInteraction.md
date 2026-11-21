[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ApiInteraction

# Interface: ApiInteraction

## Properties

### app\_permissions?

> `optional` **app\_permissions?**: `string`

***

### application\_id

> **application\_id**: `string`

***

### channel?

> `optional` **channel?**: `Partial`\<[`ApiChannel`](ApiChannel.md)\>

***

### channel\_id?

> `optional` **channel\_id?**: `string`

***

### data?

> `optional` **data?**: [`ApiApplicationCommandInteractionData`](ApiApplicationCommandInteractionData.md) \| [`ApiMessageComponentInteractionData`](ApiMessageComponentInteractionData.md) \| [`ApiModalSubmitInteractionData`](ApiModalSubmitInteractionData.md)

***

### guild\_id?

> `optional` **guild\_id?**: `string`

***

### guild\_locale?

> `optional` **guild\_locale?**: `string`

***

### id

> **id**: `string`

***

### locale?

> `optional` **locale?**: `string`

***

### member?

> `optional` **member?**: [`ApiGuildMember`](ApiGuildMember.md) & `object`

#### Type Declaration

##### permissions

> **permissions**: `string`

##### user

> **user**: [`ApiUser`](ApiUser.md)

***

### message?

> `optional` **message?**: [`ApiMessage`](ApiMessage.md)

***

### token

> **token**: `string`

***

### type

> **type**: [`InteractionType`](../type-aliases/InteractionType.md)

***

### user?

> `optional` **user?**: [`ApiUser`](ApiUser.md)

***

### version

> **version**: `number`
