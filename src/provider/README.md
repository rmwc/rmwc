# RMWC Provider

> This is an optional component that provides global configuration for RMWC.

- Module **@rmwc/provider**

You can wrap your top level App component with RMWC provider to set global configuration options. Just pass the options in as props.

```jsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App'; // your main app component
import { RMWCProvider } from '@rmwc/provider';

// This example disables ripples globally by default
ReactDOM.render(
  <RMWCProvider ripple={false}>
    <App />
  </RMWCProvider>,
  document.getElementById('root'),
);
```

```jsx renderOnly
import { DocProps } from '../doc-utils';
import { default as docs}  from './generated-props.json';

<DocProps src={docs} components={['RMWCProvider']} />
```
