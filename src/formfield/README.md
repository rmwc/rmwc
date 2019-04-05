# Form Fields

> MDC Form Field provides an mdc-formfield helper class for easily making theme-aware, RTL-aware form field + label combos. It also provides an MDCFormField class for easily making input ripples respond to label events.

- Module **@rmwc/formfield** ;
- Import styles:
  - import **'@material/form-field/dist/mdc.form-field.css'**;
- MDC Docs: [https://material.io/develop/web/components/input-controls/formfields/](https://material.io/develop/web/components/input-controls/formfields/)

Its not immediately clear when to use this component, but it has been included in RMWC for completeness. It does offer some consistent spacing and is automatically included with Radio's, Switches, and Checkboxes when there is an accompanying label. Please refer to the official MDC docs for use cases.

```jsx render
import { FormField } from '@rmwc/formfield';

<FormField>
  <input type="checkbox" id="input"/>
  <label htmlFor="input">Input Label</label>
</FormField>
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import * as docs from './generated-props.json';

<DocProps src={docs} components={['FormField']} />
```
