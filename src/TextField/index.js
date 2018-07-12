// @flow
import type { SimpleTagPropsT } from '../Base';
import type { IconPropsT } from '../Icon';
import * as React from 'react';
import { MDCTextField } from '@material/textfield/dist/mdc.textfield';
import {
  simpleTag,
  withFoundation,
  syncFoundationProp,
  randomId
} from '../Base';

import { Icon } from '../Icon';
import { LineRipple } from '../LineRipple';
import { FloatingLabel } from '../FloatingLabel';
import { NotchedOutline, NotchedOutlineIdle } from '../NotchedOutline';

export type TextFieldPropsT = {
  /** Makes a multiline TextField. */
  textarea?: boolean,
  /** Sets the value for controlled TextFields. */
  value?: string | number,
  /** Makes the TextField fullwidth. */
  fullwidth?: boolean,
  /** Makes the TextField have a visual box. */
  box?: boolean,
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
} & SimpleTagPropsT;

export const TextFieldRoot = simpleTag({
  displayName: 'TextFieldRoot',
  classNames: (props: TextFieldPropsT) => [
    'mdc-text-field',
    'mdc-text-field--upgraded',
    {
      'mdc-text-field--textarea': props.textarea,
      'mdc-text-field--fullwidth': props.fullwidth,
      'mdc-text-field--box': props.box,
      'mdc-text-field--outlined': props.outlined,
      'mdc-text-field--dense': props.dense,
      'mdc-text-field--invalid': props.invalid,
      'mdc-text-field--disabled': props.disabled,
      'mdc-text-field--with-leading-icon': props.withLeadingIcon,
      'mdc-text-field--with-trailing-icon': props.withTrailingIcon
    }
  ],
  consumeProps: [
    'textarea',
    'box',
    'fullwidth',
    'outlined',
    'dense',
    'invalid',
    'disabled',
    'withLeadingIcon',
    'withTrailingIcon'
  ]
});

export const TextFieldInput = simpleTag({
  displayName: 'TextFieldInput',
  tag: 'input',
  classNames: 'mdc-text-field__input',
  defaultProps: {
    type: 'text'
  }
});

export const TextFieldTextarea = simpleTag({
  displayName: 'TextFieldTextarea',
  tag: 'textarea',
  classNames: 'mdc-text-field__input'
});

export type TextFieldHelperTextPropsT = {
  /** Make the help text always visible */
  persistent?: boolean,
  /** Make the help a validation message style */
  validationMsg?: boolean
};

/**
 * A help text component
 */
export class TextFieldHelperText extends simpleTag({
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
})<TextFieldHelperTextPropsT> {
  render() {
    return super.render();
  }
}

export type TextFieldIconPropsT = {
  /** The icon to use */
  use: React.Node
} & IconPropsT;

/**
 * An Icon in a TextField
 */
export class TextFieldIcon extends simpleTag({
  tag: Icon,
  classNames: 'mdc-text-field__icon'
})<TextFieldIconPropsT> {
  static displayName = 'TextFieldIcon';

  render() {
    return super.render();
  }
}

export class TextField extends withFoundation({
  constructor: MDCTextField,
  adapter: {}
})<TextFieldPropsT> {
  static displayName = 'TextField';

  valid: boolean;
  value: any;
  disabled: boolean;

  syncWithProps(nextProps: TextFieldPropsT) {
    // invalid | valid
    syncFoundationProp(
      nextProps.invalid,
      !this.valid,
      () => (this.valid = !nextProps.invalid)
    );

    // value
    syncFoundationProp(nextProps.value, !this.value, () => {
      this.value = nextProps.value;
    });

    // disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = !!nextProps.disabled)
    );
  }

  render() {
    const {
      label = '',
      className,
      inputRef,
      box,
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
      apiRef,
      ...rest
    } = this.props;

    const { root_ } = this.foundationRefs;

    const tagProps = {
      ...rest,
      disabled: disabled,
      elementRef: inputRef,
      id: rest['id'] || randomId('text-field')
    };

    const tag = textarea ? (
      <TextFieldTextarea {...tagProps} />
    ) : (
      <TextFieldInput {...tagProps} />
    );

    // handle leading and trailing icons
    const renderIcon = (iconNode: any) => {
      if (
        (iconNode && typeof iconNode === 'string') ||
        (iconNode.type &&
          iconNode.type.displayName !== TextFieldIcon.displayName)
      ) {
        return <TextFieldIcon use={iconNode} />;
      }

      return iconNode;
    };

    return (
      <TextFieldRoot
        {...rootProps}
        invalid={invalid}
        withLeadingIcon={!!withLeadingIcon}
        withTrailingIcon={!!withTrailingIcon}
        textarea={textarea}
        box={box}
        dense={dense}
        disabled={disabled}
        outlined={outlined}
        fullwidth={fullwidth}
        elementRef={root_}
        className={className}
      >
        {!!withLeadingIcon && renderIcon(withLeadingIcon)}
        {children}
        {tag}
        {!!label && (
          <FloatingLabel htmlFor={tagProps.id}>{label}</FloatingLabel>
        )}
        {!!withTrailingIcon && renderIcon(withTrailingIcon)}

        {!!outlined && <NotchedOutline />}
        {!!outlined ? <NotchedOutlineIdle /> : <LineRipple />}
      </TextFieldRoot>
    );
  }
}

export default TextField;
