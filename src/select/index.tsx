import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCSelectIconFoundation } from '@material/select';
import { useClassNames, mergeRefs, useId, Tag } from '@rmwc/base';
import { FloatingLabel } from '@rmwc/floating-label';
import { LineRipple } from '@rmwc/line-ripple';
import { Icon, IconProps } from '@rmwc/icon';
import { NotchedOutline } from '@rmwc/notched-outline';
import { Menu, MenuItem, MenuItems, MenuProps, MenuApi } from '@rmwc/menu';
import { ListGroup, ListGroupSubheader, ListDivider } from '@rmwc/list';
import { withRipple } from '@rmwc/ripple';
import { useSelectIconFoundation } from './select-icon-foundation';
import { useSelectFoundation } from './select-foundation';

export interface FormattedOption extends React.AllHTMLAttributes<any> {
  label: string;
  value?: string;
  options?: FormattedOption[];
}

/** A Select Component */
export interface SelectProps {
  /** The value for a controlled select. */
  value?: string;
  /** Adds help text to the field */
  helpText?: React.ReactNode | SelectHelperTextProps;
  /** Options accepts flat arrays, value => label maps, and more. See examples for details. */
  options?: FormattedOption[] | string[] | { [value: string]: string };
  /** A label for the form control. */
  label?: string;
  /** Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label. */
  placeholder?: string;
  /** Makes the select outlined. */
  outlined?: boolean;
  /** Makes the Select visually invalid. This is sometimes automatically my material-components-web.  */
  invalid?: boolean;
  /** Makes the Select disabled.  */
  disabled?: boolean;
  /** Makes the Select required.  */
  required?: boolean;
  /** Renders a non native / enhanced dropdown */
  enhanced?: boolean | MenuProps;
  /** Props for the root element. By default, additional props spread to the native select element.  */
  rootProps?: Object;
  /** A reference to the native select element. Not applicable when `enhanced` is true. */
  inputRef?: (ref: HTMLSelectElement | null) => void;
  /** Add a leading icon. */
  icon?: RMWC.IconPropT;
}

/**
 * Takes multiple structures for options and returns [{label: 'label', value: 'value', ...rest}]
 */
