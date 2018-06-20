// @flow
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base/simpleTag';

export type ElevationPropsT = {
  /** A number from 0 - 24 for different levels of elevation */
  z: number | string,
  /** Allows for smooth transitions between elevations when the z value changes. */
  transition?: boolean
} & SimpleTagPropsT;

/**
 * The Elevation Component
 */
export class Elevation extends simpleTag({
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
})<ElevationPropsT> {
  static displayName = 'Elevation';
  render() {
    return super.render();
  }
}

export default Elevation;
