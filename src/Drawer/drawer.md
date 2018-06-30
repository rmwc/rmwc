# Drawers

> A navigation drawer slides in from the left and contains the navigation destinations for your app.

import from **rmwc/Drawer**  
[https://material.io/components/web/catalog/drawers/](https://material.io/components/web/catalog/drawers/)

## Permanent Drawers

These are drawers that are permanently fixed inside of a view.
[https://material.io/components/web/catalog/drawers/#permanent-drawer-usage](https://material.io/components/web/catalog/drawers/#permanent-drawer-usage)

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  List,
  ListItem,
  ListItemText
} from 'rmwc/List';

<Drawer permanent>
  <DrawerHeader>
    DrawerHeader
  </DrawerHeader>
  <DrawerContent>
    <ListItem>
      <ListItemText>Cookies</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Pizza</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Icecream</ListItemText>
    </ListItem>
  </DrawerContent>
</Drawer>
```

---

## Persistent Drawers

These are drawers that can be toggled to an open or closed state inside of a view, but still takes up viewable space when closed.
[https://material.io/components/web/catalog/drawers/#persistent-drawer-usage](https://material.io/components/web/catalog/drawers/#persistent-drawer-usage)

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText
} from 'rmwc/List';

import { Button } from 'rmwc/Button';


<Drawer persistent open={this.state.persistentOpen == undefined ? true : this.state.persistentOpen}>
  <DrawerHeader>
    DrawerHeader
  </DrawerHeader>
  <DrawerContent>
   <ListItem>
      <ListItemText>Cookies</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Pizza</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Icecream</ListItemText>
    </ListItem>
  </DrawerContent>
</Drawer>

<Button
  onClick={() => this.setState({persistentOpen: this.state.persistentOpen === undefined ? false : !this.state.persistentOpen})}
  raised
>
  Toggle Drawer
</Button>
```

---

## Temporary Drawers

These are drawers that can be temporarily displayed fixed on the side of the entire viewport.
[https://material.io/components/web/catalog/drawers/#temporary-drawer-usage](https://material.io/components/web/catalog/drawers/#temporary-drawer-usage)

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText
} from 'rmwc/List';

import { Button } from 'rmwc/Button';

<Drawer
  temporary
  open={this.state.tempOpen}
  onClose={() => this.setState({tempOpen: false})}
>
  <DrawerHeader>
    DrawerHeader
  </DrawerHeader>
  <DrawerContent>
    <ListItem>
      <ListItemText>Cookies</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Pizza</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Icecream</ListItemText>
    </ListItem>
  </DrawerContent>
</Drawer>

<Button
  onClick={() => this.setState({tempOpen: !this.state.tempOpen})}
  raised
>
  Toggle Drawer
</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Drawer" />
<DocumentComponent displayName="DrawerToolbarSpacer" />
<DocumentComponent displayName="DrawerHeader" />
<DocumentComponent displayName="DrawerContent" />
```
