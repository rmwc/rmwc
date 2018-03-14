// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { getProviderOptions } from '../Provider';
import { simpleTag, withRipple } from '../Base';

import type { SimpleTagPropsT, WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

/**
 * Private
 */

export type FabRootPropsT = {
  /** Make the Fab smaller. */
  mini?: boolean,
  /** Animates the FAB out of view. When this class is removed, the FAB will return to view. */
  exited?: boolean,
  /** cssOnly Fab. */
  cssOnly?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const FabRoot = withRipple()(
  simpleTag({
    displayName: 'FabRoot',
    tag: 'button',
    classNames: props => [
      'mdc-fab',
      {
        'mdc-fab--mini': props.mini,
        'mdc-fab--exited': props.exited
      }
    ],
    defaultProps: {
      cssOnly: false,
      mini: false
    },
    consumeProps: ['mini', 'cssOnly', 'exited']
  })
);

export const FabIcon = simpleTag({
  displayName: 'FabIcon',
  tag: Icon,
  classNames: 'mdc-fab__icon'
});

/**
 * Public
 */
/** A floating action button component */
export class Fab extends React.Component<FabRootPropsT> {
  static defaultProps = {
    mini: undefined,
    exited: undefined,
    cssOnly: undefined
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
    const { buttonDefaultRipple } = this.providerOptions;
    const { ripple, className, children, ...rest } = this.props;
    const shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;
    const classes = classNames(this.providerOptions.iconPrefix, className);

    return (
      <FabRoot className={classes} ripple={shouldRipple} {...rest}>
        <FabIcon>{children}</FabIcon>
      </FabRoot>
    );
  }
}

export default Fab;
