import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { MDCCheckboxFoundation } from '@material/checkbox';
import { useTag, useClassNames, mergeRefs } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { ToggleableFoundationProps } from '@rmwc/toggleable';
import { useCheckboxFoundation } from './foundation';

/*********************************************************************
 * Events
 *********************************************************************/

/**
 * This is an awful freaking bugfix
 * Basically, MDC decided that patching the native getter and setter
 * on a checkbox would be fun which consequently kills Reacts ability
 * to do the same.
 */
// @ts-ignore
MDCCheckboxFoundation.prototype.installPropertyChangeHooks_ = () => {};

/*********************************************************************
 * Checkbox
 *********************************************************************/

/** A Checkbox component. */
export interface CheckboxProps
  extends RMWC.WithRippleProps,
    ToggleableFoundationProps {
  /** Make the control indeterminate */
  indeterminate?: boolean;
}

/** A Checkbox component. */
export const Checkbox = React.forwardRef<
  any,
  CheckboxProps & RMWC.ComponentProps
>(function Checkbox(props, ref) {
  const {
    renderToggle,
    id,
    toggleRootProps,
    rootEl,
    checkboxEl
  } = useCheckboxFoundation(props);

  const {
    children,
    className,
    label,
    style,
    indeterminate,
    inputRef,
    ...rest
  } = props;

  const checkbox = (
    <CheckboxRoot
      {...rootEl.props(toggleRootProps)}
      ref={mergeRefs(rootEl.setRef, ref)}
    >
      <input
        {...checkboxEl.props({
          ...rest,
          className: 'mdc-checkbox__native-control'
        })}
        type="checkbox"
        ref={mergeRefs(checkboxEl.setRef, inputRef)}
        id={id}
      />
      <CheckboxBackground />
    </CheckboxRoot>
  );

  return renderToggle(checkbox);
});
Checkbox.displayName = 'Checkbox';

/*********************************************************************
 * Bits
 *********************************************************************/

const CheckboxRoot = withRipple({
  surface: false,
  unbounded: true
})(
  React.forwardRef<any, CheckboxProps & RMWC.ComponentProps>(
    function CheckboxRoot(props, ref) {
      const Tag = useTag(props);
      const { disabled, ...rest } = props;
      const className = useClassNames(props, [
        'mdc-checkbox',
        {
          'mdc-checkbox--disabled': disabled
        }
      ]);
      return <Tag {...rest} className={className} />;
    }
  )
);
CheckboxRoot.displayName = 'CheckboxRoot';

const CheckboxBackground = React.memo(() => {
  return (
    <div className="mdc-checkbox__background">
      <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
        <path
          className="mdc-checkbox__checkmark-path"
          fill="none"
          stroke="white"
          d="M1.73,12.91 8.1,19.28 22.79,4.59"
        />
      </svg>
      <div className="mdc-checkbox__mixedmark" />
    </div>
  );
});

CheckboxBackground.displayName = 'CheckboxBackground';
