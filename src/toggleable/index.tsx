import * as React from 'react';
import { useId, randomId } from '@rmwc/base';
import { FormField } from '@rmwc/formfield';
import {
  FoundationProps,
  FoundationComponent
} from '@rmwc/base/foundation-component';

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

export class ToggleableFoundationComponent<
  Foundation extends any,
  P extends ToggleableFoundationProps,
  S extends any = {}
> extends FoundationComponent<Foundation, P & FoundationProps, S> {
  // @ts-ignore
  generatedId = randomId(this.constructor.displayName);

  /** @internal */
  get hasLabel() {
    // @ts-ignore
    return this.props.label || this.props.children;
  }
  /** @internal */
  get id() {
    return this.props.id || this.generatedId;
  }
  /** @internal */
  get toggleRootProps() {
    const { className, style, disabled, rootProps = {} } = this.props;

    if (this.hasLabel) {
      // @ts-ignore
      return this.root.props({ disabled });
    }

    return {
      // @ts-ignore
      ...this.root.props({
        className,
        style,
        disabled,
        ...rootProps
      })
    };
  }

  renderToggle(toggle: React.ReactNode) {
    /**
     * We have to conditionally wrap our checkbox in a formfield
     * If we have a label
     */
    const { className, style, rootProps, label, children } = this.props;
    if (this.hasLabel) {
      return (
        <FormField {...(rootProps as any)} className={className} style={style}>
          {toggle}
          <label id={this.id + 'label'} htmlFor={this.id}>
            {label}
            {children}
          </label>
        </FormField>
      );
    } else {
      return toggle;
    }
  }
}
