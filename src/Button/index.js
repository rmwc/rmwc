// @flow
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';

import { simpleTag, withRipple } from '../Base';
import { Icon } from '../Icon';

import type { SimpleTagPropsT, WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

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

/****************************************************************
 * Private
 ****************************************************************/
export const ButtonRoot = withRipple({ surface: false })(
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

/****************************************************************
 * Public
 ****************************************************************/

/** An icon that goes inside of buttons. This is an instance of the Icon component. */
export const ButtonIcon = simpleTag({
  displayName: 'ButtonIcon',
  tag: Icon,
  classNames: 'mdc-button__icon'
});

/**
 * The Button component. Buttons also accepts all of the props from the Ripple component.
 */
export class Button extends React.Component<ButtonPropsT> {
  static defaultProps = {
    ripple: true,
    raised: false,
    unelevated: false,
    outlined: false,
    dense: false
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
    const { ripple, ...rest } = this.props;
    const shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;

    return <ButtonRoot ripple={shouldRipple} {...rest} />;
  }
}

export default Button;
