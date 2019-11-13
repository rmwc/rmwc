import * as React from 'react';
import { useId } from '@rmwc/base';
import { FormField } from '@rmwc/formfield';

export interface ToggleableFoundationProps {
  /** A DOM ID for the toggle. */
  id?: string;
  /** Disables the control. */
  disabled?: boolean;
  /** Toggle the control on and off. */
  checked?: boolean;
  /** The value of the control. */
  value?: string | number | string[];
  /** A label for the control. */
  label?: React.ReactNode;
  /** By default, all props except className and style spread to the input. These are additional props for the root of the checkbox. */
  rootProps?: React.HTMLProps<any>;
  /** A reference to the native input. */
  inputRef?: React.Ref<HTMLInputElement>;
}

export function useToggleFoundation(
  props: ToggleableFoundationProps & React.HTMLProps<any>
) {
  const { className, style, rootProps, label, children, disabled } = props;
  const hasLabel = props.label || props.children;
  const id = useId('toggle-', props);

  const renderToggle = (toggle: React.ReactElement): JSX.Element => {
    /**
     * We have to conditionally wrap our checkbox in a formfield
     * If we have a label
     */
    if (hasLabel) {
      return (
        <FormField {...(rootProps as any)} className={className} style={style}>
          {toggle}
          <label id={id + 'label'} htmlFor={id}>
            {label}
            {children}
          </label>
        </FormField>
      );
    } else {
      return toggle;
    }
  };

  const toggleRootProps = hasLabel
    ? { disabled }
    : {
        className,
        style,
        disabled,
        ...rootProps
      };

  return {
    id,
    renderToggle,
    toggleRootProps
  };
}
