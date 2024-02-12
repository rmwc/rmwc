# Provider

A component that provides global configuration for RMWC.

- Module **@rmwc/provider**

You can wrap your top level App component with RMWC provider to set global configuration options. Just pass the options in as props.

```jsx
`
  import React from 'react';
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
      // Global options for typography
      // allows mapping of a defaultTag or specific classes
      // See the Typography docs for more info
      typography={{
        defaultTag: 'div',
        headline1: 'h1'
      }}
      // Global options for tooltips
      // Takes most of the options for tooltips
      // See the Tooltip docs for more info
      tooltip={{
        align: 'right'
      }}
    >
      <App />
    </RMWCProvider>,
    document.getElementById('root'),
  );
`;
```

```jsx
<RMWCProvider ripple={false}>
  <Button>Click me</Button>
</RMWCProvider>
```

```jsx
<RMWCProvider ripple={true}>
  <Button>Click me</Button>
</RMWCProvider>
```

## RMWCProvider

A provider for setting global options in RMWC.

### Props

| Name         | Type                         | Description                                   |
| ------------ | ---------------------------- | --------------------------------------------- |
| `children`   | `ReactNode`                  | Children to render                            |
| `icon`       | `Partial<IconOptions>`       | Global options for icons                      |
| `ripple`     | `boolean`                    | Enable / Disable interaction ripples globally |
| `tooltip`    | `Partial<TooltipOptions>`    | Global tooltip options                        |
| `typography` | `Partial<TypographyOptions>` | Global typography options                     |
