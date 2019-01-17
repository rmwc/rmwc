import { ComponentProps } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';
import * as React from 'react';
import {
  MDCTextFieldFoundation,
  MDCTextFieldIconFoundation
  // @ts-ignore
} from '@material/textfield';

import { componentFactory, FoundationComponent } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';
import { Icon } from '@rmwc/icon';
import { LineRipple } from '@rmwc/line-ripple';
import { FloatingLabel } from '@rmwc/floating-label';
import { NotchedOutline, NotchedOutlineIdle } from '@rmwc/notched-outline';

/*********************************************************************
 * TextField
 *********************************************************************/
export type TextFieldPropsT = {
  /** Makes a multiline TextField. */
  textarea?: boolean;
  /** Sets the value for controlled TextFields. */
  value?: string | number;
  /** Makes the TextField fullwidth. */
  fullwidth?: boolean;
  /** A ref for the native input. */
  inputRef?: React.Ref<any>;
  /** Disables the input. */
  disabled?: boolean;
  /** Mark the input as required. */
  required?: boolean;
  /** Makes the TextField visually invalid. This is sometimes automatically applied in cases where required or pattern is used.  */
  invalid?: boolean;
  /** Makes the TextField dense */
  dense?: boolean;
  /** Outline the TextField */
  outlined?: boolean;
  /** A label for the input. */
  label?: React.ReactNode;
  /** Add a leading icon. */
  withLeadingIcon?: React.ReactNode;
  /** Add a trailing icon. */
  withTrailingIcon?: React.ReactNode;
  /** By default, props spread to the input. These props are for the component's root container. */
  rootProps?: Object;
  /** The type of input field to render */
  type?: string;
} & ComponentProps;

const TextFieldRoot = componentFactory<TextFieldPropsT>({
  displayName: 'TextFieldRoot',
  deprecate: {
    box: ''
  },
  classNames: (props: TextFieldPropsT) => [
    'mdc-text-field',
    'mdc-text-field--upgraded',
    {
      'mdc-text-field--textarea': props.textarea,
      'mdc-text-field--fullwidth': props.fullwidth,
      'mdc-text-field--outlined': props.outlined,
      'mdc-text-field--dense': props.dense,
      'mdc-text-field--invalid': props.invalid,
      'mdc-text-field--disabled': props.disabled,
      'mdc-text-field--with-leading-icon': !!props.withLeadingIcon,
      'mdc-text-field--with-trailing-icon': !!props.withTrailingIcon
    }
  ],
  consumeProps: [
    'textarea',
    'fullwidth',
    'outlined',
    'dense',
    'invalid',
    'disabled',
    'withLeadingIcon',
    'withTrailingIcon'
  ]
});

const TextFieldInput = componentFactory({
  displayName: 'TextFieldInput',
  defaultProps: {
    type: 'text'
  },
  tag: 'input',
  classNames: ['mdc-text-field__input']
});

const TextFieldTextarea = componentFactory({
  displayName: 'TextFieldTextarea',
  tag: 'textarea',
  classNames: ['mdc-text-field__input']
});

/** A TextField component for accepting text input from a user. */
export class TextField extends FoundationComponent<TextFieldPropsT> {
  static displayName = 'TextField';
  generatedId: string;
  root_: null | HTMLElement = null;
  input_: null | HTMLInputElement | HTMLTextAreaElement = null;
  label_: null | any;
  lineRipple_: null | any;
  leadingIcon_: null | any;
  trailingIcon_: null | any;
  outline_: null | any;
  valueNeedsUpdate = false;

  constructor(props: TextFieldPropsT) {
    super(props);
    this.generatedId = randomId('text-field');
    this.createClassList('root_');
    this.createPropsList('root_');
    this.createPropsList('input_');
  }

