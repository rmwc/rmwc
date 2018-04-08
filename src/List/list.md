# Lists

> Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

import from **rmwc/List**  
[https://material.io/components/web/catalog/lists/](https://material.io/components/web/catalog/lists/)

ListItems can be verbose to import and render. A non-standard 'SimpleListItem' has been created to improve the developer experience which contains a default template for ListItems.

## Standard Usage

```jsx render
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta
} from 'rmwc/List';

<List>
  <ListItem>
    <ListItemGraphic>star_border</ListItemGraphic>
    <ListItemText>Cookies</ListItemText>
    <ListItemMeta>info</ListItemMeta>
  </ListItem>

  <ListItem>
    <ListItemGraphic>favorite_border</ListItemGraphic>
    <ListItemText>Pizza</ListItemText>
    <ListItemMeta>info</ListItemMeta>
  </ListItem>

  <ListItem>
    <ListItemGraphic>mood</ListItemGraphic>
    <ListItemText>Icecream</ListItemText>
    <ListItemMeta tag="span" basename="">Text!</ListItemMeta>
  </ListItem>
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

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="List" />
<DocumentComponent displayName="ListItem" />
<DocumentComponent displayName="ListItemText" />
<DocumentComponent displayName="ListItemSecondaryText" />
<DocumentComponent displayName="ListItemGraphic" />
<DocumentComponent displayName="ListItemMeta" />
<DocumentComponent displayName="ListDivider" />
<DocumentComponent displayName="ListGroup" />
<DocumentComponent displayName="ListGroupSubheader" />
<DocumentComponent displayName="SimpleListItem" />
```
