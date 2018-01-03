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
  ListItemStartDetail,
  ListItemEndDetail,
  ListDivider,
  ListGroup,
  ListGroupSubheader
} from 'rmwc/List';

<List>
  <ListItem>
    <ListItemStartDetail>star_border</ListItemStartDetail>
    <ListItemText>Cookies</ListItemText>
    <ListItemEndDetail>info</ListItemEndDetail>
  </ListItem>

  <ListItem>
    <ListItemStartDetail>favorite_border</ListItemStartDetail>
    <ListItemText>Pizza</ListItemText>
    <ListItemEndDetail>info</ListItemEndDetail>
  </ListItem>

  <ListItem>
    <ListItemStartDetail>mood</ListItemStartDetail>
    <ListItemText>Icecream</ListItemText>
    <ListItemEndDetail>info</ListItemEndDetail>
  </ListItem>
</List>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="List" />
<DocumentComponent displayName="ListItem" />
<DocumentComponent displayName="ListItemText" />
<DocumentComponent displayName="ListItemSecondaryText" />
<DocumentComponent displayName="ListItemStartDetail" />
<DocumentComponent displayName="ListItemEndDetail" />
<DocumentComponent displayName="ListDivider" />
<DocumentComponent displayName="ListGroup" />
<DocumentComponent displayName="ListGroupSubheade" />
```
