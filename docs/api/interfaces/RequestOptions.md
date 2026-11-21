[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / RequestOptions

# Interface: RequestOptions

## Properties

### auth?

> `optional` **auth?**: `boolean`

Send the bot token (default `true`; webhook and interaction follow-up calls use `false`).

***

### body?

> `optional` **body?**: `unknown`

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

***

### query?

> `optional` **query?**: `Record`\<`string`, [`QueryValue`](../type-aliases/QueryValue.md)\>

***

### reason?

> `optional` **reason?**: `string`

Audit-log reason, sent URL-encoded as `X-Audit-Log-Reason`.
