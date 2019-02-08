# Circular Progress `RMWC Addon`

> Circular progress indicators display progress by animating an indicator along an invisible circular track in a clockwise direction. They can be applied directly to a surface, such as a button or card.

- Module **@rmwc/circular-progress**  
- Import styles:
  - import **'@rmwc/circular-progress/circular-progress.css'**;

## Basic Usage

```jsx render
import { CircularProgress } from '@rmwc/circular-progress';

<CircularProgress />
<CircularProgress progress={0.3}/>
<CircularProgress progress={0.6}/>
<CircularProgress progress={0.9}/>
```

## Sizing

```jsx render
import { CircularProgress } from '@rmwc/circular-progress';

<CircularProgress size="xsmall" />
<CircularProgress size="small" />
<CircularProgress size="medium" />
<CircularProgress size="large" />
<CircularProgress size="xlarge" />
<CircularProgress size={72} />
```

## Use with other components

The CircularProgress component is designed to work well with other components where you would otherwise render an icon or input control.

```jsx render
import { Button, ButtonIcon } from '@rmwc/button';
import { List, SimpleListItem } from '@rmwc/list';
import { Chip } from '@rmwc/chip';

<Button>
  <ButtonIcon icon={<CircularProgress theme="secondary" />}/> Cookies
</Button>

<List>
  <SimpleListItem graphic={<CircularProgress />} text="Pizza"/>
  <SimpleListItem graphic="favorite" text="Icecream"/>
</List>

<Chip
  icon={<CircularProgress />}
  text="Donuts"
/>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['CircularProgress']} />
```
