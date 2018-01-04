// @flow
import * as React from 'react';
import classNames from 'classnames';
import { MDCSlider } from '@material/slider/dist/mdc.slider';
import { noop } from '../Base/noop';
import { simpleTag, withMDC } from '../Base';

export const SliderRoot = simpleTag({
  displayName: 'SliderRoot',
  classNames: 'mdc-slider'
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

export const SliderThumb = props => (
  <svg className="mdc-slider__thumb" width="21" height="21">
    <circle cx="10.5" cy="10.5" r="7.875" />
  </svg>
);

export const SliderFocusRing = simpleTag({
  displayName: 'SliderFocusRing',
  classNames: 'mdc-slider__focus-ring'
});

type SliderPropsT = {
  /** A callback that takes an event with event.target.value set to the Slider's value. */
  onChange?: (evt: Event) => mixed,
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
};

export const Slider: React.ComponentType<SliderPropsT> = withMDC({
  mdcConstructor: MDCSlider,
  mdcElementRef: true,
  mdcEvents: {
    'MDCSlider:input': (evt, props, api) => {
      evt.target.value = api.value;
      props.onChange && props.onChange(evt);
    },
    'MDCSlider:change': (evt, props, api) => {
      evt.target.value = api.value;
      props.onChange && props.onChange(evt);
    }
  },
  defaultProps: {
    onChange: noop,
    value: 0,
    min: 0,
    max: 100,
    step: undefined,
    discrete: false,
    displayMarkers: false,
    disabled: false
  },
  onUpdate(props, nextProps, api, inst) {
    if (api && api.value !== nextProps.value) {
      api.value = nextProps.value;
      nextProps.onChange &&
        nextProps.onChange({ target: { value: api.value } });
    }

    ['min', 'max', 'step', 'disabled'].forEach(key => {
      if (api) {
        api[key] = nextProps[key];
      }
    });

    // Reinit on discrete or display marker change
    if (
      props &&
      (props.discrete !== nextProps.discrete ||
        props.displayMarkers !== nextProps.displayMarkers)
    ) {
      window.requestAnimationFrame(() => {
        inst.mdcComponentReinit();
      });
    }
  }
})(
  class extends React.Component<SliderPropsT> {
    static displayName = 'Slider';

    render() {
      const {
        value,
        min,
        max,
        discrete,
        displayMarkers,
        mdcElementRef,
        step,
        onChange,
        className,
        disabled,
        children,
        ...rest
      } = this.props;
      if (displayMarkers && !discrete) {
        console.warn(
          `The 'displayMarkers' prop on rmwc Slider will 
        only work in conjunction with the 'discrete' prop`
        );
      }

      const classes = classNames(className, {
        'mdc-slider--discrete': discrete,
        'mdc-slider--display-markers': displayMarkers && discrete
      });

      const dataStep = step ? { 'data-step': step } : {};

      return (
        <SliderRoot
          elementRef={mdcElementRef}
          className={classes}
          tabIndex="0"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label="Select Value"
          {...(disabled ? { 'aria-disabled': disabled } : {})}
          {...dataStep}
          {...rest}
        >
          <SliderTrackContainer>
            <SliderTrack />
            {displayMarkers && <SliderTrackMarkerContainer />}
          </SliderTrackContainer>
          <SliderThumbContainer>
            {discrete && (
              <SliderPin>
                <SliderPinValueMarker />
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
);

export default Slider;
