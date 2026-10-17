[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / RestClientOptions

# Interface: RestClientOptions

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

Base URL including `/api/v1` (default [DEFAULT\_API\_URL](../variables/DEFAULT_API_URL.md)).

***

### clock?

> `optional` **clock?**: [`Clock`](Clock.md)

***

### fetch?

> `optional` **fetch?**: \{(`input`, `init?`): `Promise`\<`Response`\>; (`input`, `init?`): `Promise`\<`Response`\>; \}

Custom fetch, e.g. for proxies. Ignored when `transport` is given.

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`URL` \| `RequestInfo`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

##### Parameters

###### input

`string` \| `URL` \| `Request`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

***

### onRateLimited?

> `optional` **onRateLimited?**: (`event`) => `void`

#### Parameters

##### event

[`RateLimitedEvent`](RateLimitedEvent.md)

#### Returns

`void`

***

### retries?

> `optional` **retries?**: `number`

Retries for 429 and transient 5xx responses (default 3).

***

### token?

> `optional` **token?**: `string`

Bot token, sent as `Authorization: Bot <token>`. Can be set later with [RestClient.setToken](../classes/RestClient.md#settoken).

***

### transport?

> `optional` **transport?**: [`HttpTransport`](HttpTransport.md)
