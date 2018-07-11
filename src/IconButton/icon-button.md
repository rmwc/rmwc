# Icon Buttons

> Icon buttons allow users to take actions, and make choices, with a single tap.

import from **rmwc/IconToggle**  
[https://material.io/components/web/catalog/buttons/icon-buttons/](https://material.io/components/web/catalog/buttons/icon-buttons/)

## Basic Usage
`IconButton` inherits from the `Icon` component and can be passed icons in the same way.

```jsx render
import { IconButton } from 'rmwc/IconButton';

<IconButton use="star" label="Rate this!" />
<IconButton
  use="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon"
  label="Tweet it!"
/>

```

## Usage as a Toggle

When being used as a toggle, `onContent` and `offContent` behave the same as the `use` prop of the `Icon` component.

```jsx render
{/* Uncontrolled */}
<IconButton
  onLabel="Remove from favorites"
  onContent="favorite"
  offLabel="Add to favorites"
  offContent="favorite_border"
/>

{/* Controlled */}
<IconButton
  checked={this.state.isChecked}
  onClick={() => this.setState({isChecked: !this.state.isChecked})}
  onLabel="Remove from favorites"
  onContent="star"
  offLabel="Add to favorites"
  offContent="star_border"
/>

<IconButton
  onChange={(evt) => console.log(evt.detail)}
  onLabel="Switch to Facebook"
  onContent="https://www2.le.ac.uk/departments/law/images/twitter-follow-us-icon"
  offLabel="Switch to Twitter"
  offContent="https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png"
/>

<IconButton
  onLabel="Stop"
  onContent={
    <div style={{ background: 'red', width: '24px', height: '24px'}} />
  }
  offLabel="Play"
  offContent={
    <div style={{ background: 'green', width: '24px', height: '24px', borderRadius: '50%' }} />
  }
/>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';
import { IconButton } from 'rmwc/IconButton';

<DocumentComponent component={IconButton} displayName="IconButton" />
```
