# Usage

## Basic Example

Components should be imported from their relevant module.

```jsx
import { Button } from 'rmwc/Button';

const MyComponent = props => <Button>Hello World</Button>;
```

## API Wide props

All components in RMWC are generated from a common factory method. This gives them some extra utility and flexibility when being used. The following props are available on (almost) every component.

### `tag`

You can use the `tag` prop to specify the DOM element you would like to render.

```jsx
import { Typography } from 'rmwc/Typography';
import { Button } from 'rmwc/Button';

// renders an h1
const Example1 = props => (
  <Typography tag="h1" use="display1">
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

<Button raised theme="secondary-bg text-primary-on-secondary">
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

## Styling and Theming

RMWC doesn't include any styles of its own, but there are multiple ways you can style and customize your components.

### Just use regular CSS.

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

### Using CSSModules

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

### Theming with runtime CSS variables.

You can easily theme the library at runtime using CSS variables. Inspect the `<html>` node in your web inspector and you should a list of variables you can modify on the `:root` selector.

```css
/** in your CSS */
--mdc-theme-primary: pink;
```

### SASS customization

Additional customization can be done through your own SASS build. This is a feature of the `material-components-web`, not RMWC. If you want your own custom SASS build, please view the `material-components-web` [documentation on theming.](https://material.io/components/web/docs/theming/)
