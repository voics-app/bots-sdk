[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / WebhookClient

# Class: WebhookClient

Executes a webhook with only its id and token (no bot token needed). Also drives interaction
webhooks, whose id is the application id, for follow-ups and edits of the original response.

## Constructors

### Constructor

> **new WebhookClient**(`credentials`, `options?`): `WebhookClient`

#### Parameters

##### credentials

[`WebhookCredentials`](../type-aliases/WebhookCredentials.md)

##### options?

###### rest?

[`RestClient`](RestClient.md)

share a [RestClient](RestClient.md) (and its rate-limit state); otherwise one is created from `restOptions`.

###### restOptions?

[`RestClientOptions`](../interfaces/RestClientOptions.md)

#### Returns

`WebhookClient`

## Properties

### id

> `readonly` **id**: `string`

## Methods

### deleteOriginal()

> **deleteOriginal**(): `Promise`\<`void`\>

Deletes the original interaction response (interaction webhooks only).

#### Returns

`Promise`\<`void`\>

***

### editOriginal()

> **editOriginal**(`payload`): `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

Edits the original interaction response (interaction webhooks only).

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

#### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

***

### send()

> **send**(`payload`, `options?`): `Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>

Posts a message and returns it (the request uses `?wait=true`).

#### Parameters

##### payload

[`MessagePayload`](../type-aliases/MessagePayload.md)

##### options?

[`WebhookSendOptions`](../interfaces/WebhookSendOptions.md) = `{}`

#### Returns

`Promise`\<[`ApiMessage`](../interfaces/ApiMessage.md)\>
