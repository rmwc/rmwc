# Buttons

> Buttons communicate the action that will occur when the user touches them.

- Module **@rmwc/button**  
- Import styles:
  - import **'@material/button/dist/mdc.button.css'**;
- MDC Docs: [https://material.io/develop/web/components/buttons/](https://material.io/develop/web/components/buttons/)

```jsx render
import { Button, ButtonIcon } from '@rmwc/button';

<Button label="Default" />
<Button
  label="With Icon"
  icon="favorite"
/>
<Button 
  label="Raised"
  raised
/>
<Button
  label="Dense"
  dense
/>
<Button
  label="Unelevated"
  unelevated
/>
<Button
  label="Outlined"
  outlined
/>
<Button
  label="With Theme"
  raised
  theme={['secondaryBg', 'onSecondary']}
/>


{/*
  Modify the Buttons Ripple.
  This example uses "accent" to control the color of the Ripple.
  See the documentation on Ripples.
  */
}
<Button
  label="With Theme"
  theme="secondary"
  ripple={{accent: true}}
/>
<Button
  label="No Ripple"
  ripple={false}
/>

{/*
  Alternatively pass content as children
*/}
<Button><ButtonIcon icon="star" /> As Children</Button>
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['Button', 'ButtonIcon']} />
```
