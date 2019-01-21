# Switches

> On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

- Module **@rmwc/switch** 
- Import styles:
  - import **'@material/switch/dist/mdc.switch.css'**;
  - import **'@material/form-field/dist/mdc.form-field.css'**;
- MDC Docs: [https://material.io/develop/web/components/input-controls/switches/](https://material.io/develop/web/components/input-controls/switches/)

Switches are identical in function to the [Checkbox](checkboxes) component, they just present a different UI / UX paradigm.

```jsx render
import { Switch } from '@rmwc/switch';

{/* Controlled with change handler */}
<Switch
  checked={!!this.state.cookiesChecked}
  onChange={evt => this.setState({cookiesChecked: evt.target.checked})}>
  Cookies
</Switch>

{/* Uncontrolled Switch */}
<Switch defaultChecked>Pizza</Switch>

{/* Using the label prop */}
<Switch label="Icecream" />

{/* Disabled */}
<Switch disabled label="Disabled" />
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['Switch']} />
```
