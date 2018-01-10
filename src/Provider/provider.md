# RMWC Provider

> This is an optional component that provides global configuration for RMWC.

You can wrap your top level App component with RMWC provider to set global configuration options. Just pass the options in as props.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // your main app component
import { RMWCProvider } from 'rmwc/Provider';

// This example disables the button ripple effect by default
ReactDOM.render(
  <RMWCProvider buttonDefaultRipple={false}>
    <App />
  </RMWCProvider>,
  document.getElementById('root'),
);
```

```jsx renderOnly
import { DocumentComponent } from 'rmwc/Base/DocumentComponent';

<DocumentComponent displayName="RMWCProvider" />
```
