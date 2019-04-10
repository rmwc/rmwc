import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { componentFactory } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';

/**
 * The Button component.
 */
export interface ButtonProps extends RMWC.WithRippleProps {
  /** Make the Button dense. */
  dense?: boolean;
  /** Make the Button raised. */
  raised?: boolean;
  /** Make the button unelevated. */
  unelevated?: boolean;
  /** Make the button outlined. */
  outlined?: boolean;
  /** Make the button disabled */
  disabled?: boolean;
  /** Content specified as a label prop. */
  label?: React.ReactNode | any;
  /** Content specified as children. */
  children?: React.ReactNode;
  /** An Icon for the Button */
  icon?: RMWC.IconPropT;
  /** A trailing icon for the Button */
  trailingIcon?: RMWC.IconPropT;
}

/**
 * The Button component.
 */
export const Button = withRipple({
  surface: false
})(
  componentFactory<ButtonProps>({
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
    render: (
      { icon, trailingIcon, label, children, ...rest }: ButtonProps,
      ref: React.Ref<any>,
      Tag: any
    ) => {
      return (
        <Tag {...rest} ref={ref}>
          {!!icon && <ButtonIcon icon={icon} />}
          <span className="mdc-button__label">
            {label}
            {children}
          </span>
          {!!trailingIcon && <ButtonIcon icon={trailingIcon} />}
        </Tag>
      );
    }
  })
);

export interface ButtonIconProps extends IconProps {}

/** An icon that goes inside of buttons. This is an instance of the Icon component. */
export const ButtonIcon = componentFactory<ButtonIconProps>({
  displayName: 'ButtonIcon',
  tag: Icon,
  classNames: ['mdc-button__icon']
});
