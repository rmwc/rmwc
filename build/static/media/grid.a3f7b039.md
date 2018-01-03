# Layout Grid

> Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

import from **rmwc/Grid**  
[https://material.io/components/web/catalog/layout-grid/](https://material.io/components/web/catalog/layout-grid/)

```jsx render
import { Grid, GridCell } from 'rmwc/Grid';

<Grid>
  <GridCell span="4">1</GridCell>
  <GridCell span="4">2</GridCell>
  <GridCell span="4">3</GridCell>
</Grid>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Grid" />
<DocumentComponent displayName="GridCell" />
<DocumentComponent displayName="GridInner" />
```
