// @flow
import * as React from 'react';
import classNames from 'classnames';
import { MDCTextField } from '@material/textfield/dist/mdc.textfield';
import { noop } from '../Base/noop';
import { simpleTag, withMDC } from '../Base';
import { Icon } from '../Icon';

import type { SimpleTagPropsT } from '../Base';
import type { IconPropsT } from '../Icon';

type TextFieldRootPropsT = {
  /** Makes a multiline TextField. */
  textarea?: boolean,
  /** Makes the TextField fullwidth. */
  fullwidth?: boolean,
  /** Makes the TextField have a visiual box. */
  box?: boolean
} & SimpleTagPropsT;

export const TextFieldRoot: React.ComponentType<
  TextFieldRootPropsT
> = simpleTag({
  displayName: 'TextFieldRoot',
  classNames: props => [
    'mdc-text-field',
    'mdc-text-field--upgraded',
    {
      'mdc-text-field--textarea': props.textarea,
      'mdc-text-field--fullwidth': props.fullwidth,
      'mdc-text-field--box': props.box,
      'mdc-text-field--outlined': props.outlined,
      'mdc-text-field--dense': props.dense,
      'mdc-text-field--invalid': props.invalid
    }
  ],
  consumeProps: ['textarea', 'box', 'fullwidth', 'outlined', 'dense', 'invalid']
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

export const TextFieldOutline = simpleTag({
  displayName: 'TextFieldOutline',
  classNames: 'mdc-text-field__outline'
});

export const TextFieldOutlinePath = simpleTag({
  displayName: 'TextFieldOutlinePath',
  tag: 'path',
  classNames: 'mdc-text-field__outline-path'
});

export const TextFieldIdleOutline = simpleTag({
  displayName: 'TextFieldIdleOutline',
  classNames: 'mdc-text-field__idle-outline'
});

type TextFieldHelperTextPropsT = {
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
  classNames: props => [
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

type TextFieldIconPropsT = {
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
  render() {
    return super.render();
  }
}

type TextFieldPropsT = {
  /** A ref for the native input. */
  inputRef?: React.Ref<any>,
  /** Disables the input. */
  disabled?: boolean,
  /** Mark the input as required. */
  required?: boolean,
  /** Makes the TextField visually invalid. This is sometimes automatically applied in cases where required and pattern is used.  */
  invalid?: boolean,
  /** Makes the TextField dense */
  dense?: boolean,
  /** Box in the TextField */
  box?: boolean,
  /** Outline the TextField */
  outlined?: boolean,
  /** A label for the input. */
  label?: React.Node,
  /** Add a leading icon. */
  withLeadingIcon?: React.Node,
  /** Add a trailing icon. */
  withTrailingIcon?: React.Node,
  /** By default, props spread to the input. These props are for the component's root container. */
  rootProps?: Object
} & TextFieldRootPropsT &
  SimpleTagPropsT;

export const TextField = withMDC({
  mdcConstructor: MDCTextField,
  mdcElementRef: true,
  defaultProps: {
    inputRef: noop,
    disabled: undefined,
    required: undefined,
    invalid: undefined,
    dense: undefined,
    box: undefined,
    outlined: undefined,
    fullwidth: undefined,
    label: undefined,
    textarea: undefined
  },
  didUpdate: (props, nextProps, api, inst) => {
    if (
      props &&
      (props.textarea !== nextProps.textarea ||
        props.outlined !== nextProps.outlined ||
        props.dense !== nextProps.dense)
    ) {
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
        box,
        outlined,
        fullwidth,
        dense,
        invalid,
        withLeadingIcon,
        withTrailingIcon,
        mdcElementRef,
        children,
        textarea,
        rootProps = {},
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

      // handle leading and trailing icons
      const renderIcon = iconNode => {
        if (
          (iconNode && typeof iconNode === 'string') ||
          (typeof iconNode === 'object' && iconNode.type !== TextFieldIcon)
        ) {
          return <TextFieldIcon use={iconNode} />;
        }

        return iconNode;
      };

      return (
        <TextFieldRoot
          {...rootProps}
          invalid={invalid}
          className={classNames(className, rootProps.className, {
            'mdc-text-field--with-leading-icon': !!withLeadingIcon,
            'mdc-text-field--with-trailing-icon': !!withTrailingIcon
          })}
          textarea={textarea}
          box={box}
          dense={dense}
          outlined={outlined}
          fullwidth={fullwidth}
          elementRef={mdcElementRef}
        >
          {!!withLeadingIcon && renderIcon(withLeadingIcon)}
          {children}
          {tag}
          {!!label && (
            <TextFieldLabel htmlFor={tagProps.id} value={tagProps.value}>
              {label}
            </TextFieldLabel>
          )}
          {!!withTrailingIcon && renderIcon(withTrailingIcon)}

          {outlined && (
            <TextFieldOutline>
              <svg>
                <TextFieldOutlinePath />
              </svg>
            </TextFieldOutline>
          )}

          {outlined ? <TextFieldIdleOutline /> : <TextFieldBottomLine />}
        </TextFieldRoot>
      );
    }
  }
);

export default TextField;
