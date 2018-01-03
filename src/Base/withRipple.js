// @flow
import * as React from 'react';
import { Ripple } from '../Ripple';

export type WithRipplePropsT = {
  /* Adds a ripple effect to the component */
  ripple?: boolean,
  /* Used internally to decide whether or not to use the mdc-ripple-surface class. */
  needsRippleSurface?: boolean
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
      const { ripple, needsRippleSurface, ...rest } = this.props;

      if (ripple && !rest.cssOnly) {
        return (
          <Ripple needsRippleSurface={needsRippleSurface}>
            <Component {...rest} />
          </Ripple>
        );
      }

      return <Component {...rest} />;
    }
  };
