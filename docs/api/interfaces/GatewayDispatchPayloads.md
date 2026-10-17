[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / GatewayDispatchPayloads

# Interface: GatewayDispatchPayloads

Typed payloads for the dispatch events a bot typically consumes.

## Properties

### CHANNEL\_CREATE

> **CHANNEL\_CREATE**: [`ApiChannel`](ApiChannel.md)

***

### CHANNEL\_DELETE

> **CHANNEL\_DELETE**: [`ApiChannel`](ApiChannel.md)

***

### CHANNEL\_UPDATE

> **CHANNEL\_UPDATE**: [`ApiChannel`](ApiChannel.md)

***

### GUILD\_BAN\_ADD

> **GUILD\_BAN\_ADD**: `object`

#### guild\_id

> **guild\_id**: `string`

#### user

> **user**: [`ApiUser`](ApiUser.md)

***

### GUILD\_BAN\_REMOVE

> **GUILD\_BAN\_REMOVE**: `object`

#### guild\_id

> **guild\_id**: `string`

#### user

> **user**: [`ApiUser`](ApiUser.md)

***

### GUILD\_CREATE

> **GUILD\_CREATE**: [`ApiGuild`](ApiGuild.md)

***

### GUILD\_DELETE

> **GUILD\_DELETE**: [`ApiUnavailableGuild`](ApiUnavailableGuild.md)

***

### GUILD\_MEMBER\_ADD

> **GUILD\_MEMBER\_ADD**: [`ApiGuildMember`](ApiGuildMember.md) & `object`

#### Type Declaration

##### guild\_id

> **guild\_id**: `string`

***

### GUILD\_MEMBER\_REMOVE

> **GUILD\_MEMBER\_REMOVE**: [`GatewayGuildMemberRemoveData`](GatewayGuildMemberRemoveData.md)

***

### GUILD\_MEMBER\_UPDATE

> **GUILD\_MEMBER\_UPDATE**: [`ApiGuildMember`](ApiGuildMember.md) & `object`

#### Type Declaration

##### guild\_id

> **guild\_id**: `string`

***

### GUILD\_MEMBERS\_CHUNK

> **GUILD\_MEMBERS\_CHUNK**: [`GatewayGuildMembersChunkData`](GatewayGuildMembersChunkData.md)

***

### GUILD\_ROLE\_CREATE

> **GUILD\_ROLE\_CREATE**: [`GatewayGuildRoleData`](GatewayGuildRoleData.md)

***

### GUILD\_ROLE\_DELETE

> **GUILD\_ROLE\_DELETE**: [`GatewayGuildRoleDeleteData`](GatewayGuildRoleDeleteData.md)

***

### GUILD\_ROLE\_UPDATE

> **GUILD\_ROLE\_UPDATE**: [`GatewayGuildRoleData`](GatewayGuildRoleData.md)

***

### GUILD\_UPDATE

> **GUILD\_UPDATE**: [`ApiGuild`](ApiGuild.md)

***

### INTERACTION\_CREATE

> **INTERACTION\_CREATE**: [`ApiInteraction`](ApiInteraction.md)

***

### MESSAGE\_CREATE

> **MESSAGE\_CREATE**: [`ApiMessage`](ApiMessage.md)

***

### MESSAGE\_DELETE

> **MESSAGE\_DELETE**: [`GatewayMessageDeleteData`](GatewayMessageDeleteData.md)

***

### MESSAGE\_DELETE\_BULK

> **MESSAGE\_DELETE\_BULK**: [`GatewayMessageDeleteBulkData`](GatewayMessageDeleteBulkData.md)

***

### MESSAGE\_REACTION\_ADD

> **MESSAGE\_REACTION\_ADD**: [`GatewayReactionData`](GatewayReactionData.md)

***

### MESSAGE\_REACTION\_REMOVE

> **MESSAGE\_REACTION\_REMOVE**: [`GatewayReactionData`](GatewayReactionData.md)

***

### MESSAGE\_UPDATE

> **MESSAGE\_UPDATE**: `Partial`\<[`ApiMessage`](ApiMessage.md)\> & `Pick`\<[`ApiMessage`](ApiMessage.md), `"id"` \| `"channel_id"`\>

***

### PRESENCE\_UPDATE

> **PRESENCE\_UPDATE**: [`GatewayPresenceData`](GatewayPresenceData.md)

***

### READY

> **READY**: [`GatewayReadyData`](GatewayReadyData.md)

***

### RESUMED

> **RESUMED**: `Record`\<`string`, `never`\> \| `null`

***

### TYPING\_START

> **TYPING\_START**: [`GatewayTypingStartData`](GatewayTypingStartData.md)

***

### VOICE\_SERVER\_UPDATE

> **VOICE\_SERVER\_UPDATE**: [`GatewayVoiceServerUpdateData`](GatewayVoiceServerUpdateData.md)

***

### VOICE\_STATE\_UPDATE

> **VOICE\_STATE\_UPDATE**: [`ApiVoiceState`](ApiVoiceState.md)
