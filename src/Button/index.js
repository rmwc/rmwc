// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';

import { simpleTag, withRipple } from '../Base';
import type { SimpleTagPropsT, WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

export type ButtonRootPropsT = {
  /** Make the Button dense. */
  dense?: boolean,
  /** Make the Button raised. */
  raised?: boolean,
  /** Reduce the Button's padding. */
  compact?: boolean,
  /** Make the button unelevated. */
  unelevated?: boolean,
  /** Make the button stroked. */
  stroked?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const ButtonRoot = withRipple(
  simpleTag({
    displayName: 'ButtonRoot',
    tag: 'button',
    defaultProps: {
      dense: false,
      raised: false,
      compact: false,
      unelevated: false,
      stroked: false
    },
    consumeProps: [
      'dense',
      'raised',
      'compact',
      'unelevated',
      'stroked',
      'primary',
      'accent',
      'unbounded'
    ],
    classNames: props => [
      'mdc-button',
      {
        'mdc-button--dense': props.dense,
        'mdc-button--raised': props.raised,
        'mdc-button--compact': props.compact,
        'mdc-button--unelevated': props.unelevated,
        'mdc-button--stroked': props.stroked
      }
    ]
  })
);

/**
 * The Button component.
 */
export class Button extends React.Component<ButtonRootPropsT> {
  static defaultProps = {
    dense: false,
    raised: false,
    compact: false,
    unelevated: false,
    stroked: false
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
    const rippleProps = shouldRipple ? { ripple: true } : {};
    return <ButtonRoot {...rippleProps} {...rest} />;
  }
}

export default Button;
