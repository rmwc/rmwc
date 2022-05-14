import * as RMWC from '@rmwc/types';
import React from 'react';
import { IconProps } from '@rmwc/icon';
import {
  MDCTextFieldCharacterCounterFoundation,
  MDCTextFieldIconFoundation,
  MDCTextFieldFoundation
} from '@material/textfield';

import { useClassNames, Tag, useId, createComponent } from '@rmwc/base';
import { Icon } from '@rmwc/icon';
import { LineRipple } from '@rmwc/line-ripple';
import { FloatingLabel } from '@rmwc/floating-label';
import { NotchedOutline } from '@rmwc/notched-outline';
import { withRipple } from '@rmwc/ripple';

import { useTextFieldIconFoundation } from './textfield-icon-foundation';
import { useTextFieldCharacterCountFoundation } from './textfield-character-count-foundation';
import { useTextFieldFoundation } from './textfield-foundation';

/*********************************************************************
 * TextField
 *********************************************************************/

/** A TextField component for accepting text input from a user. */
export interface TextFieldProps extends RMWC.WithRippleProps {
  /** Sets the value for controlled TextFields. */
  value?: string | number;
  /** Adds help text to the field */
  helpText?: React.ReactNode | TextFieldHelperTextProps;
  /** Shows the character count, must be used in conjunction with maxLength. */
  characterCount?: boolean;
  /** Makes the TextField visually invalid. This is sometimes automatically applied in cases where required or pattern is used.  */
  invalid?: boolean;
  /** Makes the Textfield disabled. */
  disabled?: boolean;
  /** Makes the Textfield required. */
  required?: boolean;
  /** Outline the TextField. */
  outlined?: boolean;
  /** How to align the text inside the TextField. Defaults to 'start'. */
  align?: 'start' | 'end';
  /** A label for the input. */
  label?: React.ReactNode;
  /** The label floats automatically based on value, but you can use this prop for manual control. */
  floatLabel?: boolean;
  /** Makes a multiline TextField. */
  textarea?: boolean;
  /** Makes the TextField fullwidth. */
  fullwidth?: boolean;
  /** Add a leading icon. */
  icon?: RMWC.IconPropT;
  /** Add a trailing icon. */
  trailingIcon?: RMWC.IconPropT;
  /** By default, props spread to the input. These props are for the component's root container. */
  rootProps?: Object;
  /** A reference to the native input or textarea. */
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement | null>;
  /** The type of input field to render, search, number, etc */
  type?: string;
  /** Add prefix. */
  prefix?: string;
  /** Add suffix. */
  suffix?: string;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCTextFieldFoundation | null>;
  /** Make textarea resizeable */
  resizeable?: boolean;
}

export type TextFieldHTMLProps = RMWC.HTMLProps<
  HTMLInputElement,
  Omit<React.AllHTMLAttributes<HTMLInputElement>, 'label'>
>;

/** A TextField component for accepting text input from a user. */
export const TextField: RMWC.ComponentType<
  TextFieldProps,
  TextFieldHTMLProps,
  'input'
> = createComponent<TextFieldProps, TextFieldHTMLProps>(function TextField(
  props,
  ref
) {
  const {
    label,
    style,
    outlined,
    align,
    fullwidth,
    invalid,
    disabled,
    helpText,
    children,
    textarea,
    inputRef,
    characterCount,
    icon,
    trailingIcon,
    rootProps = {},
    foundationRef,
    ripple,
    prefix,
    suffix,
    resizeable,
    floatLabel: userFloatLabel,
    ...rest
  } = props;

  const {
    rootEl,
    inputEl,
    shakeLabel,
    floatLabel,
    notchWidth,
    lineRippleActive,
    lineRippleCenter,
    setLeadingIcon,
    setTrailingIcon,
    setFloatingLabel,
    setCharacterCounter
  } = useTextFieldFoundation(props);

  const id = useId('textfield', props);
  const labelId = id + '-label';

  const className = useClassNames(props, [
    'mdc-text-field',
    'mdc-text-field--upgraded',
    {
      'mdc-text-field--filled': !outlined,
      'mdc-text-field--textarea': textarea,
      'mdc-text-field--fullwidth': fullwidth,
      'mdc-text-field--outlined': outlined,
      'mdc-text-field--invalid': invalid,
      'mdc-text-field--disabled': disabled,
      'mdc-text-field--with-leading-icon': !!icon,
      'mdc-text-field--with-trailing-icon': !!trailingIcon,
      'mdc-text-field--no-label': !label,
      'mdc-text-field--end-aligned': align === 'end'
    }
  ]);

  // handle leading and trailing icons
  const renderIcon = (
    icon: RMWC.IconPropT,
    position: 'leading' | 'trailing'
  ) => {
    return (
      <TextFieldIcon
        apiRef={(api) => {
          position === 'leading' ? setLeadingIcon(api) : setTrailingIcon(api);
        }}
        position={position}
        tabIndex={position === 'trailing' ? 0 : undefined}
        icon={icon}
      />
    );
  };

  const renderHelpText = (renderedCharacterCounter?: React.ReactNode) => {
    const shouldRender = !!helpText || (characterCount && !textarea);

    if (!shouldRender) {
      return null;
    }

    const shouldSpread =
      typeof helpText === 'object' && !React.isValidElement(helpText);

    return (
      <div className="mdc-text-field-helper-line">
        {helpText && shouldSpread ? (
          <TextFieldHelperText {...(helpText as any)} />
        ) : (
          <TextFieldHelperText>{helpText}</TextFieldHelperText>
        )}
        {!textarea && renderedCharacterCounter}
      </div>
    );
  };

  const renderedLabel = label ? (
    <FloatingLabel
      shake={shakeLabel}
      float={floatLabel}
      apiRef={setFloatingLabel}
      id={labelId}
    >
      {label}
    </FloatingLabel>
  ) : null;

  const renderedCharacterCounter = characterCount ? (
    <TextFieldCharacterCount apiRef={setCharacterCounter} />
  ) : null;

  const renderTextarea = resizeable ? (
    <span className="mdc-text-field__resizer">
      <Tag
        {...rest}
        element={inputEl}
        className="mdc-text-field__input"
        disabled={disabled}
        tag="textarea"
        ref={inputRef}
      />
      {renderedCharacterCounter}
    </span>
  ) : (
    <>
      <Tag
        {...rest}
        element={inputEl}
        className="mdc-text-field__input"
        disabled={disabled}
        tag="textarea"
        ref={inputRef}
      />
      {renderedCharacterCounter}
    </>
  );

  return (
    <>
      <TextFieldRoot
        {...rootProps}
        element={rootEl}
        style={style}
        className={className}
        ref={ref}
        aria-labelledby={labelId}
      >
        {!!icon && renderIcon(icon, 'leading')}
        {children}
        <TextFieldRipple />
        {!!prefix && !textarea && <TextFieldPrefix prefix={prefix} />}
        {textarea ? (
          renderTextarea
        ) : (
          <Tag
            {...rest}
            element={inputEl}
            className="mdc-text-field__input"
            disabled={disabled}
            tag="input"
            ref={inputRef}
          />
        )}
        {!!suffix && !textarea && <TextFieldSuffix suffix={suffix} />}
        {!!outlined ? (
          <>
            <NotchedOutline notch={notchWidth}>{renderedLabel}</NotchedOutline>
            {!!trailingIcon && renderIcon(trailingIcon, 'trailing')}
          </>
        ) : (
          <>
            {renderedLabel}
            {!!trailingIcon && renderIcon(trailingIcon, 'trailing')}
            <LineRipple active={lineRippleActive} center={lineRippleCenter} />
          </>
        )}
      </TextFieldRoot>
      {renderHelpText(renderedCharacterCounter)}
    </>
  );
});

