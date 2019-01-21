import * as React from 'react';

import { componentFactory } from '@rmwc/base';
import { withRipple, WithRippleProps } from '@rmwc/ripple';
import { Icon, IconProps, IconPropT } from '@rmwc/icon';

export interface ButtonProps extends WithRippleProps {
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
  /** Content specified as a label prop. */
  label?: React.ReactNode | any;
  /** Content specified as children. */
  children?: React.ReactNode;
  /** An Icon for the Button */
  icon?: IconPropT;
}

/**
 * The Button component. Buttons also accepts all of the props from the Ripple component.
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
    defaultProps: {
      dense: false,
      raised: false,
      unelevated: false,
      outlined: false
    },
    render: (
      { icon, label, children, ...rest }: ButtonProps,
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
