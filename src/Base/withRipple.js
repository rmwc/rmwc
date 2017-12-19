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
export const withRipple = (
  Component: React.ComponentType<*>
): React.ComponentType<*> =>
  class extends React.Component<WithRipplePropsT> {
    static displayName = `withRipple(${Component.displayName || 'Unknown'})`;
    render() {
      const { ripple, ...rest } = this.props;

      if (ripple && !rest.cssOnly) {
        return (
          <Ripple>
            <Component {...rest} />
          </Ripple>
        );
      }

      return <Component {...rest} />;
    }
  };
