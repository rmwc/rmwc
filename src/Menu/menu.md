# Menus

> Menus display a list of choices on a transient sheet of material.

import from **rmwc/Menu**  
[https://material.io/components/web/catalog/menus/](https://material.io/components/web/catalog/menus/)

## Default Usage

You can compose a menu with the given components, and manually manage the open state.

```jsx render
import { Menu, MenuItem, MenuAnchor } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

<MenuAnchor>
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
</MenuAnchor>
```

## Simplified usage

RMWC provides a non-standard convenience `SimpleMenu` component that takes a handle as a prop, and manages the open state for you.

```jsx render
import { SimpleMenu, MenuItem } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

<SimpleMenu
  handle={ <Button raised>Open Simple Menu</Button> }
>
  <MenuItem>Cookies</MenuItem>
  <MenuItem>Pizza</MenuItem>
  <MenuItem>Icecream</MenuItem>
</SimpleMenu>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Menu" />
<DocumentComponent displayName="MenuItem" />
<DocumentComponent displayName="MenuAnchor" />
<DocumentComponent displayName="SimpleMenu" />
```
