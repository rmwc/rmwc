# Select Menus

Menus display a list of choices on a transient sheet of material.

- Module **@rmwc/select**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/select/styles';
  - Or include stylesheets
    - **'@rmwc/select/select.css'**
    - **'@material/select/dist/mdc.select.css'**
    - **'@material/floating-label/dist/mdc.floating-label.css'**
    - **'@material/notched-outline/dist/mdc.notched-outline.css'**
    - **'@material/line-ripple/dist/mdc.line-ripple.css'**
    - **'@material/list/dist/mdc.list.css'**
    - **'@material/menu/dist/mdc.menu.css'**
    - **'@material/menu-surface/dist/mdc.menu-surface.css'**
    - **'@material/ripple/dist/mdc.ripple.css'**
- MDC Docs: [https://material.io/develop/web/components/input-controls/select-menus/](https://material.io/develop/web/components/input-controls/select-menus/)

## Select Styles

Selects come in three different styles: standard,outlined, and enhanced.

```jsx
<Select label="Standard" options={['Cookies', 'Pizza', 'Icecream']} />
```

```jsx
<Select
  label="Outlined"
  outlined
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

```jsx
<Select
  label="Enhanced"
  enhanced
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

```jsx
<Select
  label="With Icon"
  defaultValue="Pizza"
  helpText="Choose your favorite snack..."
  icon="favorite"
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

## Validation

```jsx
<Select
  label="Required"
  required
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

```jsx
<Select
  label="Invalid"
  invalid
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

```jsx
<Select
  label="Disabled"
  disabled
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

## Controlled / Uncontrolled

The Select component has the same behaviors as a native HTML select and be both controlled and uncontrolled.

```jsx
function () {
  const [value, setValue] = React.useState('Cookies');
  return (
    <Select
      label="Controlled"
      options={['Cookies', 'Pizza', 'Icecream']}
      value={value}
      onChange={(evt) => setValue(evt.currentTarget.value)}
    />
  );
}
```

```jsx
<Select
  label="Uncontrolled"
  options={['Cookies', 'Pizza', 'Icecream']}
  defaultValue="Cookies"
  onChange={(evt) => console.log(evt.currentTarget.value)}
/>
```

## Data Driven Selects

To fit common use cases, RMWC Select provides a data driven method for rendering select menus. There are multiple formats you can pass data in, use the one that best fits your requirements. To make your label not float by default and to have an unselected blank value, set the `placeholder` prop to a blank string.

```jsx
function Example() {
  // A controlled select Using a formatted array of options
  const options = [
    {
      label: 'Cookies',
      value: '1'
    },
    {
      label: 'Pizza',
      value: '2',
      /** Any additional items will be passed to the
         child ListItem as props */
      'aria-disabled': true,
      tabIndex: -1
    },
    {
      label: 'Icecream',
      value: '3'
    }
  ];

  return <Select label="Array" options={options} />;
}
```

```jsx
<Select
  label="Object map"
  options={{ '1': 'Cookies', '2': 'Pizza', '3': 'Icecream' }}
/>
```

```jsx
<Select
  label="Simple Array"
  placeholder="-- Select One --"
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

## Manually Building the List

If you want full control over the child `ListItems`, you can manually build the list yourself.

```jsx
<Select label="Manual" defaultValue="Cookies">
  <option value="Cookies">Cookies</option>
  <option value="Pizza">Pizza</option>
  <option value="Icecream">Icecream</option>
</Select>
```

## Option Groups

Both native and enhanced Selects can contain option groups. Just nest additional options arrays in your data.

```jsx
<Select
  label="Formatted"
  enhanced
  options={[
    {
      label: 'Dinner',
      options: [
        {
          label: 'Pizza',
          value: '2'
        }
      ]
    },
    {
      label: 'Dessert',
      options: [
        {
          label: 'Cookies',
          value: '1'
        },

        {
          label: 'Icecream',
          value: '3'
        }
      ]
    }
  ]}
/>
```

```jsx
<Select label="Manually Built">
  <optgroup label="Dinner">
    <option value="Pizza">Pizza</option>
  </optgroup>
  <optgroup label="Dessert">
    <option value="Cookies">Cookies</option>
    <option value="Icecream">Icecream</option>
  </optgroup>
</Select>
```

## Select
A Select Component

### Props

| Name | Type | Description |
|------|------|-------------|
| `disabled` | `undefined \| false \| true` | Makes the Select disabled. |
| `enhanced` | `boolean \| MenuProps` | Renders a non native / enhanced dropdown |
| `foundationRef` | `React.Ref<MDCSelectFoundation>` | Advanced: A reference to the MDCFoundation. |
| `helpText` | `React.ReactNode \| SelectHelperTextProps` | Adds help text to the field |
| `icon` | `RMWC.IconPropT` | Add a leading icon. |
| `inputRef` | `undefined \| (ref: HTMLSelectElement \| null) => void` | A reference to the native select element. Not applicable when `enhanced` is true. |
| `invalid` | `undefined \| false \| true` | Makes the Select visually invalid. This is sometimes automatically my material-components-web. |
| `label` | `undefined \| string` | A label for the form control. |
| `options` | `FormattedOption[] \| string[] \| { [value: string]: string }` | Options accepts flat arrays, value => label maps, and more. See examples for details. |
| `outlined` | `undefined \| false \| true` | Makes the select outlined. |
| `placeholder` | `undefined \| string` | Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label. |
| `required` | `undefined \| false \| true` | Makes the Select required. |
| `rootProps` | `Object` | Props for the root element. By default, additional props spread to the native select element. |
| `value` | `undefined \| string` | The value for a controlled select. |


