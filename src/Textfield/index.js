// @flow
import * as React from 'react';
import { MDCTextfield } from '@material/textfield/dist/mdc.textfield';
import { noop } from '../Base/noop';
import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type TextfieldRootPropsT = {
  /* Creates a multiline textfield. */
  textarea: boolean
} & SimpleTagPropsT;

export const TextfieldRoot: React.ComponentType<
  TextfieldRootPropsT
> = simpleTag({
  name: 'TextfieldRoot',
  tag: 'label',
  classNames: props => [
    'mdc-textfield',
    { 'mdc-textfield--textarea': props.textarea }
  ],
  consumeProps: ['textarea']
});

export const TextfieldLabel = simpleTag({
  name: 'TextfieldLabel',
  tag: 'span',
  classNames: props => [
    'mdc-textfield__label',
    {
      'mdc-textfield__label--float-above': props.value
    }
  ],
  consumeProps: ['value']
});

export const TextfieldInput = simpleTag({
  name: 'TextfieldInput',
  tag: 'input',
  classNames: 'mdc-textfield__input',
  defaultProps: {
    type: 'text'
  }
});

export const TextfieldTextarea = simpleTag({
  name: 'TextfieldTextarea',
  tag: 'textarea',
  classNames: 'mdc-textfield__input'
});

type TextfieldPropsT = {
  /* A ref for the native input. */
  inputRef: React.Ref<*>,
  /* Disables the input. */
  disabled: boolean,
  /* A label for the input. */
  label: React.Node
} & TextfieldRootPropsT &
  SimpleTagPropsT;

export const Textfield: React.ComponentType<TextfieldPropsT> = withMDC({
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
  ({
    label = '',
    className,
    inputRef,
    mdcElementRef,
    children,
    textarea,
    ...rest
  }) => {
    const tagProps = {
      elementRef: inputRef,
      ...rest
    };

    const tag = textarea ? (
      <TextfieldTextarea {...tagProps} />
    ) : (
      <TextfieldInput {...tagProps} />
    );

    return (
      <TextfieldRoot
        className={className}
        textarea={textarea}
        elementRef={mdcElementRef}
      >
        {children}
        {tag}
        <TextfieldLabel>{label}</TextfieldLabel>
      </TextfieldRoot>
    );
  }
);

export default Textfield;
