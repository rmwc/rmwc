# Styling and Theming

> RMWC doesn't include any styles of its own, but there are multiple ways you can style and customize your components.

* [Standard CSS](#css)
* [CSS Modules](#css-modules)
* [Styled Components](#styled-components)
* [Runtime Color Theming](#runtime-color-theming)
* [Dark Mode Support](#dark-mode)
* [SASS Customization](#sass-customization)

```jsx renderOnly
<div id="css" />
```

## Using Standard CSS

All of the components have the `material-components-web` classNames on them and you can add your own.

```jsx
/** in your JSX */
import { Button } from 'rmwc/Button';

const MyComponent = props => (
  <Button className="my-custom-classname">Hello World</Button>
);
```

```css
/** in your CSS */
.my-custom-className {
  color: red;
}

.mdc-button {
  font-weight: bold;
}
```

```jsx renderOnly
<div id="css-modules" />
```

## Using CSS Modules

Just add your className. If you need to target a node that is not directly exposed by RMWC, you can use the global modifier in your CSS. In this example, you can target the inner wrapper of a DrawerHeader.

```jsx
/** in your JSX */
import { DrawerHeader } from 'rmwc/Drawer';
import styles from './my-style-sheet.css';

const MyComponent = props => (
  <DrawerHeader className={styles.myDrawerHeader}>Hello World</DrawerHeader>
);
```

```css
/** in your CSS */
.myDrawerHeader :global(.mdc-drawer__header-content) {
  color: red;
}
```

```jsx renderOnly
<div id="styled-components" />
```

## Using the Styled Components library

### Basic Styling

Using RMWC with `styled-components` is a breeze. For most use cases the following code works well.

```jsx
import styled from 'styled-components';
import { Button } from 'rmwc/Button';

const StyledButton = styled(Button)`
  // Your Styles Here.
`;
```

### Props Based Styling

You will eventually want some condition styles based on props passed into the component.

```jsx
import styled, { css } from 'styled-components';
import { Button } from 'rmwc/Button';

const StyledButton = styled(({ isFullWidth, ...otherProps }) => (
  <Button {...otherProps} />
))`
  ${props =>
    props.isFullWidth
      ? css`
          // Styles for full width here
        `
      : css`
          // Styles for non full width here.
        `};
`;
```

### Make sure to consume props

```jsx
styled(({ isFullWidth, ...otherProps }) => <Button {...otherProps} />);
```

If you pass an invalid prop to a dom node, in this case `isFullWidth`, React will complain. Here we are stripping this prop out using object deconstruction, and then passing the remaining valid props to `Button`. However this doesn't strip the prop from being used in the styling.

### Adjusting RMWC props and styling.

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

### Advanced Component Styling.

Lets say you want an icon in `Select` just like you can have it on `TextField`.

```jsx
import styled, { css } from 'styled-components';
import { TextFieldIcon } from 'rmwc/TextField';
import { Select } from 'rmwc/Select';

const BaseSelect = styled(({ label, ...otherProps }) => (
  <Select label={label} />
))`
  // ...
`;

const SelectIconRow = styled(({ children, filter, ...otherProps }) => (
  <div {...otherProps}>{children}</div>
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
  )
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
        value: 'solid'
      },
      {
        label: 'Liquid',
        value: 'liquid'
      },
      {
        label: 'Unit',
        value: 'unit'
      }
    ]}
    value={unit_type}
  />
</inputs.SelectIcon>
```

## Theming with runtime CSS variables.

You can easily theme the library at runtime using CSS variables. Inspect the `<html>` node in your web inspector and you should see a list of variables you can modify on the `:root` selector.

```css
/** in your main global CSS or style tag */
/** Use your browser's css inspector and inspect the HTML element to see other variables to override. */
:root {
  --mdc-theme-primary: pink;
  --mdc-theme-secondary: blue;
}
```

```jsx renderOnly
<div id="dark-mode" />
```

## Dark Mode

Earlier versions of `material-components-web` shipped with a built in Dark Mode but it has since be removed. Please refer to the `material-components-web` [documentation on theming.](https://material.io/components/web/docs/theming/)

```jsx renderOnly
<div id="sass-customization" />
```

## SASS customization

Additional customization can be done through your own SASS build. This is a feature of the `material-components-web`, not RMWC. If you want your own custom SASS build, please view the `material-components-web` [documentation on theming.](https://material.io/components/web/docs/theming/)
