# Lists

> Lists are continuous, vertical indexes of text or images.

- import from **'@rmwc/list'**;
- Import styles:
  - import **'@material/list/dist/mdc.list.css'**;
- MDC Docs: [https://material.io/develop/web/components/lists/](https://material.io/develop/web/components/lists/)

ListItems can be verbose to import and render. A non-standard 'SimpleListItem' has been created to improve the developer experience which contains a default template for ListItems.

## Standard Usage

```jsx render
import {
  List,
  ListItem
} from '@rmwc/list';

<List>
  <ListItem>Cookies</ListItem>
  <ListItem>Pizza</ListItem>
  <ListItem>Icecream</ListItem>
</List>
```

## Simplified Usage

```jsx render
import {
  List,
  SimpleListItem
} from '@rmwc/list';

<List twoLine>
  <SimpleListItem graphic="star_border" text="Cookies" secondaryText="Chocolate chip" meta="info" />
  <SimpleListItem graphic="favorite_border" text="Pizza" secondaryText="Pepperoni" meta="info" />
  <SimpleListItem graphic="mood" text="Icecream" secondaryText="Chocolate cookie dough" meta="info" />
</List>
```

## Two Line
When using the `twoLine` prop, you have to wrap the contents of the `ListItem` in `ListItemText`.

```jsx render
import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';

<List twoLine>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Cookies</ListItemPrimaryText>
      <ListItemSecondaryText>$4.99 a dozen</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Pizza</ListItemPrimaryText>
      <ListItemSecondaryText>$1.99 a slice</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
  <ListItem>
    <ListItemText>
      <ListItemPrimaryText>Icecream</ListItemPrimaryText>
      <ListItemSecondaryText>$0.99 a scoop</ListItemSecondaryText>
    </ListItemText>
  </ListItem>
</List>
```

## Leading and Trailing Icons
```jsx render
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
  ListItemMetaText
} from '@rmwc/list';

<List>
  <ListItem>
    <ListItemGraphic icon="favorite"/>
    Leading
  </ListItem>
  <ListItem>
    Trailing
    <ListItemMeta icon="star"/>
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi"/>
    Leading and Trailing
    <ListItemMeta icon="info"/>
  </ListItem>
  <ListItem>
    <ListItemGraphic icon="wifi"/>
    Leading with Trailing Text
    <ListItemMetaText>HELLO!</ListItemMetaText>
  </ListItem>
</List>
```

## Avatar List with Dividers
```jsx render
import {
  List,
  ListGroup,
  ListDivider,
  ListItem,
  ListItemGraphic,
  ListItemMeta,
} from '@rmwc/list';

<List twoLine avatarList>
  <ListGroup>
    <ListItem>
      <ListItemGraphic icon="person" style={{backgroundColor: 'lightgray'}} />
      Bruce Wayne
      <ListItemMeta icon="info"/>
    </ListItem>
    <ListItem>
      <ListItemGraphic icon="person" style={{backgroundColor: 'coral'}} />
      Clark Kent
      <ListItemMeta icon="info"/>
    </ListItem>
  </ListGroup>
  <ListDivider />
  <ListGroup>
    <ListItem>
      <ListItemGraphic icon="person" style={{backgroundColor: 'lightblue'}} />
      Diana Prince
      <ListItemMeta icon="info"/>
    </ListItem>
  </ListGroup>
</List>
```


## Selectable
```jsx render
import {
  List,
  ListItem,
  ListItemGraphic,
} from '@rmwc/list';

import { Checkbox } from '@rmwc/checkbox';

<List>
  <ListItem onClick={() => this.setState({cookiesChecked: !this.state.cookiesChecked})}>
    <ListItemGraphic icon={<Checkbox checked={this.state.cookiesChecked}/>}/>
    Cookies
  </ListItem>
  <ListItem onClick={() => this.setState({pizzaChecked: !this.state.pizzaChecked})}>
    <ListItemGraphic icon={<Checkbox checked={this.state.pizzaChecked}/>}/>
    Pizza
  </ListItem>
  <ListItem onClick={() => this.setState({iceCreamChecked: !this.state.iceCreamChecked})}>
    <ListItemGraphic icon={<Checkbox checked={this.state.iceCreamChecked}/>}/>
    Icecream
  </ListItem>
</List>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={[
  'List',
  'ListItem',
  'ListItemPrimaryText',
  'ListItemSecondaryText',
  'ListItemGraphic',
  'ListItemMeta',
  'ListItemMetaText',
  'ListDivider',
  'ListGroup',
  'ListGroupSubheader',
  'SimpleListItem'
]} />
```
