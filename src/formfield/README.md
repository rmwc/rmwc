# Form Fields

MDC Form Field provides an mdc-formfield helper class for easily making theme-aware, RTL-aware form field + label combos. It also provides an MDCFormField class for easily making input ripples respond to label events.

- Module **@rmwc/formfield**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/formfield/styles';
  - Or include stylesheets
    - **'@material/form-field/dist/mdc.form-field.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/form-fields/](https://material.io/develop/web/components/input-controls/form-fields/)

```jsx
<FormField>
  <input type="checkbox" id="input" />
  <label htmlFor="input">Input Label</label>
</FormField>
```

## FormField
A FormField component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `alignEnd` | `undefined \| false \| true` | Position the input after the label. |
| `foundationRef` | `React.Ref<MDCFormFieldFoundation>` | Advanced: A reference to the MDCFoundation. |


