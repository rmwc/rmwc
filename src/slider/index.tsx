import { ComponentProps, CustomEventT } from '@rmwc/base';

import * as React from 'react';
// @ts-ignore
import { MDCSliderFoundation } from '@material/slider';
import { componentFactory, FoundationComponent } from '@rmwc/base';
import { debounce } from '@rmwc/base/utils/debounce';

export type SliderPropsT = {
  /** A callback that fires when the Slider stops sliding which takes an event with event.detail.value set to the Slider's value. */
  onChange?: (
    evt: CustomEventT<{
      value: number;
    }>
  ) => void;
  /** A callback that fires continuously while the Slider is sliding that takes an event with event.detail.value set to the Slider's value. */
  onInput?: (
    evt: CustomEventT<{
      value: number;
    }>
  ) => void;
  /** The value of the Slider. */
  value?: number | string;
  /** The minimum value of the Slider. */
  min?: number | string;
  /** The maximum value of the Slider. */
  max?: number | string;
  /** A step to quantize values by. */
  step?: number | string;
  /** Displays the exact value of the Slider on the knob. */
  discrete?: boolean;
  /** Displays the individual step markers on the Slider track. */
  displayMarkers?: boolean;
  /** Disables the control. */
  disabled?: boolean;
} & ComponentProps;

const SliderRoot = componentFactory<SliderPropsT>({
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

class SliderTrack extends React.Component<{ elementRef: any }> {
  static displayName = 'SliderTrack';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div ref={this.props.elementRef} className="mdc-slider__track" />;
  }
}

class SliderTrackMarkerContainer extends React.PureComponent<{
  markersCount: number;
}> {
  static displayName = 'SliderTrackMarkerContainer';

  render() {
    return (
      <div className="mdc-slider__track-marker-container">
        {[...Array(this.props.markersCount)].map((v, i) => (
          <div className="mdc-slider__track-marker" key={i} />
        ))}
      </div>
    );
  }
}

class SliderPin extends React.Component<{ elementRef: any }> {
  static displayName = 'SliderPin';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="mdc-slider__pin">
        <span
          ref={this.props.elementRef}
          className="mdc-slider__pin-value-marker"
        />
      </div>
    );
  }
}

class SliderThumb extends React.Component<{}> {
  static displayName = 'SliderThumb';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <svg className="mdc-slider__thumb" width="21" height="21">
        <circle cx="10.5" cy="10.5" r="7.875" />
      </svg>
    );
  }
}

class SliderFocusRing extends React.Component<{}> {
  static displayName = 'SliderFocusRing';

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-slider__focus-ring" />;
  }
}

type SliderState = {
  trackMarkersCount: number;
};

export class Slider extends FoundationComponent<SliderPropsT, SliderState> {
  state = {
    trackMarkersCount: 0,
    pinContainerStyle: {}
  };

  root_: HTMLElement | null = null;
  track_: HTMLElement | null = null;
  pinValueMarker_: HTMLElement | null = null;
  thumbContainer_: HTMLElement | null = null;

  constructor(props: SliderPropsT) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');
    this.createPropsList('thumbContainer_');

