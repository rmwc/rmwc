import React, { useRef, useEffect, createElement, useState } from 'react';
import { SliderProps } from '.';
import { useFoundation } from '@rmwc/base';

import { EventType, SpecificEventListener } from '@material/base/types';

import {
  cssClasses,
  MDCSliderFoundation,
  events,
  attributes,
  Thumb,
  TickMark
} from '@material/slider';

export const useSliderFoundation = (
  props: SliderProps & React.HTMLProps<any>
) => {
  const trackActiveRef = useRef<HTMLElement>();
  const setTracActivekRef = (element: HTMLElement) =>
    (trackActiveRef.current = element);

  const trackmarkerContainerRef = useRef<HTMLElement>();
  const setTrackMarkerContainerRef = (element: HTMLElement) =>
    (trackmarkerContainerRef.current = element);

  const thumbsRef = useRef<HTMLElement[]>();
  const setThumbsRef = (element: HTMLElement[]) =>
    (thumbsRef.current = element);

  const valueToAriaValueTextFn: ((value: number) => string) | null = null;

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true
      // thumbContainerEl: true,
      // sliderPinEl: true
    },
    foundation: ({
      rootEl,
      // thumbContainerEl,
      // sliderPinEl,
      emit
    }) => {
      return new MDCSliderFoundation({
        hasClass: (className: string) => rootEl.hasClass(className),
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        getAttribute: (name: string) =>
          rootEl.getProp(name as any) as string | null,
        addThumbClass: (className: string, thumb: Thumb) => {
          getThumbEl(thumb)?.classList.add(className);
        },
        removeThumbClass: (className: string, thumb: Thumb) => {
          getThumbEl(thumb)?.classList.remove(className);
        },
        getThumbAttribute: (attribute: string, thumb: Thumb) => {
          const thumbEl = getThumbEl(thumb);
          return thumbEl ? thumbEl.getAttribute(attribute) : null;
        },
        setThumbAttribute: (attribute: string, value: string, thumb: Thumb) => {
          return (
            getThumbEl(thumb) !== undefined ??
            getThumbEl(thumb)?.setAttribute(attribute, value)
          );
        },
        getThumbKnobWidth: (thumb: Thumb) => {
          const thumbEl = getThumbEl(thumb);
          return thumbEl
            ? thumbEl
                .querySelector(`.${cssClasses.THUMB_KNOB}`)!
                .getBoundingClientRect().width
            : 0;
        },
        getThumbBoundingClientRect: (thumb: Thumb) => {
          const thumbEl = getThumbEl(thumb);
          return thumbEl
            ? thumbEl.getBoundingClientRect()
            : ({
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0
              } as ClientRect);
        },
        getBoundingClientRect: () =>
          rootEl.ref
            ? rootEl.ref.getBoundingClientRect()
            : ({
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0
              } as ClientRect),
        isThumbFocused: (thumb: Thumb) =>
          getThumbEl(thumb) === document.activeElement,
        focusThumb: (thumb: Thumb) => {
          getThumbEl(thumb)?.focus();
        },
        isRTL: () =>
          !!rootEl.ref && getComputedStyle(rootEl.ref).direction === 'rtl',
        setThumbStyleProperty: (
          propertyName: string,
          value: string,
          thumb: Thumb
        ) => {
          getThumbEl(thumb)?.style.setProperty(propertyName, value);
        },
        removeThumbStyleProperty: (propertyName: string, thumb: Thumb) => {
          getThumbEl(thumb)?.style.removeProperty(propertyName);
        },
        setTrackActiveStyleProperty: (propertyName: string, value: string) => {
          trackActiveRef.current?.style.setProperty(propertyName, value);
        },
        removeTrackActiveStyleProperty: (propertyName: string) => {
          trackActiveRef.current?.style.removeProperty(propertyName);
        },
        setValueIndicatorText: (value: number, thumb: Thumb) => {
          const valueIndicatorEl = getThumbEl(thumb)?.querySelector(
            `.${cssClasses.VALUE_INDICATOR_TEXT}`
          );
          valueIndicatorEl!.textContent = String(value);
        },
        getValueToAriaValueTextFn: () => valueToAriaValueTextFn,
        updateTickMarks: (tickMarks: TickMark[]) => {
          let tickMarksContainer = rootEl.ref?.querySelector<HTMLElement>(
            `.${cssClasses.TICK_MARKS_CONTAINER}`
          );
          if (!tickMarksContainer) {
            tickMarksContainer = document.createElement('div');
            tickMarksContainer.classList.add(cssClasses.TICK_MARKS_CONTAINER);
            const track = rootEl.ref?.querySelector<HTMLElement>(
              `.${cssClasses.TRACK}`
            );
            track!.appendChild(tickMarksContainer);
          }

          if (tickMarks.length !== tickMarksContainer.children.length) {
            tickMarksContainer.innerHTML = '';
            addTickMarks(tickMarksContainer, tickMarks);
          } else {
            updateTickMarks(tickMarksContainer, tickMarks);
          }
        },
        setPointerCapture: (pointerId: number) => {
          rootEl.ref?.setPointerCapture(pointerId);
        },
        emitChangeEvent: (value: number, thumb: Thumb) => {
          emit(events.CHANGE, { value, thumb });
        },
        emitInputEvent: (value: number, thumb: Thumb) => {
          emit(events.INPUT, { value, thumb });
        },
        emitDragStartEvent: (value: number, thumb: Thumb) => {
          // Not implemented yet as of MCW 8
        },
        emitDragEndEvent: (value: number, thumb: Thumb) => {
          // Not implemeneted yet as of MCW 8
        },
        registerEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          rootEl.addEventListener(evtType, handler);
        },
        deregisterEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          rootEl.removeEventListener(evtType, handler);
        },
        registerThumbEventHandler: <K extends EventType>(
          thumb: Thumb,
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          getThumbEl(thumb)?.removeEventListener(evtType, handler);
        },
        deregisterThumbEventHandler: <K extends EventType>(
          thumb: Thumb,
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          getThumbEl(thumb)?.addEventListener(evtType, handler);
        },
        registerBodyEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          document.body.addEventListener(evtType, handler);
        },
        deregisterBodyEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          document.body.removeEventListener(evtType, handler);
        },
        registerWindowEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          window.addEventListener(evtType, handler);
        },
        deregisterWindowEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => {
          window.removeEventListener(evtType, handler);
        }
      });
    }
  });

  const getThumbEl = (thumb: Thumb) => {
    // if (thumbsRef.current === undefined) {
    //   return document.createElement('div');
    // }
    return thumb === Thumb.END
      ? thumbsRef.current?.[thumbsRef.current.length - 1]
      : thumbsRef.current?.[0];
  };

  // Based on pair programming w. James
  const [tickMarks, setTickMarks] = useState<Array<{ className: string }>>([]);

  const addTickMarks = (
    tickMarkContainer: HTMLElement,
    tickMarks: TickMark[]
  ) => {
    const nextTickMarks = [];
    for (let i = 0; i < tickMarks.length; i++) {
      const tickMarkClass =
        tickMarks[i] === TickMark.ACTIVE
          ? cssClasses.TICK_MARK_ACTIVE
          : cssClasses.TICK_MARK_INACTIVE;
      nextTickMarks.push({ className: tickMarkClass });
    }
  };

  // Adds tick mark elements to the given container
  // const addTickMarks = (
  //   tickMarkContainer: HTMLElement,
  //   tickMarks: TickMark[]
  // ) => {
  //   const fragment = document.createDocumentFragment();
  //   for (let i = 0; i < tickMarks.length; i++) {
  //     const div = document.createElement('div');
  //     const tickMarkClass =
  //       tickMarks[i] === TickMark.ACTIVE
  //         ? cssClasses.TICK_MARK_ACTIVE
  //         : cssClasses.TICK_MARK_INACTIVE;
  //     div.classList.add(tickMarkClass);
  //     fragment.appendChild(div);
  //   }
  //   tickMarkContainer.appendChild(fragment);
  // };

  // Updates tick mark elements' classes in the given container
  const updateTickMarks = (
    tickMarkContainer: HTMLElement,
    tickMarks: TickMark[]
  ) => {
    const tickMarkEls = Array.from(tickMarkContainer.children);
    for (let i = 0; i < tickMarkEls.length; i++) {
      if (tickMarks[i] === TickMark.ACTIVE) {
        tickMarkEls[i].classList.add(cssClasses.TICK_MARK_ACTIVE);
        tickMarkEls[i].classList.remove(cssClasses.TICK_MARK_INACTIVE);
      } else {
        tickMarkEls[i].classList.add(cssClasses.TICK_MARK_INACTIVE);
        tickMarkEls[i].classList.remove(cssClasses.TICK_MARK_ACTIVE);
      }
    }
  };

  // max
  // useEffect(() => {
  //   props.max !== undefined && foundation.setMax(+props.max);
  // }, [props.max, foundation]);

  // min
  // useEffect(() => {
  //   props.min !== undefined && foundation.setMin(+props.min);
  // }, [props.min, foundation]);

  console.log(
    // @ts-ignore
    foundation.adapter.getThumbAttribute(attributes.ARIA_VALUEMIN, Thumb.END)
  );
  console.log(
    // @ts-ignore
    foundation.adapter.getThumbAttribute(attributes.ARIA_VALUEMAX, Thumb.END)
  );

  // Attempt at fixing aria-valuemin issue
  useEffect(() => {
    // props.min = 1;
    // // @ts-ignore
    // foundation.convertAttributeValueToNumber(
    //   // @ts-ignore
    //   foundation.adapter.getThumbAttribute(
    //     attributes.ARIA_VALUEMIN,
    //     Thumb.END
    //   ),
    //   attributes.ARIA_VALUEMIN
    // );
    // props.max = 2;
  }, [props, foundation]);

  // value
  // useEffect(() => {
  //   let value =
  //     props.value !== undefined ? Number(props.value) : foundation.getValue();

  //   const min = foundation.getMin();
  //   const max = foundation.getMax();
  //   // make value in bounds
  //   if (value < min) {
  //     console.warn(
  //       `Attempted to set slider to ${value} which is less than min: ${min}`
  //     );
  //     value = min;
  //   }

  //   if (value > max) {
  //     console.warn(
  //       `Attempted to set slider to ${value} which is greater than max: ${max}`
  //     );
  //     value = max;
  //   }

  //   foundation.setValue(value);
  // }, [props.value, foundation]);

  // step
  // useEffect(() => {
  //   props.step !== undefined && foundation.setStep(+props.step);
  // }, [props.step, foundation]);

  // disabled
  useEffect(() => {
    props.disabled !== undefined && foundation.setDisabled(props.disabled);
  }, [props.disabled, foundation]);

  // discrete
  // useEffect(() => {
  //   if (props.discrete !== undefined) {
  //     // @ts-ignore unsafe private variable access
  //     foundation.isDiscrete_ = props.discrete;
  //   }

  //   if (props.discrete && foundation.getStep() === 0) {
  //     foundation.setStep(1);
  //   }
  // }, [props.discrete, foundation]);

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
      // window.requestAnimationFrame(() => foundation.setupTrackMarker());
    }
  }, [props.displayMarkers, foundation]);

  // bugfix
  // useEffect(() => {
  //   // Fixes an issue where synthetic events were being
  //   // accessed in the Foundation and causing an error
  //   // @ts-ignore unsafe private access
  //   const existinghandleDown_ = foundation.handleDown_.bind(foundation);

  //   // @ts-ignore unsafe private access
  //   foundation.handleDown_ = (evt: React.SyntheticEvent<any>) => {
  //     evt.persist();
  //     existinghandleDown_(evt);
  //   };
  // }, [foundation]);

  return {
    setTracActivekRef,
    setTrackMarkerContainerRef,
    setThumbsRef,
    ...elements
  };
};
