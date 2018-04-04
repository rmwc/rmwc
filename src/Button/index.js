// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';

import { simpleTag, withRipple } from '../Base';
import { Icon } from '../Icon';

import type { SimpleTagPropsT, WithRipplePropsT } from '../Base';
import type { RMWCProviderOptionsT } from '../Provider';

/****************************************************************
 * Private
 ****************************************************************/
export type ButtonRootPropsT = {
  /** Make the Button dense. */
  dense?: boolean,
  /** Make the Button raised. */
  raised?: boolean,
  /** Make the button unelevated. */
  unelevated?: boolean,
  /** Make the button stroked. */
  stroked?: boolean
} & SimpleTagPropsT &
  WithRipplePropsT;

export const ButtonRoot = withRipple({ surface: false })(
  simpleTag({
    displayName: 'ButtonRoot',
    tag: 'button',
    defaultProps: {
      dense: false,
      raised: false,
      unelevated: false,
      stroked: false
    },
    consumeProps: [
      'dense',
      'raised',
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
        'mdc-button--unelevated': props.unelevated,
        'mdc-button--stroked': props.stroked
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
 * The Button component.
 */
export class Button extends React.Component<ButtonRootPropsT> {
  static defaultProps = {
    dense: false,
    raised: false,
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

    return <ButtonRoot ripple={shouldRipple} {...rest} />;
  }
}

export default Button;
