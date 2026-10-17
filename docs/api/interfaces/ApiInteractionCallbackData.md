[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / ApiInteractionCallbackData

# Interface: ApiInteractionCallbackData

Body of `POST /channels/{id}/messages`, webhook executes and interaction replies.

## Extends

- [`ApiMessageCreateBody`](ApiMessageCreateBody.md)

## Properties

### allowed\_mentions?

> `optional` **allowed\_mentions?**: [`ApiAllowedMentions`](ApiAllowedMentions.md)

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`allowed_mentions`](ApiMessageCreateBody.md#allowed_mentions)

***

### attachments?

> `optional` **attachments?**: `Partial`\<[`ApiAttachment`](ApiAttachment.md)\>[]

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`attachments`](ApiMessageCreateBody.md#attachments)

***

### choices?

> `optional` **choices?**: [`ApiApplicationCommandOptionChoice`](ApiApplicationCommandOptionChoice.md)[]

***

### components?

> `optional` **components?**: [`ApiActionRow`](ApiActionRow.md)\<[`ApiMessageComponent`](../type-aliases/ApiMessageComponent.md) \| [`ApiTextInput`](ApiTextInput.md)\>[]

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`components`](ApiMessageCreateBody.md#components)

***

### content?

> `optional` **content?**: `string`

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`content`](ApiMessageCreateBody.md#content)

***

### custom\_id?

> `optional` **custom\_id?**: `string`

***

### embeds?

> `optional` **embeds?**: [`ApiEmbed`](ApiEmbed.md)[]

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`embeds`](ApiMessageCreateBody.md#embeds)

***

### flags?

> `optional` **flags?**: `number`

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`flags`](ApiMessageCreateBody.md#flags)

***

### message\_reference?

> `optional` **message\_reference?**: [`ApiMessageReference`](ApiMessageReference.md)

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`message_reference`](ApiMessageCreateBody.md#message_reference)

***

### nonce?

> `optional` **nonce?**: `string`

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`nonce`](ApiMessageCreateBody.md#nonce)

***

### title?

> `optional` **title?**: `string`

***

### tts?

> `optional` **tts?**: `boolean`

#### Inherited from

[`ApiMessageCreateBody`](ApiMessageCreateBody.md).[`tts`](ApiMessageCreateBody.md#tts)
