# Drawers

> A navigation drawer slides in from the left and contains the navigation destinations for your app.

- Module **@rmwc/drawer**
- Import styles:
  - import **'@material/drawer/dist/mdc.drawer.css'**;
- MDC Docs: [https://material.io/develop/web/components/drawers/](https://material.io/components/web/catalog/drawers/)

## Drawers

These are drawers that are permanently fixed inside of a view.

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle
} from '@rmwc/drawer';

import {
  List,
  ListItem,
  ListItemPrimaryText
} from '@rmwc/list';

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

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
  DrawerAppContent
} from '@rmwc/drawer';

import {
  ListItem,
  ListItemPrimaryText
} from '@rmwc/list';

import { Button } from '@rmwc/button';

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

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
  DrawerScrim
} from '@rmwc/drawer';

import {
  ListItem,
  ListItemPrimaryText
} from '@rmwc/list';

import { Button } from '@rmwc/button';

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
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="Drawer" />
<DocumentComponent docs={docs} displayName="DrawerHeader" />
<DocumentComponent docs={docs} displayName="DrawerTitle" />
<DocumentComponent docs={docs} displayName="DrawerSubtitle" />
<DocumentComponent docs={docs} displayName="DrawerContent" />
<DocumentComponent docs={docs} displayName="DrawerScrim" />
<DocumentComponent docs={docs} displayName="DrawerAppContent" />
```
