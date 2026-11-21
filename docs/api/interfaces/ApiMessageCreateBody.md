[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ApiMessageCreateBody

# Interface: ApiMessageCreateBody

Body of `POST /channels/{id}/messages`, webhook executes and interaction replies.

## Extended by

- [`ApiInteractionCallbackData`](ApiInteractionCallbackData.md)

## Properties

### allowed\_mentions?

> `optional` **allowed\_mentions?**: [`ApiAllowedMentions`](ApiAllowedMentions.md)

***

### attachments?

> `optional` **attachments?**: `Partial`\<[`ApiAttachment`](ApiAttachment.md)\>[]

***

### components?

> `optional` **components?**: [`ApiActionRow`](ApiActionRow.md)\<[`ApiMessageComponent`](../type-aliases/ApiMessageComponent.md) \| [`ApiTextInput`](ApiTextInput.md)\>[]

***

### content?

> `optional` **content?**: `string`

***

### embeds?

> `optional` **embeds?**: [`ApiEmbed`](ApiEmbed.md)[]

***

### flags?

> `optional` **flags?**: `number`

***

### message\_reference?

> `optional` **message\_reference?**: [`ApiMessageReference`](ApiMessageReference.md)

***

### nonce?

> `optional` **nonce?**: `string`

***

### tts?

> `optional` **tts?**: `boolean`
