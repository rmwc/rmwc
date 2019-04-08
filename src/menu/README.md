# Menus

> Menus display a list of choices on a transient sheet of material.

- import from **'@rmwc/menu'**; 
- Import styles:
  - import **'@material/menu/dist/mdc.menu.css'**;
  - import **'@material/menu-surface/dist/mdc.menu-surface.css'**;
  - import **'@material/list/dist/mdc.list.css'**;
- MDC Docs: [https://material.io/develop/web/components/menus/](https://material.io/develop/web/components/menus/)

## Menus

You can compose a menu with the given components, and manually manage the open state. `Menu` expects MenuItems as children while `MenuSurface` is a generic container which can have anything as a child.

```jsx render
import { Menu, MenuItem, MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { ListDivider } from '@rmwc/list';
import { Button } from '@rmwc/button';

{/** A menu with items */}
<MenuSurfaceAnchor>
  <Menu
    open={this.state.menuIsOpen}
    onSelect={evt => console.log(evt.detail.index)}
    onClose={evt => this.setState({menuIsOpen: false})}
  >
    <MenuItem>Cookies</MenuItem>
    <MenuItem>Pizza</MenuItem>
    {/** MenuItem is just a ListItem, so you can intermingle other List components */}
    <ListDivider /> 
    <MenuItem>Icecream</MenuItem>
  </Menu>

  <Button
    raised
    onClick={evt => this.setState({'menuIsOpen': !this.state.menuIsOpen})}
  >
    Open Menu
  </Button>
</MenuSurfaceAnchor>

{/** A Generic menu containing any kind of content. */}
<MenuSurfaceAnchor>
  <MenuSurface
    open={this.state.genericMenuIsOpen}
    onClose={evt => this.setState({genericMenuIsOpen: false})}
  >
    <div style={{padding: '1rem', width: '8rem'}}>Make the content whatever you want.</div>
  </MenuSurface>

  <Button
    raised
    onClick={evt => this.setState({genericMenuIsOpen: !this.state.genericMenuIsOpen})}
  >
    Open Generic Menu
  </Button>
</MenuSurfaceAnchor>
```

## Simplified usage

RMWC provides a non-standard convenience `SimpleMenu` component that takes a handle as a prop, and manages the open state for you.

```jsx render
import { SimpleMenu, SimpleMenuSurface, MenuItem } from '@rmwc/menu';
import { Button } from '@rmwc/button';

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


## Anchoring

By default, Menus will attempt to automatically position themselves, but this behavior can be overriden by setting the `anchorCorner` prop.

```jsx render
import { MenuSurface, MenuSurfaceAnchor } from '@rmwc/menu';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';

<MenuSurfaceAnchor>
  <MenuSurface
    anchorCorner={this.state.anchorValue || 'topLeft'}
    open={true}
  >
    <div style={{padding: '1rem', width: '8rem'}}>
      anchorCorner: {this.state.anchorValue || 'topLeft'}
    </div>
  </MenuSurface>

  <Button
    raised
    onClick={evt => this.setState({anchorMenuOpen: !this.state.anchorMenuOpen})}
  >
    Open Anchored Menu
  </Button>
</MenuSurfaceAnchor>

<Select
  value={this.state.anchorValue || 'topLeft'}
  label="anchorCorner"
  onChange={evt => this.setState({anchorValue: evt.currentTarget.value})}
  options={[
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'topStart',
  'topEnd',
  'bottomStart',
  'bottomEnd'
]} />
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import { default as docs}  from './generated-props.json';

<DocProps src={docs} components={[
  'Menu',
  'MenuItem',
  'MenuSurface',
  'MenuSurfaceAnchor',
  'SimpleMenu',
  'SimpleMenuSurface'
]} />
```
