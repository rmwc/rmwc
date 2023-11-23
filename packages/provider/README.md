# Provider

> A component that provides global configuration for RMWC.

-   Module __@rmwc/provider__

You can wrap your top level App component with RMWC provider to set global configuration options. Just pass the options in as props.

```js

  import React from 'react';

  import \* as ReactDOM from 'react-dom';

  import App from './App'; // your main app component

  import { RMWCProvider } from '@rmwc/provider';

  // This example disables ripples globally by default

  ReactDOM.render(

    <RMWCProvider

      // Globally disable ripples

      ripple\={false}

      // Global options for icons

      // Takes the same options as the icon component

      icon\={{

        basename: 'material-icons'

      }}

      // Global options for typography

      // allows mapping of a defaultTag or specific classes

      // See the Typography docs for more info

      typography\={{

        defaultTag: 'div',

        headline1: 'h1'

      }}

      // Global options for tooltips

      // Takes most of the options for tooltips

      // See the Tooltip docs for more info

      tooltip\={{

        align: 'right'

      }}

    \>

      <App />

    </RMWCProvider\>,

    document.getElementById('root'),

  );

```

## RMWCProvider