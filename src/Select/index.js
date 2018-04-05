// @flow
import * as React from 'react';
import { MDCSelect } from '@material/select/dist/mdc.select';
import classNames from 'classnames';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';
import { withFoundation, addClass, removeClass } from '../Base/MDCFoundation';

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

export const SelectLabel = simpleTag({
  displayName: 'SelectLabel',
  classNames: props => ['mdc-select__label']
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

type SelectPropsT = {
  /** The value for a controlled select. */
  value?: mixed,
  /** Options accepts flat arrays, value => label maps, and more. See examples for details. */
  options?: string[] | { [value: string]: string } | mixed[],
  /** A label for the form control. */
  label?: string,
  /** Placeholder text for the form control. */
  placeholder?: string,
  /** Disables the form control. */
  disabled?: boolean,
  /** Makes the Select have a visiual box. */
  box?: boolean
  /** Props for the root element. By default, additonal props spread to the native select element.  */
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
    addClass: addClass(),
    removeClass: removeClass(),
    getValue: function() {
      const value = this.nativeControl_.value;
      return value === '' ? ' ' : value;
    }
  }
})<SelectPropsT> {
  static displayName = 'Select';

  render() {
    const {
      placeholder = '',
      children,
      value,
      label = '',
      options = [],
      box,
      rootProps = {},
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
        <SelectNativeControl {...rest} value={value}>
          {!!placeholder.length && <option value="">{placeholder}</option>}
          {selectOptions &&
            selectOptions.map(({ label, ...option }, i) => {
              if (option.options) {
                return (
                  <optgroup tag="optgroup" label={label} key={label}>
                    {option.options.map(({ label, ...option }, i) => (
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
        <SelectLabel>{label}</SelectLabel>
        <SelectBottomLine />
      </SelectRoot>
    );
  }
}

export default Select;
