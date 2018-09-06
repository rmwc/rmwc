// @flow
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { simpleTag } from '@rmwc/base';
import type { SimpleTagPropsT } from '@rmwc/base/simpleTag';

export type ElevationPropsT = {
  /** A number from 0 - 24 for different levels of elevation */
  z: number | string,
  /** Allows for smooth transitions between elevations when the z value changes. */
  transition?: boolean
} & SimpleTagPropsT;

const ElevationRoot = simpleTag({
  displayName: 'ElevationRoot',
  defaultProps: {
    z: 0,
    transition: false
  },
  tag: 'div',
  classNames: (props: ElevationPropsT) => [
    `mdc-elevation--z${props.z}`,
    { 'mdc-elevation-transition': props.transition }
  ],
  consumeProps: ['z', 'transition']
});

/**
 * The Elevation Component
 */
export const Elevation: React.ComponentType<ElevationPropsT> = (
  props: ElevationPropsT
) => <ElevationRoot {...props} />;
Elevation.displayName = 'Elevation';

export default Elevation;
