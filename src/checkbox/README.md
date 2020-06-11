# Checkboxes

Checkboxes allow the user to select multiple options from a set.

- Module **@rmwc/checkbox**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/checkbox/styles';
  - Or include stylesheets
    - **'@material/checkbox/dist/mdc.checkbox.css'**
    - **'@material/form-field/dist/mdc.form-field.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/checkboxes/](https://material.io/develop/web/components/input-controls/checkboxes/)

```jsx
function Example() {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      label="Cookies"
      checked={checked}
      onChange={evt => setChecked(!!evt.currentTarget.checked)}
    />
  );
}
```

```jsx
<Checkbox label="Pizza" />
```

```jsx
<Checkbox>Icecream</Checkbox>
```

```jsx
<>
  <Checkbox label="Broccoli" indeterminate />

  <Checkbox label="Always On" checked />
  <Checkbox label="Always Off" checked={false} />
</>
```

## Checkbox
A Checkbox component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `undefined \| false \| true` | Toggle the control on and off. |
| `disabled` | `undefined \| false \| true` | Disables the control. |
| `foundationRef` | `React.Ref<MDCCheckboxFoundation>` | Advanced: A reference to the MDCFoundation. |
| `id` | `undefined \| string` | A DOM ID for the toggle. |
| `indeterminate` | `undefined \| false \| true` | Make the control indeterminate |
| `inputRef` | `React.Ref<HTMLInputElement>` | A reference to the native input. |
| `label` | `React.ReactNode` | A label for the control. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `rootProps` | `React.HTMLProps<any>` | By default, all props except className and style spread to the input. These are additional props for the root of the checkbox. |
| `value` | `string \| number \| string[]` | The value of the control. |


