// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import { MDCFormField } from '@material/form-field/dist/mdc.formField';
import { simpleTag, withFoundation } from '../Base';

type FormFieldRootPropsT = {
  /** Position the input after the label. */
  alignEnd?: boolean
} & SimpleTagPropsT;

export const FormFieldRoot: React.ComponentType<
  FormFieldRootPropsT
> = simpleTag({
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
    const { apiRef, ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return <FormFieldRoot {...rest} elementRef={root_} />;
  }
}

export default FormField;
