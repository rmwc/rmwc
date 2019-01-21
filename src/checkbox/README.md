# Checkboxes

> Checkboxes allow the user to select multiple options from a set.

- Module **@rmwc/checkbox**
- Import styles:
  - import **'@material/checkbox/dist/mdc.checkbox.css'**;
  - import **'@material/form-field/dist/mdc.form-field.css'**;
- MDC Docs: [https://material.io/develop/web/components/input-controls/checkboxes/](https://material.io/develop/web/components/input-controls/checkboxes/)

```jsx render
import { Checkbox } from '@rmwc/checkbox';

{/* Controlled */}
<Checkbox
  label="Cookies"
  checked={this.state.cookiesChecked || false}
  onChange={evt => this.setState({cookiesChecked: evt.target.checked})}
/>

{/* Uncontrolled */}
<Checkbox label="Pizza" />

{/* Label as children */}
<Checkbox>Icecream</Checkbox>

{/* Making a "half" checked, indeterminate Checkbox */}
<Checkbox
  label="Broccoli"
  indeterminate
/>

<Checkbox label="Always On" checked />
<Checkbox label="Always Off" checked={false} />
```

```jsx renderOnly
import { Docs } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<Docs src={docs} components={['Checkbox']} />
```
