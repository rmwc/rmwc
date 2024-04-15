import React from 'react';
import { useFoundation } from '@rmwc/base';
import { MDCChipTrailingActionFoundation } from '@material/chips/deprecated';
import { TrailingActionProps } from './index';
import { InteractionTrigger } from '@material/chips/deprecated/trailingaction/constants';

export const useTrailingActionFoundation = (props: TrailingActionProps) => {
  const foundationWithElements = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      return new MDCChipTrailingActionFoundation({
        focus: () => rootEl.ref?.focus(),
        getAttribute: (attr: string) =>
          rootEl.ref && rootEl.ref.getAttribute(attr),
        notifyInteraction: (trigger: InteractionTrigger) => {
          emit('onInteraction', { trigger });
        },
        notifyNavigation: (key: string) => {
          emit('onNavigation', { key });
        },
        setAttribute: (attr: string, value: string) =>
          rootEl.setProp(attr as any, value)
      });
    }
  });

  return foundationWithElements;
};
