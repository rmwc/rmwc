// @flow
import type { SimpleTagPropsT, CustomEventT } from '@rmwc/base';
import type { IconPropsT } from '@rmwc/icon';

import * as React from 'react';
import { MDCSelectFoundation, MDCSelectIconFoundation } from '@material/select';

import { Component, FoundationComponent, randomId } from '@rmwc/base';
import { FloatingLabel } from '@rmwc/floating-label';
import { LineRipple } from '@rmwc/line-ripple';
import { Icon } from '@rmwc/icon';
import { NotchedOutline, NotchedOutlineIdle } from '@rmwc/notched-outline';
import { Menu, MenuItem, MenuItems } from '@rmwc/menu';
import { ListGroup, ListGroupSubheader, ListDivider } from '@rmwc/list';


type FormattedOption = {
  label: string,
  value: string,
  options?: FormattedOption[]
};

export type SelectPropsT = {
  /** The value for a controlled select. */
  value?: string,
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
  /** Renders a non native / enhanced dropdown */
  enhanced?: boolean,
  /** Props for the root element. By default, additional props spread to the native select element.  */
  rootProps?: Object,
  /** A className for the root element. */
  className?: string,
  /** Add a leading icon. */
  withLeadingIcon?: React.Node,
  /** Styles to be applied to the root of the component. */
  style?: Object
} & SimpleTagPropsT &
  //$FlowFixMe
  React.InputHTMLAttributes<HTMLInputElement>;

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

class SelectRoot extends Component<SelectPropsT> {
  static displayName = 'SelectRoot';
  static defaultProps = {
    role: 'listbox'
  };
  classNames = (props: SelectPropsT) => [
    'mdc-select',
    {
      'mdc-select--outlined': props.outlined,
      'mdc-select--with-leading-icon': props.withLeadingIcon
    }
  ];
  consumeProps = ['outlined', 'withLeadingIcon'];
}

class SelectDropdownArrow extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <i className="mdc-select__dropdown-icon" />;
  }
}

class SelectNativeControl extends React.Component<{
  elementRef: React.Ref<*>,
  selectOptions: any,
  placeholder?: string,
  children: React.Node,
  value: mixed,
  defaultValue?: mixed
}> {
  static displayName = 'SelectNativeControl';

  render() {
    const {
      elementRef,
      selectOptions,
      placeholder = '',
      children,
      ...rest
    } = this.props;
    return (
      <select {...rest} className="mdc-select__native-control" ref={elementRef}>
        {!this.props.value && !this.props.defaultValue && (
          <option value="" disabled={placeholder === ''}>
            {placeholder}
          </option>
        )}
        {!!selectOptions &&
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
      </select>
    );
  }
}

type SelectEnhancedControlPropsT = {
  open: boolean,
  selectOptions: any,
  selectedIndex: number,
  placeholder?: string,
  elementRef: React.Ref<*>,
  apiRef: React.Ref<*>,
  value?: string,
  defaultValue?: any,
  children?: React.Node,
  onClose: (evt: CustomEventT<void>) => mixed,
  onOpen: (evt: CustomEventT<void>) => mixed,
  onSelect: (
    evt: CustomEventT<{
      index: number,
      item: HTMLElement
    }>
  ) => mixed
};

// eslint-disable-next-line
class SelectEnhancedControl extends React.Component<SelectEnhancedControlPropsT> {
  render() {
    const {
      selectOptions,
      elementRef,
      apiRef,
      selectedIndex,
      placeholder,
      children,
      ...rest
    } = this.props;

    let currentIndex = 0;
    const showPlaceholder =
      (placeholder !== undefined ||
        (this.props.value === undefined &&
          this.props.defaultValue === undefined)) &&
      currentIndex++ === 0;

    return (
      <Menu
        {...rest}
        elementRef={elementRef}
        ref={apiRef}
        className="mdc-select__menu"
      >
        {showPlaceholder && (
          <MenuItem selected={currentIndex - 1 === selectedIndex} data-value="">
            {placeholder}
          </MenuItem>
        )}

        {selectOptions.map(({ label, options, ...option }, i) => {
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
                        key={label}
                        selected={currentIndex - 1 === selectedIndex}
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
              key={label}
              selected={currentIndex - 1 === selectedIndex}
              {...option}
              data-value={option.value}
            >
              {label}
            </MenuItem>
          );
        })}
        {children}
      </Menu>
    );
  }
}

