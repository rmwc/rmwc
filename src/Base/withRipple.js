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
): React.ComponentType<*> => ({ ripple, ...rest }: WithRipplePropsT) => {
  if (ripple) {
    return (
      <Ripple>
        <Component {...rest} />
      </Ripple>
    );
  }

  return <Component {...rest} />;
};
