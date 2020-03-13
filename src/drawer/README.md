# Drawers

> A navigation drawer slides in from the left and contains the navigation destinations for your app.

- Module **@rmwc/drawer**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/drawer/dist/styles';
  - Or include stylesheets
    - **'@material/drawer/dist/mdc.drawer.css'**
- MDC Docs: [https://material.io/develop/web/components/drawers/](https://material.io/develop/web/components/drawers/)

## Permanent

These are drawers that are permanently fixed inside of a view.

```jsx
<Drawer>
  <DrawerHeader>
    <DrawerTitle>DrawerHeader</DrawerTitle>
    <DrawerSubtitle>Subtitle</DrawerSubtitle>
  </DrawerHeader>
  <DrawerContent>
    <List>
      <ListItem>Cookies</ListItem>
      <ListItem>Pizza</ListItem>
      <ListItem>Icecream</ListItem>
    </List>
  </DrawerContent>
</Drawer>
```

## Dismissible

These are drawers that can be toggled to an open or closed state inside of a view, but still takes up viewable space when closed.

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <Drawer dismissible open={open}>
          <DrawerHeader>
            <DrawerTitle>DrawerHeader</DrawerTitle>
            <DrawerSubtitle>Subtitle</DrawerSubtitle>
          </DrawerHeader>
          <DrawerContent>
            <List>
              <ListItem>Cookies</ListItem>
              <ListItem>Pizza</ListItem>
              <ListItem>Icecream</ListItem>
            </List>
          </DrawerContent>
        </Drawer>

        {/* Optional DrawerAppContent */}
        <DrawerAppContent
          style={{ minHeight: '15rem', padding: '1rem' }}
        >
          DrawerAppContent is an optional component that will resize
          content when the dismissible drawer is open and closed. It
          must be placed directly after the Drawer component.
        </DrawerAppContent>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Button onClick={() => setOpen(!open)} raised>
          Toggle Dismissible
        </Button>
      </div>
    </>
  );
}
```

## Modal

These are drawers that can be temporarily displayed fixed on the side of the entire viewport.

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Drawer modal open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>DrawerHeader</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            <ListItem>Cookies</ListItem>
            <ListItem>Pizza</ListItem>
            <ListItem>Icecream</ListItem>
          </List>
        </DrawerContent>
      </Drawer>

      <Button onClick={() => setOpen(!open)} raised>
        Toggle Modal
      </Button>
    </>
  );
}
```

## Right Side Drawers

`material-components-web` doesn't directly support right hand drawers, but it respects the `dir` attribute on DOM elements. This simple hack will allow you to get drawers that appear from the right hand side of your app. As an aside, the `dir` attribute can be used to invert many other behaviors where the element is anchored on the left.

```jsx
function Example() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/** Make the drawer appear right-to-left */}
      <Drawer
        dir="rtl"
        modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {/** Set the content back to left-to-right */}
        <DrawerHeader dir="ltr">
          <DrawerTitle>Right Drawer</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>

        <DrawerContent dir="ltr">
          <List>
            <ListItem>Cookies</ListItem>
            <ListItem>Pizza</ListItem>
            <ListItem>Icecream</ListItem>
          </List>
        </DrawerContent>
      </Drawer>

      <Button onClick={() => setOpen(!open)} raised>
        Toggle Right Drawer
      </Button>
    </>
  );
}
```

## Drawer
A Drawer component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `dismissible` | `undefined \| false \| true` | Makes a dismissible drawer. |
| `modal` | `undefined \| false \| true` | Makes a modal / temporary drawer. |
| `onClose` | `undefined \| (evt: DrawerOnOpenEventT) => void` | Callback that fires when the Drawer is closed. |
| `onOpen` | `undefined \| (evt: DrawerOnCloseEventT) => void` | Callback that fires when the Drawer is opened. |
| `open` | `undefined \| false \| true` | Opens or closes the Drawer. |


## DrawerHeader
An optional header for the Drawer.



## DrawerTitle
An title for the DrawerHeader.



## DrawerSubtitle
A subtitle for the DrawerHeader.



## DrawerContent
Content for Drawers.



## DrawerAppContent
For the Dismissible variant only. Sibling element that is resized when the drawer opens/closes.



