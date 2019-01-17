import { ComponentProps } from '@rmwc/base';

import * as React from 'react';
// @ts-ignore
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { componentFactory, FoundationComponent } from '@rmwc/base';
import { deprecationWarning } from '@rmwc/base/utils/deprecationWarning';

export interface LinearProgressProps {
  /** Progress float percentage between 0 and 1. */
  progress?: number | string;
  /** A Progress buffer float percentage between 0 and 1. */
  buffer?: number | string;
  /** Progress goes from right to left. */
  reversed?: boolean;
  /** Hides the progress bar. Adding / removing this prop will trigger an animation in or out.  */
  closed?: boolean;
}

interface DeprecatedLinearProgressProps {
  /** Whether or not the Progress bar is determinate. */
  determinate?: boolean;
}

export const LinearProgressRoot = componentFactory<LinearProgressProps>({
  displayName: 'LinearProgressRoot',
  tag: 'nav',
  classNames: (props: LinearProgressProps) => [
    'mdc-linear-progress',
    {
      'mdc-linear-progress--reversed': props.reversed,
      'mdc-linear-progress--closed': props.closed
    }
  ],
  defaultProps: {
    role: 'progressbar',
    determinate: true,
    reversed: false,
    accent: false
  },
  consumeProps: ['determinate', 'reversed', 'accent', 'closed']
});

export const LinearProgressBufferingDots = componentFactory({
  displayName: 'LinearProgressBufferingDots',
  classNames: ['mdc-linear-progress__buffering-dots']
});

export const LinearProgressBuffer = componentFactory({
  displayName: 'LinearProgressBuffer',
  classNames: ['mdc-linear-progress__buffer']
});

export const LinearProgressPrimaryBar = componentFactory({
  displayName: 'LinearProgressPrimaryBar',
  classNames: ['mdc-linear-progress__bar mdc-linear-progress__primary-bar']
});

export const LinearProgressSecondaryBar = componentFactory({
  displayName: 'LinearProgressSecondaryBar',
  classNames: ['mdc-linear-progress__bar mdc-linear-progress__secondary-bar']
});

export const LinearProgressBarInner = componentFactory({
  displayName: 'LinearProgressBarInner',
  classNames: ['mdc-linear-progress__bar-inner']
});

export class LinearProgress extends FoundationComponent<
  LinearProgressProps & DeprecatedLinearProgressProps
> {
  static displayName = 'LinearProgress';

  static defaultProps = {
    progress: undefined,
    buffer: undefined,
    reversed: false
  };

  root = this.createElement('root');
  determinate: boolean | null = null;

  getDefaultFoundation() {
    return new MDCLinearProgressFoundation({
      addClass: (className: string) => this.root.addClass(className),
      getPrimaryBar: () =>
        this.root.element &&
        this.root.element.querySelector(
          MDCLinearProgressFoundation.strings.PRIMARY_BAR_SELECTOR
        ),
      getBuffer: () =>
        this.root.element &&
        this.root.element.querySelector(
          MDCLinearProgressFoundation.strings.BUFFER_SELECTOR
        ),
      hasClass: (className: string) => this.root.hasClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setStyle: (
        el: HTMLElement,
        styleProperty: string,
        value: string | null
      ) => ((el.style as any)[styleProperty] = value)
    });
  }

  sync(props: LinearProgressProps, prevProps: LinearProgressProps) {
    // progress
    if (props.progress !== prevProps.progress) {
      this.foundation.setProgress(props.progress || 0);
    }

    // buffer
    if (props.buffer !== prevProps.buffer) {
      this.foundation.setBuffer(props.buffer || 0);
    }

    // determinate
    // automatically derive this from progress
    if (props.progress !== undefined && !this.determinate) {
      // progress is passed but we are not currently determinate
      this.foundation.setDeterminate(true);
      this.determinate = true;
    } else if (
      (props.progress === undefined && this.determinate) ||
      this.determinate === null
    ) {
      // progress is not passed and we are either determinate, or its our first syncing
      // indicated by this.determinate being null;
      this.foundation.setDeterminate(false);
      this.determinate = false;
    }

    // reversed
    if (props.reversed !== prevProps.reversed) {
      this.foundation.setReverse(props.reversed || 0);
    }

    // closed
    if (props.closed !== prevProps.closed) {
      props.closed ? this.foundation.close() : this.foundation.open();
    }
  }

  render() {
    const { progress, buffer, determinate, ...rest } = this.props;

    deprecationWarning(
      'LinearProgress determinate is no longer a valid prop. Determinate is set automatically be the presence of the progress prop.'
    );

    return (
      // @ts-ignore
      <LinearProgressRoot ref={this.root.setElement} {...this.root.props(rest)}>
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
