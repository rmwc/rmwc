# Drawers

> A navigation drawer slides in from the left and contains the navigation destinations for your app.

-   Module __@rmwc/drawer__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/drawer/styles';__
    -   Or include stylesheets
        -   __'@material/drawer/dist/mdc.drawer.css'__;
-   MDC Docs: [https://material.io/develop/web/components/drawers/](https://material.io/develop/web/components/drawers/)

## Permanent

These are drawers that are permanently fixed inside of a view.

```js

<Drawer\>

  <DrawerHeader\>

    <DrawerTitle\>DrawerHeader</DrawerTitle\>

    <DrawerSubtitle\>Subtitle</DrawerSubtitle\>

  </DrawerHeader\>

  <DrawerContent\>

    <List\>

      <ListItem\>Cookies</ListItem\>

      <ListItem\>Pizza</ListItem\>

      <ListItem\>Icecream</ListItem\>

    </List\>

  </DrawerContent\>

</Drawer\>


```

## Dismissible

These are drawers that can be toggled to an open or closed state inside of a view, but still takes up viewable space when closed.

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <\>

      <div style\={{ overflow: 'hidden', position: 'relative' }}\>

        <Drawer dismissible open\={open}\>

          <DrawerHeader\>

            <DrawerTitle\>DrawerHeader</DrawerTitle\>

            <DrawerSubtitle\>Subtitle</DrawerSubtitle\>

          </DrawerHeader\>

          <DrawerContent\>

            <List\>

              <ListItem\>Cookies</ListItem\>

              <ListItem\>Pizza</ListItem\>

              <ListItem\>Icecream</ListItem\>

            </List\>

          </DrawerContent\>

        </Drawer\>

        {/\* Optional DrawerAppContent \*/}

        <DrawerAppContent

          style\={{ minHeight: '15rem', padding: '1rem' }}

        \>

          DrawerAppContent is an optional component that will resize

          content when the dismissible drawer is open and closed. It

          must be placed directly after the Drawer component.

        </DrawerAppContent\>

      </div\>

      <div style\={{ textAlign: 'center' }}\>

        <Button onClick\={() \=> setOpen(!open)} raised\>

          Toggle Dismissible

        </Button\>

      </div\>

    </\>

  );

}


```

## Modal

These are drawers that can be temporarily displayed fixed on the side of the entire viewport.

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <\>

      <Drawer modal open\={open} onClose\={() \=> setOpen(false)}\>

        <DrawerHeader\>

          <DrawerTitle\>DrawerHeader</DrawerTitle\>

          <DrawerSubtitle\>Subtitle</DrawerSubtitle\>

        </DrawerHeader\>

        <DrawerContent\>

          <List\>

            <ListItem\>Cookies</ListItem\>

            <ListItem\>Pizza</ListItem\>

            <ListItem\>Icecream</ListItem\>

          </List\>

        </DrawerContent\>

      </Drawer\>

      <Button onClick\={() \=> setOpen(!open)} raised\>

        Toggle Modal

      </Button\>

    </\>

  );

}


```

## Right Side Drawers

`material-components-web` doesn't directly support right hand drawers, but it respects the `dir` attribute on DOM elements. This simple hack will allow you to get drawers that appear from the right hand side of your app. As an aside, the `dir` attribute can be used to invert many other behaviors where the element is anchored on the left.

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <\>

      {/\*\* Make the drawer appear right-to-left \*/}

      <Drawer

        dir\="rtl"

        modal

        open\={open}

        onClose\={() \=> setOpen(false)}

      \>

        {/\*\* Set the content back to left-to-right \*/}

        <DrawerHeader dir\="ltr"\>

          <DrawerTitle\>Right Drawer</DrawerTitle\>

          <DrawerSubtitle\>Subtitle</DrawerSubtitle\>

        </DrawerHeader\>

        <DrawerContent dir\="ltr"\>

          <List\>

            <ListItem\>Cookies</ListItem\>

            <ListItem\>Pizza</ListItem\>

            <ListItem\>Icecream</ListItem\>

          </List\>

        </DrawerContent\>

      </Drawer\>

      <Button onClick\={() \=> setOpen(!open)} raised\>

        Toggle Right Drawer

      </Button\>

    </\>

  );

}


```

## Drawer

## DrawerHeader

## DrawerTitle

## DrawerSubtitle

## DrawerContent

## DrawerAppContent