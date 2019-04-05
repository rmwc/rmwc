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
  List,
  ListItem
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

## Modal Drawers

These are drawers that can be temporarily displayed fixed on the side of the entire viewport.

```jsx render
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
} from '@rmwc/drawer';

import {
  List,
  ListItem
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

<Button
  onClick={() => this.setState({modalOpen: !this.state.modalOpen})}
  raised
>
  Toggle Drawer
</Button>
```

## Right Side Drawers

`material-components-web` doesn't directly support right hand drawers, but it respects the `dir` attribute on DOM elements. This simple hack will allow you to get drawers that appear from the right hand side of your app. As an aside, the `dir` attribute can be used to invert many other behaviors where the element is anchored on the left.

```jsx render
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerSubtitle,
} from '@rmwc/drawer';

import {
  List,
  ListItem
} from '@rmwc/list';

import { Button } from '@rmwc/button';

{/** Make the drawer appear right-to-left */}
<Drawer
  dir="rtl"
  modal
  open={this.state.rightModalOpen}
  onClose={() => this.setState({rightModalOpen: false})}
>
  {/** Set the content back to left-to-right */}
  <DrawerContent dir="ltr">
    <div style={{padding: '1rem'}}>Right hand side drawer example</div>
  </DrawerContent>
</Drawer>

<Button
  onClick={() => this.setState({rightModalOpen: !this.state.rightModalOpen})}
  raised
>
  Toggle Right Drawer
</Button>
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import * as docs from './generated-props.json';

<DocProps src={docs} components={[
  'Drawer',
  'DrawerHeader',
  'DrawerTitle',
  'DrawerSubtitle',
  'DrawerContent',
  'DrawerAppContent'
]}/>
```