const TextFieldRipple = React.memo(function TextFieldRipple() {
  return <span className="mdc-text-field__ripple"></span>;
});

const TextFieldRoot = withRipple({ surface: false })(
  React.forwardRef(function TextFieldRoot(props: any, ref: React.Ref<any>) {
    return <Tag {...props} tag="label" ref={ref} />;
  })
);

const TextFieldPrefix = React.memo(function TextFieldPrefix({
  prefix
}: {
  prefix: string;
}) {
  return (
    <span className="mdc-text-field__affix mdc-text-field__affix--prefix">
      {prefix}
    </span>
  );
});

const TextFieldSuffix = React.memo(function TextFieldSuffix({
  suffix
}: {
  suffix: string;
}) {
  return (
    <span className="mdc-text-field__affix mdc-text-field__affix--suffix">
      {suffix}
    </span>
  );
});

/*********************************************************************
 * Character Count
 *********************************************************************/

export interface TextFieldCharacterCountApi {
  getFoundation: () => MDCTextFieldCharacterCounterFoundation;
}

export interface TextFieldCharacterCountProps extends IconProps {
  apiRef?: (api: TextFieldCharacterCountApi | null) => void;
}

const TextFieldCharacterCount = React.memo(function TextFieldCharacterCount(
  props: TextFieldCharacterCountProps
) {
  const { content } = useTextFieldCharacterCountFoundation(props);
  return <div className="mdc-text-field-character-counter">{content}</div>;
});

/*********************************************************************
 * Helper Text
 *********************************************************************/

export interface TextFieldHelperTextProps {
  /** Make the help text always visible */
  persistent?: boolean;
  /** Make the help a validation message style */
  validationMsg?: boolean;
  /** Content for the help text */
  children: React.ReactNode;
}

/** A help text component */
export const TextFieldHelperText = createComponent<TextFieldHelperTextProps>(
  function TextFieldHelperText(props, ref) {
    const { persistent, validationMsg, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-text-field-helper-text',
      {
        'mdc-text-field-helper-text--persistent': persistent,
        'mdc-text-field-helper-text--validation-msg': validationMsg
      }
    ]);

    return <Tag tag="div" {...rest} className={className} ref={ref} />;
  }
);

/*********************************************************************
 * Icon
 *********************************************************************/

export interface TextFieldIconApi {
  getFoundation: () => MDCTextFieldIconFoundation;
}

/** An Icon in a TextField */
export interface TextFieldIconProps extends IconProps {
  apiRef?: (api: TextFieldIconApi | null) => void;
  position: 'leading' | 'trailing';
}

/** An Icon in a TextField */
const TextFieldIcon = function TextFieldIcon(
  props: TextFieldIconProps & RMWC.HTMLProps
) {
  const { apiRef, position, ...rest } = props;
  const { rootEl } = useTextFieldIconFoundation(props);
  const className = useClassNames(props, [
    'mdc-text-field__icon',
    {
      'mdc-text-field__icon--trailing': position === 'trailing',
      'mdc-text-field__icon--leading': position === 'leading'
    }
  ]);

  return (
    <Icon
      {...rootEl.props({
        ...rest,
        className
      })}
    />
  );
};
TextFieldIcon.displayName = 'TextFieldIcon';
