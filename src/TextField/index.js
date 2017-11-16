// @flow
import * as React from 'react';
import { MDCTextfield } from '@material/textfield/dist/mdc.textfield';
import { noop } from '../Base/noop';
import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type TextFieldRootPropsT = {
  /** Creates a multiline textfield. */
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
  mdcConstructor: MDCTextfield,
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
        elementRef: inputRef,
        ...rest
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
          <TextFieldLabel>{label}</TextFieldLabel>
        </TextFieldRoot>
      );
    }
  }
);

export default TextField;
