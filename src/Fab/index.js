// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { getProviderOptions } from '../Provider';
import { simpleTag, withRipple } from '../Base';

import type { SimpleTagPropsT, WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

/**
 * Private
 */

export type FabPropsT = {
  /** Make the Fab smaller. */
  mini?: boolean,
  /** The icon to use for the fab. */
  icon?: boolean,
  /** Make the Fab extended with a label. */
  label?: React.Node,
  /** Animates the FAB out of view. When this class is removed, the FAB will return to view. */
  exited?: boolean,
  /** cssOnly Fab. */
  cssOnly?: boolean,
  /** Enable / disable the ripple. */
  ripple?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const FabRoot = withRipple({ surface: false })(
  simpleTag({
    displayName: 'FabRoot',
    tag: 'button',
    classNames: (props: FabPropsT) => [
      'mdc-fab',
      {
        'mdc-fab--mini': props.mini,
        'mdc-fab--exited': props.exited,
        'mdc-fab--extended': props.label
      }
    ],
    defaultProps: {
      cssOnly: false,
      mini: false
    },
    consumeProps: ['mini', 'cssOnly', 'exited', 'label', 'icon']
  })
);

export const FabIcon = simpleTag({
  displayName: 'FabIcon',
  tag: Icon,
  classNames: 'mdc-fab__icon'
});

export const FabLabel = simpleTag({
  displayName: 'FabLabel',
  classNames: 'mdc-fab__label'
});

/**
 * Public
 */
/** A floating action button component */
export class Fab extends React.Component<FabPropsT> {
  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  static defaultProps = {
    ripple: true
  };

  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { buttonDefaultRipple } = this.providerOptions;
    const { ripple, className, children, icon, label, ...rest } = this.props;
    const shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;
    const classes = classNames(
      this.providerOptions.iconClassNamePrefix,
      className
    );

    return (
      <FabRoot
        className={classes}
        ripple={shouldRipple}
        label={label}
        {...rest}
      >
        <FabIcon>{children || icon}</FabIcon>
        {!!label && <FabLabel>{label}</FabLabel>}
      </FabRoot>
    );
  }
}

export default Fab;
