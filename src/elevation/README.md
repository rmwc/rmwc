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

## Wrapping Children

You can avoid adding extra DOM nodes by using the `wrap` prop on elevation. This will apply the classes directly to the child component. Additionally, Elevation is simply a  `className`, so you can achieve the same effect by adding `className="mdc-elevation--z15"`.

```jsx render
import { Elevation } from '@rmwc/elevation';

<Elevation z={21} wrap>
  <i>Wrapped!</i>
</Elevation>
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import * as docs from './generated-props.json';

<DocProps src={docs} components={['Elevation']} />
```
