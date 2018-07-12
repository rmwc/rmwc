// @flow
import type { SimpleTagPropsT } from '../Base';
import * as React from 'react';
import { MDCSelect } from '@material/select/dist/mdc.select';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';
import { FloatingLabel } from '../FloatingLabel';
import { LineRipple } from '../LineRipple';
import { NotchedOutline, NotchedOutlineIdle } from '../NotchedOutline';

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
  /** Makes the Select have a visual box. */
  box?: boolean,
  /** Props for the root element. By default, additional props spread to the native select element.  */
  rootProps?: Object,
  /** A className for the root element. */
  className?: string
} & SimpleTagPropsT;

export const SelectRoot = simpleTag({
  displayName: 'SelectRoot',
  classNames: (props: SelectPropsT) => [
    'mdc-select',
    {
      'mdc-select--outlined': props.outlined,
      'mdc-select--box': props.box
    }
  ],
  consumeProps: ['box', 'outlined'],
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

  syncWithProps(nextProps: SelectPropsT) {
    //disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = !!nextProps.disabled)
    );
  }

  render() {
    const {
      placeholder,
      children,
      value,
      outlined,
      label = '',
      options = [],
      box,
      className,
      rootProps = {},
      apiRef,
      ...rest
    } = this.props;

    const { root_ } = this.foundationRefs;
    const selectOptions = createSelectOptions(options);

    return (
      <SelectRoot
        {...rootProps}
        box={box}
        outlined={outlined}
        elementRef={root_}
        className={className}
      >
        <SelectNativeControl
          {...rest}
          value={value}
          defaultValue={value !== undefined ? undefined : ''}
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
