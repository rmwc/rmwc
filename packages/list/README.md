# Lists

Lists are continuous, vertical indexes of text or images.

- Module **@rmwc/list**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/list/styles';
  - Or include stylesheets
    - **'@material/list/dist/mdc.list.css'**
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

## Two Line

When using the `twoLine` prop, you have to wrap the contents of the `ListItem` in `ListItemText`.

```jsx
<List twoLine>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Cookies</ListItemPrimaryText>
      <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Pizza</ListItemPrimaryText>
      <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Icecream</ListItemPrimaryText>
      <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
</List>
```

## Leading and Trailing Icons

```jsx
<List>
  <ListItem>
    <ListItemGraphic icon="favorite" />
    Leading
  </ListItem>
  <ListItem>
    Trailing
    <ListItemMeta icon="star" />
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi" />
    Leading and Trailing
    <ListItemMeta icon="info" />
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi" />
    Leading with Trailing Text
    <ListItemMeta>HELLO!</ListItemMeta>
  </ListItem>
</List>
```

## Avatar List with Dividers

```jsx
<List twoLine avatarList>
  <ListGroup>
    <ListItem>
      <ListItemGraphic
        icon={
          <Avatar
            src="images/avatars/blackwidow.png"
            size="xsmall"
            name="Natalia Alianovna Romanova"
          />
        }
      />
      Natalia Alianovna Romanova
      <ListItemMeta icon="info" />
    </ListItem>
    <ListItem>
      <ListItemGraphic
        icon={
          <Avatar
            src="images/avatars/hulk.png"
            size="small"
            name="Bruce Banner"
          />
        }
      />
      Bruce Banner
      <ListItemMeta icon="info" />
    </ListItem>
  </ListGroup>
  <ListDivider />
  <ListGroup>
    <ListItem>
      <ListItemGraphic
        icon={
          <Avatar
            src="images/avatars/thor.png"
            size="medium"
            name="Thor Odinson"
          />
        }
      />
      Thor Odinson
      <ListItemMeta icon="info" />
    </ListItem>
  </ListGroup>
</List>
```

## Selectable

Checkboxes and Radios can be included as part of `ListItemMeta`. It is recommended when using these that you are using controlled components, and that you put your interaction handler on the `ListItem` itself. Notice the `readOnly` prop is also set on the individual form elements.

```jsx
function Example() {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  return (
    <List
      selectedIndex={selectedIndex}
      onAction={(evt) => setSelectedIndex(evt.detail.index)}
    >
      <ListItem>Cookies</ListItem>
      <ListItem>Pizza</ListItem>
      <ListItem>Cake</ListItem>
    </List>
  );
}
```

```jsx
function Example() {
  const shoppingList = ['Cookies', 'Pizza', 'Icecream'];
  const [selectedIndex, setSelectedIndex] = React.useState<number[]>(
    []
  );

  const handleSelect = (evt) => {
    setSelectedIndex((indices) =>
      indices.includes(evt.detail.index)
        ? indices.filter((_) => _ !== evt.detail.index)
        : [...indices, evt.detail.index]
    );
  };

  return (
    <List
      aria-label="Shopping List"
      selectedIndex={selectedIndex}
      onAction={handleSelect}
    >
      {shoppingList.map((key) => (
        <ListItem key={key}>
          {key}
          <ListItemMeta>
            <Checkbox readOnly />
          </ListItemMeta>
        </ListItem>
      ))}
    </List>
  );
}
```

```jsx
function Example() {
  const [checked, setChecked] = React.useState(
    new Map() < string,
    boolean >
      [
        ['Cookies', false],
        ['Pizza', false],
        ['Icecream', false]
      ]
  );

  return (
    <List>
      {['Cookies', 'Pizza', 'Icecream'].map((key) => (
        <ListItem
          key={key}
          onClick={() =>
            setChecked((prev) => new Map(prev).set(key, !prev.get(key)))
          }
        >
          {key}&amp;nbsp;
          <ListItemMeta>
            <Switch checked={checked.get(key)} />
          </ListItemMeta>
        </ListItem>
      ))}
    </List>
  );
}
```

```jsx
function Example() {
  const mealchoices = ['Beef', 'Chicken', 'Vegetable Lasagna'];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleSelect = (evt) => setSelectedIndex(evt.detail.index);

  return (
    <List
      aria-label="Please Pick a Meal"
      selectedIndex={selectedIndex}
      onAction={handleSelect}
    >
      {mealchoices.map((key) => (
        <ListItem key={key}>
          {key}
          <ListItemMeta>
            <Radio readOnly name="meal-choices-group" />
          </ListItemMeta>
        </ListItem>
      ))}
    </List>
  );
}
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