    // Fixes an issue where sythetic events were being
    // accessed in the Foundation and causing an error
    const existingInteractionStartHandler_ = this.foundation
      .interactionStartHandler_;
    this.foundation.interactionStartHandler_ = (
      evt: React.SyntheticEvent<any>
    ) => {
      evt.persist();
      existingInteractionStartHandler_(evt);
    };
  }

  /** @return {number} */
  get value() {
    return this.foundation.getValue();
  }

  /** @param {number} value */
  set value(value: number) {
    this.foundation.setValue(value);
  }

  /** @return {number} */
  get min() {
    return this.foundation.getMin();
  }

  /** @param {number} min */
  set min(min: number) {
    this.foundation.setMin(min);
  }

  /** @return {number} */
  get max() {
    return this.foundation.getMax();
  }

  /** @param {number} max */
  set max(max: number) {
    this.foundation.setMax(max);
  }

  /** @return {number} */
  get step() {
    return this.foundation.getStep();
  }

  /** @param {number} step */
  set step(step: number) {
    this.foundation.setStep(step);
  }

  /** @return {boolean} */
  get disabled() {
    return this.foundation.isDisabled();
  }

  /** @param {boolean} disabled */
  set disabled(disabled: boolean) {
    this.foundation.setDisabled(disabled);
  }

  get discrete(): boolean {
    return !!(this.foundation && this.foundation.isDiscrete_);
  }

  set discrete(isDiscrete: boolean) {
    if (this.foundation) {
      this.foundation.isDiscrete_ = isDiscrete;
    }
  }

  get displayMarkers(): boolean {
    return !!this.foundation && this.foundation.hasTrackMarker_;
  }

  set displayMarkers(isDisplayMarkers: boolean) {
    if (this.foundation) {
      this.foundation.hasTrackMarker_ = isDisplayMarkers;
    }
  }

  layout() {
    this.foundation.layout();
  }

  sync(props: SliderPropsT, prevProps: SliderPropsT) {
    // value
    if (props.value !== undefined && props.value !== this.value) {
      this.value = props.value !== undefined ? Number(props.value) : this.value;
    }

    // max
    if (props.max !== undefined && props.max !== this.max) {
      this.max = props.max !== undefined ? +props.max : this.max;
    }

    // min
    if (props.min !== undefined && props.min !== this.min) {
      this.min = props.min !== undefined ? +props.min : this.min;
    }

    // step
    if (props.step !== undefined && props.step !== this.step) {
      this.step = props.step !== undefined ? +props.step : this.step;
    }

    // disabled
    if (props.disabled !== undefined && props.disabled !== this.disabled) {
      this.disabled = !!props.disabled;
    }

    // discrete
    if (props.discrete !== undefined && props.discrete !== this.discrete) {
      this.discrete = !!props.discrete;
    }

    //eslint-disable-next-line eqeqeq
    if (this.discrete && this.foundation && this.foundation.getStep() == 0) {
      this.step = 1;
    }

    // displayMarkers
    if (
      props.displayMarkers !== undefined &&
      props.displayMarkers !== this.displayMarkers
    ) {
      this.displayMarkers = !!props.displayMarkers;
      window.requestAnimationFrame(
        () => this.foundation && this.foundation.setupTrackMarker()
      );
    }
  }

  getDefaultFoundation() {
    return new MDCSliderFoundation({
      hasClass: (className: string) => this.classList.root_.has(className),
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      getAttribute: (name: string) => this.propsList.root_.get(name),
      setAttribute: debounce(
        (name: string, value: any) =>
          this.propsList.root_ && this.propsList.root_.add(name, value),
        300
      ),
      removeAttribute: (name: string) => this.propsList.root_.remove(name),
      computeBoundingRect: () =>
        this.root_ && this.root_.getBoundingClientRect(),
      getTabIndex: () => this.root_ && this.root_.tabIndex,
      registerInteractionHandler: (type: string, handler: () => void) => {
        this.propsList.root_.addEventListener(type, handler);
      },
      deregisterInteractionHandler: (type: string, handler: () => void) => {
        this.propsList.root_.removeEventListener(type, handler);
      },
      registerThumbContainerInteractionHandler: (
        type: string,
        handler: () => void
      ) => {
        this.propsList.thumbContainer_.addEventListener(type, handler);
      },
      deregisterThumbContainerInteractionHandler: (
        type: string,
        handler: () => void
      ) => {
        this.propsList.thumbContainer_.removeEventListener(type, handler);
      },
      registerBodyInteractionHandler: (type: string, handler: () => void) => {
        document.body && document.body.addEventListener(type, handler);
      },
      deregisterBodyInteractionHandler: (type: string, handler: () => void) => {
        document.body && document.body.removeEventListener(type, handler);
      },
      registerResizeHandler: (handler: () => void) => {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (handler: () => void) => {
        window.removeEventListener('resize', handler);
      },
      notifyInput: () => {
        this.emit('onInput', { value: this.value });
      },
      notifyChange: () => {
        this.emit('onChange', { value: this.value });
      },
      setThumbContainerStyleProperty: (propertyName: string, value: any) => {
        this.thumbContainer_ &&
          this.thumbContainer_.style.setProperty(propertyName, value);
      },
      setTrackStyleProperty: (propertyName: string, value: any) => {
        this.track_ && this.track_.style.setProperty(propertyName, value);
      },
      setMarkerValue: (value: string) => {
        this.pinValueMarker_ && (this.pinValueMarker_.innerText = value);
      },
      appendTrackMarkers: (numMarkers: number) => {
        this.setState({ trackMarkersCount: numMarkers });
      },
      removeTrackMarkers: () => {
        this.setState({ trackMarkersCount: 0 });
      },
      setLastTrackMarkersStyleProperty: (propertyName: string, value: any) => {
        if (this.root_) {
          // We remove and append new nodes, thus, the last track marker must be dynamically found.
          const lastTrackMarker = this.root_.querySelector(
            MDCSliderFoundation.strings.LAST_TRACK_MARKER_SELECTOR
          );
          lastTrackMarker &&
            lastTrackMarker.style.setProperty(propertyName, value);
        }
      },
      isRTL: () =>
        this.root_ && getComputedStyle(this.root_).direction === 'rtl'
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
      ...rest
    } = this.props;

    const dataStep = step ? { 'data-step': step } : {};
    const tsxValue: any = value;
    const tsxMax: any = max;

    if (displayMarkers && !discrete) {
      console.warn(
        `The 'displayMarkers' prop on rmwc Slider will
        only work in conjunction with the 'discrete' prop`
      );
    }

    return (
      <SliderRoot
        tabIndex={0}
        //eslint-disable-next-line jsx-a11y/role-has-required-aria-props
        role="slider"
        aria-valuemax={tsxMax}
        aria-valuenow={tsxValue}
        aria-label="Select Value"
        ref={(ref: HTMLElement) => (this.root_ = ref)}
        discrete={discrete}
        displayMarkers={displayMarkers}
        {...(disabled ? { 'aria-disabled': disabled } : {})}
        {...dataStep}
        {...this.propsList.root_.all(rest)}
        className={this.classList.root_.renderToString()}
      >
        <div className="mdc-slider__track-container">
          <SliderTrack elementRef={(ref: HTMLElement) => (this.track_ = ref)} />
          {displayMarkers && (
            <SliderTrackMarkerContainer
              markersCount={this.state.trackMarkersCount}
            />
          )}
        </div>
        <div
          className="mdc-slider__thumb-container"
          ref={ref => (this.thumbContainer_ = ref)}
          {...this.propsList.thumbContainer_.all()}
        >
          {discrete && (
            <SliderPin
              elementRef={(ref: HTMLElement) => (this.pinValueMarker_ = ref)}
            />
          )}
          <SliderThumb />
          <SliderFocusRing />
        </div>
        {children}
      </SliderRoot>
    );
  }
}

export default Slider;
