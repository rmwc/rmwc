# Checkboxes

> Checkboxes allow the user to select multiple options from a set.

- Module **@rmwc/checkbox**
- Import styles:
  - import **'@material/checkbox/dist/mdc.checkbox.css'**;
  - import **'@material/form-field/dist/mdc.form-field.css'**;
- MDC Docs: [https://material.io/develop/web/components/input-controls/checkboxes/](https://material.io/develop/web/components/input-controls/checkboxes/)

```jsx render
import { Checkbox } from '@rmwc/checkbox';

{/* Controlled with change handlers */}
<Checkbox
  checked={this.state.cookiesChecked || false}
  onChange={evt => this.setState({cookiesChecked: evt.target.checked})}>
  Cookies
</Checkbox>

{/* Standard Checkbox */}
<Checkbox>Pizza</Checkbox>

{/* Using the label prop */}
<Checkbox label="Icecream" />

{/* Making a "half" checked, indeterminate Checkbox */}
<Checkbox indeterminate>Broccoli</Checkbox>
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/document-component';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="Checkbox" />
```
