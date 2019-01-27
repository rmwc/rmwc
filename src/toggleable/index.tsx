import * as React from 'react';
import { FoundationComponent, FoundationProps } from '@rmwc/base';
import { FormField } from '@rmwc/formfield';
import { randomId } from '@rmwc/base/utils/randomId';

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
}

export class ToggleableFoundationComponent<
  P extends ToggleableFoundationProps,
  S extends any = {}
> extends FoundationComponent<P & FoundationProps, S> {
  // @ts-ignore
  generatedId = randomId(this.constructor.displayName);
  root = this.createElement('root');

  get hasLabel() {
    return this.props.label || this.props.children;
  }

  get id() {
    return this.props.id || this.generatedId;
  }

  get toggleRootProps() {
    const { className, style, disabled, rootProps = {} } = this.props;

    if (this.hasLabel) {
      return this.root.props({ disabled });
    }

    return {
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
        <FormField {...rootProps} className={className} style={style}>
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
