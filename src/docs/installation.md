# Installation

> Welcome to RMWC, a React wrapper for Material Design (Web) Components.

Required steps

* `npm i rmwc --save` or `yarn add rmwc`
* [material-components-web](https://github.com/material-components/material-components-web) should be installed automatically as a peer dependency. Include `node_modules/material-components-web/dist/material-components-web.min.css` in your project via your method of choice (using a link tag, a css-loader, etc.).

Optional steps

* If you would like to use the default **Roboto font**:
  * add `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />`
  * add the class `mdc-typography` to the body `<body className="mdc-typography">...</body>`
* If you would like to use the **material-icons** font:
  * add `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
* Add global settings by using the optional `<RMWCProvider />` component at the root of your project. See the 'Provider' section for more info.

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

## Known Issues

* Issue: postcss-cssnext messes up CSS variables. This can cause broken styles and extreme slowdowns when using web developer tools like the Chrome inspector. You'll know if you're having this issue because dev tools and the browser will slow to a crawl.
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
