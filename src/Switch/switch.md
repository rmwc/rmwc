# Switches

> On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

import from **rmwc/Switch**  
[https://material.io/components/web/catalog/input-controls/switches/](https://material.io/components/web/catalog/input-controls/switches/)

Switches are identical in function to the [Checkbox](checkboxes) component, they just present a different UI / UX paradigm.

```jsx render
import { Switch } from 'rmwc/Switch';

{/* Controlled with change handler */}
<Switch
  checked={!!this.state.cookiesChecked}
  onChange={evt => this.setState({cookiesChecked: evt.target.checked})}>
  Cookies
</Switch>

{/* Standard Switch */}
<Switch>Pizza</Switch>

{/* Using the label prop */}
<Switch label="Icecream" />
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Switch" />
```
