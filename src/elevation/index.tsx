import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { wrapChild } from '@rmwc/base';
import { useTag, useClassNames } from '@rmwc/base/component';

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
export const Elevation = React.forwardRef<
  any,
  ElevationProps & Omit<RMWC.ComponentProps, 'wrap'>
>(function Elevation(props, ref) {
  const Tag = useTag(props);

  const { z = 0, transition = false, wrap, ...rest } = props;

  const className = useClassNames(props, [
    `mdc-elevation--z${z}`,
    { 'mdc-elevation-transition': transition }
  ]);

  if (wrap) {
    return wrapChild({ ...rest, className, ref });
  }

  return <Tag {...rest} ref={ref} className={className} />;
});
Elevation.displayName = 'Elevation';
