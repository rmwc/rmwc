# Grid Lists

> Grid lists are an alternative to standard list views.

- Module **@rmwc/grid-list**
- Import styles:
  - import **'@material/grid-list/dist/mdc.grid-list.css'**;
- MDC Docs: [https://material.io/components/web/catalog/grid-lists/](https://material.io/components/web/catalog/grid-lists/)

```jsx render
import {
  GridList,
  GridTile,
  GridTileIcon,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle
} from '@rmwc/grid-list';

import { Checkbox } from '@rmwc/checkbox';
import { Select } from '@rmwc/select';

<GridList
  tileGutter1={this.state.tileGutter1}
  headerCaption={this.state.headerCaption}
  twolineCaption={this.state.twolineCaption}
  withIconAlignStart={this.state.withIconAlignStart}
  tileAspect={this.state.tileAspect}
>
  {[...Array(8)].map((val, i) => (
    <GridTile key={i}>
      <GridTilePrimary>
        <GridTilePrimaryContent>
          <img src="https://material-components-web.appspot.com/images/1-1.jpg" alt="test" />
        </GridTilePrimaryContent>
      </GridTilePrimary>
      <GridTileSecondary>
        <GridTileIcon icon="info" />
        <GridTileTitle>Tile {i + 1}</GridTileTitle>
      </GridTileSecondary>
    </GridTile>
  ))}
</GridList>

<Checkbox label="tileGutter1" onClick={() => this.setState({tileGutter1: !this.state.tileGutter1})}/>
<Checkbox label="headerCaption" onClick={() => this.setState({headerCaption: !this.state.headerCaption})}/>
<Checkbox label="twolineCaption" onClick={() => this.setState({twolineCaption: !this.state.twolineCaption})}/>
<Checkbox label="withIconAlignStart" onClick={() => this.setState({withIconAlignStart: !this.state.withIconAlignStart})}/>

<Select
  value={this.state.tileAspect || '1x1'}
  onChange={evt => this.setState({tileAspect: evt.target.value})}
  label="tileAspect"
  options={['1x1', '16x9', '2x3', '3x2', '4x3', '3x4']}
/>
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="GridList" />
<DocumentComponent docs={docs} displayName="GridTile" />
<DocumentComponent docs={docs} displayName="GridTileIcon" composes={['Icon']}/>
<DocumentComponent docs={docs} displayName="GridTilePrimary" />
<DocumentComponent docs={docs} displayName="GridTileSecondary" />
<DocumentComponent docs={docs} displayName="GridTileTitleSupportText" />
<DocumentComponent docs={docs} displayName="GridTileTitle" />
```
