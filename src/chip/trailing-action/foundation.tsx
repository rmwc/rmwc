import React, { useCallback } from 'react';
import { useFoundation } from '@rmwc/base';
import { MDCChipTrailingActionFoundation } from '@material/chips';
import { TrailingActionProps } from '.';
import { InteractionTrigger } from '@material/chips/trailingaction/constants';

export const useTrailingActionFoundation = (props: TrailingActionProps) => {
  const foundationWithElements = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      return new MDCChipTrailingActionFoundation({
        focus: () => rootEl.ref && rootEl.ref.focus(),
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

  const { rootEl, foundation } = foundationWithElements;

  const handleInteraction = useCallback(
    (
      evt: React.MouseEvent & React.KeyboardEvent & MouseEvent & KeyboardEvent
    ) => {
      evt.type === 'click';
      evt.type === 'keydown';
      console.log(evt);
      return foundation.handleClick(evt);
    },
    [foundation]
  );

  rootEl.setProp('onClick', handleInteraction, true);
  rootEl.setProp('onKeyDown', handleInteraction, true);

  return foundationWithElements;
};
