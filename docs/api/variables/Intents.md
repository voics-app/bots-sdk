[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / Intents

# Variable: Intents

> `const` **Intents**: `object`

Helpers for gateway intent bitfields (P7).

## Type Declaration

### Flags

> `readonly` **Flags**: `object` = `GatewayIntentBits`

#### Flags.DirectMessageReactions

> `readonly` **DirectMessageReactions**: `number`

#### Flags.DirectMessages

> `readonly` **DirectMessages**: `number`

#### Flags.DirectMessageTyping

> `readonly` **DirectMessageTyping**: `number`

#### Flags.GuildEmojis

> `readonly` **GuildEmojis**: `number`

#### Flags.GuildIntegrations

> `readonly` **GuildIntegrations**: `number`

#### Flags.GuildInvites

> `readonly` **GuildInvites**: `number`

#### Flags.GuildMembers

> `readonly` **GuildMembers**: `number`

#### Flags.GuildMessageReactions

> `readonly` **GuildMessageReactions**: `number`

#### Flags.GuildMessages

> `readonly` **GuildMessages**: `number`

#### Flags.GuildMessageTyping

> `readonly` **GuildMessageTyping**: `number`

#### Flags.GuildModeration

> `readonly` **GuildModeration**: `number`

#### Flags.GuildPresences

> `readonly` **GuildPresences**: `number`

#### Flags.Guilds

> `readonly` **Guilds**: `number`

#### Flags.GuildVoiceStates

> `readonly` **GuildVoiceStates**: `number`

#### Flags.GuildWebhooks

> `readonly` **GuildWebhooks**: `number`

#### Flags.MessageContent

> `readonly` **MessageContent**: `number`

### NonPrivileged

> `readonly` **NonPrivileged**: `number`

Every intent that needs no approval on the application.

### resolve

> **resolve**: (`intents`) => `number`

#### Parameters

##### intents

[`IntentResolvable`](../type-aliases/IntentResolvable.md)

#### Returns

`number`

### toArray

> **toArray**: (`bits`) => (`"Guilds"` \| `"GuildMembers"` \| `"GuildModeration"` \| `"GuildEmojis"` \| `"GuildIntegrations"` \| `"GuildWebhooks"` \| `"GuildInvites"` \| `"GuildVoiceStates"` \| `"GuildPresences"` \| `"GuildMessages"` \| `"GuildMessageReactions"` \| `"GuildMessageTyping"` \| `"DirectMessages"` \| `"DirectMessageReactions"` \| `"DirectMessageTyping"` \| `"MessageContent"`)[]

#### Parameters

##### bits

`number`

#### Returns

(`"Guilds"` \| `"GuildMembers"` \| `"GuildModeration"` \| `"GuildEmojis"` \| `"GuildIntegrations"` \| `"GuildWebhooks"` \| `"GuildInvites"` \| `"GuildVoiceStates"` \| `"GuildPresences"` \| `"GuildMessages"` \| `"GuildMessageReactions"` \| `"GuildMessageTyping"` \| `"DirectMessages"` \| `"DirectMessageReactions"` \| `"DirectMessageTyping"` \| `"MessageContent"`)[]

### privileged()

> `readonly` **privileged**(`bits`): (`"Guilds"` \| `"GuildMembers"` \| `"GuildModeration"` \| `"GuildEmojis"` \| `"GuildIntegrations"` \| `"GuildWebhooks"` \| `"GuildInvites"` \| `"GuildVoiceStates"` \| `"GuildPresences"` \| `"GuildMessages"` \| `"GuildMessageReactions"` \| `"GuildMessageTyping"` \| `"DirectMessages"` \| `"DirectMessageReactions"` \| `"DirectMessageTyping"` \| `"MessageContent"`)[]

#### Parameters

##### bits

`number`

#### Returns

(`"Guilds"` \| `"GuildMembers"` \| `"GuildModeration"` \| `"GuildEmojis"` \| `"GuildIntegrations"` \| `"GuildWebhooks"` \| `"GuildInvites"` \| `"GuildVoiceStates"` \| `"GuildPresences"` \| `"GuildMessages"` \| `"GuildMessageReactions"` \| `"GuildMessageTyping"` \| `"DirectMessages"` \| `"DirectMessageReactions"` \| `"DirectMessageTyping"` \| `"MessageContent"`)[]
