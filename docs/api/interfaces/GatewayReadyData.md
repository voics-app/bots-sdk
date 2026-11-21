[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / GatewayReadyData

# Interface: GatewayReadyData

## Properties

### application?

> `optional` **application?**: `Pick`\<[`ApiApplication`](ApiApplication.md), `"id"`\> & `Partial`\<[`ApiApplication`](ApiApplication.md)\>

***

### guilds

> **guilds**: ([`ApiGuild`](ApiGuild.md) \| [`ApiUnavailableGuild`](ApiUnavailableGuild.md))[]

***

### private\_channels?

> `optional` **private\_channels?**: [`ApiChannel`](ApiChannel.md)[]

***

### resume\_gateway\_url?

> `optional` **resume\_gateway\_url?**: `string`

***

### session\_id

> **session\_id**: `string`

***

### user

> **user**: [`ApiUser`](ApiUser.md)
