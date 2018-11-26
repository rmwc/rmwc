// @flow
import type { SimpleTagPropsT } from '@rmwc/base';

import * as React from 'react';
import { MDCFormField } from '@material/form-field';
import { simpleTag, withFoundation } from '@rmwc/base';

type FormFieldRootPropsT = {
  /** Position the input after the label. */
  alignEnd?: boolean
} & SimpleTagPropsT;

export const FormFieldRoot: React.ComponentType<FormFieldRootPropsT> = simpleTag(
  {
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
  }
);

export class FormField extends withFoundation({
  constructor: MDCFormField,
  adapter: {}
})<FormFieldRootPropsT> {
  static displayName = 'FormField';
  render() {
    //$FlowFixMe
    const { ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return <FormFieldRoot {...rest} elementRef={root_} />;
  }
}

export default FormField;
