# Icon Buttons

> Icon buttons allow users to take actions, and make choices, with a single tap.

- Module **@rmwc/icon-button**  
- Import styles:
  - import **'@material/icon-button/dist/mdc.icon-button.css'**;
- MDC Docs: [https://material.io/develop/web/components/buttons/icon-buttons/](https://material.io/develop/web/components/buttons/icon-buttons/)

## Basic Usage
`IconButton` inherits from the `Icon` component and can be passed icons in the same way.

```jsx render
import { IconButton } from '@rmwc/icon-button';

<IconButton icon="star" label="Rate this!" />
<IconButton
  icon="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon"
  aria-label="Tweet it!"
/>

```

## Usage as a Toggle

To use as a toggle, specify an additional toggled on state using 'onIcon'. 

```jsx render
{/* Uncontrolled */}
<IconButton
  icon="favorite_border"
  onIcon="favorite"
/>

{/* Controlled */}
<IconButton
  checked={this.state.isChecked}
  onClick={() => this.setState({isChecked: !this.state.isChecked})}
  onIcon="star"
  icon="star_border"
/>

<IconButton
  onChange={(evt) => console.log(evt.detail)}
  onIcon="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon"
  icon="https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png"
/>

<IconButton
  onIcon={
    <div style={{ background: 'red', width: '24px', height: '24px'}} />
  }
  icon={
    <div style={{ background: 'green', width: '24px', height: '24px', borderRadius: '50%' }} />
  }
/>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['IconButton']} />
```
