# Styled Components

## Basic Styling

Using RMWC with `styled-components` is a breeze. For most use cases the following code works well.

```jsx
import styled from 'styled-components';

import { Button } from 'rmwc/Button';

const StyledButton = styled(Button)`
  // Your Styles Here.
`;
```


## Props Based Styling

You will eventually want some condition styles based on props passed into the component.


```jsx
import styled, { css } from 'styled-components';

import { Button } from 'rmwc/Button';

const StyledButton = styled(({isFullWidth, ...otherProps}) => <Button {...otherProps} />)`
  ${props => props.isFullWidth
    ?
      css`
        // Styles for full width here
      `
    :
      css`
        // Styles for non full width here.
      `}
`;
```

Take note of the following code:

```jsx
styled(({isFullWidth, ...otherProps}) => <Button {...otherProps} />)
```

If you pass an invalid prop to a dom node, in this case `isFillWidth`, React will complain. Here we are stripping this prop out using object deconstruction, and then passing the remaining valid props to `Button`. However this doesn't strip the prop from being used in the styling.


## Adjusting RMWC props and styling.

You can take this to the next level with `Select` with the following code.

```jsx
import styled from 'styled-components';

import { Select } from 'rmwc/Select';

const StyledSelect = styled(({ label, ...otherProps }) => (
  <Select
    cssOnly={window.matchMedia('(max-width: 767px)').matches}
    label={window.matchMedia('(min-width: 768px)').matches ? label : ''}
    placeholder={window.matchMedia('(max-width: 767px)').matches ? label : ''}
    {...otherProps}
  />
))`
  // Your Styles Here.
`;
```

Here we are toggling the use of `cssOnly`, `label`, and `placeholder` with a js media query.


## Advanced Component Styling.

Lets say you want an icon in `Select` just like you can have it on `TextField`.

```jsx
import styled, { css } from 'styled-components';

import { TextFieldIcon } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';


const BaseSelect = styled(({ label, ...otherProps }) => (
  <Select
    cssOnly={window.matchMedia('(max-width: 767px)').matches}
    {...otherProps}
    placeholder={window.matchMedia('(max-width: 767px)').matches ? label : ''}
    label={window.matchMedia('(min-width: 768px)').matches ? label : ''}
  />
))`
  // ...
`;

const SelectIconRow = styled(({ children, filter, ...otherProps }) => (
  <div {...otherProps}>
    {window.matchMedia('(max-width: 767px)').matches &&
    children[0].props.value ? (
      <span className="mdc-select__label mdc-select__label--float-above">
        {children[0].props.label}
      </span>
    ) : null}
    {children}
  </div>
))`
  // ...
`;

export default {
  Select: BaseSelect,
  SelectIconRow,

  SelectIcon: props => (
    <SelectIconRow filter={props.filter} value={props.value}>
      {props.children}

       <TextFieldIcon use={props.icon} />
    </SelectIconRow>
  ),
};
```

You can then import this and use it like so:

```jsx
<inputs.SelectIcon value={unit_type} icon="label">
  <inputs.Select
    label="Type"
    name="unit_type"
    onChange={event => this.onChange(event, 'unit_type')}
    options={[
      {
        label: 'Solid',
        value: 'solid',
      },
      {
        label: 'Liquid',
        value: 'liquid',
      },
      {
        label: 'Unit',
        value: 'unit',
      },
    ]}
    value={unit_type}
  />
</inputs.SelectIcon>
```
