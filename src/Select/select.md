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
      'tab-index': -1
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

{/* a simple array of options, value will be the same as label */}
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

## CSS only Selects

For certain platforms or usecases, a pure CSS select may be preferrable. Use the `cssOnly` prop to create one.

```jsx render
{/*
  cssOnly Selects
  MDC doesnt have a label prop for css only selects, but RMWC has a placeholder prop you can use.
*/}
<Select
  cssOnly
  placeholder="-- cssOnly --"
  options={['Cookies', 'Pizza', 'Icecream']}
/>

{/*
  cssOnly Selects with option groups
  MDC only supports option groups on css only selects.
*/}
<Select
  cssOnly
  placeholder="-- cssOnly w/ optGroups --"
  options={[
    {
      label: 'Foods',
      /* Options can be any value Select input: simply arrays, value => label objects, or formatted arrays. */
      options: ['Cookies', 'Pizza', 'Icecream']
    },
    {
      label: 'Animals',
      options: ['Dogs', 'Cats', 'Birds']
    }
  ]}
/>

{/*
  cssOnly Multi-select
  MDC only supports multiple on css only selects.
  Does not support labels or placeholders
*/}
<Select
  cssOnly
  multiple
  size="8"
  value={this.state.multi || []}
  onChange={evt =>  this.setState({
    multi: [...evt.target.selectedOptions].map(o => o.value)
  })}
  options={[
    {
      label: 'Foods',
      /* Options can be any value Select input: simply arrays, value => label objects, or formatted arrays. */
      options: ['Cookies', 'Pizza', 'Icecream']
    },
    {
      label: 'Animals',
      options: ['Dogs', 'Cats', 'Birds']
    }
  ]}
/>
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="Select" />
```
