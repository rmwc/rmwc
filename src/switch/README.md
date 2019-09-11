# Switches

> On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

- Module **@rmwc/switch**
- Import styles:
  - import **'@material/switch/dist/mdc.switch.css'**
  - import **'@material/form-field/dist/mdc.form-field.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/switches/](https://material.io/develop/web/components/input-controls/switches/)

Switches are identical in function to the Checkbox component, they just present a different UI / UX paradigm.

```jsx
<Switch defaultChecked label="Pizza" />
```

```jsx
function Example() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Switch
      checked={checked}
      onChange={evt => setChecked(evt.currentTarget.checked)}
      label="Cookies"
    />
  );
}
```

```jsx
<Switch>Icecream</Switch>
```

```jsx
<>
  <Switch disabled label="Disabled" />
  <Switch disabled defaultChecked label="Disabled" />
</>
```

## Switch
A Switch component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `undefined \| false \| true` | Toggle the control on and off. |
| `disabled` | `undefined \| false \| true` | Disables the control. |
| `id` | `undefined \| string` | A DOM ID for the toggle. |
| `inputRef` | `MutableRefObject<HTMLInputElement \| null> \| (ref: HTMLInputElement \| null) => void` | A reference to the native input. |
| `label` | `React.ReactNode` | A label for the control. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `rootProps` | `React.HTMLProps<any>` | By default, all props except className and style spread to the input. These are additional props for the root of the checkbox. |
| `value` | `string \| number \| string[]` | The value of the control. |


