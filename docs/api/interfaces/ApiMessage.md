[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / ApiMessage

# Interface: ApiMessage

## Properties

### attachments

> **attachments**: [`ApiAttachment`](ApiAttachment.md)[]

***

### author

> **author**: [`ApiUser`](ApiUser.md)

***

### channel\_id

> **channel\_id**: `string`

***

### components?

> `optional` **components?**: [`ApiActionRow`](ApiActionRow.md)\<[`ApiMessageComponent`](../type-aliases/ApiMessageComponent.md) \| [`ApiTextInput`](ApiTextInput.md)\>[]

***

### content

> **content**: `string`

***

### edited\_timestamp

> **edited\_timestamp**: `string` \| `null`

***

### embeds

> **embeds**: [`ApiEmbed`](ApiEmbed.md)[]

***

### flags?

> `optional` **flags?**: `number`

***

### guild\_id?

> `optional` **guild\_id?**: `string`

***

### id

> **id**: `string`

***

### interaction\_metadata?

> `optional` **interaction\_metadata?**: `object`

#### id

> **id**: `string`

#### type

> **type**: `number`

#### user

> **user**: [`ApiUser`](ApiUser.md)

***

### member?

> `optional` **member?**: [`ApiGuildMember`](ApiGuildMember.md)

***

### mention\_everyone?

> `optional` **mention\_everyone?**: `boolean`

***

### mention\_roles?

> `optional` **mention\_roles?**: `string`[]

***

### mentions?

> `optional` **mentions?**: [`ApiUser`](ApiUser.md)[]

***

### message\_reference?

> `optional` **message\_reference?**: [`ApiMessageReference`](ApiMessageReference.md)

***

### nonce?

> `optional` **nonce?**: `string` \| `number`

***

### pinned?

> `optional` **pinned?**: `boolean`

***

### reactions?

> `optional` **reactions?**: [`ApiReaction`](ApiReaction.md)[]

***

### timestamp

> **timestamp**: `string`

***

### tts?

> `optional` **tts?**: `boolean`

***

### type

> **type**: `number`

***

### webhook\_id?

> `optional` **webhook\_id?**: `string`
