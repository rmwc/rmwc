// @flow
import React from 'react';
import classNames from 'classnames';
import { MDCCheckbox } from '@material/checkbox/dist/mdc.checkbox';
import FormField from '../FormField';
import { simpleTag, withMDCToggle } from '../Base';

export const CheckboxRoot = simpleTag({
  displayName: 'CheckboxRoot',
  classNames: 'mdc-checkbox'
});

export const CheckboxNativeControl = simpleTag({
  displayName: 'CheckboxNativeControl',

  tag: 'input',
  classNames: 'mdc-checkbox__native-control',
  defaultProps: {
    type: 'checkbox'
  }
});

export const CheckboxBackground = simpleTag({
  displayName: 'CheckboxBackground',
  classNames: 'mdc-checkbox__background'
});

export const CheckboxCheckmark = simpleTag({
  displayName: 'CheckboxCheckmark',
  tag: 'svg',
  classNames: 'mdc-checkbox__checkmark',
  defaultProps: {
    viewBox: '0 0 24 24'
  }
});

export const CheckboxCheckmarkPath = simpleTag({
  displayName: 'CheckboxCheckmarkPath',
  tag: 'path',
  classNames: 'mdc-checkbox__checkmark-path',
  defaultProps: {
    fill: 'none',
    stroke: 'white',
    d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
  }
});

export const CheckboxMixedmark = simpleTag({
  displayName: 'CheckboxMixedmark',
  classNames: 'mdc-checkbox__mixedmark'
});

export const CheckboxLabel = simpleTag({
  displayName: 'CheckboxLabel',
  tag: 'label'
});

type CheckboxPropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** Make the control indeterminate */
  indeterminate?: boolean,
  /** A label for the control. */
  label?: string
};

/**
 * A Checkbox component
 */
export const Checkbox = withMDCToggle({
  mdcConstructor: MDCCheckbox
})(
  class extends React.Component<CheckboxPropsT> {
    static displayName = 'Checkbox';

    render() {
      const {
        label = '',
        id,
        children,
        checked,
        apiRef,
        indeterminate,
        mdcElementRef,
        generatedId,
        ...rest
      } = this.props;
      const labelId = id || generatedId;
      const checkedProp = checked !== undefined ? { checked } : {};
      const classes = classNames({ 'mdc-checkbox--disabled': rest.disabled });

      const checkbox = (
        <CheckboxRoot elementRef={mdcElementRef} className={classes}>
          <CheckboxNativeControl id={labelId} {...checkedProp} {...rest} />
          <CheckboxBackground>
            <CheckboxCheckmark>
              <CheckboxCheckmarkPath />
            </CheckboxCheckmark>
            <CheckboxMixedmark />
          </CheckboxBackground>
        </CheckboxRoot>
      );

      /**
       * We have to conditionally wrap our checkbox in a formfield
       * If we have a label
       */
      if (label.length || children) {
        return (
          <FormField>
            {checkbox}
            <CheckboxLabel id={labelId + 'label'} htmlFor={labelId}>
              {label}
              {children}
            </CheckboxLabel>
          </FormField>
        );
      } else {
        return checkbox;
      }
    }
  }
);

export default Checkbox;
