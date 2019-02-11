import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { IconProps, IconPropT } from '@rmwc/icon';
import {
  MDCTextFieldFoundation,
  MDCTextFieldIconFoundation,
  MDCTextFieldCharacterCounterFoundation
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
import { withRipple } from '@rmwc/ripple';

/*********************************************************************
 * TextField
 *********************************************************************/
export interface TextFieldProps {
  /** Sets the value for controlled TextFields. */
  value?: string | number;
  /** Adds help text to the field */
  helpText?: React.ReactNode | TextFieldHelperTextProps;
  /** Shows the character count, must be used in conjunction with maxLength. */
  characterCount?: boolean;
  /** Makes the TextField visually invalid. This is sometimes automatically applied in cases where required or pattern is used.  */
  invalid?: boolean;
  /** Makes the Textfield disabled.  */
  disabled?: boolean;
  /** Makes the Textfield required.  */
  required?: boolean;
  /** Outline the TextField */
  outlined?: boolean;
  /** A label for the input. */
  label?: React.ReactNode;
  /** Makes a multiline TextField. */
  textarea?: boolean;
  /** Makes the TextField fullwidth. */
  fullwidth?: boolean;
  /** Add a leading icon. */
  icon?: IconPropT;
  /** Add a trailing icon. */
  trailingIcon?: IconPropT;
  /** By default, props spread to the input. These props are for the component's root container. */
  rootProps?: Object;
  /** A reference to the native input or textarea. */
  inputRef?: (ref: HTMLInputElement | HTMLTextAreaElement | null) => void;
  /** The type of input field to render, search, number, etc */
  type?: string;
}

export interface DeprecatedTextfieldProps {
  /** DEPRECATED: Is being removed from MCW. */
  dense?: boolean;
  /** DEPRECATED: Use icon. */
  withLeadingIcon?: IconPropT;
  /** DEPRECATED: Use trailingIcon. */
  withTrailingIcon?: IconPropT;
}

const TextFieldRoot = withRipple()(
  componentFactory<TextFieldProps & DeprecatedTextfieldProps>({
    displayName: 'TextFieldRoot',
    deprecate: {
      box: ''
    },
    classNames: (
      props: TextFieldProps & DeprecatedTextfieldProps & RMWC.ComponentProps
    ) => [
      'mdc-text-field',
      'mdc-text-field--upgraded',
      {
        'mdc-text-field--textarea': props.textarea,
        'mdc-text-field--fullwidth': props.fullwidth,
        'mdc-text-field--outlined': props.outlined,
        'mdc-text-field--dense': props.dense,
        'mdc-text-field--invalid': props.invalid,
        'mdc-text-field--disabled': props.disabled,
        'mdc-text-field--with-leading-icon': !!props.icon,
        'mdc-text-field--with-trailing-icon': !!props.trailingIcon,
        'mdc-text-field--no-label': !props.label
      }
    ],
    consumeProps: [
      'textarea',
      'fullwidth',
      'outlined',
      'dense',
      'invalid',
      'disabled',
      'icon',
      'trailingIcon',
      'label'
    ]
  })
);

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
  characterCounter: null | TextFieldCharacterCount = null;
  leadingIcon: null | TextFieldIcon = null;
  trailingIcon: null | TextFieldIcon = null;
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
      characterCounter:
        this.characterCounter && this.characterCounter.foundation,
      helperText: undefined,
      leadingIcon: this.leadingIcon && this.leadingIcon.foundation,
      trailingIcon: this.trailingIcon && this.trailingIcon.foundation
    };
  }

  // handle leading and trailing icons
  renderIcon(icon: IconPropT, leadOrTrail: 'leadingIcon' | 'trailingIcon') {
    return (
      <TextFieldIcon
        ref={(ref: TextFieldIcon) => {
          if (leadOrTrail === 'leadingIcon') {
            this.leadingIcon = ref;
          } else {
            this.trailingIcon = ref;
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

  renderHelpText(renderedCharacterCounter?: React.ReactNode) {
    const { helpText, characterCount, textarea } = this.props;
    const shouldRender = !!helpText || (characterCount && !textarea);

    if (!shouldRender) {
      return null;
    }

    const shouldSpread =
      typeof helpText === 'object' && !React.isValidElement(helpText);

    return (
      <div className="mdc-text-field-helper-line">
        {helpText && shouldSpread ? (
          <TextFieldHelperText {...helpText as any} />
        ) : (
          <TextFieldHelperText>{helpText}</TextFieldHelperText>
        )}
        {!textarea && renderedCharacterCounter}
      </div>
    );
  }

  render() {
    const {
      label,
      className,
      style,
      outlined,
      fullwidth,
      dense,
      invalid,
      disabled,
      helpText,
      children,
      textarea,
      inputRef,
      characterCount,
      icon: _icon,
      trailingIcon: _trailingIcon,
      withLeadingIcon: _withLeadingIcon,
      withTrailingIcon: _withTrailingIcon,
      rootProps = {},
      ...rest
    } = this.props;

    let { icon, trailingIcon, withLeadingIcon, withTrailingIcon } = this.props;

    if (dense !== undefined) {
      deprecationWarning(
        `Textfield prop 'dense' is being removed in a future release by material-components-web.`
      );
    }

    if (withLeadingIcon !== undefined) {
      deprecationWarning(
        `Textfield prop 'withLeadingIcon' is now 'leadingIcon'.`
      );
      icon = withLeadingIcon;
    }

    if (withTrailingIcon !== undefined) {
      deprecationWarning(
        `Textfield prop 'withTrailingIcon' is now 'trailingIcon'.`
      );
      trailingIcon = withTrailingIcon;
    }

    // Fixes bug #362
    // MDC breaks Reacts unidirectional data flow...
    // we cant set the value on render, but we need to
    // to create the side effects for the UI when we dynamically update the field
    // Flag that it needs to be set so that we can call the foundation
    // on componentDidUpdate
    if (
      this.props.value !== undefined &&
      this.foundation &&
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

    const renderedTag = textarea ? (
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

    const renderedCharacterCounter = characterCount ? (
      <TextFieldCharacterCount
        ref={(el: TextFieldCharacterCount | null) => {
          this.characterCounter = el;
        }}
      >
        F
      </TextFieldCharacterCount>
    ) : null;

    return (
      <React.Fragment>
        <TextFieldRoot
          {...this.root.props({
            ...rootProps,
            className,
            style
          })}
          label={label}
          invalid={invalid}
          icon={!!icon}
          trailingIcon={!!trailingIcon}
          textarea={textarea}
          dense={dense}
          disabled={disabled}
          outlined={outlined}
          fullwidth={fullwidth}
          ref={this.root.setRef}
        >
          {!!icon && this.renderIcon(icon, 'leadingIcon')}
          {children}
          {/** Render character counter in different place for textarea */}
          {!!textarea && renderedCharacterCounter}
          {renderedTag}

          {!!outlined ? (
            <React.Fragment>
              <NotchedOutline
                ref={(ref: NotchedOutline) =>
                  (this.outline = ref && ref.foundation)
                }
              >
                {renderedLabel}
              </NotchedOutline>
              {!!trailingIcon && this.renderIcon(trailingIcon, 'trailingIcon')}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {renderedLabel}
              {!!trailingIcon && this.renderIcon(trailingIcon, 'trailingIcon')}
              <LineRipple {...this.lineRipple.props({})} />
            </React.Fragment>
          )}
        </TextFieldRoot>
        {this.renderHelpText(renderedCharacterCounter)}
      </React.Fragment>
    );
  }
}

/*********************************************************************
 * Helper Text
 *********************************************************************/

interface TextFieldHelperCharacterCount {}

class TextFieldCharacterCount extends FoundationComponent<
  TextFieldHelperCharacterCount
> {
  static displayName = 'TextFieldCharacterCount';

  state = {
    content: ''
  };

  getDefaultFoundation() {
    return new MDCTextFieldCharacterCounterFoundation({
      setContent: (content: string) => {
        this.setState({ content });
      }
    });
  }

  render() {
    return (
      <div className="mdc-text-field-character-counter">
        {this.state.content}
      </div>
    );
  }
}

export interface TextFieldHelperTextProps {
  /** Make the help text always visible */
  persistent?: boolean;
  /** Make the help a validation message style */
  validationMsg?: boolean;
  /** Content for the help text */
  children: React.ReactNode;
}

/** A help text component */
export const TextFieldHelperText = componentFactory<TextFieldHelperTextProps>({
  displayName: 'TextFieldHelperText',
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
