import * as RMWC from '@rmwc/types';
import * as React from 'react';
import {} from '@rmwc/base';

// @ts-ignore
import { MDCSelectFoundation, MDCSelectIconFoundation } from '@material/select';

import {
  componentFactory,
  FoundationComponent,
  CustomEventT,
  randomId
} from '@rmwc/base';
import { FloatingLabel } from '@rmwc/floating-label';
import { LineRipple } from '@rmwc/line-ripple';
import { Icon, IconProps, IconPropT } from '@rmwc/icon';
import { NotchedOutline } from '@rmwc/notched-outline';
import { Menu, MenuItem, MenuItems, MenuProps } from '@rmwc/menu';
import { ListGroup, ListGroupSubheader, ListDivider } from '@rmwc/list';
import { withRipple } from '@rmwc/ripple';

export interface FormattedOption extends React.AllHTMLAttributes<any> {
  label: string;
  value: string;
  options?: FormattedOption[];
}

export interface SelectProps {
  /** The value for a controlled select. */
  value?: string;
  /** Options accepts flat arrays, value => label maps, and more. See examples for details. */
  options?: FormattedOption[] | string[] | { [value: string]: string };
  /** A label for the form control. */
  label?: string;
  /** Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label. */
  placeholder?: string;
  /** Makes the select outlined. */
  outlined?: boolean;
  /** Disables the form control. */
  disabled?: boolean;
  /** Renders a non native / enhanced dropdown */
  enhanced?: boolean;
  /** Props for the root element. By default, additional props spread to the native select element.  */
  rootProps?: Object;
  /** A className for the root element. */
  className?: string;
  /** Add a leading icon. */
  withLeadingIcon?: IconPropT;
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

const SelectRoot = withRipple()(
  componentFactory<SelectProps>({
    displayName: 'SelectRoot',
    defaultProps: {
      role: 'listbox'
    },
    classNames: (props: SelectProps) => [
      'mdc-select',
      {
        'mdc-select--outlined': !!props.outlined,
        'mdc-select--with-leading-icon': !!props.withLeadingIcon
      }
    ],
    consumeProps: ['outlined', 'withLeadingIcon']
  })
);

class SelectDropdownArrow extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <i className="mdc-select__dropdown-icon" />;
  }
}

class SelectNativeControl extends React.Component<
  {
    selectOptions: any;
    placeholder?: string;
    children: React.ReactNode;
    elementRef: React.Ref<HTMLSelectElement>;
    value: any;
    defaultValue?: any;
  } & React.HTMLProps<HTMLSelectElement>
