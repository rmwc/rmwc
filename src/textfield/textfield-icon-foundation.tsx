import React from 'react';
import { useFoundation } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';
import { EventType, SpecificEventListener } from '@material/base/types';

import { MDCTextFieldIconFoundation } from '@material/textfield';
import { TextFieldIconApi } from '.';

export const useTextFieldIconFoundation = (
  props: IconProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    elements: { rootEl: true },
    api: ({
      foundation
    }: {
      foundation: MDCTextFieldIconFoundation;
    }): TextFieldIconApi => {
      return {
        getFoundation: () => foundation
      };
    },
    foundation: ({ rootEl, emit }) => {
      const f = new MDCTextFieldIconFoundation({
        getAttr: (attr: string) => rootEl.getProp(attr as any) as string | null,
        setAttr: (attr: string, value: string) =>
          rootEl.setProp(attr as any, value),
        removeAttr: (attr: string) => rootEl.removeProp(attr as any),
        setContent: (content: string) => {
          rootEl.setProp('icon', content);
        },
        registerInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => rootEl.addEventListener(evtType, handler),
        deregisterInteractionHandler: <K extends EventType>(
          evtType: K,
          handler: SpecificEventListener<K>
        ) => rootEl.removeEventListener(evtType, handler),
        notifyIconAction: () => emit('onClick', {}, true)
      });

      return f;
    }
  });

  return { ...elements };
};
