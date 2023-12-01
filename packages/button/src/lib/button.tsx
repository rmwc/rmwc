import * as RMWC from '@rmwc/types';
import React from 'react';

import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';
import { useIsWrappedTouchTarget } from '@rmwc/touch-target';
import {
  Tag,
  useClassNames,
  createComponent,
  createMemoComponent
} from '@rmwc/base';

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
  /** Makes the button more touch friendly. This will automatically be set true if used inside of TouchTargetWrapper.*/
  touch?: boolean;
  /** Content specified as children. */
  children?: React.ReactNode;
  /** An Icon for the Button */
  icon?: RMWC.IconPropT;
  /** A trailing icon for the Button */
  trailingIcon?: RMWC.IconPropT;
}

export type ButtonHTMLProps = RMWC.HTMLProps<HTMLButtonElement>;

/**
 * The Button component.
 */
export const Button: RMWC.ComponentType<
  ButtonProps,
  ButtonHTMLProps,
  'button'
> = withRipple({
  surface: false
})(
  createComponent<ButtonProps, ButtonHTMLProps>(function Button(props, ref) {
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
      touch,
      ...rest
    } = props;

    const isTouch = useIsWrappedTouchTarget(touch);

    const className = useClassNames(props, [
      'mdc-button',
      {
        'mdc-button--dense': dense,
        'mdc-button--raised': raised,
        'mdc-button--unelevated': unelevated,
        'mdc-button--outlined': outlined,
        'mdc-button--touch': isTouch
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
      <Tag tag="button" {...rest} ref={ref} className={className}>
        <ButtonRipple />
        <ButtonTouch />
        <ButtonFocusRing />
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

/*********************************************************************
 * Bits
 *********************************************************************/

const ButtonTouch = React.memo(function ButtonTouch() {
  return <div className="mdc-button__touch"></div>;
});

const ButtonFocusRing = React.memo(function ButtonFocusRing() {
  return <div className="mdc-button__focus-ring"></div>;
});

const ButtonRipple = React.memo(function ButtonRipple() {
  return <div className="mdc-button__ripple"></div>;
});

interface ButtonIconProps extends IconProps {}

/** An icon that goes inside of buttons. This is an instance of the Icon component. */
const ButtonIcon = createMemoComponent<ButtonIconProps>(
  function ButtonIcon(props, ref) {
    const className = useClassNames(props, ['mdc-button__icon']);
    return <Icon {...props} className={className} ref={ref} />;
  }
);
