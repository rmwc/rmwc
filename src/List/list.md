# Layout Grid

> Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

import from **rmwc/List**  
[https://material.io/components/web/catalog/lists/](https://material.io/components/web/catalog/lists/)

```jsx render
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
  ListDivider,
  ListGroup,
  ListGroupSubheader
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
    <ListItemMeta>info</ListItemMeta>
  </ListItem>
</List>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="List" />
<DocumentComponent displayName="ListItem" />
<DocumentComponent displayName="ListItemText" />
<DocumentComponent displayName="ListItemSecondaryText" />
<DocumentComponent displayName="ListItemGraphic" />
<DocumentComponent displayName="ListItemMeta" />
<DocumentComponent displayName="ListDivider" />
<DocumentComponent displayName="ListGroup" />
<DocumentComponent displayName="ListGroupSubheade" />
```
