import React, { useEffect } from 'react';
import { useFoundation } from '@rmwc/base';
import { MDCLineRippleFoundation } from '@material/line-ripple';
import { EventType, SpecificEventListener } from '@material/base/types';
import { LineRippleProps } from '.';

export const useLineRippleFoundation = (
  props: LineRippleProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true
    },
    foundation: ({ rootEl }) => {
      return new MDCLineRippleFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        hasClass: (className: string) => rootEl.hasClass(className),
        setStyle: (propertyName: any, value: any) =>
          rootEl.setStyle(propertyName, value),
        registerEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => rootEl.addEventListener(evtType, handler),
        deregisterEventHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => rootEl.removeEventListener(evtType, handler)
      });
    }
  });

  const { rootEl } = elements;

  // Active
  useEffect(() => {
    props.active ? foundation.activate() : foundation.deactivate();
  }, [props.active, foundation]);

  // Center
  useEffect(() => {
    typeof props.center === 'number' &&
      foundation.setRippleCenter(props.center);
  }, [props.center, foundation]);

  // Transition end
  rootEl.setProp(
    'onTransitionEnd',
    (evt: any) => foundation.handleTransitionEnd(evt),
    true
  );

  return { foundation, ...elements };
};
