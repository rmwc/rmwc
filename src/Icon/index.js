// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';
import { simpleTag } from '../Base';

import type { RMWCProviderOptionsT } from '../Provider';

export const IconRoot = simpleTag({ displayName: 'IconRoot', tag: 'i' });

type IconPropsT = {
  /* The icon to use */
  use: string
};

export class Icon extends React.Component<IconPropsT> {
  static defaultProps = {
    use: undefined
  };

  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { use, children, ...rest } = this.props;
    const { iconPrefix } = this.providerOptions;
    const content = use || children;

    return (
      <IconRoot {...rest} className={iconPrefix + (rest.className || '')}>
        {content}
      </IconRoot>
    );
  }
}

export default Icon;
