import React, { useRef, useEffect } from 'react';
import { SliderProps } from '.';
import { useFoundation, emptyClientRect } from '@rmwc/base';

import { EventType, SpecificEventListener } from '@material/base/types';
import { debounce } from '@rmwc/base';

import { MDCSliderFoundation } from '@material/slider';

export const useSliderFoundation = (
  props: SliderProps & React.HTMLProps<any>
) => {
  const trackRef = useRef<HTMLElement>();
  const setTrackRef = (element: HTMLElement) => (trackRef.current = element);

  const trackmarkerContainerRef = useRef<HTMLElement>();
  const setTrackMarkerContainerRef = (element: HTMLElement) =>
    (trackmarkerContainerRef.current = element);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true,
      thumbContainerEl: true,
      sliderPinEl: true
    },
    foundation: ({ rootEl, thumbContainerEl, sliderPinEl, emit }) => {
      return new MDCSliderFoundation({
        hasClass: (className: string) => rootEl.hasClass(className),
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        getAttribute: (name: string) =>
          rootEl.getProp(name as any) as string | null,
        setAttribute: debounce(
          (name: string, value: any) => rootEl.setProp(name as any, value),
          300
        ),
        removeAttribute: (name: string) => rootEl.removeProp(name as any),
        computeBoundingRect: () =>
          rootEl.ref ? rootEl.ref.getBoundingClientRect() : emptyClientRect,
        getTabIndex: () => (rootEl.ref ? rootEl.ref.tabIndex : 0),
        registerInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {
          rootEl.addEventListener(evtType, handler);
        },
        deregisterInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {
          rootEl.removeEventListener(evtType, handler);
        },
        registerThumbContainerInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {
          thumbContainerEl.addEventListener(evtType, handler);
        },
        deregisterThumbContainerInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {
          thumbContainerEl.removeEventListener(evtType, handler);
        },
        registerBodyInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {
          document.body && document.body.addEventListener(evtType, handler);
        },
        deregisterBodyInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => {
          document.body && document.body.removeEventListener(evtType, handler);
        },
        registerResizeHandler: (
          handler: SpecificEventListener<'resize'>
        ): void => {
          window.addEventListener('resize', handler);
        },
        deregisterResizeHandler: (
          handler: SpecificEventListener<'resize'>
        ): void => {
          window.removeEventListener('resize', handler);
        },
        notifyInput: () => {
          emit('onInput', { value: foundation.getValue() });
        },
        notifyChange: () => {
          emit('onChange', { value: foundation.getValue() });
        },
        setThumbContainerStyleProperty: (propertyName: string, value: any) => {
          thumbContainerEl.setStyle(propertyName, value);
        },
        setTrackStyleProperty: (propertyName: string, value: any) => {
          trackRef.current?.style.setProperty(propertyName, value);
        },
        setMarkerValue: (value: number) => {
          sliderPinEl.setProp('value', value);
        },

        setTrackMarkers: (step: number, max: number, min: number) => {
          const stepStr = step.toLocaleString();
          const maxStr = max.toLocaleString();
          const minStr = min.toLocaleString();
          // keep calculation in css for better rounding/subpixel behavior
          const markerAmount = `((${maxStr} - ${minStr}) / ${stepStr})`;
          const markerWidth = `2px`;
          const markerBkgdImage = `linear-gradient(to right, currentColor ${markerWidth}, transparent 0)`;
          const markerBkgdLayout = `0 center / calc((100% - ${markerWidth}) / ${markerAmount}) 100% repeat-x`;
          const markerBkgdShorthand = `${markerBkgdImage} ${markerBkgdLayout}`;
          trackmarkerContainerRef.current?.style.setProperty(
            'background',
            markerBkgdShorthand
          );
        },
        isRTL: () =>
          !!rootEl.ref && getComputedStyle(rootEl.ref).direction === 'rtl'
      });
    }
  });

  // max
  useEffect(() => {
    props.max !== undefined && foundation.setMax(+props.max);
  }, [props.max, foundation]);

  // min
  useEffect(() => {
    props.min !== undefined && foundation.setMin(+props.min);
  }, [props.min, foundation]);

  // value
  useEffect(() => {
    let value =
      props.value !== undefined ? Number(props.value) : foundation.getValue();

    const min = foundation.getMin();
    const max = foundation.getMax();
    // make value in bounds
    if (value < min) {
      console.warn(
        `Attempted to set slider to ${value} which is less than min: ${min}`
      );
      value = min;
    }

    if (value > max) {
      console.warn(
        `Attempted to set slider to ${value} which is greater than max: ${max}`
      );
      value = max;
    }

    foundation.setValue(value);
  }, [props.value, foundation]);

  // step
  useEffect(() => {
    props.step !== undefined && foundation.setStep(+props.step);
  }, [props.step, foundation]);

  // disabled
  useEffect(() => {
    props.disabled !== undefined && foundation.setDisabled(props.disabled);
  }, [props.disabled, foundation]);

  // discrete
  useEffect(() => {
    if (props.discrete !== undefined) {
      // @ts-ignore unsafe private variable access
      foundation.isDiscrete_ = props.discrete;
    }

    if (props.discrete && foundation.getStep() === 0) {
      foundation.setStep(1);
    }
  }, [props.discrete, foundation]);

  // displayMarkers
  useEffect(() => {
    // @ts-ignore unsafe private variable access
    const hasTrackMarker = foundation.hasTrackMarker_;
    if (
      props.displayMarkers !== undefined &&
      props.displayMarkers !== hasTrackMarker
    ) {
      // @ts-ignore unsafe private variable access
      foundation.hasTrackMarker_ = props.displayMarkers;
      window.requestAnimationFrame(() => foundation.setupTrackMarker());
    }
  }, [props.displayMarkers, foundation]);

  // bugfix
  useEffect(() => {
    // Fixes an issue where synthetic events were being
    // accessed in the Foundation and causing an error
    // @ts-ignore unsafe private access
    const existinghandleDown_ = foundation.handleDown_.bind(foundation);

    // @ts-ignore unsafe private access
    foundation.handleDown_ = (evt: React.SyntheticEvent<any>) => {
      evt.persist();
      existinghandleDown_(evt);
    };
  }, [foundation]);

  return {
    setTrackRef,
    setTrackMarkerContainerRef,
    ...elements
  };
};