  getDefaultFoundation() {
    return new MDCTextFieldFoundation(
      {
        addClass: (className: string) => this.classList.root_.add(className),
        removeClass: (className: string) =>
          this.classList.root_.remove(className),
        hasClass: (className: string) => this.classList.root_.has(className),
        registerTextFieldInteractionHandler: (
          evtType: string,
          handler: () => void
        ) => this.propsList.root_.addEventListener(evtType, handler),
        deregisterTextFieldInteractionHandler: (
          evtType: string,
          handler: () => void
        ) => this.propsList.root_.removeEventListener(evtType, handler),
        registerValidationAttributeChangeHandler: (
          handler: (changes: (string | null)[]) => void
        ) => {
          const getAttributesList = (mutationsList: MutationRecord[]) =>
            mutationsList.map(mutation => mutation.attributeName);
          if (this.input_) {
            const observer = new MutationObserver(mutationsList =>
              handler(getAttributesList(mutationsList))
            );
            const targetNode = this.input_;
            const config = { attributes: true };
            targetNode && observer.observe(targetNode, config);
            return observer;
          }

          return {};
        },
        deregisterValidationAttributeChangeHandler: (observer: null | any) => {
          observer && observer.disconnect();
        },
        isFocused: () => {
          return document.activeElement === this.input_;
        },
        isRtl: () =>
          this.root_ &&
          window.getComputedStyle(this.root_).getPropertyValue('direction') ===
            'rtl',

        ...this.getInputAdapterMethods_(),
        ...this.getLabelAdapterMethods_(),
        ...this.getLineRippleAdapterMethods_(),
        ...this.getOutlineAdapterMethods_()
      },
      this.getFoundationMap_()
    );
  }

  getLabelAdapterMethods_() {
    return {
      shakeLabel: (shouldShake: boolean) =>
        this.label_ && this.label_.shake(shouldShake),
      floatLabel: (shouldFloat: boolean) =>
        this.label_ && this.label_.float(shouldFloat),
      hasLabel: () => !!this.label_,
      getLabelWidth: () => this.label_ && this.label_.getWidth()
    };
  }

  getLineRippleAdapterMethods_() {
    return {
      activateLineRipple: () => {
        if (this.lineRipple_) {
          this.lineRipple_.activate();
        }
      },
      deactivateLineRipple: () => {
        if (this.lineRipple_) {
          this.lineRipple_.deactivate();
        }
      },
      setLineRippleTransformOrigin: (normalizedX: number) => {
        if (this.lineRipple_) {
          this.lineRipple_.setRippleCenter(normalizedX);
        }
      }
    };
  }

  getOutlineAdapterMethods_() {
    return {
      notchOutline: (labelWidth: number, isRtl: boolean) => {
        this.outline_ && this.outline_.notch(labelWidth, isRtl);
      },
      closeOutline: () => this.outline_ && this.outline_.closeNotch(),
      hasOutline: () => !!this.outline_
    };
  }

  getInputAdapterMethods_() {
    return {
      registerInputInteractionHandler: (evtType: string, handler: () => void) =>
        this.propsList.input_.addEventListener(evtType, handler),
      deregisterInputInteractionHandler: (
        evtType: string,
        handler: () => void
      ) => this.propsList.input_.removeEventListener(evtType, handler),
      getNativeInput: () => this.input_
    };
  }

  getFoundationMap_() {
    return {
      // helperText: this.helperText_ ? this.helperText_.foundation : undefined,
      helperText: undefined,
      leadingIcon: this.leadingIcon_,
      trailingIcon: this.trailingIcon_
    };
  }

