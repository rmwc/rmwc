# Menus

> Menus display a list of choices on a transient sheet of material.

import from **rmwc/Menu**  
[https://material.io/components/web/catalog/menus/](https://material.io/components/web/catalog/menus/)

```jsx render
import { SimpleMenu, MenuItem, MenuAnchor } from 'rmwc/Menu';
import { Button } from 'rmwc/Button';

<MenuAnchor>
  <SimpleMenu
    open={this.state.menuIsOpen}
    onClose={evt => this.setState({menuIsOpen: false})}
  >
    <MenuItem>Cookies</MenuItem>
    <MenuItem>Pizza</MenuItem>
    <MenuItem>Icecream</MenuItem>
  </SimpleMenu>

  <Button
    raised
    onClick={evt => this.setState({'menuIsOpen': !this.state.menuIsOpen})}
  >
    Open Menu
  </Button>
</MenuAnchor>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Menu" />
<DocumentComponent displayName="MenuItem" />
<DocumentComponent displayName="MenuAnchor" />
```
