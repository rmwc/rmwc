// @flow
import * as React from 'react';
import { MDCSelect } from '@material/select/dist/mdc.select';
import { List, ListItem } from '../List';
import { MenuRoot, MenuItems } from '../Menu';
import { simpleTag, withMDC } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export const SelectRoot = simpleTag({
  displayName: 'SelectRoot',
  classNames: 'mdc-select',
  defaultProps: {
    role: 'listbox',
    tabIndex: '0'
  }
});

export const SelectSurface = simpleTag({
  displayName: 'SelectSurface',
  classNames: 'mdc-select__surface'
});

export const SelectLabel = simpleTag({
  displayName: 'SelectLabel',
  classNames: props => [
    'mdc-select__label',
    {
      'mdc-select__label--float-above': props.placeholder
    }
  ]
});

export const SelectSelectedText = simpleTag({
  displayName: 'SelectSelectedText',
  classNames: 'mdc-select__selected-text'
});

export const SelectBottomLine = simpleTag({
  displayName: 'SelectBottomLine',
  classNames: 'mdc-select__bottom-line'
});

export const SelectMenu = simpleTag({
  displayName: 'SelectMenu',
  tag: MenuRoot,
  classNames: 'mdc-select__menu'
});

export const SelectFormField = simpleTag({
  displayName: 'SelectMenu',
  classNames: 'rmwc-select-form-field',
  defaultProps: {
    style: {
      height: '48px',
      marginTop: '16px',
      marginBottom: '8px',
      display: 'inline-flex',
      alignItems: 'flex-end'
    }
  }
});

type SelectPropsT = {
  /** An array of values or a map of {value: "label"}. Arrays will be converted to a map of {value: value}. */
  options: Object | mixed[],
  /** A label for the form control. */
  label?: string,
  /** Placeholder text for the form control. */
  placeholder?: string,
  /** Disables the form control. */
  disabled?: boolean
} & SimpleTagPropsT;

const getDisplayValue = (value, options, placeholder) => {
  placeholder = placeholder || '\u00a0';

  if (options) {
    return options.get(value) !== undefined ? options.get(value) : placeholder;
  }

  return value || placeholder;
};

export const Select: React.ComponentType<SelectPropsT> = withMDC({
  mdcConstructor: MDCSelect,
  mdcElementRef: true,
  mdcEvents: {
    'MDCSelect:change': (evt, props, api) => {
      evt.target.value = api.value;
      props.onChange && props.onChange(evt);
    }
  },
  defaultProps: {
    options: undefined,
    label: undefined,
    placeholder: undefined,
    disabled: false
  },
  onMount: (props, api) => {
    window.requestAnimationFrame(() => api && api.foundation_.resize());
  },
  didUpdate: (props, nextProps, api, inst) => {
    if (!api) return;

    const valueDidChange = props && props.value !== nextProps.value;
    const optionsDidChange = props && props.options !== nextProps.options;
    const isFirstRun = props === undefined;
    const placeholderDidChange =
      props && props.placeholder !== nextProps.placeholder;

    if (optionsDidChange) {
      api.foundation_.selectedIndex = 0;
      inst.mdcComponentReinit();

      // escape out to avoid errors, didUpdate will run again on component init
      return;
    }

    if (
      valueDidChange ||
      optionsDidChange ||
      isFirstRun ||
      placeholderDidChange
    ) {
      const newIndex = api.options.indexOf(api.nameditem(nextProps.value));
      api.selectedIndex =
        newIndex === -1 && nextProps.placeholder ? 0 : newIndex;

      window.requestAnimationFrame(() => {
        try {
          api.foundation_.resize();
        } catch (err) {}
      });
    }
  }
})(
  class extends React.Component<SelectPropsT> {
    static displayName = 'Select';

    render() {
      const {
        placeholder = '',
        children,
        value,
        label = '',
        options = [],
        mdcElementRef,
        ...rest
      } = this.props;

      const selectOptions = Array.isArray(options) ?
        new Map(options.map(val => [val, val])) :
        new Map(Object.entries(options).map(([val, label]) => [label, val]));

      const displayValue = getDisplayValue(value, selectOptions, placeholder);

      return (
        <SelectRoot elementRef={mdcElementRef} {...rest}>
          <SelectSurface>
            <SelectLabel placeholder={placeholder}>{label}</SelectLabel>
            <SelectSelectedText>{displayValue}</SelectSelectedText>
            <SelectBottomLine />
          </SelectSurface>
          <SelectMenu>
            <MenuItems>
              {!!placeholder.length && (
                <ListItem
                  role="option"
                  id="placeholder"
                  aria-disabled="true"
                  tab-index="0"
                >
                  {placeholder}
                </ListItem>
              )}
              {options &&
                Array.from(selectOptions).map(([optionLabel, optionVal], i) => (
                  <ListItem key={i} role="option" id={optionVal} tabIndex="0">
                    {optionLabel}
                  </ListItem>
                ))}
              {children}
            </MenuItems>
          </SelectMenu>
        </SelectRoot>
      );
    }
  }
);

export default Select;
