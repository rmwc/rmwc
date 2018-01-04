// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

export type RMWCProviderOptionsT = {
  buttonDefaultRipple: boolean,
  listItemDefaultRipple: boolean,
  iconClassNameBase: string,
  iconClassNamePrefix: string,
  iconStrategy: 'auto' | 'ligature' | 'className' | 'url' | 'component',
  children?: React.Node
};

// Default provider options
const providerDefaults: RMWCProviderOptionsT = {
  buttonDefaultRipple: true,
  listItemDefaultRipple: false,
  iconClassNameBase: 'material-icons',
  iconClassNamePrefix: '',
  iconStrategy: 'auto'
};

// A function for safely getting context options
// this is so we can use the provider defaults even
// when RMWCProvider isnt being used
export const getProviderOptions = (context: Object): RMWCProviderOptionsT => {
  return context && context.RMWCOptions ?
    context.RMWCOptions :
    providerDefaults;
};

/**
 * Provides default options for children
 * Prop override options in providerDefaults with the same name
 */
export class RMWCProvider extends React.Component<RMWCProviderOptionsT> {
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