const createSelectOptions = (options: any): FormattedOption[] => {
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

const SelectRoot = withRipple()(function SelectRoot(props: any) {
  return <Tag role="listbox" {...props} />;
});

const SelectDropdownArrow = React.memo(function SelectDropdownArrow() {
  return <i className="mdc-select__dropdown-icon" />;
});

function SelectNativeControl(
  props: {
    selectOptions: any;
    placeholder?: string;
    children: React.ReactNode;
    elementRef: React.Ref<HTMLSelectElement>;
    value: any;
    defaultValue?: any;
  } & React.HTMLProps<HTMLSelectElement>
) {
  const {
    selectOptions,
    placeholder = '',
    children,
    elementRef,
    ...rest
  } = props;

  return (
    <select
      tabIndex={0}
      {...rest}
      ref={elementRef}
      className={`mdc-select__native-control ${rest.className || ''}`}
    >
      {!props.value && !props.defaultValue && (
        <option value="" disabled={placeholder === ''}>
          {placeholder}
        </option>
      )}
      {!!selectOptions &&
        selectOptions.map(
          ({ label, options, ...option }: FormattedOption, i: number) => {
            if (options) {
              return (
                <optgroup label={label} key={label}>
                  {options.map(({ label, ...option }, i) => (
                    <option
                      key={`${label}-${option.value}`}
                      {...option}
                      value={option.value}
                    >
                      {label}
                    </option>
                  ))}
                </optgroup>
              );
            }

            return (
              <option
                key={`${label}-${option.value}`}
                {...option}
                value={option.value}
              >
                {label}
              </option>
            );
          }
        )}
      {children}
    </select>
  );
}

interface SelectEnhancedControlProps extends MenuProps {
  selectOptions: any;
  selectedIndex: number;
  placeholder?: string;
  apiRef2: (api: MenuApi) => void;
  value?: string;
  defaultValue?: any;
  children?: React.ReactNode;
}

function SelectEnhancedControl(
  props: SelectEnhancedControlProps & RMWC.ComponentProps
) {
  const {
    selectOptions,
    apiRef2,
    selectedIndex,
    placeholder,
    children,
    ...rest
  } = props;

  let currentIndex = 0;
  const showPlaceholder =
    (placeholder !== undefined ||
      (props.value === undefined && props.defaultValue === undefined)) &&
    currentIndex++ === 0;

  return (
    <Menu
      {...rest}
      apiRef={apiRef2}
      className="mdc-select__menu"
      hoistToBody
      focusOnOpen
    >
      {showPlaceholder && (
        <MenuItem selected={currentIndex - 1 === selectedIndex} data-value="">
          {placeholder}
        </MenuItem>
      )}

      {selectOptions.map(
        ({ label, options, ...option }: FormattedOption, i: number) => {
          if (options) {
            return (
              <ListGroup key={label}>
                <ListGroupSubheader theme="textDisabledOnBackground">
                  {label}
                </ListGroupSubheader>
                <MenuItems>
                  {options.map(({ label, ...option }, i) => {
                    currentIndex += 1;
                    return (
                      <MenuItem
                        key={`${label}-${option.value}`}
                        activated={currentIndex - 1 === selectedIndex}
                        {...option}
                        data-value={option.value}
                      >
                        {label}
                      </MenuItem>
                    );
                  })}
                </MenuItems>
                {i < selectOptions.length - 1 && <ListDivider />}
              </ListGroup>
            );
          }

          currentIndex += 1;
          return (
            <MenuItem
              key={`${label}-${option.value}`}
              activated={currentIndex - 1 === selectedIndex}
              {...option}
              data-value={option.value}
            >
              {label}
            </MenuItem>
          );
        }
      )}
      {children}
    </Menu>
  );
}

export const SelectBase = React.forwardRef(function SelectBase(
  props: SelectProps & RMWC.ComponentProps,
  ref: React.Ref<any>
) {
  const {
    placeholder,
    children,
    value,
    outlined,
    label = '',
    options = [],
    rootProps = {},
    enhanced,
    icon,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    invalid,
    inputRef,
    helpText,
    ...rest
  } = props;

  const selectOptions = createSelectOptions(options);
  const {
    rootEl,
    selectedTextEl,
    notchWidth,
    menuOpen,
    selectedIndex,
    selectedTextContent,
    lineRippleActive,
    lineRippleCenter,
    floatLabel,
    setFloatingLabel,
    setNativeControl,
    setMenu,
    setHiddenInput,
    setLeadingIcon,
    sharedEventProps,
    handleKeydown,
    handleMenuClosed,
    handleMenuOpened,
    handleMenuSelected
  } = useSelectFoundation(props);

  const id = useId('select', props);

  const className = useClassNames(props, [
    'mdc-select',
    {
      'mdc-select--outlined': !!outlined,
      'mdc-select--required': !!props.required,
      'mdc-select--invalid': !!invalid,
      'mdc-select--with-leading-icon': !!icon
    }
  ]);

  const defaultValue =
    value !== undefined ? undefined : props.defaultValue || '';

  const sharedControlProps = {
    defaultValue,
    value,
    placeholder,
    selectOptions
  };

  const renderedLabel = (
    <FloatingLabel float={floatLabel} apiRef={setFloatingLabel} htmlFor={id}>
      {label}
    </FloatingLabel>
  );

  const renderHelpText = () => {
    const shouldRender = !!helpText;

    if (!shouldRender) {
      return null;
    }

    const shouldSpread =
      typeof helpText === 'object' && !React.isValidElement(helpText);

    return helpText && shouldSpread ? (
      <SelectHelperText {...(helpText as any)} />
    ) : (
      <SelectHelperText>{helpText}</SelectHelperText>
    );
  };

  return (
    <>
      <SelectRoot
        ripple={!outlined}
        element={rootEl}
        {...rootProps}
        className={className}
        ref={ref}
      >
        {!!icon && <SelectIcon apiRef={setLeadingIcon} icon={icon} />}
        <SelectDropdownArrow />

        {enhanced ? (
          <>
            <input type="hidden" ref={setHiddenInput} />
            <div
              ref={selectedTextEl.setRef}
              {...selectedTextEl.props({})}
              className="mdc-select__selected-text"
              tabIndex={props.disabled ? -1 : 0}
              aria-disabled={props.disabled ? 'true' : 'false'}
              aria-expanded={menuOpen}
              onKeyDown={handleKeydown}
              {...sharedEventProps}
            >
              {selectedTextContent}
            </div>
            <SelectEnhancedControl
              anchorCorner="bottomStart"
              {...(typeof enhanced === 'object' ? enhanced : {})}
              {...sharedControlProps}
              selectedIndex={selectedIndex}
              apiRef2={setMenu}
              open={menuOpen}
              onClose={handleMenuClosed}
              onOpen={handleMenuOpened}
              onSelect={handleMenuSelected}
            >
              {children}
            </SelectEnhancedControl>
          </>
        ) : (
          <SelectNativeControl
            {...rest}
            elementRef={mergeRefs(inputRef, setNativeControl)}
            {...sharedControlProps}
            {...sharedEventProps}
            id={id}
          >
            {children}
          </SelectNativeControl>
        )}
        {!!outlined ? (
          <NotchedOutline notch={notchWidth}>{renderedLabel}</NotchedOutline>
        ) : (
          <>
            {renderedLabel}
            <LineRipple active={lineRippleActive} center={lineRippleCenter} />
          </>
        )}
      </SelectRoot>
      {renderHelpText()}
    </>
  );
});

export interface SelectIconApi {
  getFoundation: () => MDCSelectIconFoundation;
}

/** An Icon in a TextField */
export interface SelectIconProps extends IconProps {
  apiRef?: (api: SelectIconApi) => void;
}

const SelectIcon = function SelectIcon(
  props: SelectIconProps & RMWC.ComponentProps
) {
  const { apiRef, ...rest } = props;
  const { rootEl } = useSelectIconFoundation(props);
  const className = useClassNames(props, ['mdc-select__icon']);

  return (
    <Icon
      {...rootEl.props({
        ...rest,
        className
      })}
    />
  );
};
SelectIcon.displayName = 'SelectIcon';

/** A help text component */
export interface SelectHelperTextProps {
  /** Make the help text always visible */
  persistent?: boolean;
  /** Make the help a validation message style */
  validationMsg?: boolean;
}

/** A help text component */
export const SelectHelperText = React.forwardRef(function SelectHelperText(
  props: SelectHelperTextProps & RMWC.ComponentProps,
  ref: React.Ref<any>
) {
  const { persistent, validationMsg, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-select-helper-text',
    {
      'mdc-select-helper-text--persistent': persistent,
      'mdc-select-helper-text--validation-msg': validationMsg
    }
  ]);

  return <Tag tag="p" {...rest} className={className} ref={ref} />;
});
SelectHelperText.displayName = 'SelectHelperText';

/** A Select Component */
export const Select = ({
  enhanced,
  ...rest
}: SelectProps & RMWC.ComponentProps) => (
  <SelectBase
    key={enhanced ? 'enhanced' : 'native'}
    enhanced={enhanced}
    {...rest}
  />
);

Select.displayName = 'Select';
