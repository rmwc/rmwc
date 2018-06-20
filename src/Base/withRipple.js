// @flow
import * as React from 'react';
import { Ripple } from '../Ripple';

export type WithRipplePropsT = {
  /* Adds a ripple effect to the component */
  ripple?: boolean,
  /* Some components need to disable the ripple-surface class */
  surface?: boolean,
  cssOnly?: boolean,
  unbounded?: boolean
};

/**
 * HOC that adds ripples to any component
 */
export const withRipple = ({
  unbounded: defaultUnbounded,
  surface: defaultSurface = true
}: {
  unbounded?: boolean,
  surface?: boolean
} = {}) => (Component: React.ComponentType<*>) =>
  class extends React.Component<WithRipplePropsT & any> {
    static displayName = `withRipple(${Component.displayName || 'Unknown'})`;
    static defaultProps = {
      ripple: true
    };
    render() {
      const { ripple, ...rest } = this.props;

      if (ripple && !rest.cssOnly) {
        return (
          <Ripple
            {...rest}
            unbounded={rest.unbounded || defaultUnbounded}
            surface={rest.surface || defaultSurface}
          >
            <Component {...rest} />
          </Ripple>
        );
      }

      return <Component {...rest} />;
    }
  };
