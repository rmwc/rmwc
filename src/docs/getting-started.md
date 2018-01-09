# Getting Started Guide

> Welcome to RMWC, a thin React wrapper for Material Design (Web) Components.

## Installation

* `npm i rmwc --save` or `yarn add rmwc`
* [material-components-web](https://github.com/material-components/material-components-web) should be installed automatically as a peer dependency. Include `node_modules/material-components-web/dist/material-components-web.min.css` in your project via your method of choice (using a link tag, a css-loader, etc.).
* If you would like to use the default Roboto font:
  * add `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />`\
  * add the class `mdc-typography` to the body `<body className="mdc-typography">...</body>`
* import and use components from their associated modules.

```jsx
import { Button } from 'rmwc/Button';

const MyComponent = props => <Button>Hello World</Button>;
```

## Bundle size considerations

RMWC is small, about 15KB gzipped, but the entire [material-components-web](https://github.com/material-components/material-components-web) package is quite large. If you care about your end use bundle size, pay attention to this!

```jsx
/** GOOD example, only the `Button` component will be imported */
import { Button } from 'rmwc/Button';
```

```jsx
/**
 * BAD example, the `Button` component will be imported, as well as all of RMWC.
 * This exists for convenience and for projects that are using the majority of material components.
 */
import { Button } from 'rmwc';
```

The same is true for importing styles into your project. RMWC doesn't ship with any of its own styles, you are required to import them from the [material-components-web](https://github.com/material-components/material-components-web) package. The pre-minified version of this file is around 240kb. If you only want to import styles for individual components, you can find the css files in `node_modules/@material/COMPONENT_NAME/dist/mdc.COMPONENT_NAME.min.css`.

```jsx
/** Imports styles for ALL components */
import 'material-components-web/dist/material-components-web.min.css';
```

```jsx
/**
 * Only imports styles for the Button component.
 */
import '@material/button/dist/mdc.button.min.css';
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

## Something missing from RMWC?

RMWC wraps the entire [material-components-web](https://github.com/material-components/material-components-web) package in React, but because they are different projects with different maintainers, sometimes things can be missed. A lot of components from [material-components-web](https://github.com/material-components/material-components-web) don't require javascript. For these, you can simply use the classNames in your own project. Of course, RMWC wants to cover the entire codebase, so if you see something missing or incorrect, please [file an issue](https://github.com/jamesmfriedman/rmwc/issues/new).

```jsx
/** This will give you a CSS only button and skip RMWC all together */
<button className="mdc-button" />
```

## Known Issues

* Issue: postcss-cssnext messes up CSS variables. This can cause broken styles and extreme slowdowns when using web developer tools like the Chrome inspector
  * Solution: set customProperties to false. This may require ejecting or other workarounds if you are using Create React App. [See issue #65](https://github.com/jamesmfriedman/rmwc/issues/65).

```javascript
postcss([
  cssnext({
    features: {
      customProperties: {
        preserve: true,
      },
    },
  }),
]);
```
