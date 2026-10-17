[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / ClientEvents

# Type Alias: ClientEvents

> **ClientEvents** = [`DispatchEvents`](DispatchEvents.md) & `object`

Events emitted by [Client](../classes/Client.md): lifecycle events plus every gateway dispatch by its P7 name.

## Type Declaration

### debug

> **debug**: \[`message`: `string`\]

### error

> **error**: \[`error`: `unknown`\]

### raw

> **raw**: \[`event`: `string`, `data`: `unknown`\]

Every dispatch, typed or not.

### ready

> **ready**: \[`data`: [`GatewayReadyData`](../interfaces/GatewayReadyData.md)\]

### reconnecting

> **reconnecting**: \[`event`: [`ReconnectingEvent`](../interfaces/ReconnectingEvent.md)\]

### resumed

> **resumed**: \[\]
