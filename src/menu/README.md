# Menus

> Menus display a list of choices on a transient sheet of material.

- Module **@rmwc/menu**
- Import styles:
  - import **'@material/menu/dist/mdc.menu.css'**
  - import **'@material/menu-surface/dist/mdc.menu-surface.css'**
  - import **'@material/list/dist/mdc.list.css'**
- MDC Docs: [https://material.io/develop/web/components/menus/](https://material.io/develop/web/components/menus/)

## Basic Usage

You can compose a menu with the given components, and manually manage the open state. `Menu` expects MenuItems as children while `MenuSurface` is a generic container which can have anything as a child.

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <MenuSurfaceAnchor>
      <Menu
        open={open}
        onSelect={evt => console.log(evt.detail.index)}
        onClose={evt => setOpen(false)}
      >
        <MenuItem>Cookies</MenuItem>
        <MenuItem>Pizza</MenuItem>
        {/** MenuItem is just a ListItem, so you can intermingle other List components */}
        <ListDivider />
        <MenuItem>Icecream</MenuItem>
      </Menu>

      <Button raised onClick={evt => setOpen(!open)}>
        Menu
      </Button>
    </MenuSurfaceAnchor>
  );
}
```

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <MenuSurfaceAnchor>
      <MenuSurface open={open} onClose={evt => setOpen(false)}>
        <div style={{ padding: '1rem', width: '8rem' }}>
          Make the content whatever you want.
        </div>
      </MenuSurface>

      <Button raised onClick={evt => setOpen(!open)}>
        Menu Surface
      </Button>
    </MenuSurfaceAnchor>
  );
}
```

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <MenuSurfaceAnchor>
      <MenuSurface open={open} onClose={evt => setOpen(false)}>
        <div style={{ padding: '1rem', width: '8rem' }}>Menu.</div>
      </MenuSurface>
      {/** The handle can be any component you want */}
      <IconButton icon="menu" onClick={evt => setOpen(!open)} />
    </MenuSurfaceAnchor>
  );
}
```

## Simplified usage

RMWC provides a convenience `SimpleMenu` component that takes a handle as a prop, and manages the open state for you.

```jsx
<SimpleMenu handle={<Button>Simple Menu</Button>}>
  <MenuItem>Cookies</MenuItem>
  <MenuItem>Pizza</MenuItem>
  <MenuItem>Icecream</MenuItem>
</SimpleMenu>
```

```jsx
<SimpleMenuSurface handle={<Button>Simple Menu Surface</Button>}>
  <div style={{ padding: '1rem', width: '8rem' }}>
    Make the content whatever you want.
  </div>
</SimpleMenuSurface>
```

## Anchoring

By default, Menus will attempt to automatically position themselves, but this behavior can be overriden by setting the `anchorCorner` prop.

```jsx
function Example() {
  const [anchorCorner, setAnchorCorner] = React.useState(
    'topLeft'
  );

  return (
    <>
      <MenuSurfaceAnchor>
        <MenuSurface anchorCorner={anchorCorner} open={true}>
          <div style={{ padding: '1rem', width: '8rem' }}>
            anchorCorner: {anchorCorner}
          </div>
        </MenuSurface>
        <Button raised label="Anchored Menu" />
      </MenuSurfaceAnchor>

      <Select
        value={anchorCorner}
        label="anchorCorner"
        onChange={evt => setAnchorCorner(evt.currentTarget.value)}
        options={[
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight',
          'topStart',
          'topEnd',
          'bottomStart',
          'bottomEnd'
        ]}
      />
    </>
  );
}
```

## Menu
A menu component for displaying lists items.

### Props

| Name | Type | Description |
|------|------|-------------|
| `anchorCorner` | `AnchorT` | Manually position the menu to one of the corners. |
| `children` | `React.ReactNode` | Children to render. |
| `fixed` | `undefined | false | true` | Make the menu position fixed. |
| `hoistToBody` | `undefined | false | true` | Moves the menu to the body. Useful for situations where the content might be cutoff by an overflow: hidden container. |
| `onClose` | `undefined | (evt: RMWC.CustomEventT<{}>) => void` | Callback for when the menu is closed. |
| `onOpen` | `undefined | (evt: RMWC.CustomEventT<{}>) => void` | Callback for when the menu is opened. |
| `onSelect` | `undefined | (evt: RMWC.CustomEventT<>) => void` | Callback that fires when a Menu item is selected. |
| `open` | `undefined | false | true` | Opens the menu. |


## MenuItem
This is just the ListItem component exported from the Menu module for convenience. You can use `ListItem` or `SimpleListItem` components from the List section as long as you add `role="menuitem"` and `tabIndex="0"` to the components for accessibility.

### Props

| Name | Type | Description |
|------|------|-------------|
| `activated` | `undefined | false | true` | A modifier for an active state. |
| `disabled` | `undefined | false | true` | A modifier for a disabled state. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `selected` | `undefined | false | true` | A modifier for a selected state. |


## 


## MenuSurfaceAnchor


## SimpleMenu
A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor

### Props

| Name | Type | Description |
|------|------|-------------|
| `anchorCorner` | `AnchorT` | Manually position the menu to one of the corners. |
| `children` | `React.ReactNode` | Children to render |
| `fixed` | `undefined | false | true` | Make the menu position fixed. |
| `handle` | `ReactElement<any>` | An element that will open the menu when clicked |
| `hoistToBody` | `undefined | false | true` | Moves the menu to the body. Useful for situations where the content might be cutoff by an overflow: hidden container. |
| `onClose` | `undefined | (evt: RMWC.CustomEventT<{}>) => void` | Callback for when the menu is closed. |
| `onOpen` | `undefined | (evt: RMWC.CustomEventT<{}>) => void` | Callback for when the menu is opened. |
| `onSelect` | `undefined | (evt: RMWC.CustomEventT<>) => void` | Callback that fires when a Menu item is selected. |
| `open` | `undefined | false | true` | Opens the menu. |
| `rootProps` | `Object` | By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor. |


## SimpleMenu
A Simplified menu component that allows you to pass a handle element and will automatically control the open state and add a MenuSurfaceAnchor

### Props

| Name | Type | Description |
|------|------|-------------|
| `anchorCorner` | `AnchorT` | Manually position the menu to one of the corners. |
| `children` | `React.ReactNode` | Children to render |
| `fixed` | `undefined | false | true` | Make the menu position fixed. |
| `handle` | `ReactElement<any>` | An element that will open the menu when clicked |
| `hoistToBody` | `undefined | false | true` | Moves the menu to the body. Useful for situations where the content might be cutoff by an overflow: hidden container. |
| `onClose` | `undefined | (evt: RMWC.CustomEventT<{}>) => void` | Callback for when the menu is closed. |
| `onOpen` | `undefined | (evt: RMWC.CustomEventT<{}>) => void` | Callback for when the menu is opened. |
| `onSelect` | `undefined | (evt: RMWC.CustomEventT<>) => void` | Callback that fires when a Menu item is selected. |
| `open` | `undefined | false | true` | Opens the menu. |
| `rootProps` | `Object` | By default, props spread to the Menu component. These will spread to the MenuSurfaceAnchor which is useful for things like overall positioning of the anchor. |


