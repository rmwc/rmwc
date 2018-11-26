// @flow
import type { SimpleTagPropsT } from '@rmwc/base';
import type { RMWCProviderOptionsT } from '@rmwc/provider';
import type { WithRipplePropsT } from '@rmwc/ripple';
import type { IconPropsT } from '@rmwc/icon';

import * as React from 'react';
import { getProviderOptions } from '@rmwc/provider';

import { simpleTag, PropTypes } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Icon } from '@rmwc/icon';

export type ButtonPropsT = {
  /** Make the Button dense. */
  dense?: boolean,
  /** Make the Button raised. */
  raised?: boolean,
  /** Make the button unelevated. */
  unelevated?: boolean,
  /** Make the button outlined. */
  outlined?: boolean,
  /** make the button disabled */
  disabled?: boolean,
  /** Enable / disable the ripple. */
  ripple?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const ButtonRoot: React.ComponentType<ButtonPropsT> = withRipple({
  surface: false
})(
  simpleTag({
    displayName: 'ButtonRoot',
    tag: 'button',
    defaultProps: {
      dense: false,
      raised: false,
      unelevated: false,
      outlined: false
    },
    consumeProps: [
      'dense',
      'raised',
      'unelevated',
      'outlined',
      'primary',
      'accent',
      'unbounded'
    ],
    classNames: (props: ButtonPropsT) => [
      'mdc-button',
      {
        'mdc-button--dense': props.dense,
        'mdc-button--raised': props.raised,
        'mdc-button--unelevated': props.unelevated,
        'mdc-button--outlined': props.outlined
      }
    ]
  })
);

/** An icon that goes inside of buttons. This is an instance of the Icon component. */
export const ButtonIcon: React.ComponentType<IconPropsT> = simpleTag({
  displayName: 'ButtonIcon',
  tag: Icon,
  classNames: 'mdc-button__icon'
});

/**
 * The Button component. Buttons also accepts all of the props from the Ripple component.
 */
export class Button extends React.Component<ButtonPropsT> {
  static defaultProps = {
    raised: false,
    unelevated: false,
    outlined: false,
    dense: false
  };

  static contextTypes = {
    RMWCOptions: PropTypes.object
  };

  constructor(props: ButtonPropsT, context: Object) {
    super(props, context);
    this.providerOptions = getProviderOptions(this.context);
  }

  providerOptions: RMWCProviderOptionsT;
  context: Object;

  render() {
    const { buttonDefaultRipple } = this.providerOptions;
    const { ripple, ...rest } = this.props;
    const shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;

    return <ButtonRoot ripple={shouldRipple} {...rest} />;
  }
}

export default Button;
