// @flow
import * as React from 'react';
import { MDCFormField } from '@material/form-field/dist/mdc.formField';
import { simpleTag, withMDC } from '../Base';

type FormFieldRootPropsT = {
  /** Position the input after the label. */
  alignEnd?: boolean
};

export const FormFieldRoot: React.ComponentType<
  FormFieldRootPropsT
> = simpleTag({
  displayName: 'FormFieldRoot',
  defaultProps: {
    alignEnd: undefined
  },
  classNames: props => [
    'mdc-form-field',
    {
      'mdc-form-field--align-end': props.alignEnd
    }
  ],
  consumeProps: ['alignEnd']
});

export const FormField = withMDC({
  mdcConstructor: MDCFormField,
  mdcElementRef: true
})(
  class extends React.Component<FormFieldRootPropsT> {
    static displayName = 'FormField';
    render() {
      const { mdcElementRef, ...rest } = this.props;
      return <FormFieldRoot elementRef={mdcElementRef} {...rest} />;
    }
  }
);

export default FormField;
