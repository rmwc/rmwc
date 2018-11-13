// @flow
import type { SimpleTagPropsT } from '@rmwc/base';
import * as React from 'react';
import { MDCSelect } from '@material/select';
import { simpleTag, withFoundation, syncFoundationProp } from '@rmwc/base';
import { FloatingLabel } from '@rmwc/floating-label';
import { LineRipple } from '@rmwc/line-ripple';
import { NotchedOutline, NotchedOutlineIdle } from '@rmwc/notched-outline';

type FormattedOption = {
  label: string,
  value: string,
  options?: FormattedOption[]
};

export type SelectPropsT = {
  /** The value for a controlled select. */
  value?: mixed,
  /** Options accepts flat arrays, value => label maps, and more. See examples for details. */
  options?: string[] | { [value: string]: string } | any[],
  /** A label for the form control. */
  label?: string,
  /** Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label. */
  placeholder?: string,
  /** Makes the select outlined. */
  outlined?: boolean,
  /** Disables the form control. */
  disabled?: boolean,
  /** Props for the root element. By default, additional props spread to the native select element.  */
  rootProps?: Object,
  /** A className for the root element. */
  className?: string,
  /** Styles to be applied to the root of the component. */
  style?: Object
} & SimpleTagPropsT &
  //$FlowFixMe
  React.InputHTMLAttributes<HTMLInputElement>;

export const SelectRoot: React.ComponentType<SelectPropsT> = simpleTag({
  displayName: 'SelectRoot',
  classNames: (props: SelectPropsT) => [
    'mdc-select',
    {
      'mdc-select--outlined': props.outlined
    }
  ],
  consumeProps: ['outlined'],
  defaultProps: {
    role: 'listbox'
  }
});

export const SelectSurface = simpleTag({
  displayName: 'SelectSurface',
  classNames: 'mdc-select__surface'
});

export const SelectSelectedText = simpleTag({
  displayName: 'SelectSelectedText',
  classNames: 'mdc-select__selected-text'
});

export const SelectBottomLine = simpleTag({
  displayName: 'SelectBottomLine',
  classNames: 'mdc-select__bottom-line'
});

export const SelectNativeControl = simpleTag({
  displayName: 'SelectNativeControl',
  tag: 'select',
  classNames: 'mdc-select__native-control'
});

/**
 * Takes multiple structures for options and returns [{label: 'label', value: 'value', ...rest}]
 */
const createSelectOptions = (options): FormattedOption[] => {
  // preformatted array
  if (Array.isArray(options) && options[0] && typeof options[0] === 'object') {
    return options.map(opt => {
      if (typeof opt !== 'object') {
        throw new Error(`Encountered non object for Select ${opt}`);
      }
      return { ...opt, options: createSelectOptions(opt.options) };
    });
  }

  // simple array
  if (Array.isArray(options)) {
    return options.map(value => ({ value, label: value }));
  }

  // value => label objects
  if (typeof options === 'object') {
    return Object.keys(options).map(value => ({
      value,
      label: options[value]
    }));
  }

  // default, just return
  return options;
};

export class Select extends withFoundation({
  constructor: MDCSelect,
  adapter: {
    getValue: function() {
      const value = this.nativeControl_.value;
      return value === '' && this.props.placeholder ? ' ' : value;
    }
  }
})<SelectPropsT> {
  static displayName = 'Select';

  disabled: boolean;
  value: any;
  foundation_: any;

  syncWithProps(nextProps: SelectPropsT) {
    //disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = !!nextProps.disabled)
    );

    // value
    syncFoundationProp(
      nextProps.value,
      this.value,
      () => (this.value = nextProps.value)
    );

    // options
    if (
      nextProps.options &&
      (nextProps.placeholder === undefined || nextProps.value) &&
      JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)
    ) {
      this.foundation_.adapter_.floatLabel(true);
      this.foundation_.notchOutline(true);
    }
  }

  render() {
    const {
      placeholder,
      children,
      value,
      outlined,
      label = '',
      options = [],
      className,
      rootProps = {},
      apiRef,
      style,
      ...rest
    } = this.props;

    const { root_ } = this.foundationRefs;
    const selectOptions = createSelectOptions(options);

    return (
      <SelectRoot
        {...rootProps}
        outlined={outlined}
        elementRef={root_}
        className={className}
        style={style}
      >
        <SelectNativeControl
          {...rest}
          value={value}
          defaultValue={
            value !== undefined ? undefined : this.props.defaultValue || ''
          }
        >
          {(!!placeholder || placeholder === '') && (
            <option value="" disabled={placeholder === ''}>
              {placeholder}
            </option>
          )}
          {selectOptions &&
            selectOptions.map(({ label, options, ...option }, i) => {
              if (options) {
                return (
                  <optgroup label={label} key={label}>
                    {options.map(({ label, ...option }, i) => (
                      <option key={label} {...option} value={option.value}>
                        {label}
                      </option>
                    ))}
                  </optgroup>
                );
              }

              return (
                <option key={label} {...option} value={option.value}>
                  {label}
                </option>
              );
            })}
          {children}
        </SelectNativeControl>
        <FloatingLabel>{label}</FloatingLabel>
        {!!outlined && <NotchedOutline />}
        {!!outlined ? <NotchedOutlineIdle /> : <LineRipple />}
      </SelectRoot>
    );
  }
}

export default Select;
