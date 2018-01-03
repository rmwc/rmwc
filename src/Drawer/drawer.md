# Drawers

> A navigation drawer slides in from the left and contains the navigation destinations for your app.

import from **rmwc/Drawer**  
[https://material.io/components/web/catalog/drawers/](https://material.io/components/web/catalog/drawers/)

## Permanent Drawers

These are drawers that are permanently fixed inside of a view. Note that the children of `PermanentDrawerContent` can be anything, it doesn't have to be a list.
[https://material.io/components/web/catalog/drawers/#permanent-drawer-usage](https://material.io/components/web/catalog/drawers/#permanent-drawer-usage)

```jsx render
import {
  PermanentDrawer,
  PermanentDrawerContent
} from 'rmwc/Drawer';

import {
  List,
  ListItem,
  ListItemText
} from 'rmwc/List';

<PermanentDrawer>
  <PermanentDrawerContent>
    <List>
      <ListItem>
        <ListItemText>Cookies</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>Pizza</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>Icecream</ListItemText>
      </ListItem>
    </List>
  </PermanentDrawerContent>
</PermanentDrawer>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="PermanentDrawer" />
<DocumentComponent displayName="PermanentDrawerContent" />
```

---

## Persistent Drawers

These are drawers that can be toggled to an open or closed state inside of a view, but still takes up viewable space when clsoed. Note that `PermanentDrawerContent` is actually an instance of `List`, but its children are do not have to be `ListItem`.
[https://material.io/components/web/catalog/drawers/#persistent-drawer-usage](https://material.io/components/web/catalog/drawers/#persistent-drawer-usage)

```jsx render
import {
  PersistentDrawer,
  PersistentDrawerHeader,
  PersistentDrawerContent
} from 'rmwc/Drawer';

import {
  List,
  ListItem,
  ListItemText
} from 'rmwc/List';

import { Button } from 'rmwc/Button';

<PersistentDrawer
  open={this.state.open === undefined ? true : this.state.open}
  onClose={() => this.setState({open: false})}
>
  <PersistentDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
    PersistentDrawerHeader
  </PersistentDrawerHeader>
  <PersistentDrawerContent>
    <ListItem>
      <ListItemText>Cookies</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Pizza</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Icecream</ListItemText>
    </ListItem>
  </PersistentDrawerContent>
</PersistentDrawer>

<Button
  onClick={() => this.setState({open: this.state.open === undefined ? false : !this.state.open})}
  raised
>
  Toggle Drawer
</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="PersistentDrawer" />
<DocumentComponent displayName="PersistentDrawerHeader" />
<DocumentComponent displayName="PersistentDrawerContent" />
```

---

## Temporary Drawers

These are drawers that can be temporarily displayed fixed on the side of the entire viewport. Note that `TemporaryDrawerContent` is actually an instance of `List`, but its children are do not have to be `ListItem`.
[https://material.io/components/web/catalog/drawers/#temporary-drawer-usage](https://material.io/components/web/catalog/drawers/#temporary-drawer-usage)

```jsx render
import {
  TemporaryDrawer,
  TemporaryDrawerHeader,
  TemporaryDrawerContent
} from 'rmwc/Drawer';

import {
  List,
  ListItem,
  ListItemText
} from 'rmwc/List';

import { Button } from 'rmwc/Button';

<TemporaryDrawer
  open={this.state.tempOpen}
  onClose={() => this.setState({tempOpen: false})}
>
  <TemporaryDrawerHeader style={{ backgroundColor: '#f6f6f6' }}>
    PersistentDrawerHeader
  </TemporaryDrawerHeader>
  <TemporaryDrawerContent>
    <ListItem>
      <ListItemText>Cookies</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Pizza</ListItemText>
    </ListItem>
    <ListItem>
      <ListItemText>Icecream</ListItemText>
    </ListItem>
  </TemporaryDrawerContent>
</TemporaryDrawer>

<Button
  onClick={() => this.setState({tempOpen: !this.state.tempOpen})}
  raised
>
  Toggle Drawer
</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="TemporaryDrawer" />
<DocumentComponent displayName="TemporaryDrawerHeader" />
<DocumentComponent displayName="TemporaryDrawerContent" />
```
