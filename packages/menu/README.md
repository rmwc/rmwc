Menus
=====

> Menus display a list of choices on a transient sheet of material.

*   Module **@rmwc/menu**
*   Import styles:
    *   Using CSS Loader
        *   import **'@rmwc/menu/styles';**
    *   Or include stylesheets
        *   **'@material/menu/dist/mdc.menu.css'**;
        *   **'@material/menu-surface/dist/mdc.menu-surface.css'**;
        *   **'@material/ripple/dist/mdc.ripple.css'**;
        *   **'@material/list/dist/mdc.list.css'**;
        *   **'@rmwc/icon/icon.css'**;
*   MDC Docs: [https://material.io/develop/web/components/menus/](https://material.io/develop/web/components/menus/)

Basic Usage
-----------

You can compose a menu with the given components, and manually manage the open state. `Menu` expects MenuItems as children while `MenuSurface` is a generic container which can have anything as a child.

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <MenuSurfaceAnchor\>

      <Menu

        open\={open}

        onSelect\={(evt) \=> console.log(evt.detail.index)}

        onClose\={() \=> setOpen(false)}

      \>

        <MenuItem\>Cookies</MenuItem\>

        <MenuItem\>Pizza</MenuItem\>

        {/\*\* MenuItem is just a ListItem, so you can intermingle other List components \*/}

        <ListDivider />

        <MenuItem\>Icecream</MenuItem\>

      </Menu\>

      <Button raised onClick\={() \=> setOpen(!open)}\>

        Menu

      </Button\>

    </MenuSurfaceAnchor\>

  );

}


```

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <MenuSurfaceAnchor\>

      <MenuSurface open\={open} onClose\={(evt) \=> setOpen(false)}\>

        <div style\={{ padding: '1rem', width: '8rem' }}\>

          Make the content whatever you want.

        </div\>

      </MenuSurface\>

      <Button raised onClick\={(evt) \=> setOpen(!open)}\>

        Menu Surface

      </Button\>

    </MenuSurfaceAnchor\>

  );

}


```

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <MenuSurfaceAnchor\>

      <MenuSurface open\={open} onClose\={() \=> setOpen(false)}\>

        <div style\={{ padding: '1rem', width: '8rem' }}\>Menu</div\>

      </MenuSurface\>

      {/\*\* The handle can be any component you want \*/}

      <IconButton icon\="menu" onClick\={() \=> setOpen(!open)} />

    </MenuSurfaceAnchor\>

  );

}


```

```js

function Example() {

  const \[open, setOpen\] \= React.useState(false);

  return (

    <MenuSurfaceAnchor\>

      <Menu

        open\={open}

        onSelect\={(evt) \=> console.log(evt.detail.index)}

        onClose\={() \=> setOpen(false)}

      \>

        <MenuItem\>Item One</MenuItem\>

        <MenuItem disabled\>Item Two (disabled)</MenuItem\>

        <MenuItem\>Item Three</MenuItem\>

      </Menu\>

      <Button raised onClick\={() \=> setOpen(!open)}\>

        Menu

      </Button\>

    </MenuSurfaceAnchor\>

  );

}


```

Simplified usage
----------------

RMWC provides a convenience `SimpleMenu` component that takes a handle as a prop, and manages the open state for you.

```js

<SimpleMenu handle\={<Button\>Simple Menu</Button\>}\>

  <MenuItem\>Cookies</MenuItem\>

  <MenuItem\>Pizza</MenuItem\>

  <MenuItem\>Icecream</MenuItem\>

</SimpleMenu\>


```

```js

<SimpleMenuSurface handle\={<Button\>Simple Menu Surface</Button\>}\>

  <div style\={{ padding: '1rem', width: '8rem' }}\>

    Make the content whatever you want.

  </div\>

</SimpleMenuSurface\>


```

Anchoring
---------

By default, Menus will attempt to automatically position themselves, but this behavior can be overridden by setting the `anchorCorner` prop.

```js

function Example() {

  const \[anchorCorner, setAnchorCorner\] \=

    React.useState('topLeft');

  return (

    <\>

      <MenuSurfaceAnchor\>

        <MenuSurface anchorCorner\={anchorCorner} open\={true}\>

          <div style\={{ padding: '1rem', width: '8rem' }}\>

            anchorCorner: {anchorCorner}

          </div\>

        </MenuSurface\>

        <Button raised label\="Anchored Menu" />

      </MenuSurfaceAnchor\>

      <Select

        value\={anchorCorner}

        label\="anchorCorner"

        onChange\={(evt) \=> setAnchorCorner(evt.currentTarget.value)}

        options\={\[

          'topLeft',

          'topRight',

          'bottomLeft',

          'bottomRight',

          'topStart',

          'topEnd',

          'bottomStart',

          'bottomEnd'

        \]}

      />

    </\>

  );

}


```

Rendering through Portals
-------------------------

Occasionally, you may find your menu being cut off from being inside a container that is styled to be `overflow:hidden`. RMWC provides a `renderToPortal` prop that lets you use React's portal functionality to render the menu dropdown in a different container.

You can specify any element or selector you want, but the simplest method is to pass `true` and use RMWC's built in `Portal` component.

```js

  // Somewhere at the top level of your app

  // Render the RMWC Portal

  // You only have to do this once

  import React from 'react';

  import { Portal } from '@rmwc/base';

  export default function App() {

    return (

      <div\>

        ...

        <Portal />

      </div\>

    )

  }

```

Now you can use the `renderToPortal` prop. Below is a contrived example of a menu being cut off due to `overflow: hidden`.

```js

function Example() {

  const \[renderToPortal, setRenderToPortal\] \= React.useState(true);

  const \[menuIsOpen, setMenuIsOpen\] \= React.useState(false);

  const options \= \['Cookies', 'Pizza', 'Icecream'\];

  return (

    <\>

      <div

        style\={{

          marginBottom: '10rem',

          height: '3.5rem',

          overflow: 'hidden'

        }}

      \>

        <MenuSurfaceAnchor\>

          <Button raised onClick\={() \=> setMenuIsOpen(!menuIsOpen)}\>

            Open Menu

          </Button\>

          <Menu

            open\={menuIsOpen}

            onClose\={() \=> setMenuIsOpen(false)}

            renderToPortal\={renderToPortal}

          \>

            {options.map((o) \=> (

              <MenuItem key\={o}\>{o}</MenuItem\>

            ))}

          </Menu\>

        </MenuSurfaceAnchor\>

      </div\>

      <Checkbox

        checked\={renderToPortal}

        onChange\={(evt) \=> setRenderToPortal(evt.currentTarget.checked)}

        label\="renderToPortal"

      />

    </\>

  );

}


```

Menu
----

MenuItem
--------

MenuSurface
-----------

MenuSurfaceAnchor
-----------------

SimpleMenu
----------

SimpleMenuSurface
-----------------