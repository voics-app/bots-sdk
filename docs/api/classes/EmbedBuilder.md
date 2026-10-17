[**@discordy-voics/bots API reference**](../README.md)

***

[@discordy-voics/bots API reference](../README.md) / EmbedBuilder

# Class: EmbedBuilder

Builds a rich embed within Discord's per-field and 6000-character total limits.

## Implements

- [`JSONEncodable`](../interfaces/JSONEncodable.md)\<[`ApiEmbed`](../interfaces/ApiEmbed.md)\>

## Constructors

### Constructor

> **new EmbedBuilder**(): `EmbedBuilder`

#### Returns

`EmbedBuilder`

## Methods

### addFields()

> **addFields**(...`fields`): `this`

#### Parameters

##### fields

...[`ApiEmbedField`](../interfaces/ApiEmbedField.md)[]

#### Returns

`this`

***

### setAuthor()

> **setAuthor**(`author`): `this`

#### Parameters

##### author

[`EmbedAuthorInput`](../interfaces/EmbedAuthorInput.md) \| `null`

#### Returns

`this`

***

### setColor()

> **setColor**(`color`): `this`

#### Parameters

##### color

[`ColorResolvable`](../type-aliases/ColorResolvable.md) \| `null`

#### Returns

`this`

***

### setDescription()

> **setDescription**(`description`): `this`

#### Parameters

##### description

`string` \| `null`

#### Returns

`this`

***

### setFields()

> **setFields**(`fields`): `this`

#### Parameters

##### fields

[`ApiEmbedField`](../interfaces/ApiEmbedField.md)[]

#### Returns

`this`

***

### setFooter()

> **setFooter**(`footer`): `this`

#### Parameters

##### footer

[`EmbedFooterInput`](../interfaces/EmbedFooterInput.md) \| `null`

#### Returns

`this`

***

### setImage()

> **setImage**(`url`): `this`

#### Parameters

##### url

`string` \| `null`

#### Returns

`this`

***

### setThumbnail()

> **setThumbnail**(`url`): `this`

#### Parameters

##### url

`string` \| `null`

#### Returns

`this`

***

### setTimestamp()

> **setTimestamp**(`timestamp?`): `this`

#### Parameters

##### timestamp?

`number` \| `Date` \| `null` = `...`

#### Returns

`this`

***

### setTitle()

> **setTitle**(`title`): `this`

#### Parameters

##### title

`string` \| `null`

#### Returns

`this`

***

### setURL()

> **setURL**(`url`): `this`

#### Parameters

##### url

`string` \| `null`

#### Returns

`this`

***

### toJSON()

> **toJSON**(): [`ApiEmbed`](../interfaces/ApiEmbed.md)

#### Returns

[`ApiEmbed`](../interfaces/ApiEmbed.md)

#### Implementation of

[`JSONEncodable`](../interfaces/JSONEncodable.md).[`toJSON`](../interfaces/JSONEncodable.md#tojson)