type SelectStateT = {
  selectedIndex: number,
  selectedTextContent: string,
  menuOpen: boolean
};

export class SelectBase extends FoundationComponent<
  SelectPropsT,
  SelectStateT
> {
  root_: HTMLElement | null;
  id: string = this.props.id || randomId('select');
  nativeControl_: HTMLSelectElement | null;
  selectedText_: HTMLElement | null;
  menuElement_: HTMLElement | null;
  lineRipple_: LineRipple | null;
  outline_: NotchedOutline | null;
  label_: FloatingLabel | null;
  menu_: any;
  hiddenInput_: HTMLInputElement | null;
  leadingIcon_: SelectIcon | null;
  trailingIcon_: HTMLElement | null;

  state = {
    selectedIndex: this.props.placeholder !== undefined ? 0 : -1,
    menuOpen: false,
    selectedTextContent: ''
  };

  constructor(props: SelectPropsT) {
    super(props);
    this.createClassList('root_');

    [
      'handleChange_',
      'handleFocus_',
      'handleBlur_',
      'handleClick_',
      'handleKeydown_',
      'handleMenuSelected_',
      'handleMenuOpened_',
      'handleMenuClosed_'
      //$FlowFixMe
    ].forEach(key => (this[key] = this[key].bind(this)));
  }

  componentDidMount() {
    super.componentDidMount();

    const { enhanced, value } = this.props;

    if (this.menu_) {
      this.menu_.hoistMenuToBody();
      this.menu_.setAnchorElement(/** @type {!HTMLElement} */ (this.root_));
      this.menu_.wrapFocus = false;

      if (this.hiddenInput_ && this.hiddenInput_.value) {
        // If the hidden input already has a value, use it to restore the select's value.
        // This can happen e.g. if the user goes back or (in some browsers) refreshes the page.
        const enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
        enhancedAdapterMethods.setValue(
          this.hiddenInput_ ? this.hiddenInput_.value : ''
        );
      } else if (enhanced) {
        // If an element is selected, the select should set the initial selected text.
        this.getEnhancedSelectAdapterMethods_().setValue(value || '');
      }
    }

    // Initially sync floating label
    this.foundation_.handleChange(/* didChange */ false);

    if (this.props.disabled) {
      this.foundation_.setDisabled(true);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.menuElement_ &&
      this.menuElement_.parentNode &&
      this.menuElement_.parentNode.removeChild(this.menuElement_);
  }

  getDefaultFoundation() {
    return new MDCSelectFoundation(
      {
        ...(this.props.enhanced
          ? this.getEnhancedSelectAdapterMethods_()
          : this.getNativeSelectAdapterMethods_()),
        ...this.getCommonAdapterMethods_(),
        ...this.getOutlineAdapterMethods_(),
        ...this.getLabelAdapterMethods_()
      },
      this.getFoundationMap_()
    );
  }

  getNativeSelectAdapterMethods_() {
    return {
      getValue: () => {
        const value = this.nativeControl_ && this.nativeControl_.value;
        return value === '' && this.props.placeholder ? ' ' : value;
      },
      setValue: (value: string) =>
        this.nativeControl_ && (this.nativeControl_.value = value),
      openMenu: () => {},
      closeMenu: () => {},
      isMenuOpen: () => false,
      setSelectedIndex: (index: number) => {
        this.nativeControl_ && (this.nativeControl_.selectedIndex = index);
      },
      setDisabled: (isDisabled: boolean) =>
        this.nativeControl_ && (this.nativeControl_.disabled = isDisabled),
      setValid: (isValid: boolean) => {
        isValid
          ? this.classList.root_.remove(MDCSelectFoundation.cssClasses.INVALID)
          : this.classList.root__.add(MDCSelectFoundation.cssClasses.INVALID);
      },
      checkValidity: () =>
        this.nativeControl_ && this.nativeControl_.checkValidity()
    };
  }

  getEnhancedSelectAdapterMethods_() {
    return {
      getValue: () => {
        let value = '';
        const listItem =
          this.menuElement_ &&
          this.menuElement_.querySelector(
            MDCSelectFoundation.strings.SELECTED_ITEM_SELECTOR
          );
        if (
          listItem &&
          listItem.hasAttribute(MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR)
        ) {
          value = listItem.getAttribute(
            MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR
          );
        }
        return value === '' && this.props.placeholder ? ' ' : value;
      },
      setValue: (value: string) => {
        if (this.menuElement_) {
          const element = this.menuElement_.querySelector(
            `[${MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR}="${value}"]`
          );

          const selectedIndex = element
            ? this.menu_.items.indexOf(element)
            : -1;

          const selectedItem = this.menu_ && this.menu_.items[selectedIndex];

          const selectedTextContent = selectedItem
            ? selectedItem.textContent.trim()
            : '';

          this.setState(
            {
              selectedIndex,
              selectedTextContent
            },
            () => {
              this.foundation_.layout();
              this.foundation_.adapter_.floatLabel(!!selectedTextContent);
            }
          );
        }
      },
      openMenu: () => {
        this.setState({
          menuOpen: true
        });
      },
      closeMenu: () => {
        this.setState({
          menuOpen: false
        });
      },
      isMenuOpen: () => this.state.menuOpen,
      setSelectedIndex: (index: number) => {
        this.setState({ selectedIndex: index });
      },
      setDisabled: (isDisabled: boolean) => {
        // handled by props in render function
      },
      checkValidity: () => {
        const classList = this.root_ && this.root_.classList;
        if (
          classList &&
          classList.contains(MDCSelectFoundation.cssClasses.REQUIRED) &&
          !classList.contains(MDCSelectFoundation.cssClasses.DISABLED)
        ) {
          // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
          // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
          return (
            this.state.selectedIndex !== -1 &&
            (this.state.selectedIndex !== 0 || this.value)
          );
        } else {
          return true;
        }
      },
      setValid: (isValid: boolean) => {
        this.selectedText_ &&
          this.selectedText_.setAttribute(
            'aria-invalid',
            (!isValid).toString()
          );
        isValid
          ? this.classList.root_.remove(MDCSelectFoundation.cssClasses.INVALID)
          : this.classList.root_.add(MDCSelectFoundation.cssClasses.INVALID);
      }
    };
  }

  getCommonAdapterMethods_() {
    return {
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      hasClass: (className: string) => this.classList.root_.has(className),
      isRtl: () =>
        this.root_ &&
        window.getComputedStyle(this.root_).getPropertyValue('direction') ===
          'rtl',
      setRippleCenter: (normalizedX: number) =>
        this.lineRipple_ && this.lineRipple_.setRippleCenter(normalizedX),
      activateBottomLine: () => this.lineRipple_ && this.lineRipple_.activate(),
      deactivateBottomLine: () =>
        this.lineRipple_ && this.lineRipple_.deactivate(),
      notifyChange: (value: any) => {
        // handled byt the onChange event
      }
    };
  }

  getOutlineAdapterMethods_() {
    return {
      hasOutline: () => !!this.outline_,
      notchOutline: (labelWidth: number, isRtl: boolean) => {
        if (this.outline_) {
          this.outline_.notch(labelWidth, isRtl);
        }
      },
      closeOutline: () => {
        if (this.outline_) {
          this.outline_.closeNotch();
        }
      }
    };
  }

  getLabelAdapterMethods_() {
    return {
      floatLabel: (shouldFloat: boolean) => {
        this.label_ && this.label_.float(shouldFloat);
      },
      getLabelWidth: () => {
        return this.label_ ? this.label_.getWidth() : 0;
      }
    };
  }

  getFoundationMap_() {
    return {
      leadingIcon: this.leadingIcon_ || undefined
      // helperText: this.helperText_ ? this.helperText_.foundation : undefined
    };
  }

  sync(props: SelectPropsT, prevProps?: SelectPropsT) {
    // For controlled selects that are enhanced
    // we need to jump through some checks to see if we need to update the
    // value in our foundation
    if (
      props.value !== undefined &&
      (!prevProps || prevProps.value !== props.value)
    ) {
      this.foundation_.setValue(props.value);
    }

    if (
      props.disabled !== undefined &&
      (!prevProps || prevProps.disabled !== props.disabled)
    ) {
      this.foundation_.setDisabled(props.disabled);
    }
  }

  get value() {
    return this.foundation_.getValue();
  }

  /**
   * @param {string} value The value to set on the select.
   */
  set value(value: string) {
    this.foundation_.setValue(value);
  }

  handleChange_(evt: any) {
    const { onChange } = this.props;
    onChange && onChange(evt);
    this.foundation_.handleChange(true);
  }

  handleFocus_(evt: any) {
    const { onFocus } = this.props;
    onFocus && onFocus(evt);
    this.foundation_.handleFocus();
  }

  handleBlur_(evt: any) {
    const { onBlur } = this.props;
    onBlur && onBlur(evt);
    this.foundation_.handleBlur();
  }

  handleClick_(evt: any) {
    const { onClick, onMouseDown, onTouchStart } = this.props;
    evt.type === 'click' && onClick && onClick(evt);
    evt.type === 'mousedown' && onMouseDown && onMouseDown(evt);
    evt.type === 'touchstart' && onTouchStart && onTouchStart(evt);

    const getNormalizedXCoordinate = (evt: any) => {
      const targetClientRect = evt.target.getBoundingClientRect();
      const xCoordinate = evt.clientX;
      return xCoordinate - targetClientRect.left;
    };

    if (this.selectedText_) this.selectedText_.focus();
    this.foundation_.handleClick(getNormalizedXCoordinate(evt));
  }

  handleKeydown_(evt: any) {
    const { onKeyDown } = this.props;
    onKeyDown && onKeyDown(evt);
    this.foundation_.handleKeydown(evt);
  }

  handleMenuSelected_(evt: CustomEventT<{ item: HTMLElement, index: number }>) {
    const value = evt.detail.item.dataset.value;
    this.emit(
      'onChange',
      {
        index: evt.detail.index,
        value
      },
      true
    );

    this.props.value === undefined &&
      this.getEnhancedSelectAdapterMethods_().setValue(value || '');
  }

  handleMenuOpened_() {
    // Menu should open to the last selected element.
    if (this.state.selectedIndex >= 0) {
      this.menu_.items[this.state.selectedIndex].focus();
    }
  }

  handleMenuClosed_() {
    // menuOpened_ is used to track the state of the menu opening or closing since the menu.open function
    // will return false if the menu is still closing and this method listens to the closed event which
    // occurs after the menu is already closed.
    this.setState({
      menuOpen: false
    });
    if (document.activeElement !== this.selectedText_) {
      this.foundation_.handleBlur();
    }
  }

  // handle leading and trailing icons
  renderIcon(iconNode: any, leadOrTrail: 'leadingIcon_' | 'trailingIcon_') {
    if (
      (iconNode && typeof iconNode === 'string') ||
      (iconNode.type && iconNode.type.displayName !== SelectIcon.displayName)
    ) {
      return (
        <SelectIcon
          ref={ref => {
            if (leadOrTrail === 'leadingIcon_') {
              this.leadingIcon_ = ref && ref.foundation_;
            } else {
              this.trailingIcon_ = ref && ref.foundation_;
            }
          }}
          tabIndex={leadOrTrail === 'trailingIcon_' ? 0 : undefined}
          icon={iconNode}
        />
      );
    }

    return iconNode;
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
      enhanced,
      withLeadingIcon,
      onChange,
      onFocus,
      onBlur,
      onClick,
      onKeyDown,
      ...rest
    } = this.props;

    const selectOptions = createSelectOptions(options);

    const defaultValue =
      value !== undefined ? undefined : this.props.defaultValue || '';

    const sharedEventProps = {
      onKeyDown: this.handleKeydown_,
      onChange: this.handleChange_,
      onFocus: this.handleFocus_,
      onBlur: this.handleBlur_,
      onClick: this.handleClick_,
      onTouchStart: this.handleClick_,
      onMouseDown: this.handleClick_
    };

    const sharedControlProps = {
      defaultValue,
      value,
      placeholder,
      selectOptions
    };

    return (
      <SelectRoot
        {...rootProps}
        withLeadingIcon={withLeadingIcon}
        className={this.classList.root_.renderToString()}
        outlined={outlined}
        elementRef={el => (this.root_ = el)}
        style={style}
      >
        {!!withLeadingIcon && this.renderIcon(withLeadingIcon, 'leadingIcon_')}
        <SelectDropdownArrow />

        {enhanced && (
          <input type="hidden" ref={el => (this.hiddenInput_ = el)} />
        )}

        {enhanced && (
          <div
            ref={el => (this.selectedText_ = el)}
            className="mdc-select__selected-text"
            tabIndex={this.props.disabled ? -1 : 0}
            aria-disabled={this.props.disabled ? 'true' : 'false'}
            aria-expanded={this.state.menuOpen}
            {...sharedEventProps}
          >
            {this.state.selectedTextContent}
          </div>
        )}
        {enhanced ? (
          <SelectEnhancedControl
            {...sharedControlProps}
            selectedIndex={this.state.selectedIndex}
            apiRef={apiRef => {
              this.menu_ = apiRef;
            }}
            elementRef={el => (this.menuElement_ = el)}
            open={this.state.menuOpen}
            onClose={this.handleMenuClosed_}
            onOpen={this.handleMenuOpened_}
            onSelect={this.handleMenuSelected_}
          >
            {children}
          </SelectEnhancedControl>
        ) : (
          <SelectNativeControl
            {...rest}
            elementRef={el => (this.nativeControl_ = el)}
            {...sharedControlProps}
            {...sharedEventProps}
          >
            {children}
          </SelectNativeControl>
        )}
        <FloatingLabel ref={el => (this.label_ = el)}>{label}</FloatingLabel>
        {!!outlined && <NotchedOutline ref={el => (this.outline_ = el)} />}
        {!!outlined ? (
          <NotchedOutlineIdle />
        ) : (
          <LineRipple ref={el => (this.lineRipple_ = el)} />
        )}
      </SelectRoot>
    );
  }
}

