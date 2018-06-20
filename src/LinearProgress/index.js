// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
/* eslint-disable max-len */
import { MDCLinearProgress } from '@material/linear-progress/dist/mdc.linearProgress';
/* eslint-enable max-len */
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

export type LinearProgressPropsT = {
  /** Progress float percentage between 0 and 1. */
  progress?: number | string,
  /** A Progress buffer float percentage between 0 and 1. */
  buffer?: number | string,
  /** Whether or not the Progress bar is determinate. */
  determinate?: boolean,
  /** Progress goes from right to left. */
  reversed?: boolean
} & SimpleTagPropsT;

export const LinearProgressRoot = simpleTag({
  displayName: 'LinearProgressRoot',
  tag: 'nav',
  classNames: (props: LinearProgressPropsT) => [
    'mdc-linear-progress',
    {
      'mdc-linear-progress--indeterminate': !props.determinate,
      'mdc-linear-progress--reversed': props.reversed
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

export class LinearProgress extends withFoundation({
  constructor: MDCLinearProgress,
  adapter: {}
})<LinearProgressPropsT> {
  static displayName = 'LinearProgress';

  static defaultProps = {
    progress: 0,
    buffer: undefined,
    determinate: true,
    reversed: false
  };

  progress: any;
  buffer: any;
  determinate: any;
  reversed: any;

  syncWithProps(nextProps: LinearProgressPropsT) {
    // progress
    syncFoundationProp(
      nextProps.progress,
      this.progress,
      () => (this.progress = nextProps.progress)
    );

    // buffer
    syncFoundationProp(
      nextProps.buffer,
      this.buffer,
      () => (this.buffer = nextProps.buffer)
    );

    // determinate
    syncFoundationProp(
      nextProps.determinate,
      this.determinate,
      () => (this.determinate = nextProps.determinate)
    );

    // reversed
    syncFoundationProp(
      nextProps.reversed,
      this.reversed,
      () => (this.reversed = nextProps.reversed)
    );
  }

  render() {
    const { progress, buffer, ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return (
      <LinearProgressRoot elementRef={root_} {...rest}>
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

export default LinearProgress;
