// @flow
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base/simpleTag';

export type ElevationPropsT = {
  /** A number from 0 - 24 for different levels of elevation */
  z?: number | string,
  /** Allows for smooth transitions between elevations when the z value changes. */
  transition?: boolean
} & SimpleTagPropsT;

/**
 * The Elevation Component
 */
export class Elevation extends simpleTag({
  displayName: 'Elevation',
  defaultProps: {
    z: 0,
    transition: false
  },
  tag: 'div',
  classNames: props => [
    `mdc-elevation--z${props.z}`,
    { 'mdc-elevation-transition': props.transition }
  ],
  consumeProps: ['z', 'transition']
})<ElevationPropsT> {
  render() {
    return super.render();
  }
}

export default Elevation;
