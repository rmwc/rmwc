# Switches

On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

- Module **@rmwc/switch**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/switch/styles';
  - Or include stylesheets
    - **'@material/switch/dist/mdc.switch.css'**
    - **'@material/form-field/dist/mdc.form-field.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
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
      onClick={(evt) => setChecked((c) => !c)}
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

| Name            | Type                           | Description                                                                                                                    |
| --------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `checked`       | `boolean`                      | Toggle the control on and off.                                                                                                 |
| `disabled`      | `boolean`                      | Disables the control.                                                                                                          |
| `foundationRef` | `Ref<MDCSwitchFoundation<>>`   | Advanced: A reference to the MDCFoundation.                                                                                    |
| `id`            | `string`                       | A DOM ID for the toggle.                                                                                                       |
| `inputRef`      | `Ref<HTMLInputElement<>>`      | A reference to the native input.                                                                                               |
| `label`         | `ReactNode`                    | A label for the control.                                                                                                       |
| `processing`    | `boolean`                      |                                                                                                                                |
| `ripple`        | `RipplePropT`                  | Adds a ripple effect to the component                                                                                          |
| `rootProps`     | `HTMLProps<any>`               | By default, all props except className and style spread to the input. These are additional props for the root of the checkbox. |
| `value`         | `string \| number \| string[]` | The value of the control.                                                                                                      |
