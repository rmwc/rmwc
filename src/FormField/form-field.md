# Form Fields

> MDC Form Field provides an mdc-form-field helper class for easily making theme-aware, RTL-aware form field + label combos. It also provides an MDCFormField class for easily making input ripples respond to label events.

import from **rmwc/FormField**  
[https://material.io/components/web/catalog/input-controls/form-fields/](https://material.io/components/web/catalog/input-controls/form-fields/)

Its not immediately clear when to use this component, but it has been included in RMWC for completeness. Please refer to the official MDC docs for use cases.

```jsx render
import { FormField } from 'rmwc/FormField';

<FormField>
  <input type="checkbox" id="input"/>
  <label htmlFor="input">Input Label</label>
</FormField>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="FormField" />
```
