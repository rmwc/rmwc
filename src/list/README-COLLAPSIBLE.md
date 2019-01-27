# Collapsible Lists `RMWC Addon`

> Collapsible lists aren't part of the material spec, but they've been added to RMWC after continuing requests from the community.

- import from **'@rmwc/list'**;
- Import styles:
  - import **'@material/list/dist/mdc.list.css'**;
  - import **'@material/list/collapsible-list.css'**;

Collapsible Lists present an accordion style navigation element to progressively reveal content. They've have been built to work with the `List` and `ListItem` components in regards to keyboard events and styling, but they technically be used with any kind of content.

```jsx render
import {
  List,
  SimpleListItem,
  CollapsibleList
} from '@rmwc/list';

<List>
  <CollapsibleList handle={
    <SimpleListItem text="Cookies" graphic="favorite" metaIcon="chevron_right"/>
  }>
    <SimpleListItem text="Chocolate Chip"/>
    <SimpleListItem text="Ginger Snap"/>
    <SimpleListItem text="Peanut Butter"/>
  </CollapsibleList>

  <CollapsibleList handle={
    <SimpleListItem text="Pizza" 
    graphic="local_pizza" metaIcon="chevron_right"/>
  }>
    <SimpleListItem text="Cheese"/>
    <SimpleListItem text="Pepperoni"/>
    <SimpleListItem text="Supreme"/>
  </CollapsibleList>

  <CollapsibleList handle={
    <SimpleListItem text="Icecream" 
    graphic="star" metaIcon="chevron_right"/>
  }>
    <SimpleListItem text="Vanilla"/>
    <SimpleListItem text="Chocolate"/>
    <CollapsibleList handle={
      <SimpleListItem text="Nested Collapsible" 
      graphic="touch_app" metaIcon="chevron_right"/>
    }>
      <SimpleListItem text="Orange"/>
      <SimpleListItem text="Strawberry"/>
      <SimpleListItem text="Blueberry"/>
    </CollapsibleList>
  </CollapsibleList>
  
  <CollapsibleList handle={
    <SimpleListItem text="Custom Content" 
    graphic="help" metaIcon="chevron_right"/>
  }>
    
    <div style={{
      padding: '4rem',
      background: 'green',
      color: 'white'
    }}>Collapsibles can contain any content</div>
  </CollapsibleList>
</List>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={[
  'CollapsibleList'
]} />
```
