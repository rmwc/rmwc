# Menus

> Menus display a list of choices on a transient sheet of material.

import from **rmwc/Menu**  
[https://material.io/components/web/catalog/menus/](https://material.io/components/web/catalog/menus/)

## Menu with Items

You can compose a menu with the given components, and manually manage the open state.

```jsx render
import { Menu, MenuItem, MenuSurfaceAnchor } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

<MenuSurfaceAnchor>
  <Menu
    open={this.state.menuIsOpen}
    onClose={evt => this.setState({menuIsOpen: false})}
  >
    <MenuItem>Cookies</MenuItem>
    <MenuItem>Pizza</MenuItem>
    <MenuItem>Icecream</MenuItem>
  </Menu>

  <Button
    raised
    onClick={evt => this.setState({'menuIsOpen': !this.state.menuIsOpen})}
  >
    Open Menu
  </Button>
</MenuSurfaceAnchor>
```

## Generic Menu Surface

`MenuSurface` allows you to create a menu with any kind of content.

```jsx render
import { MenuSurface, MenuSurfaceAnchor } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

<MenuSurfaceAnchor>
  <MenuSurface
    open={this.state.genericMenuIsOpen}
    onClose={evt => this.setState({genericMenuIsOpen: false})}
  >
    <div style={{padding: '1rem', width: '8rem'}}>Make the content whatever you want.</div>
  </MenuSurface>

  <Button
    raised
    onClick={evt => this.setState({'genericMenuIsOpen': !this.state.genericMenuIsOpen})}
  >
    Open Generic Menu
  </Button>
</MenuSurfaceAnchor>
```

## Simplified usage

RMWC provides a non-standard convenience `SimpleMenu` component that takes a handle as a prop, and manages the open state for you.

```jsx render
import { SimpleMenu, SimpleMenuSurface, MenuItem } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

<SimpleMenu
  handle={ <Button raised>Open Simple Menu</Button> }
>
  <MenuItem>Cookies</MenuItem>
  <MenuItem>Pizza</MenuItem>
  <MenuItem>Icecream</MenuItem>
</SimpleMenu>

<SimpleMenuSurface
  handle={ <Button raised>Open Simple Menu Surface</Button> }
>
  <div style={{padding: '1rem', width: '8rem'}}>Make the content whatever you want.</div>
</SimpleMenuSurface>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Menu" />
<DocumentComponent displayName="MenuItem" composes={['ListItem']}/>
<DocumentComponent displayName="MenuSurfaceAnchor" />
<DocumentComponent displayName="SimpleMenu" />
<DocumentComponent displayName="SimpleMenuSurface" />
```
