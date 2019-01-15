import * as React from 'react';

// prettier-ignore
// eslint-disable-next-line max-len
type IconStrategyT = 'auto' | 'ligature' | 'className' | 'url' | 'component' | 'custom';

export interface RMWCProviderOptionsT {
  /** Set the buttons ripple effect globally */
  buttonDefaultRipple?: boolean;
  /** Set the listItems ripple effect globally */
  listItemDefaultRipple?: boolean;
  /** Set the iconClassNameBase. Read the icon docs for more info. */
  iconClassNameBase?: string;
  /** Set the iconClassNamePrefix. Read the icon docs for more info. */
  iconClassNamePrefix?: string;
  /** Set the default iconStrategy. Read the icon docs for more info. */
  iconStrategy?: IconStrategyT;
  /** Sets a default render function to be used when the iconStrategy is custom */
  iconRender?: (
    props: { content: React.ReactNode; className: string }
  ) => React.ReactNode;
  /** Children to render */
  children?: React.ReactNode;
}

// Default provider options
const providerDefaults: RMWCProviderOptionsT = {
  buttonDefaultRipple: true,
  children: null,
  listItemDefaultRipple: true,
  iconClassNameBase: 'material-icons',
  iconClassNamePrefix: '',
  iconStrategy: 'auto',
  iconRender: undefined
};

export interface WithProviderContext {
  providerContext: RMWCProviderOptionsT;
}

export const ProviderContext = React.createContext(providerDefaults);

export const withProviderContext = () => <P extends {}>(
  Component: React.ComponentType<P & WithProviderContext>
): React.ComponentType<P> => (props: P) => (
  <ProviderContext.Consumer>
    {providerContext => (
      <Component {...props} providerContext={providerContext} />
    )}
  </ProviderContext.Consumer>
);

/**
 * Provides default options for children
 * Prop override options in providerDefaults with the same name
 */
export const RMWCProvider = ({ children, ...rest }: RMWCProviderOptionsT) => (
  <ProviderContext.Provider
    value={{
      ...providerDefaults,
      ...rest
    }}
  >
    {children}
  </ProviderContext.Provider>
);
