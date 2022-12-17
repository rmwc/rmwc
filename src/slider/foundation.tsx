import React, { useRef, useEffect } from 'react';
import { SliderProps } from '.';
import { useFoundation, emptyClientRect } from '@rmwc/base';

import {
  cssClasses,
  events,
  MDCSliderFoundation,
  Thumb,
  TickMark
} from '@material/slider';

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
      const thumbs = [].slice.call(
        rootEl.ref?.querySelectorAll(`.${cssClasses.THUMB}`)
      ) as HTMLElement[];

      const getThumbEl = (thumb: Thumb) => {
        return thumb === Thumb.END ? thumbs[thumbs.length - 1] : thumbs[0];
      };

      const inputs = [].slice.call(
        rootEl.ref?.querySelectorAll(`.${cssClasses.INPUT}`)
      ) as HTMLInputElement[];

      const getInput = (thumb: Thumb) => {
        return thumb === Thumb.END ? inputs[inputs.length - 1] : inputs[0];
      };

      const addTickMarks = (
        tickMarkContainer: HTMLElement,
        tickMarks: TickMark[]
      ) => {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < tickMarks.length; i++) {
          const div = document.createElement('div');
          const tickMarkClass =
            tickMarks[i] === TickMark.ACTIVE
              ? cssClasses.TICK_MARK_ACTIVE
              : cssClasses.TICK_MARK_INACTIVE;
          div.classList.add(tickMarkClass);
          fragment.appendChild(div);
        }
        tickMarkContainer.appendChild(fragment);
      };

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

      // const ripples = foundation.createRipples();

      // const getRipple = (thumb: Thumb) => {
      //   return thumb === Thumb.END ? ripples[ripples.length - 1] : ripples[0];
      // };

      return new MDCSliderFoundation({
        hasClass: (className: string) => rootEl.hasClass(className),
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        addThumbClass: (className, thumb: Thumb) => {
          getThumbEl(thumb).classList.add(className);
        },
        removeThumbClass: (className, thumb: Thumb) => {
          getThumbEl(thumb).classList.remove(className);
        },
        getAttribute: (name: string) =>
          rootEl.getProp(name as any) as string | null,
        getInputValue: (thumb: Thumb) => getInput(thumb).value,
        setInputValue: (value: string, thumb: Thumb) => {
          getInput(thumb).value = value;
        },
        getInputAttribute: (attribute, thumb: Thumb) =>
          getInput(thumb).getAttribute(attribute),
        setInputAttribute: (attribute, value, thumb: Thumb) => {
          getInput(thumb).setAttribute(attribute, value);
        },
        removeInputAttribute: (attribute, thumb: Thumb) => {
          getInput(thumb).removeAttribute(attribute);
        },
        focusInput: (thumb: Thumb) => {
          getInput(thumb).focus();
        },
        isInputFocused: (thumb: Thumb) =>
          getInput(thumb) === document.activeElement,
        shouldHideFocusStylesForPointerEvents: () => false,
        getThumbKnobWidth: (thumb: Thumb) => {
          return getThumbEl(thumb)
            .querySelector<HTMLElement>(`.${cssClasses.THUMB_KNOB}`)!
            .getBoundingClientRect().width;
        },
        getThumbBoundingClientRect: (thumb: Thumb) =>
          getThumbEl(thumb).getBoundingClientRect(),
        getBoundingClientRect: () =>
          rootEl.ref?.getBoundingClientRect() ?? emptyClientRect,
        getValueIndicatorContainerWidth: (thumb: Thumb) => {
          return getThumbEl(thumb)
            .querySelector<HTMLElement>(
              `.${cssClasses.VALUE_INDICATOR_CONTAINER}`
            )!
            .getBoundingClientRect().width;
        },
        isRTL: () =>
          !!rootEl.ref && getComputedStyle(rootEl.ref).direction === 'rtl',
        setThumbStyleProperty: (propertyName, value, thumb: Thumb) => {
          getThumbEl(thumb).style.setProperty(propertyName, value);
        },
        removeThumbStyleProperty: (propertyName, thumb: Thumb) => {
          getThumbEl(thumb).style.removeProperty(propertyName);
        },
        setTrackActiveStyleProperty: (propertyName, value) => {
          // TODO: is trackRef correct?
          trackRef.current?.style.setProperty(propertyName, value);
        },
        removeTrackActiveStyleProperty: (propertyName) => {
          // TODO: is trackRef correct?
          trackRef.current?.style.removeProperty(propertyName);
        },
        setValueIndicatorText: (value: number, thumb: Thumb) => {
          const valueIndicatorEl = getThumbEl(thumb).querySelector<HTMLElement>(
            `.${cssClasses.VALUE_INDICATOR_TEXT}`
          );
          valueIndicatorEl!.textContent = String(value);
        },
        // getValueToAriaValueTextFn: () => valueToAriaValueTextFn, // TODO
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
            while (tickMarksContainer.firstChild) {
              tickMarksContainer.removeChild(tickMarksContainer.firstChild);
            }
            addTickMarks(tickMarksContainer, tickMarks);
          } else {
            updateTickMarks(tickMarksContainer, tickMarks);
          }
        },
        setPointerCapture: (pointerId) => {
          rootEl.ref?.setPointerCapture(pointerId);
        },
        emitChangeEvent: (value, thumb: Thumb) => {
          emit(events.CHANGE, {
            value,
            thumb
          });
        },
        emitInputEvent: (value, thumb: Thumb) => {
          emit(events.INPUT, { value, thumb });
        },
        // emitDragStartEvent: (_, thumb: Thumb) => {
        //   // Emitting event is not yet implemented. See issue:
        //   // https://github.com/material-components/material-components-web/issues/6448

        //   getRipple(thumb).activate();
        // },
        // emitDragEndEvent: (_, thumb: Thumb) => {
        //   // Emitting event is not yet implemented. See issue:
        //   // https://github.com/material-components/material-components-web/issues/6448

        //   getRipple(thumb).deactivate();
        // },
        registerEventHandler: (evtType, handler) => {
          rootEl.addEventListener(evtType, handler);
        },
        deregisterEventHandler: (evtType, handler) => {
          rootEl.removeEventListener(evtType, handler);
        },
        registerThumbEventHandler: (thumb, evtType, handler) => {
          getThumbEl(thumb).addEventListener(evtType, handler);
        },
        deregisterThumbEventHandler: (thumb, evtType, handler) => {
          getThumbEl(thumb).removeEventListener(evtType, handler);
        },
        registerInputEventHandler: (thumb, evtType, handler) => {
          getInput(thumb).addEventListener(evtType, handler);
        },
        deregisterInputEventHandler: (thumb, evtType, handler) => {
          getInput(thumb).removeEventListener(evtType, handler);
        },
        registerBodyEventHandler: (evtType, handler) => {
          document.body.addEventListener(evtType, handler);
        },
        deregisterBodyEventHandler: (evtType, handler) => {
          document.body.removeEventListener(evtType, handler);
        },
        registerWindowEventHandler: (evtType, handler) => {
          window.addEventListener(evtType, handler);
        },
        deregisterWindowEventHandler: (evtType, handler) => {
          window.removeEventListener(evtType, handler);
        }
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
      // window.requestAnimationFrame(() => foundation.setupTrackMarker());
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
