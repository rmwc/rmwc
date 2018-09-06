# Form Fields

> MDC Form Field provides an mdc-formfield helper class for easily making theme-aware, RTL-aware form field + label combos. It also provides an MDCFormField class for easily making input ripples respond to label events.

- import * from **'@rmwc/formfield'** ;
- import styles:
  - import **'@material/form-field/dist/mdc.form-field.css'**;
- MDC Docs: [https://material.io/develop/web/components/input-controls/formfields/](https://material.io/develop/web/components/input-controls/formfields/)

Its not immediately clear when to use this component, but it has been included in RMWC for completeness. Please refer to the official MDC docs for use cases.

```jsx render
import { FormField } from '@rmwc/formfield';

<FormField>
  <input type="checkbox" id="input"/>
  <label htmlFor="input">Input Label</label>
</FormField>
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="FormField" />
```
