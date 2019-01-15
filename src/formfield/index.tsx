import { ComponentProps } from '@rmwc/base';

import * as React from 'react';
//@ts-ignore
import { MDCFormField } from '@material/form-field';
import { componentFactory, withFoundation } from '@rmwc/base';

type FormFieldRootPropsT = {
  /** Position the input after the label. */
  alignEnd?: boolean;
} & ComponentProps;

export const FormFieldRoot: React.ComponentType<
  FormFieldRootPropsT
> = componentFactory({
  displayName: 'FormFieldRoot',
  defaultProps: {
    alignEnd: undefined
  },
  classNames: (props: FormFieldRootPropsT) => [
    'mdc-form-field',
    {
      'mdc-form-field--align-end': props.alignEnd
    }
  ],
  consumeProps: ['alignEnd']
});

export class FormField extends withFoundation({
  constructor: MDCFormField,
  adapter: {}
})<FormFieldRootPropsT> {
  static displayName = 'FormField';
  render() {
    //$FlowFixMe
    const { ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return <FormFieldRoot {...rest} ref={root_} />;
  }
}

export default FormField;
