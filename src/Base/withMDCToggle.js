// @flow
import * as React from 'react';
import { withMDC } from './withMDC';
import { randomId } from './randomId';

type WithMDCToggleOptsT = {
  mdcConstructor?: Function
};

export type WithMDCTogglePropsT = {
  /** A DOM ID for the toggle. */
  id?: string,
  /** Disables the control. */
  disabled?: boolean,
  /** Toggle the control on and off. */
  checked?: boolean | string,
  /** Make the control indeterminate (Checkboxes only). */
  indeterminate?: boolean,
  /** A label for the control. */
  label?: string
};

export const withMDCToggle = ({ mdcConstructor }: WithMDCToggleOptsT = {}) => (
  Component: React.ComponentType<any>
): React.ComponentType<WithMDCTogglePropsT> => {
  return withMDC({
    mdcConstructor,
    mdcElementRef: true,
    defaultProps: {
      label: undefined,
      id: undefined,
      checked: undefined,
      indeterminate: undefined,
      disabled: false
    },
    onUpdate: (props, nextProps, api) => {
      if (api && nextProps.indeterminate !== api.indeterminate) {
        api.indeterminate = nextProps.indeterminate;
      }
    }
  })(
    class extends React.Component<WithMDCTogglePropsT> {
      componentWillMount() {
        this.generatedId = randomId('toggle');
      }

      generatedId: string;

      render() {
        return <Component {...this.props} generatedId={this.generatedId} />;
      }
    }
  );
};
