# Lists

> Lists are continuous, vertical indexes of text or images.

import from **rmwc/List**  
[https://material.io/components/web/catalog/lists/](https://material.io/components/web/catalog/lists/)

ListItems can be verbose to import and render. A non-standard 'SimpleListItem' has been created to improve the developer experience which contains a default template for ListItems.

## Standard Usage

```jsx render
import {
  List,
  ListItem
} from 'rmwc/List';

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
} from 'rmwc/List';

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
} from 'rmwc/List';

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
  ListItemMeta
} from 'rmwc/List';

<List>
  <ListItem>
    <ListItemGraphic use="favorite"/>
    Leading
  </ListItem>
  <ListItem>
    Trailing
    <ListItemMeta use="star"/>
  </ListItem>
  <ListItem>
    <ListItemGraphic use="wifi"/>
    Leading and Trailing
    <ListItemMeta use="info"/>
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
} from 'rmwc/List';

<List twoLine avatarList>
  <ListGroup>
    <ListItem>
      <ListItemGraphic use="person" style={{backgroundColor: 'lightgray'}} />
      Bruce Wayne
      <ListItemMeta use="info"/>
    </ListItem>
    <ListItem>
      <ListItemGraphic use="person" style={{backgroundColor: 'coral'}} />
      Clark Kent
      <ListItemMeta use="info"/>
    </ListItem>
  </ListGroup>
  <ListDivider />
  <ListGroup>
    <ListItem>
      <ListItemGraphic use="person" style={{backgroundColor: 'lightblue'}} />
      Diana Prince
      <ListItemMeta use="info"/>
    </ListItem>
  </ListGroup>
</List>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="List" />
<DocumentComponent displayName="ListItem" />
<DocumentComponent displayName="ListItemPrimaryText" />
<DocumentComponent displayName="ListItemSecondaryText" />
<DocumentComponent displayName="ListItemGraphic" />
<DocumentComponent displayName="ListItemMeta" />
<DocumentComponent displayName="ListDivider" />
<DocumentComponent displayName="ListGroup" />
<DocumentComponent displayName="ListGroupSubheader" />
<DocumentComponent displayName="SimpleListItem" />
```
