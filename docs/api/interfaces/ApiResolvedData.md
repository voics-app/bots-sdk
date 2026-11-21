[**@voics-app/bots API reference**](../README.md)

***

[@voics-app/bots API reference](../README.md) / ApiResolvedData

# Interface: ApiResolvedData

## Properties

### attachments?

> `optional` **attachments?**: `Record`\<`string`, [`ApiAttachment`](ApiAttachment.md)\>

***

### channels?

> `optional` **channels?**: `Record`\<`string`, `Partial`\<[`ApiChannel`](ApiChannel.md)\> & `Pick`\<[`ApiChannel`](ApiChannel.md), `"id"` \| `"type"`\>\>

***

### members?

> `optional` **members?**: `Record`\<`string`, `Omit`\<[`ApiGuildMember`](ApiGuildMember.md), `"user"`\>\>

***

### messages?

> `optional` **messages?**: `Record`\<`string`, [`ApiMessage`](ApiMessage.md)\>

***

### roles?

> `optional` **roles?**: `Record`\<`string`, [`ApiRole`](ApiRole.md)\>

***

### users?

> `optional` **users?**: `Record`\<`string`, [`ApiUser`](ApiUser.md)\>
