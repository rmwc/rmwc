// @flow
import type { SimpleTagPropsT } from '@rmwc/base';
import type { IconPropsT } from '@rmwc/icon';
import * as React from 'react';
import {
  MDCTextFieldFoundation,
  MDCTextFieldIconFoundation
} from '@material/textfield/dist/mdc.textfield';

import { Component, FoundationComponent, randomId } from '@rmwc/base';

import { Icon } from '@rmwc/icon';
import { LineRipple } from '@rmwc/line-ripple';
import { FloatingLabel } from '@rmwc/floating-label';
import { NotchedOutline, NotchedOutlineIdle } from '@rmwc/notched-outline';

/*********************************************************************
 * TextField
 *********************************************************************/
export type TextFieldPropsT = {
  /** Makes a multiline TextField. */
  textarea?: boolean,
  /** Sets the value for controlled TextFields. */
  value?: string | number,
  /** Makes the TextField fullwidth. */
  fullwidth?: boolean,
  /** A ref for the native input. */
  inputRef?: React.Ref<any>,
  /** Disables the input. */
  disabled?: boolean,
  /** Mark the input as required. */
  required?: boolean,
  /** Makes the TextField visually invalid. This is sometimes automatically applied in cases where required or pattern is used.  */
  invalid?: boolean,
  /** Makes the TextField dense */
  dense?: boolean,
  /** Outline the TextField */
  outlined?: boolean,
  /** A label for the input. */
  label?: React.Node,
  /** Add a leading icon. */
  withLeadingIcon?: React.Node,
  /** Add a trailing icon. */
  withTrailingIcon?: React.Node,
  /** By default, props spread to the input. These props are for the component's root container. */
  rootProps?: Object,
  /** The type of input field to render */
  type?: string
  //$FlowFixMe
} & React.InputHTMLAttributes<HTMLInputElement>;

class TextFieldRoot extends Component<TextFieldPropsT> {
  static displayName = 'TextFieldRoot';
  deprecate = {
    box: ''
  };
  classNames = (props: TextFieldPropsT) => [
    'mdc-text-field',
    'mdc-text-field--upgraded',
    {
      'mdc-text-field--textarea': props.textarea,
      'mdc-text-field--fullwidth': props.fullwidth,
      'mdc-text-field--outlined': props.outlined,
      'mdc-text-field--dense': props.dense,
      'mdc-text-field--invalid': props.invalid,
      'mdc-text-field--disabled': props.disabled,
      'mdc-text-field--with-leading-icon': props.withLeadingIcon,
      'mdc-text-field--with-trailing-icon': props.withTrailingIcon
    }
  ];
  consumeProps = [
    'textarea',
    'fullwidth',
    'outlined',
    'dense',
    'invalid',
    'disabled',
    'withLeadingIcon',
    'withTrailingIcon'
  ];
}

class TextFieldInput extends Component<{}> {
  static displayName = 'TextFieldInput';
  static defaultProps = {
    type: 'text'
  };
  tag = 'input';
  classNames = ['mdc-text-field__input'];
}

class TextFieldTextarea extends Component<{}> {
  static displayName = 'TextFieldTextarea';
  tag = 'textarea';
  classNames = ['mdc-text-field__input'];
}

/** A TextField component for accepting text input from a user. */
export class TextField extends FoundationComponent<TextFieldPropsT> {
  static displayName = 'TextField';
  generatedId: string;
  root_: null | HTMLElement;
  input_: null | HTMLInputElement | HTMLTextAreaElement;
  label_: null | any;
  lineRipple_: null | any;
  leadingIcon_: null | any;
  trailingIcon_: null | any;
  outline_: null | any;

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
        addClass: className => this.classList.root_.add(className),
        removeClass: className => this.classList.root_.remove(className),
        hasClass: className => this.classList.root_.has(className),
        registerTextFieldInteractionHandler: (evtType, handler) =>
          this.propsList.root_.addEventListener(evtType, handler),
        deregisterTextFieldInteractionHandler: (evtType, handler) =>
          this.propsList.root_.removeEventListener(evtType, handler),
        registerValidationAttributeChangeHandler: handler => {
          const getAttributesList = mutationsList =>
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
      registerInputInteractionHandler: (evtType: string, handler: Function) =>
        this.propsList.input_.addEventListener(evtType, handler),
      deregisterInputInteractionHandler: (evtType: string, handler: Function) =>
        this.propsList.input_.removeEventListener(evtType, handler),
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

    const tagProps = {
      ...rest,
      disabled: disabled,
      elementRef: ref => {
        this.input_ = ref;
        typeof inputRef === 'function' && inputRef(ref);
      },
      id: rest['id'] || randomId('text-field'),
      ...this.propsList.input_.all()
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
        elementRef={ref => (this.root_ = ref)}
        className={`${className} ${this.classList.root_.renderToString()}`}
        style={style}
        {...this.propsList.root_.all()}
      >
        {!!withLeadingIcon && this.renderIcon(withLeadingIcon, 'leadingIcon_')}
        {children}
        {tag}
        {!!label && (
          <FloatingLabel
            ref={ref => (this.label_ = ref && ref.foundation_)}
            htmlFor={tagProps.id}
          >
            {label}
          </FloatingLabel>
        )}
        {!!withTrailingIcon &&
          this.renderIcon(withTrailingIcon, 'trailingIcon_')}

        {!!outlined && (
          <NotchedOutline
            ref={ref => (this.outline_ = ref && ref.foundation_)}
          />
        )}
        {!!outlined ? (
          <NotchedOutlineIdle />
        ) : (
          <LineRipple
            ref={ref => (this.lineRipple_ = ref && ref.foundation_)}
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
  persistent?: boolean,
  /** Make the help a validation message style */
  validationMsg?: boolean
} & SimpleTagPropsT;

/**
 * A help text component
 */
export class TextFieldHelperText extends Component<TextFieldHelperTextPropsT> {
  static displayName = 'TextFieldHelperText';
  tag = 'p';
  classNames = (props: TextFieldHelperTextPropsT) => [
    'mdc-text-field-helper-text',
    {
      'mdc-text-field-helper-text--persistent': props.persistent,
      'mdc-text-field-helper-text--validation-msg': props.validationMsg
    }
  ];
  consumeProps = ['persistent', 'validationMsg'];
}

/*********************************************************************
 * Icon
 *********************************************************************/

/**
 * An Icon in a TextField
 */
export class TextFieldIcon extends FoundationComponent<IconPropsT> {
  static displayName = 'TextFieldIcon';
  root_: null | HTMLElement;

  constructor(props: IconPropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
  }

  getDefaultFoundation() {
    return new MDCTextFieldIconFoundation({
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
        className={`mdc-text-field__icon ${this.classList.root_.renderToString()}`}
      />
    );
  }
}

export default TextField;
