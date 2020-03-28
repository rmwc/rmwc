# Radio Buttons

> Radio buttons allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side.

- Module **@rmwc/radio**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/radio/styles';
  - Or include stylesheets
    - **'@material/radio/dist/mdc.radio.css'**
    - **'@material/form-field/dist/mdc.form-field.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/radio-buttons/](https://material.io/develop/web/components/input-controls/radio-buttons/)

## Controlled Usage

```jsx
function Example() {
  const [value, setValue] = React.useState('cookies');

  return (
    <>
      <Radio
        value="cookies"
        checked={value === 'cookies'}
        onChange={evt => setValue(String(evt.currentTarget.value))}
      >
        Cookies
      </Radio>

      <Radio
        value="pizza"
        checked={value === 'pizza'}
        onChange={evt => setValue(String(evt.currentTarget.value))}
      >
        Pizza
      </Radio>

      <Radio
        value="icecream"
        checked={value === 'icecream'}
        onChange={evt => setValue(String(evt.currentTarget.value))}
      >
        Icecream
      </Radio>
    </>
  );
}
```

## Uncontrolled Usage

You can use Radio Buttons and receive change events without having to manually set the `checked` prop. Just give the Radio components the same `name`. This example also shows using the `label` prop instead of setting the label as a child.

```jsx
<>
  <Radio
    label="Cookies"
    value="cookies"
    name="myRadioGroup"
    onChange={evt => console.log(evt.currentTarget.value)}
  />

  <Radio
    label="Pizza"
    value="pizza"
    name="myRadioGroup"
    onChange={evt => console.log(evt.currentTarget.value)}
  />

  <Radio
    label="Icecream"
    value="icecream"
    name="myRadioGroup"
    onChange={evt => console.log(evt.currentTarget.value)}
  />
</>
```

## Radio
A Radio button component.

### Props

| Name | Type | Description |
|------|------|-------------|
| `checked` | `undefined \| false \| true` | Toggle the control on and off. |
| `disabled` | `undefined \| false \| true` | Disables the control. |
| `foundationRef` | `React.Ref<MDCRadioFoundation>` | Advanced: A reference to the MDCFoundation. |
| `id` | `undefined \| string` | A DOM ID for the toggle. |
| `inputRef` | `React.Ref<HTMLInputElement>` | A reference to the native input. |
| `label` | `React.ReactNode` | A label for the control. |
| `ripple` | `RipplePropT` | Adds a ripple effect to the component |
| `rootProps` | `React.HTMLProps<any>` | By default, all props except className and style spread to the input. These are additional props for the root of the checkbox. |
| `value` | `string \| number \| string[]` | The value of the control. |


