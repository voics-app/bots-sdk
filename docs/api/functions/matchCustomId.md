[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / matchCustomId

# Function: matchCustomId()

> **matchCustomId**(`pattern`, `customId`): `string`[] \| `null`

Matches a custom id.
- A string matches exactly, or as a prefix followed by `:`; the remainder is split into arguments.
- A RegExp returns its capture groups.

## Parameters

### pattern

[`CustomIdPattern`](../type-aliases/CustomIdPattern.md)

### customId

`string`

## Returns

`string`[] \| `null`

the arguments, or `null` when it does not match.
