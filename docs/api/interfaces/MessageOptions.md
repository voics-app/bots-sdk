[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / MessageOptions

# Interface: MessageOptions

Message content as accepted by every send/reply/edit method.

## Properties

### allowed\_mentions?

> `optional` **allowed\_mentions?**: [`ApiAllowedMentions`](ApiAllowedMentions.md)

***

### components?

> `optional` **components?**: ([`ApiActionRow`](ApiActionRow.md)\<[`ApiMessageComponent`](../type-aliases/ApiMessageComponent.md) \| [`ApiTextInput`](ApiTextInput.md)\> \| [`JSONEncodable`](JSONEncodable.md)\<[`ApiActionRow`](ApiActionRow.md)\<[`ApiMessageComponent`](../type-aliases/ApiMessageComponent.md) \| [`ApiTextInput`](ApiTextInput.md)\>\>)[]

***

### content?

> `optional` **content?**: `string`

***

### embeds?

> `optional` **embeds?**: ([`ApiEmbed`](ApiEmbed.md) \| [`JSONEncodable`](JSONEncodable.md)\<[`ApiEmbed`](ApiEmbed.md)\>)[]

***

### ephemeral?

> `optional` **ephemeral?**: `boolean`

Only the invoking user sees the message (interaction replies and follow-ups only).

***

### flags?

> `optional` **flags?**: `number`

***

### message\_reference?

> `optional` **message\_reference?**: [`ApiMessageReference`](ApiMessageReference.md)

***

### tts?

> `optional` **tts?**: `boolean`
