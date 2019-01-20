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
import { NotchedOutline } from '@rmwc/notched-outline';
import { deprecationWarning } from '@rmwc/base/utils/deprecation';

/*********************************************************************
 * TextField
 *********************************************************************/
export interface TextFieldProps {
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
}

export interface DeprecatedTextfieldProps {
  /** DEPRECATED: Is being removed from MCW. */
  dense?: boolean;
}

const TextFieldRoot = componentFactory<
  TextFieldProps & DeprecatedTextfieldProps
>({
  displayName: 'TextFieldRoot',
  deprecate: {
    box: ''
  },
  classNames: (props: TextFieldProps & DeprecatedTextfieldProps) => [
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
export class TextField extends FoundationComponent<
  TextFieldProps & DeprecatedTextfieldProps
> {
  static displayName = 'TextField';
  generatedId = randomId('textfield');
  root = this.createElement('root');
  input = this.createElement<HTMLInputElement & HTMLTextAreaElement>('input');
  label_: null | any;
  lineRipple_: null | any;
  leadingIcon_: null | any;
  trailingIcon_: null | any;
  outline_: null | any;
  valueNeedsUpdate = false;

  getDefaultFoundation() {
    return new MDCTextFieldFoundation(
      {
        addClass: (className: string) => this.root.addClass(className),
        removeClass: (className: string) => this.root.removeClass(className),
        hasClass: (className: string) => this.root.hasClass(className),
        registerTextFieldInteractionHandler: (
          evtType: string,
          handler: () => void
        ) => this.root.addEventListener(evtType, handler),
        deregisterTextFieldInteractionHandler: (
          evtType: string,
          handler: () => void
        ) => this.root.removeEventListener(evtType, handler),
        registerValidationAttributeChangeHandler: (
          handler: (changes: (string | null)[]) => void
        ) => {
          const getAttributesList = (mutationsList: MutationRecord[]) =>
            mutationsList.map(mutation => mutation.attributeName);
          if (this.input.ref) {
            const observer = new MutationObserver(mutationsList =>
              handler(getAttributesList(mutationsList))
            );
            const targetNode = this.input.ref;
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
          return document.activeElement === this.input.ref;
        },
        isRtl: () =>
          this.root.ref &&
          window
            .getComputedStyle(this.root.ref)
            .getPropertyValue('direction') === 'rtl',

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
        this.input.addEventListener(evtType, handler),
      deregisterInputInteractionHandler: (
        evtType: string,
        handler: () => void
      ) => this.input.removeEventListener(evtType, handler),
      getNativeInput: () => this.input.ref
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

  sync(props: TextFieldProps) {
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

    if (dense !== undefined) {
      deprecationWarning(
        `Textfield prop 'dense' is being removed in a future release by material-components-web.`
      );
    }

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
      ref: this.input.setRef,
      id: rest.id || this.generatedId,
      ...this.input.props(rest)
    };

    const tag = textarea ? (
      <TextFieldTextarea {...tagProps} />
    ) : (
      <TextFieldInput {...tagProps} />
    );

    const renderedLabel = label ? (
      <FloatingLabel
        ref={(ref: FloatingLabel) => (this.label_ = ref && ref.foundation)}
        htmlFor={tagProps.id}
      >
        {label}
      </FloatingLabel>
    ) : null;

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
        ref={this.root.setRef}
        style={style}
        {...this.root.props({ ...rootProps, className })}
      >
        {!!withLeadingIcon && this.renderIcon(withLeadingIcon, 'leadingIcon_')}
        {children}
        {tag}

        {!!outlined ? (
          <React.Fragment>
            <NotchedOutline
              ref={(ref: NotchedOutline) =>
                (this.outline_ = ref && ref.foundation)
              }
            >
              {renderedLabel}
            </NotchedOutline>
            {!!withTrailingIcon &&
              this.renderIcon(withTrailingIcon, 'trailingIcon_')}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderedLabel}
            {!!withTrailingIcon &&
              this.renderIcon(withTrailingIcon, 'trailingIcon_')}
            <LineRipple
              ref={(ref: LineRipple) =>
                (this.lineRipple_ = ref && ref.foundation)
              }
            />
          </React.Fragment>
        )}
      </TextFieldRoot>
    );
  }
}

/*********************************************************************
 * Helper Text
 *********************************************************************/
export interface TextFieldHelperTextProps {
  /** Make the help text always visible */
  persistent?: boolean;
  /** Make the help a validation message style */
  validationMsg?: boolean;
}

/** A help text component */
export const TextFieldHelperText = componentFactory<TextFieldHelperTextProps>({
  displayName: 'TextFieldHelperText',
  tag: 'p',
  classNames: (props: TextFieldHelperTextProps) => [
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
  root = this.createElement('root');

  getDefaultFoundation() {
    return new MDCTextFieldIconFoundation({
      getAttr: (attr: string) => this.root.getProp(attr),
      setAttr: (attr: string, value: string) => this.root.addProp(attr, value),
      removeAttr: (attr: string) => this.root.removeProp(attr),
      setContent: (content: string) => {
        this.root.addProp('icon', content);
      },
      registerInteractionHandler: (evtType: string, handler: () => void) =>
        this.root.addEventListener(evtType, handler),
      deregisterInteractionHandler: (evtType: string, handler: () => void) =>
        this.root.removeEventListener(evtType, handler),
      notifyIconAction: () => this.emit('onClick', {}, true)
    });
  }

  render() {
    return (
      <Icon
        {...this.root.props({
          ...this.props,
          className: 'mdc-text-field__icon'
        })}
      />
    );
  }
}
