// @flow
import * as React from 'react';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base/simpleTag';

type ElevationPropsT = {
  /* A number from 0 - 24 for different levels of elevation */
  z?: number | string,
  /* Allows for smooth transitions between elevations when the z value changes. */
  transition?: boolean
} & SimpleTagPropsT;

export const Elevation: React.ComponentType<ElevationPropsT> = simpleTag({
  displayName: 'Elevation',
  tag: 'div',
  classNames: props => [
    `mdc-elevation--z${props.z}`,
    { 'mdc-elevation-transition': props.transition }
  ],
  defaultProps: {
    z: 0,
    transition: false
  },
  consumeProps: ['z', 'transition']
});

export default Elevation;
