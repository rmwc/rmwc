# Select Menus

> Menus display a list of choices on a transient sheet of material.

- Module **@rmwc/select**
- Import styles:
  - Using CSS Loader
    - import **'@rmwc/select/styles';**
  - Or include stylesheets
    - **'@rmwc/select/select.css'**;
    - **'@material/select/dist/mdc.select.css'**;
    - **'@material/floating-label/dist/mdc.floating-label.css'**;
    - **'@material/notched-outline/dist/mdc.notched-outline.css'**;
    - **'@material/line-ripple/dist/mdc.line-ripple.css'**;
    - **'@material/list/dist/mdc.list.css'**;
    - **'@material/menu/dist/mdc.menu.css'**;
    - **'@material/menu-surface/dist/mdc.menu-surface.css'**;
    - **'@material/ripple/dist/mdc.ripple.css'**;
- MDC Docs: [https://material.io/develop/web/components/input-controls/select-menus/](https://material.io/develop/web/components/input-controls/select-menus/)

## Select Styles

Selects come in three different styles: standard,outlined, and enhanced.

Standard

```js

<Select label\="Standard" options\={\['Cookies', 'Pizza', 'Icecream'\]} />


```

Outlined

```js

<Select

  label\="Outlined"

  outlined

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

Enhanced

```js

<Select

  label\="Enhanced"

  enhanced

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

Enhanced renderToPortal

```js

<Select

  label\="Enhanced"

  enhanced\={{ renderToPortal: true, anchorCorner: 'topLeft' }}

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

With Options

```js

<Select

  label\="With Icon"

  defaultValue\="Pizza"

  helpText\="Choose your favorite snack..."

  icon\="favorite"

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

## Validation

Required

```js

<Select

  label\="Required"

  required

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

Invalid

```js

<Select

  label\="Invalid"

  invalid

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

Disabled

```js

<Select

  label\="Disabled"

  disabled

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

## Controlled / Uncontrolled

The Select component has the same behaviors as a native HTML select and be both controlled and uncontrolled.

Controlled

```js

function () {

  const \[value, setValue\] \= React.useState('Cookies');

  return (

    <Select

      label\="Controlled"

      options\={\['Cookies', 'Pizza', 'Icecream'\]}

      value\={value}

      onChange\={(evt) \=> setValue(evt.currentTarget.value)}

    />

  );

}


```

Uncontrolled

```js

<Select

  label\="Uncontrolled"

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

  defaultValue\="Cookies"

  onChange\={(evt) \=> console.log(evt.currentTarget.value)}

/>


```

## Data Driven Selects

To fit common use cases, RMWC Select provides a data driven method for rendering select menus. There are multiple formats you can pass data in, use the one that best fits your requirements. To make your label not float by default and to have an unselected blank value, set the `placeholder` prop to a blank string.

Formatted Options

```js

function Example() {

  // A controlled select Using a formatted array of options

  const options \= \[

    {

      label: 'Cookies',

      value: '1'

    },

    {

      label: 'Pizza',

      value: '2',

      /\*\* Any additional items will be passed to the

         child ListItem as props \*/

      'aria-disabled': true,

      tabIndex: \-1

    },

    {

      label: 'Icecream',

      value: '3'

    }

  \];

  return <Select label\="Array" options\={options} />;

}


```

Value => Label Map

```js

<Select

  label\="Object map"

  options\={{ '1': 'Cookies', '2': 'Pizza', '3': 'Icecream' }}

/>


```

Array

```js

<Select

  label\="Simple Array"

  placeholder\="\-- Select One --"

  options\={\['Cookies', 'Pizza', 'Icecream'\]}

/>


```

## Manually Building the List

If you want full control over the child `ListItems`, you can manually build the list yourself.

Manually Built

```js

<Select label\="Manual" defaultValue\="Cookies"\>

  <option value\="Cookies"\>Cookies</option\>

  <option value\="Pizza"\>Pizza</option\>

  <option value\="Icecream"\>Icecream</option\>

</Select\>


```

## Option Groups

Both native and enhanced Selects can contain option groups. Just nest additional options arrays in your data.

Option Groups: Formatted

```js

<Select

  label\="Formatted"

  enhanced

  options\={\[

    {

      label: 'Dinner',

      options: \[

        {

          label: 'Pizza',

          value: '2'

        }

      \]

    },

    {

      label: 'Dessert',

      options: \[

        {

          label: 'Cookies',

          value: '1'

        },

        {

          label: 'Icecream',

          value: '3'

        }

      \]

    }

  \]}

/>


```

Options Groups: Manually Built

```js

<Select label\="Manually Built"\>

  <optgroup label\="Dinner"\>

    <option value\="Pizza"\>Pizza</option\>

  </optgroup\>

  <optgroup label\="Dessert"\>

    <option value\="Cookies"\>Cookies</option\>

    <option value\="Icecream"\>Icecream</option\>

  </optgroup\>

</Select\>


```

## Select
