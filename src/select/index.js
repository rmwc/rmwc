// @flow
import type { SimpleTagPropsT } from '@rmwc/base';
import * as React from 'react';
import { MDCSelectFoundation } from '@material/select';
import {
  simpleTag,
  Component,
  FoundationComponent,
  syncFoundationProp
} from '@rmwc/base';
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

class SelectNativeControl extends Component<{}> {
  static displayName = 'SelectNativeControl';
  tag = 'select';
  classNames = ['mdc-select__native-control'];
}

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

class SelectDropdownArrow extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <i class="mdc-select__dropdown-icon" />;
  }
}

export class Select extends FoundationComponent<SelectPropsT> {
  root_: HTMLElement | null;
  nativeControl_: HTMLSelectElement | null;
  lineRipple_: LineRipple | null;
  outline_: NotchedOutline | null;
  label_: FloatingLabel | null;
  handleChange_: any;
  handleFocus_: any;
  handleBlur_: any;
  handleClick_: any;
  handleKeydown_: any;
  handleMenuSelected_: any;
  handleMenuOpened_: any;
  handleMenuClosed_: any;

  constructor(props: SelectPropsT) {
    super(props);
    this.createClassList('root_');
  }

  componentDidMount() {
    super.componentDidMount();

    this.handleChange_ = () =>
      this.foundation_.handleChange(/* didChange */ true);
    this.handleFocus_ = () => this.foundation_.handleFocus();
    this.handleBlur_ = () => this.foundation_.handleBlur();
    this.handleClick_ = evt => {
      if (this.selectedText_) this.selectedText_.focus();
      this.foundation_.handleClick(this.getNormalizedXCoordinate_(evt));
    };
    this.handleKeydown_ = evt => this.foundation_.handleKeydown(evt);
    this.handleMenuSelected_ = evtData =>
      (this.selectedIndex = evtData.detail.index);
    this.handleMenuOpened_ = () => {
      // Menu should open to the last selected element.
      if (this.selectedIndex >= 0) {
        this.menu_.items[this.selectedIndex].focus();
      }
    };
    this.handleMenuClosed_ = () => {
      // menuOpened_ is used to track the state of the menu opening or closing since the menu.open function
      // will return false if the menu is still closing and this method listens to the closed event which
      // occurs after the menu is already closed.
      this.menuOpened_ = false;
      this.selectedText_.removeAttribute('aria-expanded');
      if (document.activeElement !== this.selectedText_) {
        this.foundation_.handleBlur();
      }
    };

    const element = this.nativeControl_
      ? this.nativeControl_
      : this.selectedText_;

    element.addEventListener('change', this.handleChange_);
    element.addEventListener('focus', this.handleFocus_);
    element.addEventListener('blur', this.handleBlur_);

    ['mousedown', 'touchstart'].forEach(evtType => {
      element.addEventListener(evtType, this.handleClick_);
    });

    // if (this.menuElement_) {
    //   this.selectedText_.addEventListener('keydown', this.handleKeydown_);
    //   this.menu_.listen(
    //     menuSurfaceConstants.strings.CLOSED_EVENT,
    //     this.handleMenuClosed_
    //   );
    //   this.menu_.listen(
    //     menuSurfaceConstants.strings.OPENED_EVENT,
    //     this.handleMenuOpened_
    //   );
    //   this.menu_.listen(
    //     menuConstants.strings.SELECTED_EVENT,
    //     this.handleMenuSelected_
    //   );

    //   if (this.hiddenInput_ && this.hiddenInput_.value) {
    //     // If the hidden input already has a value, use it to restore the select's value.
    //     // This can happen e.g. if the user goes back or (in some browsers) refreshes the page.
    //     const enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
    //     enhancedAdapterMethods.setValue(this.hiddenInput_.value);
    //   } else if (
    //     this.menuElement_.querySelector(strings.SELECTED_ITEM_SELECTOR)
    //   ) {
    //     // If an element is selected, the select should set the initial selected text.
    //     const enhancedAdapterMethods = this.getEnhancedSelectAdapterMethods_();
    //     enhancedAdapterMethods.setValue(enhancedAdapterMethods.getValue());
    //   }
    // }

    // Initially sync floating label
    this.foundation_.handleChange(/* didChange */ false);

    if (this.nativeControl_ && this.nativeControl_.disabled) {
      this.disabled = true;
    }
  }

