import { componentFactory } from '@rmwc/base';

export interface ElevationProps {
  /** A number from 0 - 24 for different levels of elevation */
  z: number | string;
  /** Allows for smooth transitions between elevations when the z value changes. */
  transition?: boolean;
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
  consumeProps: ['z', 'transition']
});
