// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import { ChipProps, ChipHTMLProps } from './';
import { useId, emptyClientRect } from '@rmwc/base';
import { useFoundation } from '@rmwc/base';
import React, { useEffect, useCallback, useRef } from 'react';
import { TrailingActionApi } from './trailing-action';
// @ts-ignore
import { deprecated } from '@material/chips/dist/mdc.chips.js';

const { MDCChipFoundation, MDCChipAdapter, EventSource } = deprecated;

export const useChipFoundation = (props: ChipProps & ChipHTMLProps) => {
  const chipId = useId('chip', props);

  const trailingAction = useRef<TrailingActionApi | null>();
  const setTrailingAction = (api: TrailingActionApi | null) => {
    trailingAction.current = api;
  };

  const foundationWithElements = useFoundation({
    props,
    elements: {
      rootEl: true,
      trailingIconEl: true,
      checkmarkEl: true,
      trailingActionEl: true
    },
    foundation: ({ rootEl, checkmarkEl, emit, getProps, trailingActionEl }) =>
      new MDCChipFoundation({
        addClass: (className: string) => {
          rootEl.addClass(className);
        },
        removeClass: (className: string) => rootEl.removeClass(className),
        hasClass: (className: string) => rootEl.hasClass(className),
        addClassToLeadingIcon: (className: string) => {
          // handled by props
        },
        removeClassFromLeadingIcon: (className: string) => {
          // handled by props
        },
        eventTargetHasClass: (target: HTMLElement, className: string) => {
          return (
            rootEl.hasClass(className) || target.classList.contains(className)
          );
        },
        notifyInteraction: () =>
          emit('onInteraction', { chipId }, true /* shouldBubble */),
        notifySelection: (selected: any) =>
          emit(
            'onSelect',
            { chipId, selected: selected },
            true /* shouldBubble */
          ),
        notifyTrailingIconInteraction: () =>
          emit(
            'onTrailingIconInteraction',
            { chipId },
            true /* shouldBubble */
          ),
        notifyRemoval: () =>
          emit(
            'onRemove',
            { chipId, root: rootEl.ref },
            true /* shouldBubble */
          ),
        notifyNavigation: (key: string, source: EventSource) => {
          //TODO, but probably not needed in case of React
        },
        getComputedStyleValue: (propertyName: string) =>
          rootEl.ref
            ? window.getComputedStyle(rootEl.ref).getPropertyValue(propertyName)
            : '',
        setStyleProperty: (
          propertyName: string,
          value: string | number | null
        ) => {
          rootEl.setStyle(propertyName, value);
        },
        getAttribute: (attrName: string) => rootEl.ref?.getAttribute(attrName),
        hasLeadingIcon: () => !!props.icon,
        getRootBoundingClientRect: () =>
          rootEl.ref?.getBoundingClientRect() || emptyClientRect,
        getCheckmarkBoundingClientRect: () =>
          checkmarkEl.ref?.getBoundingClientRect() || emptyClientRect,
        setPrimaryActionAttr: (attr: string, value: string) => {
          // Not clear in documentation what this should be used for
        },
        focusPrimaryAction: () => {
          // Not clear in documentation what this should be used for
        },
        setTrailingActionAttr: (attr: string, value: string) => {
          const safeAttr = attr === 'tabindex' ? 'tabIndex' : attr;
          return trailingActionEl.setProp(safeAttr as any, value);
        },

        focusTrailingAction: () => {
          return trailingActionEl.ref?.focus();
        },
        removeTrailingActionFocus: () => {
          return trailingAction.current?.getFoundation().removeFocus();
        },
        isTrailingActionNavigable: () => {
          return trailingAction.current?.getFoundation().isNavigable();
        },
        isRTL: () => {
          return rootEl.ref
            ? window
                .getComputedStyle(rootEl.ref)
                .getPropertyValue('direction') === 'rtl'
            : false;
        },
        notifyEditFinish: () => {
          // NOT IMPLEMENTED IN MATERIAL 7
        },
        notifyEditStart: () => {
          // NOT IMPLEMENTED IN MATERIAL 7
        }
      } as typeof MDCChipAdapter)
  });

  const { rootEl, trailingIconEl, foundation } = foundationWithElements;
  const { onClick, onKeyDown } = props;

  const handleInteraction = useCallback(
    (
      evt: React.MouseEvent & React.KeyboardEvent & MouseEvent & KeyboardEvent
    ) => {
      evt.type === 'click' && onClick?.(evt as any);
      evt.type === 'keydown' && onKeyDown?.(evt as any);
      return foundation.handleClick();
    },
    [foundation, onClick, onKeyDown]
  );

  const handleTransitionEnd = useCallback(
    (evt: React.TransitionEvent & TransitionEvent) => {
      foundation.handleTransitionEnd(evt);
    },
    [foundation]
  );

  const handleTrailingActionInteraction = useCallback(() => {
    return foundation.handleTrailingActionInteraction();
  }, [foundation]);

  // Allow customizing the behavior of the trailing icon
  useEffect(() => {
    foundation.setShouldRemoveOnTrailingIconClick(
      props.trailingIconRemovesChip ?? true
    );
  }, [foundation, props.trailingIconRemovesChip]);

  rootEl.setProp('onClick', handleInteraction, true);
  rootEl.setProp('onKeyDown', handleInteraction, true);
  rootEl.setProp('onTransitionEnd', handleTransitionEnd, true);
  trailingIconEl.setProp('onClick', handleTrailingActionInteraction, true);
  trailingIconEl.setProp('onKeyDown', handleTrailingActionInteraction, true);

  return { setTrailingAction, ...foundationWithElements };
};
