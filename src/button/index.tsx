import { WithRippleProps } from '@rmwc/ripple';
import { IconProps } from '@rmwc/icon';
import { ComponentProps, componentFactory } from '@rmwc/base';

import * as React from 'react';
import { withRipple } from '@rmwc/ripple';
import { Icon } from '@rmwc/icon';

export interface ButtonProps extends WithRippleProps, ComponentProps {
  /** Make the Button dense. */
  dense?: boolean;
  /** Make the Button raised. */
  raised?: boolean;
  /** Make the button unelevated. */
  unelevated?: boolean;
  /** Make the button outlined. */
  outlined?: boolean;
  /** make the button disabled */
  disabled?: boolean;
  /** Enable / disable the ripple. */
  ripple?: boolean;
}

/**
 * The Button component. Buttons also accepts all of the props from the Ripple component.
 */
export const Button = withRipple({
  surface: false
})(
  componentFactory({
    displayName: 'Button',
    tag: 'button',
    classNames: (props: ButtonProps) => [
      'mdc-button',
      {
        'mdc-button--dense': props.dense,
        'mdc-button--raised': props.raised,
        'mdc-button--unelevated': props.unelevated,
        'mdc-button--outlined': props.outlined
      }
    ],
    consumeProps: [
      'dense',
      'raised',
      'unelevated',
      'outlined',
      'primary',
      'accent',
      'unbounded'
    ],
    defaultProps: {
      dense: false,
      raised: false,
      unelevated: false,
      outlined: false
    }
  })
);

/** An icon that goes inside of buttons. This is an instance of the Icon component. */
export const ButtonIcon = componentFactory<IconProps>({
  displayName: 'ButtonIcon',
  tag: Icon,
  classNames: ['mdc-button__icon']
});
