# RMWC Provider

> This is an optional component that provides global configuration for RMWC.

- import * from **'@rmwc/provider'**;

You can wrap your top level App component with RMWC provider to set global configuration options. Just pass the options in as props.

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'; // your main app component
import { RMWCProvider } from '@rmwc/provider';

// This example disables the button ripple effect by default
ReactDOM.render(
  <RMWCProvider buttonDefaultRipple={false}>
    <App />
  </RMWCProvider>,
  document.getElementById('root'),
);
```

```jsx renderOnly
import { DocumentComponent } from '@rmwc/base/utils/DocumentComponent';
import * as docs from './docgen.json';

<DocumentComponent docs={docs} displayName="RMWCProvider" />
```
