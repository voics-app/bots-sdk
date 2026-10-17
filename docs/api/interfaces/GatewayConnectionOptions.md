[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / GatewayConnectionOptions

# Interface: GatewayConnectionOptions

## Properties

### backoff?

> `optional` **backoff?**: [`BackoffOptions`](BackoffOptions.md)

***

### clock

> **clock**: [`Clock`](Clock.md)

***

### deviceId

> **deviceId**: `string` \| `null`

***

### intents

> **intents**: `number`

***

### invalidSessionDelayMs?

> `optional` **invalidSessionDelayMs?**: \[`number`, `number`\]

Random wait range before re-identifying after INVALID_SESSION (default 1-5 s).

***

### presence?

> `optional` **presence?**: [`GatewayPresenceUpdateData`](GatewayPresenceUpdateData.md)

***

### properties

> **properties**: [`GatewayIdentifyProperties`](GatewayIdentifyProperties.md)

***

### random

> **random**: [`RandomSource`](../type-aliases/RandomSource.md)

***

### socketFactory

> **socketFactory**: [`GatewaySocketFactory`](../type-aliases/GatewaySocketFactory.md)

***

### token

> **token**: `string`

***

### url

> **url**: `string`

Gateway URL without query, e.g. `wss://discordy-gateway.voics.nl/gateway`.
