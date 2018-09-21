// @flow
import type { SimpleTagPropsT } from '@rmwc/base';
import type { RMWCProviderOptionsT } from '@rmwc/provider';
import type { IconPropsT } from '@rmwc/icon';
import type { WithRipplePropsT } from '@rmwc/ripple';

import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@rmwc/icon';
import { getProviderOptions } from '@rmwc/provider';
import { simpleTag } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';

export type FabPropsT = {
  /** Make the Fab smaller. */
  mini?: boolean,
  /** Make the Fab extended with a label. */
  label?: React.Node,
  /** Animates the FAB out of view. When this class is removed, the FAB will return to view. */
  exited?: boolean,
  /** Enable / disable the ripple. */
  ripple?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT &
  IconPropsT;

export const FabRoot: React.ComponentType<FabPropsT> = withRipple({
  surface: false
})(
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

export const FabIcon: React.ComponentType<IconPropsT> = simpleTag({
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

  componentWillMount() {
    this.providerOptions = getProviderOptions(this.context);
  }

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { buttonDefaultRipple } = this.providerOptions;
    const {
      ripple,
      className,
      children,
      icon,
      iconOptions,
      label,
      ...rest
    } = this.props;
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
        <FabIcon icon={icon} iconOptions={iconOptions} />
        {!!label && <FabLabel>{label}</FabLabel>}
        {children}
      </FabRoot>
    );
  }
}

export default Fab;
