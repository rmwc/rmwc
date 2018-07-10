# Select Menus

> Menus display a list of choices on a transient sheet of material.

import from **rmwc/Select**  
[https://material.io/components/web/catalog/input-controls/select-menus/](https://material.io/components/web/catalog/input-controls/select-menus/)

## Select Styles
Selects come in three different styles: standard, box, and outlined.

```jsx render
<Select
  label="Standard"
  placeholder=""
  options={['Cookies', 'Pizza', 'Icecream']}
/>

<Select
  label="Boxed"
  box
  placeholder=""
  options={['Cookies', 'Pizza', 'Icecream']}
/>

<Select
  label="Outlined"
  outlined
  placeholder=""
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

## Data Driven Selects

To fit common use cases, RMWC Select provides a data driven method for rendering select menus. There are multiple formats you can pass data in, use the one that best fits your requirements. To make your label not float by default and to have an unselected blank value, set the `placeholder` prop to a blank string.

```jsx render
import { Select } from 'rmwc/Select';

{/*
  A controlled select
  Using a formatted array of options
  [
    {label: string, value: string, ...props},
    {label: string, value: string, ...props}
  ]
*/}

<Select
  value={this.state.value}
  onChange={evt => this.setState({value: evt.target.value})}
  label="Array"
  placeholder=""
  options={[
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
      'tabIndex': -1
    },
    {
      label: 'Icecream',
      value: '3'
    }
  ]}
/>

{/*  
  An uncontrolled select
  A simple value => label map */
}
<Select
  label="Object map"
  options={{'1': 'Cookies', '2': 'Pizza', '3': 'Icecream'}}
/>

{/* a simple array of options with box styling, value will be the same as label */}
<Select
  label="Simple Array"
  placeholder="-- Select One --"
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```
## Manually building the list

If you want full control over the child `ListItems`, you can manually build the list yourself.

```jsx render
import { Select } from 'rmwc/Select';

<Select
  label="Manual"
  defaultValue=""
>
  <option value="" disabled></option>
  <option value="Cookies">
    Cookies
  </option>
  <option value="Pizza">
    Pizza
  </option>
  <option value="Icecream">
    Icecream
  </option>
</Select>
```

## Option Groups

You can build a select with optgroup.

```jsx render
import { Select } from 'rmwc/Select';

<Select
  label="Formatted"
  options={[
    {
      label: 'Dinner',
      options: [
        {
          label: 'Pizza',
          value: '2',
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

<Select
  label="Manually Built"
>
  <optgroup label="Dinner">
    <option value="Pizza">
      Pizza
    </option>
  </optgroup>
  <optgroup label="Dessert">
    <option value="Cookies">
      Cookies
    </option>
    <option value="Icecream">
      Icecream
    </option>
  </optgroup>
</Select>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/utils/DocumentComponent';

<DocumentComponent displayName="Select" />
```