  // handle leading and trailing icons
  renderIcon(iconNode: any, leadOrTrail: 'leadingIcon_' | 'trailingIcon_') {
    if (
      (iconNode && typeof iconNode === 'string') ||
      (iconNode.type && iconNode.type.displayName !== TextFieldIcon.displayName)
    ) {
      return (
        <TextFieldIcon
          ref={(ref: TextFieldIcon) => {
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

  sync(props: TextFieldPropsT) {
    // Bug #362
    // see comments below in render function
    if (this.valueNeedsUpdate) {
      this.foundation.setValue(props.value);
      this.valueNeedsUpdate = false;
    }
  }

  render() {
    const {
      label = '',
      className,
      style,
      inputRef,
      outlined,
      fullwidth,
      dense,
      invalid,
      disabled,
      withLeadingIcon,
      withTrailingIcon,
      children,
      textarea,
      rootProps = {},
      ...rest
    } = this.props;

    // Fixes bug #362
    // MDC breaks Reacts unidirectional data flow...
    // we cant set the value on render, but we need to
    // to create the side effects for the UI when we dynamically update the field
    // Flag that it needs to be set so that we can call the foundation
    // on componentDidUpdate
    if (
      this.props.value !== undefined &&
      this.props.value !== this.foundation.getValue()
    ) {
      this.valueNeedsUpdate = true;
    }

    const tagProps = {
      disabled: disabled,
      elementRef: (ref: HTMLInputElement | HTMLTextAreaElement) => {
        this.input_ = ref;
        typeof inputRef === 'function' && inputRef(ref);
      },
      id: rest['id'] || randomId('text-field'),
      ...this.propsList.input_.all(rest)
    };

    const tag = textarea ? (
      <TextFieldTextarea {...tagProps} />
    ) : (
      <TextFieldInput {...tagProps} />
    );

    return (
      <TextFieldRoot
        {...rootProps}
        invalid={invalid}
        withLeadingIcon={!!withLeadingIcon}
        withTrailingIcon={!!withTrailingIcon}
        textarea={textarea}
        dense={dense}
        disabled={disabled}
        outlined={outlined}
        fullwidth={fullwidth}
        ref={ref => (this.root_ = ref)}
        className={[className, this.classList.root_.renderToString()]
          .filter(Boolean)
          .join(' ')}
        style={style}
        {...this.propsList.root_.all()}
      >
        {!!withLeadingIcon && this.renderIcon(withLeadingIcon, 'leadingIcon_')}
        {children}
        {tag}
        {!!label && (
          <FloatingLabel
            ref={(ref: FloatingLabel) => (this.label_ = ref && ref.foundation)}
            htmlFor={tagProps.id}
          >
            {label}
          </FloatingLabel>
        )}
        {!!withTrailingIcon &&
          this.renderIcon(withTrailingIcon, 'trailingIcon_')}

        {!!outlined && (
          <NotchedOutline
            ref={(ref: NotchedOutline) =>
              (this.outline_ = ref && ref.foundation)
            }
          />
        )}
        {!!outlined ? (
          <NotchedOutlineIdle />
        ) : (
          <LineRipple
            ref={(ref: LineRipple) =>
              (this.lineRipple_ = ref && ref.foundation)
            }
          />
        )}
      </TextFieldRoot>
    );
  }
}

/*********************************************************************
 * Helper Text
 *********************************************************************/
export type TextFieldHelperTextPropsT = {
  /** Make the help text always visible */
  persistent?: boolean;
  /** Make the help a validation message style */
  validationMsg?: boolean;
} & ComponentProps;

/** A help text component */
export const TextFieldHelperText = componentFactory<TextFieldHelperTextPropsT>({
  displayName: 'TextFieldHelperText',
  tag: 'p',
  classNames: (props: TextFieldHelperTextPropsT) => [
    'mdc-text-field-helper-text',
    {
      'mdc-text-field-helper-text--persistent': props.persistent,
      'mdc-text-field-helper-text--validation-msg': props.validationMsg
    }
  ],
  consumeProps: ['persistent', 'validationMsg']
});

/*********************************************************************
 * Icon
 *********************************************************************/

/**
 * An Icon in a TextField
 */
export class TextFieldIcon extends FoundationComponent<IconProps> {
  static displayName = 'TextFieldIcon';
  root_: null | HTMLElement = null;

  constructor(props: IconProps) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCTextFieldIconFoundation({
      getAttr: (attr: string) => this.propsList.root_.get(attr),
      setAttr: (attr: string, value: string) =>
        this.propsList.root_.add(attr, value),
      removeAttr: (attr: string) => this.propsList.root_.remove(attr),
      setContent: (content: string) => {
        this.root_ && (this.root_.textContent = content);
      },
      registerInteractionHandler: (evtType: string, handler: () => void) =>
        this.propsList.root_.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType: string, handler: () => void) =>
        this.propsList.root_.removeEventListener(evtType, handler),
      notifyIconAction: () => this.emit('onClick', {}, true)
    });
  }

  render() {
    return (
      <Icon
        {...this.props}
        {...this.propsList.root_.all()}
        className={`mdc-text-field__icon ${this.classList.root_.renderToString()}`}
      />
    );
  }
}

export default TextField;