export class SelectIcon extends FoundationComponent<IconPropsT> {
  static displayName = 'SelectIcon';
  root_: null | HTMLElement;

  constructor(props: IconPropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCSelectIconFoundation({
      getAttr: attr => this.propsList.root_.get(attr),
      setAttr: (attr, value) => this.propsList.root_.add(attr, value),
      removeAttr: attr => this.propsList.root_.remove(attr),
      setContent: content => {
        this.root_ && (this.root_.textContent = content);
      },
      registerInteractionHandler: (evtType, handler) =>
        this.propsList.root_.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) =>
        this.propsList.root_.removeEventListener(evtType, handler),
      notifyIconAction: () => this.emit('onClick', {}, true)
    });
  }

  render() {
    return (
      <Icon
        {...this.props}
        {...this.propsList.root_.all()}
        className={`mdc-select__icon ${this.classList.root_.renderToString()}`}
      />
    );
  }
}

export type SelectHelperTextPropsT = {
  /** Make the help text always visible */
  persistent?: boolean,
  /** Make the help a validation message style */
  validationMsg?: boolean
};

export class SelectHelperText extends Component<SelectHelperTextPropsT> {
  static displayName = 'TextFieldHelperText';
  tag = 'p';
  classNames = (props: SelectHelperTextPropsT) => [
    'mdc-select-helper-text',
    {
      'mdc-select-helper-text--persistent': props.persistent,
      'mdc-select-helper-text--validation-msg': props.validationMsg
    }
  ];
  consumeProps = ['persistent', 'validationMsg'];
}

/**
 * A Select Component
 */
export const Select: React.ComponentType<SelectPropsT> = ({
  enhanced,
  ...rest
}) => (
  <SelectBase
    key={enhanced ? 'enhanced' : 'native'}
    enhanced={enhanced}
    {...rest}
  />
);

export default Select;
