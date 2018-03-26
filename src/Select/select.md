# Select Menus

> Menus display a list of choices on a transient sheet of material.

import from **rmwc/Select**  
[https://material.io/components/web/catalog/input-controls/select-menus/](https://material.io/components/web/catalog/input-controls/select-menus/)

## Data Driven Selects

To fit common use cases, RMWC Select provides a data driven method for rendering select menus. There are multiple formats you can pass data in, use the one that best fits your requirements.

```jsx render
import { Select } from 'rmwc/Select';

{/*
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

{/*  A simple value => label map */}
<Select
  label="Object map"
  options={{'1': 'Cookies', '2': 'Pizza', '3': 'Icecream'}}
/>

{/* a simple array of options with box styling, value will be the same as label */}
<Select
  box
  label="Simple Array"
  placeholder="-- Select One --"
  options={['Cookies', 'Pizza', 'Icecream']}
/>
```

## Manually building the list

If you want full control over the child `ListItems`, you can manually build the list yourself.

```jsx render
import { Select } from 'rmwc/Select';
import { ListItem } from 'rmwc/List';

<Select
  label="Manually Built"
  value={'Pizza'}
>
  <ListItem role="option" id="Cookies" tabIndex="0">
    Cookies
  </ListItem>
  <ListItem role="option" id="Pizza" tabIndex="0">
    Pizza
  </ListItem>
  <ListItem role="option" id="Icecream" tabIndex="0">
    Icecream
  </ListItem>
</Select>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Select" />
```
