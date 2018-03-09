// @flow
import * as React from 'react';
import { Ripple } from '../Ripple';

export type WithRipplePropsT = {
  /* Adds a ripple effect to the component */
  ripple?: boolean
};

/**
 * HOC that adds ripples to any component
 */
export const withRipple = ({ unbounded: defaultUnbounded }) => (
  Component: React.ComponentType<*>
): React.ComponentType<*> =>
  class extends React.Component<WithRipplePropsT> {
    static displayName = `withRipple(${Component.displayName || 'Unknown'})`;
    static defaultProps = {
      ripple: true
    };
    render() {
      const { ripple, ...rest } = this.props;

      if (ripple && !rest.cssOnly) {
        return (
          <Ripple {...rest} unbounded={defaultUnbounded || rest.unbounded}>
            <Component {...rest} />
          </Ripple>
        );
      }

      return <Component {...rest} />;
    }
  };
