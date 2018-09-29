# Elevation

> Objects in material design possess similar qualities to objects in the physical world.

- Module **@rmwc/elevation**  
- Import styles:
  - import **'@material/elevation/dist/mdc.elevation.css'**;
- MDC Docs: [https://material.io/develop/web/components/elevation/](https://material.io/develop/web/components/elevation/)

```jsx render
import { Elevation } from '@rmwc/elevation';

{/* Showing the 25 different levels of elevation */}
{[...Array(25)].map((val, i) => (
  <Elevation z={i} key={i}>{i}dp</Elevation>
))}

{/* Showing the transition prop */}
<Elevation
  z={this.state.elevation || 0}
  transition
  onMouseOver={() => this.setState({elevation: 24})}
  onMouseOut={() => this.setState({elevation: 0})}
>
  Hover Me {this.state.elevation || 0}dp
</Elevation>
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="Elevation" />
```
