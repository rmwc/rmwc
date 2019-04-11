# Lists

> Lists are continuous, vertical indexes of text or images.

- Module **@rmwc/list**
- Import styles:
  - import **'@material/list/dist/mdc.list.css'**
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

## Basic Usage

```jsx
<List>
  <ListItem>Cookies</ListItem>
  <ListItem>Pizza</ListItem>
  <ListItem>Icecream</ListItem>
</List>
```

```jsx
<List twoLine>
  <ListItem>
    <ListItemGraphic icon="star_border" />
    <ListItemText>
      <ListItemPrimaryText>Cookies</ListItemPrimaryText>
      <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta icon="info" />
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="local_pizza" />
    <ListItemText>
      <ListItemPrimaryText>Pizza</ListItemPrimaryText>
      <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta icon="info" />
  </ListItem>
  <ListItem activated>
    <ListItemGraphic icon="mood" />
    <ListItemText>
      <ListItemPrimaryText>Icecream</ListItemPrimaryText>
      <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
    </ListItemText>
    <ListItemMeta>Winner!</ListItemMeta>
  </ListItem>
</List>
```

## Simplified Usage

While there are siutations where you would need / want to compose the entire list yourself, it can be quite verbose. `SimpleListItem` provides a compact syntax that allows you to pass all options as props. The following example is roughly equivalent to the one above.

```jsx
<List twoLine>
  <SimpleListItem
    graphic="star_border"
    text="Cookies"
    secondaryText="Chocolate chip"
    metaIcon="info"
  />
  <SimpleListItem
    graphic="local_pizza"
    text="Pizza"
    secondaryText="Pepperoni"
    metaIcon="info"
  />
  <SimpleListItem
    activated
    graphic="mood"
    text="Icecream"
    secondaryText="Chocolate cookie dough"
    meta="Winner!"
  />
</List>
```

## 


## ListItem
A ListItem component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activated` | `undefined | false | true` | A modifier for an active state. |
| `disabled` | `undefined | false | true` | A modifier for a disabled state. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `selected` | `undefined | false | true` | A modifier for a selected state. |


## ListItemPrimaryText
Primary Text for the ListItem



## ListItemSecondaryText
Secondary text for the ListItem



## ListItemGraphic
A graphic / icon for the ListItem

### Props

| Name | Type | Description |
|------|------|-------------|
| `icon` | `RMWC.IconPropT` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |


## ListItemMeta
Meta content for the ListItem. This can either by an icon by setting the `icon` prop, or any other kind of content.

### Props

| Name | Type | Description |
|------|------|-------------|
| `icon` | `RMWC.IconPropT` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |


## ListDivider
A divider for the List



## ListGroup
A container to group ListItems



## ListGroupSubheader
A subheader for the ListGroup



## SimpleListItem
A simple list item template.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activated` | `undefined | false | true` | A modifier for an active state. |
| `children` | `React.ReactNode` | Children to render |
| `disabled` | `undefined | false | true` | A modifier for a disabled state. |
| `graphic` | `RMWC.IconPropT` | A graphic icon for the ListItem. |
| `meta` | `React.ReactNode` | Meta content for the ListItem instead of an icon. |
| `metaIcon` | `RMWC.IconPropT` | A meta icon for the ListItem |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `secondaryText` | `React.ReactNode` | Secondary Text for the ListItem. |
| `selected` | `undefined | false | true` | A modifier for a selected state. |
| `text` | `React.ReactNode` | Text for the ListItem. |


