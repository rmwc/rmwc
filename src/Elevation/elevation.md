# Elevation

> Objects in material design possess similar qualities to objects in the physical world.

import from **rmwc/Elevation**  
[https://material.io/components/web/catalog/elevation/](https://material.io/components/web/catalog/elevation/)

```jsx render
import { Elevation } from 'rmwc/Elevation';

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
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Elevation" />
```
