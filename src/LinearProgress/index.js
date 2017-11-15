// @flow
import * as React from 'react';
/* eslint-disable max-len */
import { MDCLinearProgress } from '@material/linear-progress/dist/mdc.linearProgress';
/* eslint-enable max-len */
import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type LinearProgressRootT = {
  /** Whether or not the Progress bar is determinate. */
  determinate?: boolean,
  /** Progress goes from right to left. */
  reversed?: boolean,
  /** Use the accent color palette. */
  accent?: boolean
} & SimpleTagPropsT;

export const LinearProgressRoot: React.ComponentType<
  LinearProgressRootT
> = simpleTag({
  displayName: 'LinearProgressRoot',
  tag: 'nav',
  classNames: props => [
    'mdc-linear-progress',
    {
      'mdc-linear-progress--indeterminate': !props.determinate,
      'mdc-linear-progress--reversed': props.reversed,
      'mdc-linear-progress--accent': props.accent
    }
  ],
  defaultProps: {
    role: 'progressbar',
    determinate: true,
    reversed: false,
    accent: false
  },
  consumeProps: ['determinate', 'reversed', 'accent']
});

export const LinearProgressBufferingDots = simpleTag({
  displayName: 'LinearProgressBufferingDots',
  classNames: 'mdc-linear-progress__buffering-dots'
});

export const LinearProgressBuffer = simpleTag({
  displayName: 'LinearProgressBuffer',
  classNames: 'mdc-linear-progress__buffer'
});

export const LinearProgressPrimaryBar = simpleTag({
  displayName: 'LinearProgressPrimaryBar',
  classNames: 'mdc-linear-progress__bar mdc-linear-progress__primary-bar'
});

export const LinearProgressSecondaryBar = simpleTag({
  displayName: 'LinearProgressSecondaryBar',
  classNames: 'mdc-linear-progress__bar mdc-linear-progress__secondary-bar'
});

export const LinearProgressBarInner = simpleTag({
  displayName: 'LinearProgressBarInner',
  classNames: 'mdc-linear-progress__bar-inner'
});

type LinearProgressPropsT = {
  /** Progress float percentage between 0 and 1. */
  progress?: number | string,
  /** A Progress buffer float percentage between 0 and 1. */
  buffer?: number | string
} & LinearProgressRootT;

export const LinearProgress: React.ComponentType<
  LinearProgressPropsT
> = withMDC({
  mdcConstructor: MDCLinearProgress,
  mdcElementRef: true,
  defaultProps: {
    progress: 0,
    buffer: undefined,
    determinate: true,
    reversed: false,
    accent: false
  },
  onUpdate: (props, nextProps, api) => {
    ['progress', 'buffer', 'determinate', 'reversed', 'accent'].forEach(key => {
      if (api && nextProps[key] !== undefined && api[key] !== nextProps[key]) {
        api[key] = nextProps[key];
      }
    });
  }
})(
  class extends React.Component<LinearProgressPropsT> {
    static displayName = 'LinearProgress';

    render() {
      const { progress, buffer, mdcElementRef, ...rest } = this.props;
      return (
        <LinearProgressRoot elementRef={mdcElementRef} {...rest}>
          <LinearProgressBufferingDots />
          <LinearProgressBuffer />
          <LinearProgressPrimaryBar>
            <LinearProgressBarInner />
          </LinearProgressPrimaryBar>
          <LinearProgressSecondaryBar>
            <LinearProgressBarInner />
          </LinearProgressSecondaryBar>
        </LinearProgressRoot>
      );
    }
  }
);

export default LinearProgress;
