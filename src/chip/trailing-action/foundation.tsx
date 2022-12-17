import React from 'react';
import { useFoundation } from '@rmwc/base';
import {
  MDCChipActionAttributes,
  MDCChipTrailingActionFoundation
} from '@material/chips';
import { TrailingActionProps } from '.';

export const useTrailingActionFoundation = (props: TrailingActionProps) => {
  const foundationWithElements = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      return new MDCChipTrailingActionFoundation({
        focus: () => rootEl.ref?.focus(),
        getAttribute: (attr: MDCChipActionAttributes) =>
          rootEl.ref && rootEl.ref.getAttribute(attr),
        setAttribute: (attr: MDCChipActionAttributes, value: string) =>
          rootEl.setProp(attr as any, value),
        getElementID: () => '',
        removeAttribute: (attr: MDCChipActionAttributes) => {}
      });
    }
  });

  return foundationWithElements;
};
