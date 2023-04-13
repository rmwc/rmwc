import React, { useRef, useEffect } from 'react';
import { SliderProps } from '.';
import { useFoundation, emptyClientRect } from '@rmwc/base';

import {
  cssClasses,
  MDCSliderFoundation,
  Thumb,
  TickMark
} from '@material/slider';

export const useSliderFoundation = (
  props: SliderProps & React.HTMLProps<any>
) => {
  const thumbsRef = useRef<Array<HTMLElement | undefined>>([]);
  const setThumbRef = (index: number, element: HTMLElement | null) => {
    thumbsRef.current[index] = element || undefined;
  };

  const inputsRef = useRef<Array<HTMLInputElement | undefined>>([]);
  const setInputsRef = (index: number, element: HTMLInputElement | null) => {
    inputsRef.current[index] = element || undefined;
  };

  const valueToAriaValueTextFn: ((value: number) => string) | null = null;

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true,
      trackActiveEl: true
    },
    foundation: ({ rootEl, trackActiveEl, emit }) => {
      return new MDCSliderFoundation({
        hasClass: (className: string) => rootEl.hasClass(className),
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        addThumbClass: (className, thumb: Thumb) => {
          getThumbEl(thumb)?.classList.add(className);
        },
        removeThumbClass: (className, thumb: Thumb) => {
          getThumbEl(thumb)?.classList.remove(className);
        },
        getAttribute: (name: string) =>
          rootEl.getProp(name as any) as string | null,
        getInputValue: (thumb: Thumb) => getInput(thumb)?.value ?? '1',
        setInputValue: (value: string, thumb: Thumb) => {
          const input = getInput(thumb);
          if (input !== undefined) {
            return (input.value = value);
          }
          return value;
        },
        getInputAttribute: (attribute, thumb: Thumb) => {
          const input = getInput(thumb);
          if (input !== undefined) {
            return input.getAttribute(attribute);
          }
          return null;
        },
        setInputAttribute: (attribute, value, thumb: Thumb) => {
          getInput(thumb)?.setAttribute(attribute, value);
        },
        removeInputAttribute: (attribute, thumb: Thumb) => {
          getInput(thumb)?.removeAttribute(attribute);
        },
        focusInput: (thumb: Thumb) => {
          getInput(thumb)?.focus();
        },
        isInputFocused: (thumb: Thumb) =>
          getInput(thumb) === document.activeElement,
        shouldHideFocusStylesForPointerEvents: () => false,
        getThumbKnobWidth: (thumb: Thumb) => {
          const thumbKnob = getThumbEl(thumb)?.querySelector<HTMLElement>(
            `.${cssClasses.THUMB_KNOB}`
          )!;
          return thumbKnob.getBoundingClientRect().width;
        },
        getThumbBoundingClientRect: (thumb: Thumb) => {
          return getThumbEl(thumb)?.getBoundingClientRect() ?? emptyClientRect;
        },
        getBoundingClientRect: () => {
          return rootEl.ref?.getBoundingClientRect() ?? emptyClientRect;
        },
        getValueIndicatorContainerWidth: (thumb: Thumb) => {
          const thumbKnob = getThumbEl(thumb)?.querySelector<HTMLElement>(
            `.${cssClasses.VALUE_INDICATOR_CONTAINER}`
          )!;
          return thumbKnob.getBoundingClientRect().width;
        },
        isRTL: () =>
          !!rootEl.ref && getComputedStyle(rootEl.ref).direction === 'rtl',
        setThumbStyleProperty: (propertyName, value, thumb: Thumb) => {
          getThumbEl(thumb)?.style.setProperty(propertyName, value);
        },
        removeThumbStyleProperty: (propertyName, thumb: Thumb) => {
          getThumbEl(thumb)?.style.removeProperty(propertyName);
        },
        setTrackActiveStyleProperty: (propertyName, value) => {
          trackActiveEl.setStyle(propertyName, value);
        },
        removeTrackActiveStyleProperty: (propertyName) => {
          trackActiveEl.setStyle(propertyName, null);
        },
        setValueIndicatorText: (value: number, thumb: Thumb) => {
          const valueIndicatorEl = getThumbEl(
            thumb
          )?.querySelector<HTMLElement>(`.${cssClasses.VALUE_INDICATOR_TEXT}`);
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
          if (thumb === 2) {
            emit('onChange', {
              value,
              thumb
            });
          } else if (thumb === 1) {
            emit('onChangeValueStart', {
              value,
              thumb
            });
          }
        },
        emitInputEvent: (value, thumb: Thumb) => {
          if (thumb === 2) {
            emit('onInput', { value, thumb });
          } else if (thumb === 1) {
            emit('onInputValueStart', {
              value,
              thumb
            });
          }
        },
        // emitDragStartEvent: (_, thumb: Thumb) => {
        //   // Emitting event is not yet implemented. See issue:
        //   // https://github.com/material-components/material-components-web/issues/6448

        //   getRipple(thumb)?.activate();
        // },
        // emitDragEndEvent: (_, thumb: Thumb) => {
        //   // Emitting event is not yet implemented. See issue:
        //   // https://github.com/material-components/material-components-web/issues/6448

        //   getRipple(thumb)?.deactivate();
        // },
        registerEventHandler: (evtType, handler) => {
          rootEl.addEventListener(evtType, handler);
        },
        deregisterEventHandler: (evtType, handler) => {
          rootEl.removeEventListener(evtType, handler);
        },
        registerThumbEventHandler: (thumb, evtType, handler) => {
          getThumbEl(thumb)?.addEventListener(evtType, handler);
        },
        deregisterThumbEventHandler: (thumb, evtType, handler) => {
          getThumbEl(thumb)?.removeEventListener(evtType, handler);
        },
        registerInputEventHandler: (thumb, evtType, handler) => {
          getInput(thumb)?.addEventListener(evtType, handler);
        },
        deregisterInputEventHandler: (thumb, evtType, handler) => {
          getInput(thumb)?.removeEventListener(evtType, handler);
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

  const getThumbEl = (thumb: Thumb) => {
    return thumb === Thumb.END
      ? thumbsRef.current?.[thumbsRef.current.length - 1]
      : thumbsRef.current?.[0];
  };

  const getInput = (thumb: Thumb) => {
    return thumb === Thumb.END
      ? inputsRef.current?.[inputsRef.current.length - 1]
      : inputsRef.current[0];
  };

  const [tickMarks, setTickMarks] = React.useState<
    Array<{ className: string }>
  >([]);

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
    setTickMarks(nextTickMarks);
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

  // range
  useEffect(() => {
    if (props.range !== undefined) {
      // @ts-ignore unsafe private variable access
      foundation.isRange = props.range;
    }
  }, [props.range, foundation]);

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

  // valueStart
  useEffect(() => {
    if (props.range) {
      let valueStart =
        props.valueStart !== undefined
          ? Number(props.valueStart)
          : foundation.getValueStart();

      const min = foundation.getMin();
      const max = foundation.getMax();

      // make value in bounds
      if (valueStart < min) {
        console.warn(
          `Attempted to set slider to ${valueStart} which is less than min: ${min}`
        );
        valueStart = min;
      }

      if (valueStart > max) {
        console.warn(
          `Attempted to set slider to ${valueStart} which is greater than max: ${max}`
        );
        valueStart = max;
      }

      // there seems to be a timing issue with setValueStart. Hence wrapped in requestAnimationFrame
      window.requestAnimationFrame(() => foundation.setValueStart(valueStart));
    }
  }, [props.range, props.valueStart, foundation]);

  // disabled
  useEffect(() => {
    props.disabled !== undefined && foundation.setDisabled(props.disabled);
  }, [props.disabled, foundation]);

  // discrete
  useEffect(() => {
    if (props.discrete !== undefined) {
      // @ts-ignore unsafe private variable access
      foundation.isDiscrete = props.discrete;
    }

    if (props.discrete && foundation.getStep() === 0) {
      foundation.setStep(1);
    }
  }, [props.discrete, foundation]);

  // minRange
  useEffect(() => {
    if (props.minRange !== undefined) {
      foundation.setMinRange(Number(props.minRange));
    }
  }, [props.minRange, foundation]);

  // displayMarkers
  useEffect(() => {
    // @ts-ignore unsafe private variable access
    const hasTickMarks = foundation.hasTickMarks;
    if (
      props.displayMarkers !== undefined &&
      props.displayMarkers !== hasTickMarks
    ) {
      // @ts-ignore unsafe private variable access
      foundation.hasTickMarks = props.displayMarkers;
      foundation.setHasTickMarks(props.displayMarkers);
    }
  }, [props.displayMarkers, foundation]);

  // bugfix
  // useEffect(() => {
  //   // Fixes an issue where synthetic events were being
  //   // accessed in the Foundation and causing an error
  //   // @ts-ignore unsafe private access
  //   const existinghandleDown_ = foundation.handleDown.bind(foundation);

  //   // @ts-ignore unsafe private access
  //   foundation.handleDown = (evt: PointerEvent | MouseEvent | TouchEvent) => {
  //     // evt.persist();
  //     existinghandleDown_(evt);
  //   };
  // }, [foundation]);

  return {
    setInputsRef,
    setThumbRef,
    tickMarks,
    ...elements
  };
};
