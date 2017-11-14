// @flow
import * as React from 'react';
import { MDCSelect } from '@material/select/dist/mdc.select';
import { List, ListItem } from '../List';
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

export const SelectSelectedText = simpleTag({
  displayName: 'SelectSelectedText',
  tag: 'span',
  classNames: 'mdc-select__selected-text'
});

export const SelectLabel = props => (
  <div
    style={{ position: 'absolute', marginTop: '34px', whiteSpace: 'nowrap' }}
  >
    <label className="mdc-textfield__label mdc-textfield__label--float-above">
      {props.children}
    </label>
  </div>
);

export const SelectMenu = simpleTag({
  displayName: 'SelectMenu',
  classNames: 'mdc-simple-menu mdc-select__menu'
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
  /* An array of values or a map of {value: "label"}. Arrays will be converted to a map of {value: value}. */

  options: Object | mixed[],
  /* A label for the form control. */
  label: string,
  /* Placeholder text for the form control. */
  placeholder: string,
  /* Disables the form control. */
  disabled: boolean
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
  onUpdate: (props, nextProps, api) => {
    if (!api) return;

    if ((props && props.value !== nextProps.value) || props === undefined) {
      const newIndex = api.options.indexOf(api.nameditem(nextProps.value));
      api.selectedIndex =
        newIndex === -1 && props && props.placeholder ? 0 : newIndex;
    }

    window.requestAnimationFrame(() => api && api.foundation_.resize());
  }
})(
  ({
    placeholder = '',
    value,
    label = '',
    options,
    mdcElementRef,
    ...rest
  }) => {
    const selectOptions = Array.isArray(options) ?
      new Map(options.map(val => [val, val])) :
      new Map(Object.entries(options).map(([val, label]) => [label, val]));

    const displayValue = getDisplayValue(value, selectOptions, placeholder);

    return (
      <SelectRoot elementRef={mdcElementRef} {...rest}>
        <SelectSelectedText>{displayValue}</SelectSelectedText>
        {!!label.length && <SelectLabel>{label}</SelectLabel>}
        <SelectMenu>
          <List className="mdc-simple-menu__items">
            {!!placeholder.length && (
              <ListItem role="option" id="placeholder" aria-disabled="true">
                {placeholder}
              </ListItem>
            )}
            {options &&
              Array.from(selectOptions).map(([optionLabel, optionVal], i) => (
                <ListItem key={i} role="option" id={optionVal} tabIndex="0">
                  {optionLabel}
                </ListItem>
              ))}
          </List>
        </SelectMenu>
      </SelectRoot>
    );
  }
);

export default Select;
