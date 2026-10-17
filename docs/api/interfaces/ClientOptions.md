[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / ClientOptions

# Interface: ClientOptions

## Properties

### adapters?

> `optional` **adapters?**: `object`

Advanced: replace the transport-level adapters (used by tests).

#### clock?

> `optional` **clock?**: [`Clock`](Clock.md)

#### random?

> `optional` **random?**: [`RandomSource`](../type-aliases/RandomSource.md)

#### socketFactory?

> `optional` **socketFactory?**: [`GatewaySocketFactory`](../type-aliases/GatewaySocketFactory.md)

***

### applicationId?

> `optional` **applicationId?**: `string`

Application id; learned from READY when omitted. Needed only to register commands before login.

***

### backoff?

> `optional` **backoff?**: [`BackoffOptions`](BackoffOptions.md)

***

### deviceId?

> `optional` **deviceId?**: `string` \| `null`

Device id sent with IDENTIFY. Bots have no device, so this defaults to `null`.

***

### gatewayUrl?

> `optional` **gatewayUrl?**: `string`

Gateway URL without query string (default [DEFAULT\_GATEWAY\_URL](../variables/DEFAULT_GATEWAY_URL.md)).

***

### intents

> **intents**: [`IntentResolvable`](../type-aliases/IntentResolvable.md)

Gateway intents: names, bits or a bitfield. Privileged intents must be enabled on the application.

***

### presence?

> `optional` **presence?**: [`GatewayPresenceUpdateData`](GatewayPresenceUpdateData.md)

Initial presence sent with IDENTIFY.

***

### rest?

> `optional` **rest?**: `Omit`\<[`RestClientOptions`](RestClientOptions.md), `"token"`\>

REST options; `token` is filled in from [ClientOptions.token](#token).

***

### token

> **token**: `string`

Bot token from the application's Bot page.

***

### WebSocket?

> `optional` **WebSocket?**: [`WebSocketConstructor`](../type-aliases/WebSocketConstructor.md)

WebSocket implementation for runtimes without a global one.