> {
  static displayName = 'SelectNativeControl';

  render() {
    const {
      selectOptions,
      placeholder = '',
      children,
      elementRef,
      ...rest
    } = this.props;

    return (
      <select
        {...rest}
        ref={elementRef}
        className={`mdc-select__native-control ${rest.className || ''}`}
      >
        {!this.props.value && !this.props.defaultValue && (
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
}

interface SelectEnhancedControlProps extends MenuProps {
  selectOptions: any;
  selectedIndex: number;
  placeholder?: string;
  apiRef: React.Ref<any>;
  value?: string;
  defaultValue?: any;
  children?: React.ReactNode;
}

// eslint-disable-next-line
class SelectEnhancedControl extends React.Component<
  SelectEnhancedControlProps
> {
  render() {
    const {
      selectOptions,
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
      <Menu {...rest} ref={apiRef} className="mdc-select__menu">
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
}

interface SelectState {
  selectedIndex: number;
  selectedTextContent: string;
  menuOpen: boolean;
}

export class SelectBase extends FoundationComponent<SelectProps, SelectState> {
  private root = this.createElement<HTMLSelectElement>('root');
  private lineRipple = this.createElement<LineRipple>('lineRipple');
  private outline = this.createElement<NotchedOutline>('outline');
  private label = this.createElement<FloatingLabel>('label');
  id: string = this.props.id || randomId('select');
  nativeControl: HTMLSelectElement | null = null;
  selectedText: HTMLElement | null = null;
  menuElement: HTMLElement | null = null;
  menu: Menu | null = null;
  hiddenInput_: HTMLInputElement | null = null;
  leadingIcon_: SelectIcon | null = null;
  trailingIcon_: HTMLElement | null = null;

  state = {
    selectedIndex: this.props.placeholder !== undefined ? 0 : -1,
    menuOpen: false,
    selectedTextContent: ''
  };

  constructor(props: SelectProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleMenuSelected = this.handleMenuSelected.bind(this);
    this.handleMenuOpened = this.handleMenuOpened.bind(this);
    this.handleMenuClosed = this.handleMenuClosed.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();

    const { enhanced, value } = this.props;

    if (this.menu) {
      this.menuElement =
        this.root.ref && this.root.ref.querySelector('.mdc-select__menu');
      this.menu.hoistMenuToBody();
      this.root.ref && this.menu.setAnchorElement(this.root.ref);
      //this.menu.wrapFocus = false;

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
    this.foundation.handleChange(false);

    if (this.props.disabled) {
      this.foundation.setDisabled(true);
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    // TODO: Switch this to a Portal
    this.menuElement &&
      this.menuElement.parentNode &&
      this.menuElement.parentNode.removeChild(this.menuElement);
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
        const value = this.nativeControl && this.nativeControl.value;
        return value === '' && this.props.placeholder ? ' ' : value;
      },
      setValue: (value: string) =>
        this.nativeControl && (this.nativeControl.value = value),
      openMenu: () => {},
      closeMenu: () => {},
      isMenuOpen: () => false,
      setSelectedIndex: (index: number) => {
        this.nativeControl && (this.nativeControl.selectedIndex = index);
      },
      setDisabled: (isDisabled: boolean) =>
        this.nativeControl && (this.nativeControl.disabled = isDisabled),
      setValid: (isValid: boolean) => {
        isValid
          ? this.root.removeClass(MDCSelectFoundation.cssClasses.INVALID)
          : this.root.addClass(MDCSelectFoundation.cssClasses.INVALID);
      },
      checkValidity: () =>
        this.nativeControl && this.nativeControl.checkValidity()
    };
  }

  getEnhancedSelectAdapterMethods_() {
    return {
      getValue: () => {
        let value = '';
        const listItem: any =
          this.menuElement &&
          this.menuElement.querySelector('.mdc-list-item--activated');
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
        if (this.menuElement) {
          const element = this.menuElement.querySelector(
            `[${MDCSelectFoundation.strings.ENHANCED_VALUE_ATTR}="${value}"]`
          );

          const selectedIndex =
            element && this.menu
              ? this.menu.items.indexOf(element as HTMLLIElement)
              : -1;
          const selectedItem = this.menu && this.menu.items[selectedIndex];

          const selectedTextContent =
            selectedItem && selectedItem.textContent
              ? selectedItem.textContent.trim()
              : '';

          this.setState(
            {
              selectedIndex,
              selectedTextContent
            },
            () => {
              this.foundation.layout();
              this.foundation.adapter_.floatLabel(!!selectedTextContent);
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
        const classList = this.root.ref && this.root.ref.classList;
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
        this.selectedText &&
          this.selectedText.setAttribute('aria-invalid', (!isValid).toString());
        isValid
          ? this.root.removeClass(MDCSelectFoundation.cssClasses.INVALID)
          : this.root.addClass(MDCSelectFoundation.cssClasses.INVALID);
      }
    };
  }

  getCommonAdapterMethods_() {
    return {
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      hasClass: (className: string) => this.root.hasClass(className),
      isRtl: () =>
        this.root.ref &&
        window.getComputedStyle(this.root.ref).getPropertyValue('direction') ===
          'rtl',
      setRippleCenter: (normalizedX: number) =>
        this.lineRipple.setProp('center', normalizedX),
      activateBottomLine: () => this.lineRipple.setProp('active', true),
      deactivateBottomLine: () => this.lineRipple.setProp('active', false),
      notifyChange: (value: any) => {
        // handled byt the onChange event
      }
    };
  }

  getOutlineAdapterMethods_() {
    return {
      hasOutline: () => !!this.props.outlined,
      notchOutline: (labelWidth: number) => {
        this.outline.setProp('notch', labelWidth);
      },
      closeOutline: () => {
        this.outline.removeProp('notch');
      }
    };
  }

  getLabelAdapterMethods_() {
    return {
      floatLabel: (shouldFloat: boolean) => {
        this.label.setProp('float', shouldFloat);
      },
      getLabelWidth: () => {
        return this.label.ref ? this.label.ref.getWidth() : 0;
      }
    };
  }

  getFoundationMap_() {
    return {
      leadingIcon: this.leadingIcon_ || undefined
      // helperText: this.helperText_ ? this.helperText_.foundation : undefined
    };
  }

  sync(props: SelectProps, prevProps?: SelectProps) {
    // For controlled selects that are enhanced
    // we need to jump through some checks to see if we need to update the
    // value in our foundation
    if (
      props.value !== undefined &&
      (!prevProps || prevProps.value !== props.value)
    ) {
      this.foundation.setValue(props.value);
    }

    if (
      props.disabled !== undefined &&
      (!prevProps || prevProps.disabled !== props.disabled)
    ) {
      this.foundation.setDisabled(props.disabled);
    }
  }

  get value() {
    return this.foundation.getValue();
  }

  /**
   * @param {string} value The value to set on the select.
   */
  set value(value: string) {
    this.foundation.setValue(value);
  }

  handleChange(evt: any) {
    const { onChange } = this.props;
    onChange && onChange(evt);
    this.foundation.handleChange(true);
  }

  handleFocus(evt: any) {
    const { onFocus } = this.props;
    onFocus && onFocus(evt);
    this.foundation.handleFocus();
  }

  handleBlur(evt: any) {
    const { onBlur } = this.props;
    onBlur && onBlur(evt);
    this.foundation.handleBlur();
  }

  handleClick(evt: any) {
    const { onClick, onMouseDown, onTouchStart } = this.props;
    evt.type === 'click' && onClick && onClick(evt);
    evt.type === 'mousedown' && onMouseDown && onMouseDown(evt);
    evt.type === 'touchstart' && onTouchStart && onTouchStart(evt);

    const getNormalizedXCoordinate = (evt: any) => {
      const targetClientRect = evt.target.getBoundingClientRect();
      const xCoordinate = evt.clientX;
      return xCoordinate - targetClientRect.left;
    };

    if (this.selectedText) this.selectedText.focus();
    this.foundation.handleClick(getNormalizedXCoordinate(evt));
  }

  handleKeydown(evt: any) {
    const { onKeyDown } = this.props;
    onKeyDown && onKeyDown(evt);
    this.foundation.handleKeydown(evt);
  }

  handleMenuSelected(evt: CustomEventT<{ item: HTMLElement; index: number }>) {
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

  handleMenuOpened() {
    // Menu should open to the last selected element.
    if (this.menu && this.state.selectedIndex >= 0) {
      this.menu.items[this.state.selectedIndex].focus();
    }
  }

  handleMenuClosed() {
    // menuOpened_ is used to track the state of the menu opening or closing since the menu.open function
    // will return false if the menu is still closing and this method listens to the closed event which
    // occurs after the menu is already closed.
    this.setState({
      menuOpen: false
    });
    if (document.activeElement !== this.selectedText) {
      this.foundation.handleBlur();
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
          ref={(ref: any) => {
            if (leadOrTrail === 'leadingIcon_') {
              this.leadingIcon_ = ref && ref.foundation;
            } else {
              this.trailingIcon_ = ref && ref.foundation;
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
      rootProps = {},
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
      onKeyDown: this.handleKeydown,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onTouchStart: this.handleClick,
      onMouseDown: this.handleClick
    };

    const sharedControlProps = {
      defaultValue,
      value,
      placeholder,
      selectOptions
    };

    const renderedLabel = (
      <FloatingLabel {...this.label.props({})} ref={this.label.setRef}>
        {label}
      </FloatingLabel>
    );

    return (
      <SelectRoot
        ripple={!outlined}
        {...this.root.props(rootProps)}
        withLeadingIcon={withLeadingIcon}
        outlined={outlined}
        ref={this.root.setRef}
      >
        {!!withLeadingIcon && this.renderIcon(withLeadingIcon, 'leadingIcon_')}
        <SelectDropdownArrow />

        {enhanced ? (
          <React.Fragment>
            <input type="hidden" ref={el => (this.hiddenInput_ = el)} />
            <div
              ref={el => (this.selectedText = el)}
              className="mdc-select__selected-text"
              tabIndex={this.props.disabled ? -1 : 0}
              aria-disabled={this.props.disabled ? 'true' : 'false'}
              aria-expanded={this.state.menuOpen}
              {...sharedEventProps}
            >
              {this.state.selectedTextContent}
            </div>
            <SelectEnhancedControl
              {...sharedControlProps}
              selectedIndex={this.state.selectedIndex}
              apiRef={apiRef => {
                this.menu = apiRef;
              }}
              open={this.state.menuOpen}
              onClose={this.handleMenuClosed}
              onOpen={this.handleMenuOpened}
              onSelect={this.handleMenuSelected}
            >
              {children}
            </SelectEnhancedControl>
          </React.Fragment>
        ) : (
          <SelectNativeControl
            {...rest}
            elementRef={(el: any) => (this.nativeControl = el)}
            {...sharedControlProps}
            {...sharedEventProps}
          >
            {children}
          </SelectNativeControl>
        )}
        {!!outlined ? (
          <NotchedOutline {...this.outline.props({})}>
            {renderedLabel}
          </NotchedOutline>
        ) : (
          <React.Fragment>
            {renderedLabel}
            <LineRipple {...this.lineRipple.props({})} />
          </React.Fragment>
        )}
      </SelectRoot>
    );
  }
}

export class SelectIcon extends FoundationComponent<IconProps> {
  static displayName = 'SelectIcon';
  private root = this.createElement('root');

  getDefaultFoundation(): any {
    return new MDCSelectIconFoundation({
      getAttr: (attr: string) => this.root.getProp(attr as any),
      setAttr: (attr: string, value: string) =>
        this.root.setProp(attr as any, value),
      removeAttr: (attr: string) => this.root.removeProp(attr as any),
      setContent: (content: string) => {
        this.root.ref && (this.root.ref.textContent = content);
      },
      registerInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) => this.root.addEventListener(evtType, handler),
      deregisterInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) => this.root.removeEventListener(evtType, handler),
      notifyIconAction: () => this.emit('onClick', {}, true)
    });
  }

  render() {
    return (
      <Icon
        {...this.root.props({
          ...this.props,
          className: 'mdc-select__icon'
        })}
      />
    );
  }
}

export interface SelectHelperTextProps {
  /** Make the help text always visible */
  persistent?: boolean;
  /** Make the help a validation message style */
  validationMsg?: boolean;
}

export const SelectHelperText = componentFactory<SelectHelperTextProps>({
  displayName: 'TextFieldHelperText',
  tag: 'p',
  classNames: (props: SelectHelperTextProps) => [
    'mdc-select-helper-text',
    {
      'mdc-select-helper-text--persistent': props.persistent,
      'mdc-select-helper-text--validation-msg': props.validationMsg
    }
  ],
  consumeProps: ['persistent', 'validationMsg']
});

/**
 * A Select Component
 */
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

export default Select;
