# Usage

> This document contains basic information on usage on styling.

## Basic Example

Components should be imported from their relevant module.

```jsx
import { Button } from 'rmwc/Button';

const MyComponent = props => <Button>Hello World</Button>;
```

## API Wide props

All components in RMWC are generated from a common factory method. This gives them some extra utility and flexibility when being used. The following props are available on (almost) every component.

### `dir="rtl"`

material-components-web implements right-to-left support for eastern languages. You can pass this prop to any component, please read [material-components-web rtl docs](https://material.io/components/web/catalog/rtl/) for more information.

```jsx
import { Drawer, DrawerContent } from 'rmwc/Drawer';

<Drawer dir="rtl">
  <DrawerContent />
</Drawer>;
```

### `tag`

You can use the `tag` prop to specify the DOM element you would like to render.

```jsx
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';

// renders an h1
const Example1 = props => (
  <Typography tag="h1" use="headline4">
    Hello World
  </Typography>
);

// renders an anchor
const Example2 = props => (
  <Button tag="a" href="https://google.com">
    Hello World
  </Button>
);
```

### `theme`

The theming functionality from material-components-web is baked into every component. It works identically to the [`Theme` component's `use` prop](theme).

```jsx
import { Button } from 'rmwc/Button';

<Button raised theme="secondary-bg on-secondary">
  With Theme
</Button>;
```

### `elementRef`

React refs are great for accessing DOM nodes. Unfortunately, they can't be passed down via props. `elementRef` is just a way to get a DOM node reference for the component and after it gets passed down the props change, becomes a standard React ref.

```jsx
import { TextField } from 'rmwc/TextField';

// renders an h1

class Example1 extends React.Component {
  render() {
    return <TextField elementRef={el => this.textField = el}>
  }
}
```

### `apiRef`

material-components-web has javascript constructors for a majority of their components. RMWC exposes this functionality on components that have them. You generally shouldn't have to use this, but it's available if you need it.

```jsx
import { TextField } from 'rmwc/TextField';

// renders an h1

class Example1 extends React.Component {
  render() {
    return <TextField apiRef={api => this.textFieldApi = api}>
  }
}
```

### `wrap`

Most of material-components-web are just classNames used for styling, but React is component based making it hard to combine classNames from two different components. The `wrap` prop allows you to "collapse" one component onto another while maintaining the props and functionality of both. It's not used that often, but consider the following example which will simply apply the elevation class to the button instead of creating an additional node.

```jsx
import { Button } from 'rmwc/Button';
import { Elevation } from 'rmwc/Elevation';

/**
 * No Wrapping
 * Renders:
 *   <div class="mdc-elevation mdc-elevation--z3">
 *     <button class="mdc-button">Hello World</button>
 *   </div>
 */
const Example1 = props => (
  <Elevation z="3">
    <Button>Hello World</Button>
  </Elevation>
);

/**
 * With Wrapping
 * Renders:
 *   <button className="mdc-elevation mdc-elevation--z3 mdc-button">Hello World</button>
 */
const Example2 = props => (
  <Elevation wrap>
    <Button>Hello World</Button>
  </Elevation>
);
```
