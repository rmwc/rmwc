// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { getProviderOptions } from '../Provider';
import { simpleTag, withRipple } from '../Base';

import type { SimpleTagPropsT, WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

export type FabRootPropsT = {
  /** Make the Fab smaller. */
  mini?: boolean,
  /** cssOnly Fab. */
  cssOnly?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const FabRoot = withRipple(
  simpleTag({
    displayName: 'FabRoot',
    tag: 'button',
    classNames: props => [
      'mdc-fab',
      {
        'mdc-fab--mini': props.mini
      }
    ],
    defaultProps: {
      cssOnly: false,
      mini: false
    },
    consumeProps: ['mini', 'cssOnly']
  })
);

export const FabIcon = simpleTag({
  displayName: 'FabIcon',
  tag: Icon,
  classNames: 'mdc-fab__icon'
});

export class Fab extends React.Component<FabRootPropsT> {
  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { buttonDefaultRipple } = this.providerOptions;
    const { ripple, className, children, ...rest } = this.props;
    const shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;
    const rippleProps = shouldRipple ?
      { ripple: true, needsRippleSurface: false } :
      {};

    const classes = classNames(this.providerOptions.iconPrefix, className);
    return (
      <FabRoot className={classes} {...rippleProps} {...rest}>
        <FabIcon>{children}</FabIcon>
      </FabRoot>
    );
  }
}

export default Fab;
