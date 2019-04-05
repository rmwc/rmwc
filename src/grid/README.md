# Layout Grid

> Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

- Module **@rmwc/grid**
- Import styles:
  - import **'@material/layout-grid/dist/mdc.layout-grid.css'**;
- [https://material.io/develop/web/components/layout-grid/](https://material.io/develop/web/components/layout-grid/)

```jsx render
import { Grid, GridCell, GridInner } from '@rmwc/grid';

{/* Standard Grid. For convenience, GridInner is added for you */}
<Grid>
  <GridCell span={4}>1</GridCell>
  <GridCell span={4}>2</GridCell>
  <GridCell span={4}>3</GridCell>
</Grid>

{/* If you need additional control over height of your grid, or need to add SubGrids, you can add your own GridInner components. */}
<Grid>
  <GridInner>
    <GridCell span={4}>1</GridCell>
    <GridCell span={4}>2</GridCell>
    <GridCell span={4}>
      <GridInner>
        <GridCell span={4}>a</GridCell>
        <GridCell span={4}>b</GridCell>
        <GridCell span={4}>c</GridCell>
      </GridInner>
    </GridCell>
  </GridInner>
</Grid>
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import * as docs from './generated-props.json';

<DocProps src={docs} components={[
  'Grid',
  'GridCell',
  'GridInner',
]}/>
```
