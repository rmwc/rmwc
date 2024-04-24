# Lists

Lists are continuous, vertical indexes of text or images.

- Module **@rmwc/list**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/list/styles';
  - Or include stylesheets
    - **'@material/list/dist/mdc.list.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
    - **'@rmwc/icon/icon.css'**
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

## List

A List Component

### Props

| Name             | Type                               | Description                                                     |
| ---------------- | ---------------------------------- | --------------------------------------------------------------- |
| `apiRef`         | `(api: null \| ListApi) => void`   | An internal api used for cross component communication          |
| `avatarList`     | `boolean`                          | Makes the list start detail circular for avatars.               |
| `children`       | `ReactNode`                        | Children to render                                              |
| `dense`          | `boolean`                          | Reduces the padding on List items.                              |
| `foundationRef`  | `Ref<null \| MDCListFoundation<>>` | Advanced: A reference to the MDCFoundation.                     |
| `nonInteractive` | `boolean`                          | Makes the list non interactive. In addition, you'll have to set |

`ripple={false}`
on the individual ListItems. |
| `onAction` | `(evt: ListOnActionEventT) => void` | A callback for when a list item is interacted with. evt.detail = number |
| `selectedIndex` | `number \| number[]` | Sets the selectedIndex for singleSelection, radiogroup, or checkboxlist variants. Only supply number[] to checkboxlists |
| `twoLine` | `boolean` | Gives more space for dual lined list items. |
| `vertical` | `boolean` | Sets the lists vertical orientation. Defaults to true |
| `wrapFocus` | `boolean` | Sets the list to allow the up arrow on the first element to focus the
last element of the list and vice versa. Defaults to true |

## ListItem

A ListItem component.

### Props

| Name        | Type          | Description                           |
| ----------- | ------------- | ------------------------------------- |
| `activated` | `boolean`     | A modifier for an active state.       |
| `disabled`  | `boolean`     | A modifier for a disabled state.      |
| `ripple`    | `RipplePropT` | Adds a ripple effect to the component |
| `selected`  | `boolean`     | A modifier for a selected state.      |

## ListItemPrimaryText

Primary Text for the ListItem

## ListItemSecondaryText

Secondary text for the ListItem

## ListItemGraphic

A graphic / icon for the ListItem

### Props

| Name   | Type        | Description                                                                                            |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| `icon` | `IconPropT` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |

## ListItemMeta

Meta content for the ListItem. This can either by an icon by setting the
`icon`
prop, or any other kind of content.

### Props

| Name   | Type        | Description                                                                                            |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| `icon` | `IconPropT` | The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. |

## ListDivider

A divider for the List

## ListGroup

A container to group ListItems

## ListGroupSubheader

A subheader for the ListGroup

## SimpleListItem

A simple list item template.

### Props

| Name            | Type          | Description                                       |
| --------------- | ------------- | ------------------------------------------------- |
| `activated`     | `boolean`     | A modifier for an active state.                   |
| `children`      | `ReactNode`   | Children to render                                |
| `disabled`      | `boolean`     | A modifier for a disabled state.                  |
| `graphic`       | `IconPropT`   | A graphic icon for the ListItem.                  |
| `meta`          | `ReactNode`   | Meta content for the ListItem instead of an icon. |
| `metaIcon`      | `IconPropT`   | A meta icon for the ListItem                      |
| `ripple`        | `RipplePropT` | Adds a ripple effect to the component             |
| `secondaryText` | `ReactNode`   | Secondary Text for the ListItem.                  |
| `selected`      | `boolean`     | A modifier for a selected state.                  |
| `text`          | `ReactNode`   | Text for the ListItem.                            |
