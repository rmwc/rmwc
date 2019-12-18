# Select Menus

> Menus display a list of choices on a transient sheet of material.

- Module **@rmwc/select**
- Import styles:
  - import **'@material/select/dist/mdc.select.css'**
  - import **'@material/floating-label/dist/mdc.floating-label.css'**
  - import **'@material/notched-outline/dist/mdc.notched-outline.css'**
  - import **'@material/line-ripple/dist/mdc.line-ripple.css'**
  - import **'@material/list/dist/mdc.list.css'**
  - import **'@material/menu/dist/mdc.menu.css'**
  - import **'@material/menu-surface/dist/mdc.menu-surface.css'**
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

## 


