import * as RMWC from '@rmwc/types';
import React, { useContext } from 'react';
import { MDCCheckboxFoundation } from '@material/checkbox';
import {
  Tag,
  useClassNames,
  mergeRefs,
  createComponent,
  DataTableContext,
  DataTableHeadContext
} from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { ToggleableProps, ToggleHTMLProps } from '@rmwc/toggleable';
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
    ToggleableProps<MDCCheckboxFoundation> {
  /** Make the control indeterminate */
  indeterminate?: boolean;
}

export type CheckboxHTMLProps = ToggleHTMLProps;

/** A Checkbox component. */
export const Checkbox: RMWC.ComponentType<
  CheckboxProps,
  CheckboxHTMLProps,
  'input'
> = createComponent<CheckboxProps, CheckboxHTMLProps>(
  function Checkbox(props, ref) {
    const { renderToggle, id, toggleRootProps, rootEl, checkboxEl } =
      useCheckboxFoundation(props);

    const {
      children,
      className,
      label,
      style,
      indeterminate,
      inputRef,
      foundationRef,
      ...rest
    } = props;

    const checkbox = (
      <CheckboxRoot
        {...rootEl.props({
          checked: rest.checked,
          indeterminate,
          ...toggleRootProps
        })}
        ref={mergeRefs(rootEl.reactRef, ref)}
      >
        <input
          {...checkboxEl.props({
            ...rest,
            className: 'mdc-checkbox__native-control'
          })}
          type="checkbox"
          ref={mergeRefs(checkboxEl.reactRef, inputRef)}
          id={id}
        />
        <CheckboxBackground />
        <CheckboxRipple />
      </CheckboxRoot>
    );

    return renderToggle(checkbox);
  }
);

/*********************************************************************
 * Bits
 *********************************************************************/

const CheckboxRoot = withRipple({
  surface: false,
  unbounded: true
})(
  React.forwardRef<any, CheckboxProps & RMWC.HTMLProps>(
    function CheckboxRoot(props, ref) {
      const isDataTable = useContext(DataTableContext);
      const isDataTableHeader = useContext(DataTableHeadContext);
      const { disabled, checked, indeterminate, ...rest } = props;
      const className = useClassNames(props, [
        'mdc-checkbox',
        {
          'mdc-data-table__row-checkbox': isDataTable && !isDataTableHeader,
          'mdc-data-table__header-row-checkbox': isDataTableHeader,
          'mdc-checkbox--disabled': disabled,
          'mdc-checkbox--selected': checked || indeterminate
        }
      ]);
      return <Tag {...rest} className={className} ref={ref} />;
    }
  )
);

const CheckboxRipple = React.memo(function CheckboxRipple() {
  return <div className="mdc-checkbox__ripple" />;
});

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
