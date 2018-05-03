// @flow
import * as React from 'react';
import { MDCSelect } from '@material/select/dist/mdc.select';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';
import { withFoundation, syncFoundationProp } from '../Base/MDCFoundation';
import { FloatingLabel } from '../FloatingLabel';
import { LineRipple } from '../LineRipple';

export const SelectRoot = simpleTag({
  displayName: 'SelectRoot',
  classNames: props => [
    'mdc-select',
    {
      'mdc-select--box': props.box
    }
  ],
  consumeProps: ['box'],
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

export type SelectPropsT = {
  /** The value for a controlled select. */
  value?: mixed,
  /** Options accepts flat arrays, value => label maps, and more. See examples for details. */
  options?: string[] | { [value: string]: string } | mixed[],
  /** A label for the form control. */
  label?: string,
  /** Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label. */
  placeholder?: string,
  /** Disables the form control. */
  disabled?: boolean,
  /** Makes the Select have a visual box. */
  box?: boolean,
  /** Props for the root element. By default, additional props spread to the native select element.  */
  rootProps?: Object,
  /** A className for the root element. */
  className?: string
} & SimpleTagPropsT;

/**
 * Takes multiple structures for options and returns [{label: 'label', value: 'value', ...rest}]
 */
const createSelectOptions = (options): Object[] => {
  // preformatted array
  if (Array.isArray(options) && options[0] && typeof options[0] === 'object') {
    return options.map(opt => {
      return { ...opt, options: createSelectOptions(opt.options) };
    });
  }

  // simple array
  if (Array.isArray(options)) {
    return options.map(value => ({ value, label: value }));
  }

  // value => label objects
  if (typeof options === 'object') {
    return Object.entries(options).map(([value, label]) => ({
      value,
      label
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

  syncWithProps(nextProps: SelectPropsT) {
    //disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = nextProps.disabled)
    );
  }

  render() {
    const {
      placeholder,
      children,
      value,
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
        elementRef={root_}
        className={this.classes}
      >
        <SelectNativeControl
          {...rest}
          value={value}
          defaultValue={value ? undefined : ''}
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
                  <optgroup tag="optgroup" label={label} key={label}>
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
        <LineRipple />
      </SelectRoot>
    );
  }
}

export default Select;
