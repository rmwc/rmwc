# Drawers

> A navigation drawer slides in from the left and contains the navigation destinations for your app.

import from **rmwc/Drawer**  
[https://material.io/components/web/catalog/drawers/](https://material.io/components/web/catalog/drawers/)

## Drawers

These are drawers that are permanently fixed inside of a view.
[https://material.io/components/web/catalog/drawers/#permanent-drawer-usage](https://material.io/components/web/catalog/drawers/#permanent-drawer-usage)

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle
} from 'rmwc/Drawer';

import {
  List,
  ListItem,
  ListItemPrimaryText
} from 'rmwc/List';

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

---

## Dismissible Drawers

These are drawers that can be toggled to an open or closed state inside of a view, but still takes up viewable space when closed.
[https://material.io/components/web/catalog/drawers/#persistent-drawer-usage](https://material.io/components/web/catalog/drawers/#persistent-drawer-usage)

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
  DrawerAppContent
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemPrimaryText
} from 'rmwc/List';

import { Button } from 'rmwc/Button';

<div style={{overflow: 'hidden', position: 'relative'}}>
  <Drawer dismissible open={this.state.dismissibleOpen == undefined ? true : this.state.dismissibleOpen}>
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
  <DrawerAppContent style={{minHeight: '15rem', padding: '1rem'}}>
    DrawerAppContent is an optional component that will resize content when the dismissible drawer is open and closed. It must be placed directly after the Drawer component.
  </DrawerAppContent>
</div>

<Button
  onClick={() => this.setState({dismissibleOpen: this.state.dismissibleOpen === undefined ? false : !this.state.dismissibleOpen})}
  raised
>
  Toggle Drawer
</Button>
```

---

## Modal Drawers

These are drawers that can be temporarily displayed fixed on the side of the entire viewport.
[https://material.io/components/web/catalog/drawers/#temporary-drawer-usage](https://material.io/components/web/catalog/drawers/#temporary-drawer-usage)

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
  DrawerScrim
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemPrimaryText
} from 'rmwc/List';

import { Button } from 'rmwc/Button';

<Drawer
  modal
  open={this.state.modalOpen}
  onClose={() => this.setState({modalOpen: false})}
>
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

{/* REACT 15 ONLY!!! You have to manually include the Scrim. This is done for you in React 16. */}
<DrawerScrim />
{/* END REACT 15 ONLY!!! */}

<Button
  onClick={() => this.setState({modalOpen: !this.state.modalOpen})}
  raised
>
  Toggle Drawer
</Button>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Drawer" />
<DocumentComponent displayName="DrawerHeader" />
<DocumentComponent displayName="DrawerTitle" />
<DocumentComponent displayName="DrawerSubtitle" />
<DocumentComponent displayName="DrawerContent" />
<DocumentComponent displayName="DrawerScrim" />
<DocumentComponent displayName="DrawerAppContent" />
```
