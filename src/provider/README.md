# Provider

> A component that provides global configuration for RMWC.

- Module **@rmwc/provider**


You can wrap your top level App component with RMWC provider to set global configuration options. Just pass the options in as props.

```jsx

  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  import App from './App'; // your main app component
  import { RMWCProvider } from '@rmwc/provider';

  // This example disables ripples globally by default
  ReactDOM.render(
    <RMWCProvider
      // Globally disable ripples
      ripple={false}
      // Global options for icons
      // Takes the same options as the icon component
      icon={{
        basename: 'material-icons'
      }}
    >
      <App />
    </RMWCProvider>,
    document.getElementById('root'),
  );

```

## 