  getDefaultFoundation() {
    return new MDCSelectFoundation(
      /** @type {!MDCSelectAdapter} */ (Object.assign(
        //this.nativeControl_
        this.getNativeSelectAdapterMethods_(),
        // : this.getEnhancedSelectAdapterMethods_(),
        this.getCommonAdapterMethods_(),
        this.getOutlineAdapterMethods_(),
        this.getLabelAdapterMethods_()
      )),
      this.getFoundationMap_()
    );
  }

  /**
   * @return {!{
   *   getValue: function(): string,
   *   setValue: function(string): string,
   *   openMenu: function(): void,
   *   closeMenu: function(): void,
   *   isMenuOpen: function(): boolean,
   *   setSelectedIndex: function(number): void,
   *   setDisabled: function(boolean): void
   * }}
   * @private
   */
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

  /**
   * @return {!{
   *   getValue: function(): string,
   *   setValue: function(string): string,
   *   openMenu: function(): void,
   *   closeMenu: function(): void,
   *   isMenuOpen: function(): boolean,
   *   setSelectedIndex: function(number): void,
   *   setDisabled: function(boolean): void
   * }}
   * @private
   */
  getEnhancedSelectAdapterMethods_() {
    return {};
    // return {
    //   getValue: () => {
    //     const listItem = this.menuElement_.querySelector(
    //       strings.SELECTED_ITEM_SELECTOR
    //     );
    //     if (listItem && listItem.hasAttribute(strings.ENHANCED_VALUE_ATTR)) {
    //       return listItem.getAttribute(strings.ENHANCED_VALUE_ATTR);
    //     }
    //     return '';
    //   },
    //   setValue: value => {
    //     const element = /** @type {HTMLElement} */ (this.menuElement_.querySelector(
    //       `[${strings.ENHANCED_VALUE_ATTR}="${value}"]`
    //     ));
    //     this.setEnhancedSelectedIndex_(
    //       element ? this.menu_.items.indexOf(element) : -1
    //     );
    //   },
    //   openMenu: () => {
    //     if (this.menu_ && !this.menu_.open) {
    //       this.menu_.open = true;
    //       this.menuOpened_ = true;
    //       this.selectedText_.setAttribute('aria-expanded', 'true');
    //     }
    //   },
    //   closeMenu: () => {
    //     if (this.menu_ && this.menu_.open) {
    //       this.menu_.open = false;
    //     }
    //   },
    //   isMenuOpen: () => this.menu_ && this.menuOpened_,
    //   setSelectedIndex: index => {
    //     this.setEnhancedSelectedIndex_(index);
    //   },
    //   setDisabled: isDisabled => {
    //     this.selectedText_.setAttribute('tabindex', isDisabled ? '-1' : '0');
    //     this.selectedText_.setAttribute('aria-disabled', isDisabled.toString());
    //     if (this.hiddenInput_) {
    //       this.hiddenInput_.disabled = isDisabled;
    //     }
    //   },
    //   checkValidity: () => {
    //     const classList = this.root_.classList;
    //     if (
    //       classList.contains(cssClasses.REQUIRED) &&
    //       !classList.contains(cssClasses.DISABLED)
    //     ) {
    //       // See notes for required attribute under https://www.w3.org/TR/html52/sec-forms.html#the-select-element
    //       // TL;DR: Invalid if no index is selected, or if the first index is selected and has an empty value.
    //       return (
    //         this.selectedIndex !== -1 &&
    //         (this.selectedIndex !== 0 || this.value)
    //       );
    //     } else {
    //       return true;
    //     }
    //   },
    //   setValid: isValid => {
    //     this.selectedText_.setAttribute('aria-invalid', (!isValid).toString());
    //     isValid
    //       ? this.root_.classList.remove(cssClasses.INVALID)
    //       : this.root_.classList.add(cssClasses.INVALID);
    //   }
    // };
  }

