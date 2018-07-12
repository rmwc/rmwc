# Installation

> Welcome to RMWC, a React wrapper for Material Design (Web) Components.

Required steps

* `npm i rmwc --save` or `yarn add rmwc`
* [material-components-web](https://github.com/material-components/material-components-web) should be installed automatically as a peer dependency. 
* Include `node_modules/material-components-web/dist/material-components-web.min.css` in your project via your method of choice (using a link tag, a css-loader, etc.). 

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

All of RMWC is under 90K gzipped, but the entire [material-components-web](https://github.com/material-components/material-components-web) package is quite large. If you care about your end use bundle size, pay attention to this!

```jsx
/** GOOD example, only the `Button` component will be imported. This supports tree shaking. */
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

### Additional configuration when using CSS Modules

The material components CSS is intended to be a global CSS dependency which is the opposite of what CSS modules do. If you are using CSS modules, the simplest way to get the material CSS loaded is to have two separate CSS loaders in your webpack configuration, one for CSS modules, and another for global CSS. This is a well documented issue when using global CSS in CSS module projects and is not specific to RMWC.

Please note if you are using Create React App, you'll have to make these changes in both `webpack.config.dev.js` and `webpack.config.prod.js`.

```javascript
// An abbreviated example
const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // exclude material css from being loaded by CSS modules
        // These paths are specific to your system, so change accordingly
        exclude: [
          path.resolve('./node_modules/material-components-web'),
          path.resolve('./node_modules/@material')
        ],
        use: ['style-loader', 'css-loader?modules=true']
      },
      {
        test: /\.css$/,
        // only turn on standard global CSS loader for the material directories
        // These paths are the same as above and specific to your system, so change accordingly
        include: [
          path.resolve('./node_modules/material-components-web'),
          path.resolve('./node_modules/@material')
        ],
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

## Flow and Typescript Setup

There are no additional steps to get Flow to work with your code. If you run into issues, please make sure you are running the most recent version of flow-bin.

Typescript is currently in Beta and is being transpiled directly from the Flow types, so they'll always be up to date. If you encounter any issues, please report it on issue [https://github.com/jamesmfriedman/rmwc/issues/40](https://github.com/jamesmfriedman/rmwc/issues/40).

## Testing with RMWC

RMWC works the best with Jest and Enzyme. material-components-web requires a browser like environment to properly test and a testing library thats supports React Refs. At this time, react-test-renderer is **not** supported.

Jest uses JSDOM by default which is a browser-like environment. If you are using the full Enzyme mount api, you'll quickly run into errors from the material-components-web library saying things like "Cannot read property 'whatever' of undefined. The quick fix is to monkey patch the missing items onto the fake DOM elements in your setupTests file.

```javascript
// src/setupTests.js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import rmwcTestPolyfill from 'rmwc/Base/testPolyfill';
Enzyme.configure({ adapter: new Adapter() });

//import and run this to fix the the MDC errors
rmwcTestPolyfill();
```

## Known Issues

* Issue: postcss-cssnext messes up CSS variables. This can cause broken styles and extreme slowdowns when using web developer tools like the Chrome inspector. You'll know if you're having this issue because dev tools and the browser will slow to a crawl.
  * Solution: set customProperties to false. This may require ejecting or other workarounds if you are using Create React App. [See issue #65](https://github.com/jamesmfriedman/rmwc/issues/65).

```javascript
postcss([
  cssnext({
    features: {
      customProperties: {
        preserve: true
      }
    }
  })
]);
```
