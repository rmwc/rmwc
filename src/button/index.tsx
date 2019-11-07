import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';
import { useTag, useClassNames } from '@rmwc/base/component';

/*********************************************************************
 * Button
 *********************************************************************/

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
  /** Used to indicate a dangerous action. */
  danger?: boolean;
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
  React.forwardRef<any, ButtonProps & RMWC.ComponentProps>(function Button(
    props,
    ref
  ) {
    const {
      dense,
      raised,
      unelevated,
      outlined,
      danger,
      icon,
      label,
      trailingIcon,
      children,
      ...rest
    } = props;

    const Tag = useTag(props, 'button');

    const className = useClassNames(props, [
      'mdc-button',
      {
        'mdc-button--dense': dense,
        'mdc-button--raised': raised,
        'mdc-button--unelevated': unelevated,
        'mdc-button--outlined': outlined
      }
    ]);

    if (danger) {
      const existingStyle = rest.style || {};
      const dangerStyle = {
        '--mdc-theme-primary': 'var(--mdc-theme-error)',
        '--mdc-theme-on-primary': 'var(--mdc-theme-on-error)'
      };
      rest.style = {
        ...dangerStyle,
        ...existingStyle
      };
    }

    return (
      <Tag {...rest} ref={ref} className={className}>
        {!!icon && <ButtonIcon icon={icon} />}
        <span className="mdc-button__label">
          {label}
          {children}
        </span>
        {!!trailingIcon && <ButtonIcon icon={trailingIcon} />}
      </Tag>
    );
  })
);

Button.displayName = 'Button';

/*********************************************************************
 * ButtonIcon
 *********************************************************************/

interface ButtonIconProps extends IconProps {}

/** An icon that goes inside of buttons. This is an instance of the Icon component. */
const ButtonIcon = React.memo(function ButtonIcon(props: ButtonIconProps) {
  const className = useClassNames(props, ['mdc-button__icon']);
  return <Icon {...props} className={className} />;
});

ButtonIcon.displayName = 'ButtonIcon';