  /**
   * @return {!{
   *   addClass: function(string): void,
   *   removeClass: function(string): void,
   *   hasClass: function(string): void,
   *   isRtl: function(): boolean,
   *   setRippleCenter: function(number): void,
   *   activateBottomLine: function(): void,
   *   deactivateBottomLine: function(): void,
   *   notifyChange: function(string): void
   * }}
   * @private
   */
  getCommonAdapterMethods_() {
    return {
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      hasClass: (className: string) => this.classList.root_.has(className),
      isRtl: () =>
        window.getComputedStyle(this.root_).getPropertyValue('direction') ===
        'rtl',
      setRippleCenter: (normalizedX: number) =>
        this.lineRipple_ && this.lineRipple_.setRippleCenter(normalizedX),
      activateBottomLine: () => this.lineRipple_ && this.lineRipple_.activate(),
      deactivateBottomLine: () =>
        this.lineRipple_ && this.lineRipple_.deactivate(),
      notifyChange: (value: any) => {
        const index = this.selectedIndex;
        this.emit('onChange', { value, index }, true /* shouldBubble  */);
      }
    };
  }

  /**
   * @return {!{
   *   hasOutline: function(): boolean,
   *   notchOutline: function(number, boolean): undefined,
   *   closeOutline: function(): undefined,
   * }}
   */
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

  /**
   * @return {!{
   *   floatLabel: function(boolean): undefined,
   *   getLabelWidth: function(): number,
   * }}
   */
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

  /**
   * Calculates where the line ripple should start based on the x coordinate within the component.
   * @param {!(MouseEvent|TouchEvent)} evt
   * @return {number} normalizedX
   */
  getNormalizedXCoordinate_(evt: any) {
    const targetClientRect = evt.target.getBoundingClientRect();
    const xCoordinate = evt.clientX;
    return xCoordinate - targetClientRect.left;
  }

  /**
   * Returns a map of all subcomponents to subfoundations.
   * @return {!FoundationMapType}
   */
  getFoundationMap_() {
    return {
      leadingIcon: this.leadingIcon_ ? this.leadingIcon_.foundation : undefined,
      helperText: this.helperText_ ? this.helperText_.foundation : undefined
    };
  }

  get selectedIndex() {
    let selectedIndex;
    if (this.menuElement_) {
      // const selectedEl = /** @type {!HTMLElement} */ (this.menuElement_.querySelector(
      //   strings.SELECTED_ITEM_SELECTOR
      // ));
      // selectedIndex = this.menu_.items.indexOf(selectedEl);
    } else {
      selectedIndex = this.nativeControl_.selectedIndex;
    }
    return selectedIndex;
  }

  /**
   * @param {number} selectedIndex The index of the option to be set on the select.
   */
  set selectedIndex(selectedIndex: number) {
    this.foundation_.setSelectedIndex(selectedIndex);
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

    const selectOptions = createSelectOptions(options);

    return (
      <SelectRoot
        {...rootProps}
        className={this.classList.root_.renderToString()}
        outlined={outlined}
        elementRef={el => (this.root_ = el)}
        style={style}
      >
        <SelectDropdownArrow />
        <SelectNativeControl
          {...rest}
          elementRef={el => (this.nativeControl_ = el)}
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

// ({
//   constructor: MDCSelect,
//   adapter: {
//     getValue: function() {
//       const value = this.nativeControl_.value;
//       return value === '' && this.props.placeholder ? ' ' : value;
//     }
//   }
// })<SelectPropsT> {
//   static displayName = 'Select';

//   disabled: boolean;
//   value: any;
//   foundation_: any;

//   syncWithProps(nextProps: SelectPropsT) {
//     //disabled
//     syncFoundationProp(
//       nextProps.disabled,
//       this.disabled,
//       () => (this.disabled = !!nextProps.disabled)
//     );

//     // value
//     syncFoundationProp(
//       nextProps.value,
//       this.value,
//       () => (this.value = nextProps.value)
//     );

//     // options
//     if (
//       nextProps.options &&
//       (nextProps.placeholder === undefined || nextProps.value) &&
//       JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)
//     ) {
//       this.foundation_.adapter_.floatLabel(true);
//       this.foundation_.notchOutline(true);
//     }
//   }

//   render() {

//   }
// }

export default Select;
