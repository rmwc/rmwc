// @flow
import * as React from 'react';
import { MDCTextField } from '@material/textfield/dist/mdc.textfield';
import { noop } from '../Base/noop';
import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type TextFieldRootPropsT = {
  /** Creates a multiline TextField. */
  textarea?: boolean
} & SimpleTagPropsT;

export const TextFieldRoot: React.ComponentType<
  TextFieldRootPropsT
> = simpleTag({
  displayName: 'TextFieldRoot',
  classNames: props => [
    'mdc-text-field',
    { 'mdc-text-field--textarea': props.textarea }
  ],
  consumeProps: ['textarea']
});

export const TextFieldLabel = simpleTag({
  displayName: 'TextFieldLabel',
  tag: 'label',
  classNames: props => [
    'mdc-text-field__label',
    {
      'mdc-text-field__label--float-above': props.value
    }
  ],
  consumeProps: ['value']
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

export const TextFieldBottomLine = simpleTag({
  displayName: 'TextFieldBottomLine',
  classNames: 'mdc-text-field__bottom-line'
});

type TextFieldHelpTextPropsT = {
  /** Make the help text always visible */
  persistent: boolean,
  /** Make the help a validation message style */
  validationMsg: boolean
};

/**
 * A help text component
 */
export class TextFieldHelpText extends simpleTag({
  displayName: 'TextFieldHelpText',
  tag: 'p',
  classNames: props => [
    'mdc-text-field-helptext',
    {
      'mdc-text-field-helptext--persistent': props.persistent,
      'mdc-text-field-helptext--validation-msg': props.validationMsg
    }
  ],
  consumeProps: ['persistent', 'validationMsg']
})<TextFieldHelpTextPropsT> {
  render() {
    return super.render();
  }
}

type TextFieldPropsT = {
  /** A ref for the native input. */
  inputRef?: React.Ref<any>,
  /** Disables the input. */
  disabled?: boolean,
  /** A label for the input. */
  label?: React.Node
} & TextFieldRootPropsT &
  SimpleTagPropsT;

export const TextField = withMDC({
  mdcConstructor: MDCTextField,
  mdcElementRef: true,
  defaultProps: {
    inputRef: noop,
    disabled: false,
    label: undefined,
    textarea: undefined
  },
  onUpdate: (props, nextProps, api, inst) => {
    if (props && props.textarea !== nextProps.textarea) {
      inst.mdcComponentReinit();
    }
  }
})(
  class extends React.Component<TextFieldPropsT> {
    static displayName = 'TextField';
    render() {
      const {
        label = '',
        className,
        inputRef,
        mdcElementRef,
        children,
        textarea,
        ...rest
      } = this.props;

      const tagProps = {
        ...rest,
        elementRef: inputRef,
        id: rest.id || Date.now() + Math.random() + ''
      };

      const tag = textarea ? (
        <TextFieldTextarea {...tagProps} />
      ) : (
        <TextFieldInput {...tagProps} />
      );

      return (
        <TextFieldRoot
          className={className}
          textarea={textarea}
          elementRef={mdcElementRef}
        >
          {children}
          {tag}
          <TextFieldLabel htmlFor={tagProps.id}>{label}</TextFieldLabel>
          <TextFieldBottomLine />
        </TextFieldRoot>
      );
    }
  }
);

export default TextField;
