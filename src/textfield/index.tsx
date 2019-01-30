import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { IconProps, IconPropT } from '@rmwc/icon';
import {
  MDCTextFieldFoundation,
  MDCTextFieldIconFoundation
  // @ts-ignore
} from '@material/textfield';

import {
  componentFactory,
  FoundationComponent,
  randomId,
  deprecationWarning
} from '@rmwc/base';
import { Icon } from '@rmwc/icon';
import { LineRipple } from '@rmwc/line-ripple';
import { FloatingLabel } from '@rmwc/floating-label';
import { NotchedOutline } from '@rmwc/notched-outline';

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
  withLeadingIcon?: IconPropT;
  /** Add a trailing icon. */
  withTrailingIcon?: IconPropT;
  /** By default, props spread to the input. These props are for the component's root container. */
  rootProps?: Object;
  /** A reference to the native input or textarea. */
  inputRef?: (ref: HTMLInputElement | HTMLTextAreaElement | null) => void;
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
  private root = this.createElement('root');
  private input = this.createElement<HTMLInputElement & HTMLTextAreaElement>(
    'input'
  );
  private label = this.createElement<FloatingLabel>('label');
  private lineRipple = this.createElement<LineRipple>('lineRipple');
  leadingIcon: null | any;
  trailingIcon: null | any;
  outline: null | any;
  valueNeedsUpdate = false;

  constructor(props: any) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

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

        ...this.getInputAdapterMethods(),
        ...this.getLabelAdapterMethods(),
        ...this.getLineRippleAdapterMethods(),
        ...this.getOutlineAdapterMethods()
      },
      this.getFoundationMap()
    );
  }

  getLabelAdapterMethods() {
    return {
      shakeLabel: (shouldShake: boolean) =>
        this.label.setProp('shake', shouldShake),
      floatLabel: (shouldFloat: boolean) =>
        this.label.setProp('float', shouldFloat),
      hasLabel: () => !!this.props.label,
      getLabelWidth: () => this.label.ref && this.label.ref.getWidth()
    };
  }

  getLineRippleAdapterMethods() {
    return {
      activateLineRipple: () => {
        if (this.lineRipple) {
          this.lineRipple.setProp('active', true);
        }
      },
      deactivateLineRipple: () => {
        if (this.lineRipple) {
          this.lineRipple.setProp('active', false);
        }
      },
      setLineRippleTransformOrigin: (normalizedX: number) => {
        if (this.lineRipple) {
          this.lineRipple.setProp('center', normalizedX);
        }
      }
    };
  }

  getOutlineAdapterMethods() {
    return {
      notchOutline: (labelWidth: number, isRtl: boolean) => {
        this.outline && this.outline.notch(labelWidth, isRtl);
      },
      closeOutline: () => this.outline && this.outline.closeNotch(),
      hasOutline: () => !!this.outline
    };
  }

  getInputAdapterMethods() {
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

  getFoundationMap() {
    return {
      // helperText: this.helperText_ ? this.helperText_.foundation : undefined,
      helperText: undefined,
      leadingIcon: this.leadingIcon,
      trailingIcon: this.trailingIcon
    };
  }

  // handle leading and trailing icons
  renderIcon(icon: IconPropT, leadOrTrail: 'leadingIcon' | 'trailingIcon') {
    return (
      <TextFieldIcon
        ref={(ref: TextFieldIcon) => {
          if (leadOrTrail === 'leadingIcon') {
            this.leadingIcon = ref && ref.foundation;
          } else {
            this.trailingIcon = ref && ref.foundation;
          }
        }}
        tabIndex={leadOrTrail === 'trailingIcon' ? 0 : undefined}
        icon={icon}
      />
    );
  }

  sync(props: TextFieldProps) {
    // Bug #362
    // see comments below in render function
    if (this.valueNeedsUpdate) {
      this.foundation.setValue(props.value);
      this.valueNeedsUpdate = false;
    }
  }

  handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    // this.props.onChange && this.props.onChange(evt);
    // this.setState({});
  }

  render() {
    const {
      label = '',
      className,
      style,
      outlined,
      fullwidth,
      dense,
      invalid,
      disabled,
      withLeadingIcon,
      withTrailingIcon,
      children,
      textarea,
      inputRef,
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
      ...this.input.props(rest),
      disabled: disabled,
      ref: (ref: HTMLInputElement | HTMLTextAreaElement | null) => {
        this.input.setRef(ref);
        inputRef && inputRef(ref);
      },
      id: rest.id || this.generatedId
    };

    const tag = textarea ? (
      <TextFieldTextarea {...tagProps} />
    ) : (
      <TextFieldInput {...tagProps} />
    );

    const renderedLabel = label ? (
      <FloatingLabel
        {...this.label.props({})}
        ref={this.label.setRef}
        htmlFor={tagProps.id}
      >
        {label}
      </FloatingLabel>
    ) : null;

    return (
      <TextFieldRoot
        {...this.root.props({ ...rootProps, className })}
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
      >
        {!!withLeadingIcon && this.renderIcon(withLeadingIcon, 'leadingIcon')}
        {children}
        {tag}

        {!!outlined ? (
          <React.Fragment>
            <NotchedOutline
              ref={(ref: NotchedOutline) =>
                (this.outline = ref && ref.foundation)
              }
            >
              {renderedLabel}
            </NotchedOutline>
            {!!withTrailingIcon &&
              this.renderIcon(withTrailingIcon, 'trailingIcon')}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderedLabel}
            {!!withTrailingIcon &&
              this.renderIcon(withTrailingIcon, 'trailingIcon')}
            <LineRipple {...this.lineRipple.props({})} />
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
  private root = this.createElement('root');

  getDefaultFoundation() {
    return new MDCTextFieldIconFoundation({
      getAttr: (attr: string) => this.root.getProp(attr as any),
      setAttr: (attr: string, value: string) =>
        this.root.setProp(attr as any, value),
      removeAttr: (attr: string) => this.root.removeProp(attr as any),
      setContent: (content: string) => {
        // @ts-ignore
        this.root.setProp('icon', content);
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
