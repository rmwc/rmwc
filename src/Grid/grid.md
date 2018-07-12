# Layout Grid

> Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

import from **rmwc/Grid**  
[https://material.io/components/web/catalog/layout-grid/](https://material.io/components/web/catalog/layout-grid/)

```jsx render
import { Grid, GridCell, GridInner } from 'rmwc/Grid';

{/* Standard Grid. For convenience, GridInner is added for you */}
<Grid>
  <GridCell span="4">1</GridCell>
  <GridCell span="4">2</GridCell>
  <GridCell span="4">3</GridCell>
</Grid>

{/* If you need additional control over height of your grid, or need to add SubGrids, you can add your own GridInner components. */}
<Grid>
  <GridInner>
    <GridCell span="4">1</GridCell>
    <GridCell span="4">2</GridCell>
    <GridCell span="4">
      <GridInner>
        <GridCell span="4">a</GridCell>
        <GridCell span="4">b</GridCell>
        <GridCell span="4">c</GridCell>
      </GridInner>
    </GridCell>
  </GridInner>
</Grid>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Grid" />
<DocumentComponent displayName="GridCell" />
<DocumentComponent displayName="GridInner" />
```
