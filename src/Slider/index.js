// @flow
import * as React from 'react';
import classNames from 'classnames';
import { MDCSliderFoundation } from '@material/slider/dist/mdc.slider';
import { noop } from '../Base/noop';
import { strings } from './constants';
import { simpleTag, withMDCFoundation } from '../Base';

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
  /** A callback that fires when the Slider stops sliding which takes an event with event.target.value set to the Slider's value. */
  onChange?: (evt: Event) => mixed,
  /** A callback that fires continuously while the Slider is slidng that takes an event with event.target.value set to the Slider's value. */
  onInput?: (evt: Event) => mixed,
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

export const Slider = withMDCFoundation({
  constructor: MDCSliderFoundation,
  refs: [
    'root_',
    'thumbContainer_',
    'track_',
    'pinValueMarker_',
    'trackMarkerContainer_'
  ],
  defaultProps: {
    onChange: noop,
    onInput: noop
  },
  defaultHandlers: [
    'hasClass',
    'addClass',
    'removeClass',
    'registerInteractionHandler',
    'deregisterInteractionHandler'
  ],
  adapter: inst => ({
    hasClass: className => inst.root_.classList.contains(className),
    addClass: className => inst.root_.classList.add(className),
    removeClass: className => inst.root_.classList.remove(className),
    getAttribute: name => inst.root_.getAttribute(name),
    setAttribute: (name, value) => inst.root_.setAttribute(name, value),
    removeAttribute: name => inst.root_.removeAttribute(name),
    computeBoundingRect: () => inst.root_.getBoundingClientRect(),
    getTabIndex: () => inst.root_.tabIndex,
    registerInteractionHandler: (type, handler) => {
      inst.root_.addEventListener(type, handler);
    },
    deregisterInteractionHandler: (type, handler) => {
      inst.root_.removeEventListener(type, handler);
    },
    registerThumbContainerInteractionHandler: (type, handler) => {
      inst.thumbContainer_.addEventListener(type, handler);
    },
    deregisterThumbContainerInteractionHandler: (type, handler) => {
      inst.thumbContainer_.removeEventListener(type, handler);
    },
    registerBodyInteractionHandler: (type, handler) => {
      window.document.body.addEventListener(type, handler);
    },
    deregisterBodyInteractionHandler: (type, handler) => {
      window.document.body.removeEventListener(type, handler);
    },
    registerResizeHandler: handler => {
      window.addEventListener('resize', handler);
    },
    deregisterResizeHandler: handler => {
      window.removeEventListener('resize', handler);
    },
    notifyInput: () => {
      inst.props.onChange(strings.INPUT_EVENT, this);
    },
    notifyChange: () => {
      inst.props.onInput(strings.CHANGE_EVENT, this);
    },
    setThumbContainerStyleProperty: (propertyName, value) => {
      inst.thumbContainer_.style.setProperty(propertyName, value);
    },
    setTrackStyleProperty: (propertyName, value) => {
      inst.track_.style.setProperty(propertyName, value);
    },
    setMarkerValue: value => {
      inst.pinValueMarker_.innerText = value;
    },
    appendTrackMarkers: numMarkers => {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < numMarkers; i++) {
        const marker = document.createElement('div');
        marker.classList.add('mdc-slider__track-marker');
        frag.appendChild(marker);
      }
      inst.trackMarkerContainer_.appendChild(frag);
    },
    removeTrackMarkers: () => {
      while (inst.trackMarkerContainer_.firstChild) {
        inst.trackMarkerContainer_.removeChild(
          inst.trackMarkerContainer_.firstChild
        );
      }
    },
    setLastTrackMarkersStyleProperty: (propertyName, value) => {
      // We remove and append new nodes, thus, the last track marker must be dynamically found.
      const lastTrackMarker = inst.root_.querySelector(
        strings.LAST_TRACK_MARKER_SELECTOR
      );
      lastTrackMarker.style.setProperty(propertyName, value);
    },
    isRTL: () => getComputedStyle(inst.root_).direction === 'rtl'
  }),
  syncWithProps: (inst, props) => {
    const origValueNow = parseFloat(
      this.root_.getAttribute(strings.ARIA_VALUENOW)
    );
    this.min =
      parseFloat(this.root_.getAttribute(strings.ARIA_VALUEMIN)) || this.min;
    this.max =
      parseFloat(this.root_.getAttribute(strings.ARIA_VALUEMAX)) || this.max;
    this.step =
      parseFloat(this.root_.getAttribute(strings.STEP_DATA_ATTR)) || this.step;
    this.value = origValueNow || this.value;
    this.disabled =
      this.root_.hasAttribute(strings.ARIA_DISABLED) &&
      this.root_.getAttribute(strings.ARIA_DISABLED) !== 'false';
    this.foundation_.setupTrackMarker();
  }

  // onUpdate(props, nextProps, api, inst) {
  //   if (api && api.value !== nextProps.value) {
  //     api.value = nextProps.value;
  //     nextProps.onChange &&
  //       nextProps.onChange({ target: { value: api.value } });
  //   }

  //   ['min', 'max', 'step', 'disabled'].forEach(key => {
  //     if (api) {
  //       api[key] = nextProps[key];
  //     }
  //   });

  //   // Reinit on discrete or display marker change
  //   if (
  //     props &&
  //     (props.discrete !== nextProps.discrete ||
  //       props.displayMarkers !== nextProps.displayMarkers)
  //   ) {
  //     window.requestAnimationFrame(() => {
  //       inst.mdcComponentReinit();
  //     });
  //   }
  // }
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
        step,
        onChange,
        onInput,
        className,
        disabled,
        children,
        root_,
        thumbContainer_,
        track_,
        pinValueMarker_,
        trackMarkerContainer_,
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
          className={classes}
          tabIndex="0"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label="Select Value"
          elementRef={root_}
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
);

export default Slider;
