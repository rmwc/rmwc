// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';

import * as React from 'react';
import { MDCSlider } from '@material/slider/dist/mdc.slider';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

export type SliderPropsT = {
  /** A callback that fires when the Slider stops sliding which takes an event with event.detail.value set to the Slider's value. */
  onChange?: (
    evt: CustomEventT<{
      value: number
    }>
  ) => mixed,
  /** A callback that fires continuously while the Slider is sliding that takes an event with event.detail.value set to the Slider's value. */
  onInput?: (
    evt: CustomEventT<{
      value: number
    }>
  ) => mixed,
  /** The value of the Slider. */
  value?: number | string,
  /** The minimum value of the Slider. */
  min?: number | string,
  /** The maximum value of the Slider. */
  max?: number | string,
  /** A step to quantize values by. */
  step?: number | string,
  /** Displays the exact value of the Slider on the knob. */
  discrete?: boolean,
  /** Displays the individual step markers on the Slider track. */
  displayMarkers?: boolean,
  /** Disables the control. */
  disabled?: boolean
} & SimpleTagPropsT;

export const SliderRoot = simpleTag({
  displayName: 'SliderRoot',
  classNames: (props: SliderPropsT) => [
    'mdc-slider',
    {
      'mdc-slider--discrete': props.discrete,
      'mdc-slider--display-markers': props.displayMarkers && props.discrete
    }
  ],
  consumeProps: ['discrete', 'displayMarkers']
});

export const SliderTrackContainer = simpleTag({
  displayName: 'SliderTrackContainer',
  classNames: 'mdc-slider__track-container'
});

export const SliderTrack = simpleTag({
  displayName: 'SliderTrack',
  classNames: 'mdc-slider__track'
});

export const SliderTrackMarkerContainer = simpleTag({
  displayName: 'SliderTrackMarkerContainer',
  classNames: 'mdc-slider__track-marker-container'
});

export const SliderThumbContainer = simpleTag({
  displayName: 'SliderThumbContainer',
  classNames: 'mdc-slider__thumb-container'
});

export const SliderPin = simpleTag({
  displayName: 'SliderPin',
  classNames: 'mdc-slider__pin'
});

export const SliderPinValueMarker = simpleTag({
  displayName: 'SliderPinValueMarker',
  tag: 'span',
  classNames: 'mdc-slider__pin-value-marker'
});

export const SliderThumb = () => (
  <svg className="mdc-slider__thumb" width="21" height="21">
    <circle cx="10.5" cy="10.5" r="7.875" />
  </svg>
);

export const SliderFocusRing = simpleTag({
  displayName: 'SliderFocusRing',
  classNames: 'mdc-slider__focus-ring'
});

export class Slider extends withFoundation({
  constructor: MDCSlider,
  refs: [
    'root_',
    'thumbContainer_',
    'track_',
    'pinValueMarker_',
    'trackMarkerContainer_'
  ],
  adapter: {}
})<SliderPropsT> {
  static displayName = 'Slider';

  value: any;
  min: number | string;
  max: number | string;
  step: number | string;
  disabled: boolean;

  get discrete(): boolean {
    return !!(this.foundation_ && this.foundation_.isDiscrete_);
  }

  set discrete(isDiscrete: boolean) {
    if (this.foundation_) {
      this.foundation_.isDiscrete_ = isDiscrete;
    }
  }

  get displayMarkers(): boolean {
    return !!this.foundation_ && this.foundation_.hasTrackMarker_;
  }

  set displayMarkers(isDisplayMarkers: boolean) {
    if (this.foundation_) {
      this.foundation_.hasTrackMarker_ = isDisplayMarkers;
    }
  }

  syncWithProps(nextProps: SliderPropsT) {
    // value
    syncFoundationProp(
      nextProps.value,
      this.value,
      () => (this.value = nextProps.value)
    );

    // max
    syncFoundationProp(
      nextProps.max,
      this.max,
      () => (this.max = nextProps.max !== undefined ? +nextProps.max : this.max)
    );

    // min
    syncFoundationProp(
      nextProps.min,
      this.min,
      () => (this.min = nextProps.min !== undefined ? +nextProps.min : this.min)
    );

    // step
    syncFoundationProp(
      nextProps.step,
      this.step,
      () =>
        (this.step = nextProps.step !== undefined ? +nextProps.step : this.step)
    );

    // disabled
    syncFoundationProp(
      nextProps.disabled,
      this.disabled,
      () => (this.disabled = !!nextProps.disabled)
    );

    // discrete
    syncFoundationProp(
      nextProps.discrete,
      this.discrete,
      () => (this.discrete = !!nextProps.discrete)
    );

    //eslint-disable-next-line eqeqeq
    if (this.discrete && this.foundation_ && this.foundation_.getStep() == 0) {
      this.step = 1;
    }

    // displayMarkers
    syncFoundationProp(nextProps.displayMarkers, this.displayMarkers, () => {
      this.displayMarkers = !!nextProps.displayMarkers;
      window.requestAnimationFrame(
        () => this.foundation_ && this.foundation_.setupTrackMarker()
      );
    });
  }

  render() {
    const {
      value,
      min,
      max,
      discrete,
      displayMarkers,
      step,
      disabled,
      onChange,
      onInput,
      children,
      apiRef,
      ...rest
    } = this.props;

    const {
      root_,
      thumbContainer_,
      track_,
      pinValueMarker_,
      trackMarkerContainer_
    } = this.foundationRefs;

    if (displayMarkers && !discrete) {
      console.warn(
        `The 'displayMarkers' prop on rmwc Slider will
        only work in conjunction with the 'discrete' prop`
      );
    }

    const dataStep = step ? { 'data-step': step } : {};

    return (
      <SliderRoot
        tabIndex="0"
        //eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="slider"
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label="Select Value"
        elementRef={root_}
        discrete={discrete}
        displayMarkers={displayMarkers}
        {...(disabled ? { 'aria-disabled': disabled } : {})}
        {...dataStep}
        {...rest}
      >
        <SliderTrackContainer>
          <SliderTrack elementRef={track_} />
          {displayMarkers && (
            <SliderTrackMarkerContainer elementRef={trackMarkerContainer_} />
          )}
        </SliderTrackContainer>
        <SliderThumbContainer elementRef={thumbContainer_}>
          {discrete && (
            <SliderPin>
              <SliderPinValueMarker elementRef={pinValueMarker_} />
            </SliderPin>
          )}
          <SliderThumb />
          <SliderFocusRing />
        </SliderThumbContainer>
        {children}
      </SliderRoot>
    );
  }
}

export default Slider;
