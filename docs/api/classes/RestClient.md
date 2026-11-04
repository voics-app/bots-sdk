[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / RestClient

# Class: RestClient

JSON REST client for the Voics API with automatic rate-limit handling.

## Constructors

### Constructor

> **new RestClient**(`options?`): `RestClient`

#### Parameters

##### options?

[`RestClientOptions`](../interfaces/RestClientOptions.md) = `{}`

#### Returns

`RestClient`

## Methods

### delete()

> **delete**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

`Promise`\<`T`\>

***

### get()

> **get**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

`Promise`\<`T`\>

***

### patch()

> **patch**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

`Promise`\<`T`\>

***

### post()

> **post**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

`Promise`\<`T`\>

***

### put()

> **put**\<`T`\>(`path`, `options?`): `Promise`\<`T`\>

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md)

#### Returns

`Promise`\<`T`\>

***

### request()

> **request**\<`T`\>(`method`, `path`, `options?`): `Promise`\<`T`\>

#### Type Parameters

##### T

`T` = `unknown`

#### Parameters

##### method

[`HttpMethod`](../type-aliases/HttpMethod.md)

##### path

`string`

##### options?

[`RequestOptions`](../interfaces/RequestOptions.md) = `{}`

#### Returns

`Promise`\<`T`\>

***

### setToken()

> **setToken**(`token`): `this`

#### Parameters

##### token

`string`

#### Returns

`this`
