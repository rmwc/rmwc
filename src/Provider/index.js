// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';

// prettier-ignore
// eslint-disable-next-line max-len
type IconStrategyT = 'auto' | 'ligature' | 'className' | 'url' | 'component' | 'custom';

export type RMWCProviderOptionsT = {
  /** Set the buttons ripple effect globally */
  buttonDefaultRipple?: boolean,
  /** Set the listItems ripple effect globally */
  listItemDefaultRipple?: boolean,
  /** Set the iconClassNameBase. Read the icon docs for more info. */
  iconClassNameBase?: string,
  /** Set the iconClassNamePrefix. Read the icon docs for more info. */
  iconClassNamePrefix?: string,
  /** Set the default iconStrategy. Read the icon docs for more info. */
  iconStrategy?: IconStrategyT,
  /** Sets a default render function to be used when the iconStrategy is custom */
  iconRender?: (props: { content: React.Node, className: string }) => mixed,
  /** Children to render */
  children?: React.Node
};

// Default provider options
const providerDefaults: RMWCProviderOptionsT = {
  buttonDefaultRipple: true,
  listItemDefaultRipple: true,
  iconClassNameBase: 'material-icons',
  iconClassNamePrefix: '',
  iconStrategy: 'auto',
  iconRender: undefined
};

// A function for safely getting context options
// this is so we can use the provider defaults even
// when RMWCProvider inst being used
export const getProviderOptions = (context: any): RMWCProviderOptionsT => {
  return context && context.RMWCOptions
    ? context.RMWCOptions
    : providerDefaults;
};

/**
 * Provides default options for children
 * Prop override options in providerDefaults with the same name
 */
export class RMWCProvider extends React.Component<RMWCProviderOptionsT> {
  static defaultProps = providerDefaults;

  constructor(props: RMWCProviderOptionsT) {
    super(props);
    this.options = this.buildOptions(props);
  }

  getChildContext() {
    return {
      RMWCOptions: this.options
    };
  }

  componentWillUpdate(nextProps: RMWCProviderOptionsT) {
    this.options = this.buildOptions(nextProps);
  }

  options: RMWCProviderOptionsT;

  static childContextTypes = {
    RMWCOptions: PropTypes.object
  };

  buildOptions(props: RMWCProviderOptionsT) {
    return {
      ...providerDefaults,
      ...(props || {})
    };
  }

  render() {
    return this.props.children;
  }
}

export default RMWCProvider;
