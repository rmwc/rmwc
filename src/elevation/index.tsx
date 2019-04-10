import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { componentFactory, wrapChild } from '@rmwc/base';

/** The Elevation Component */
export interface ElevationProps {
  /** A number from 0 - 24 for different levels of elevation */
  z: number | string;
  /** Allows for smooth transitions between elevations when the z value changes. */
  transition?: boolean;
  /** Allows the elevation classes to be merged onto the child component instead of creating an new DOM node. */
  wrap?: boolean;
}

/** The Elevation Component */
export const Elevation = componentFactory<ElevationProps>({
  displayName: 'Elevation',
  defaultProps: {
    z: 0,
    transition: false
  },
  classNames: (props: ElevationProps) => [
    `mdc-elevation--z${props.z}`,
    { 'mdc-elevation-transition': props.transition }
  ],
  consumeProps: ['z', 'transition'],
  render: (props, ref, Tag) => {
    const { wrap, ...rest } = props;
    if (wrap) {
      return wrapChild({ ...rest, ref });
    }

    return <Tag {...rest} ref={ref} />;
  }
});
