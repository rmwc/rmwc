import { useFoundation } from '@rmwc/base';

import { FloatingLabelProps, FloatingLabelApi } from '.';
import {
  MDCFloatingLabelFoundation,
  MDCFloatingLabelAdapter
} from '@material/floating-label';
import { EventType, SpecificEventListener } from '@material/base/types';
import React, { useEffect } from 'react';

export const useFloatingLabelFoundation = (
  props: FloatingLabelProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true
    },
    api: ({
      foundation
    }: {
      foundation: MDCFloatingLabelFoundation;
    }): FloatingLabelApi => {
      return {
        getWidth() {
          return foundation.getWidth();
        }
      };
    },
    foundation: ({ rootEl }) => {
      return new MDCFloatingLabelFoundation({
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        getWidth: () => rootEl.ref?.scrollWidth || 0,
        registerInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => rootEl.addEventListener(evtType, handler),
        deregisterInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ): void => rootEl.removeEventListener(evtType, handler)
      } as MDCFloatingLabelAdapter);
    }
  });

  // Shake
  useEffect(() => {
    foundation.shake(!!props.shake);
  }, [props.shake, foundation]);

  // Float
  useEffect(() => {
    foundation.float(!!props.float);
  }, [props.float, foundation]);

  return { foundation, ...elements };
};
