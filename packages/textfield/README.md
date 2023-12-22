# Text Fields

Text fields allow users to input, edit, and select text.

- Module **@rmwc/textfield**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/textfield/styles';
  - Or include stylesheets
    - **'@material/textfield/dist/mdc.textfield.css'**
    - **'@material/floating-label/dist/mdc.floating-label.css'**
    - **'@material/notched-outline/dist/mdc.notched-outline.css'**
    - **'@material/line-ripple/dist/mdc.line-ripple.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
    - **'@rmwc/icon/icon.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/text-field/](https://material.io/develop/web/components/input-controls/text-field/)

## TextField Variants

```jsx
<TextField label="standard..." />
```

```jsx
<TextField outlined label="outlined..." />
```

```jsx
<TextField placeholder="No label" />
```

```jsx
<>
  {/* Leading and trailing icons can be used.*/}
  <TextField icon="search" trailingIcon="close" label="icon..." />
  {/* If you need full control over the icon, you can pass the icon as options with your own props. Dont forget the TabIndex to make it clickable*/}
  <TextField
    label="trailingIcon..."
    trailingIcon={{
      icon: 'close',
      tabIndex: 0,
      onClick: () => console.log('Clear')
    }}
  />
</>
```

```jsx
<TextField fullwidth label="fullwidth..." />
```

## Textareas

You can make the TextField a textarea. Make sure to include `outlined` for proper styling You can optionally make help text always visible by passing an object as props with persistent set to true. Textareas can also have an optional character counter which will work with the maxLength property.

```jsx
<div>
  <TextField
    textarea
    label="textarea..."
    rows={8}
    maxLength={20}
    characterCount
    resizeable
    helpText={{
      persistent: true,
      validationMsg: true,
      children: 'The field is required'
    }}
  />
</div>
```

## Validation

```jsx
<TextField disabled label="Disabled..." />
```

```jsx
<TextField required label="Required..." value="" />
```

```jsx
<TextField invalid label="Invalid..." value="#@!$" onChange={() => {}} />
```

```jsx
<TextField label="Validate Pattern" pattern="[A-Za-z]{3}" />
```

## HTML Input Types

A preview of how `material-components-web` handles styling input types for your browser.

```jsx
<>
  <TextField label="text" type="text" />
  <TextField label="color" type="color" style={{ width: '6rem' }} />
  <TextField label="date" type="date" />
  <TextField label="datetime-local" type="datetime-local" />
  <TextField label="month" type="month" />
  <TextField label="range" type="range" />
  <TextField label="time" type="time" />
  <TextField label="week" type="week" />
</>
```

## TextField

A TextField component for accepting text input from a user.

### Props

| Name             | Type                                                       | Description                                                                                                               |
| ---------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `align`          | `"start" \| "end"`                                         | How to align the text inside the TextField. Defaults to 'start'.                                                          |
| `characterCount` | `boolean`                                                  | Shows the character count, must be used in conjunction with maxLength.                                                    |
| `disabled`       | `boolean`                                                  | Makes the Textfield disabled.                                                                                             |
| `floatLabel`     | `boolean`                                                  | The label floats automatically based on value, but you can use this prop for manual control.                              |
| `foundationRef`  | `Ref<null \| MDCTextFieldFoundation<>>`                    | Advanced: A reference to the MDCFoundation.                                                                               |
| `fullwidth`      | `boolean`                                                  | Makes the TextField fullwidth.                                                                                            |
| `helpText`       | `ReactNode \| TextFieldHelperTextProps`                    | Adds help text to the field                                                                                               |
| `icon`           | `IconPropT`                                                | Add a leading icon.                                                                                                       |
| `inputRef`       | `Ref<null \| HTMLInputElement<> \| HTMLTextAreaElement<>>` | A reference to the native input or textarea.                                                                              |
| `invalid`        | `boolean`                                                  | Makes the TextField visually invalid. This is sometimes automatically applied in cases where required or pattern is used. |
| `label`          | `ReactNode`                                                | A label for the input.                                                                                                    |
| `outlined`       | `boolean`                                                  | Outline the TextField.                                                                                                    |
| `prefix`         | `string`                                                   | Add prefix.                                                                                                               |
| `required`       | `boolean`                                                  | Makes the Textfield required.                                                                                             |
| `resizeable`     | `boolean`                                                  | Make textarea resizeable                                                                                                  |
| `ripple`         | `RipplePropT`                                              | Adds a ripple effect to the component                                                                                     |
| `rootProps`      | `Object`                                                   | By default, props spread to the input. These props are for the component's root container.                                |
| `suffix`         | `string`                                                   | Add suffix.                                                                                                               |
| `textarea`       | `boolean`                                                  | Makes a multiline TextField.                                                                                              |
| `trailingIcon`   | `IconPropT`                                                | Add a trailing icon.                                                                                                      |
| `type`           | `string`                                                   | The type of input field to render, search, number, etc                                                                    |
| `value`          | `string \| number`                                         | Sets the value for controlled TextFields.                                                                                 |
