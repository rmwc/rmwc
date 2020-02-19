import * as RMWC from '@rmwc/types';
import { ChipProps, ChipHTMLProps } from './';
import { useId, emptyClientRect } from '@rmwc/base';
import { useFoundation } from '@rmwc/base';
import { MDCChipFoundation } from '@material/chips';
import { EventSource } from '@material/chips/chip/constants';

export const useChipFoundation = (props: ChipProps & ChipHTMLProps) => {
  const chipId = useId('chip', props);

  const foundationWithElements = useFoundation({
    props,
    elements: {
      rootEl: true,
      trailingIconEl: true,
      checkmarkEl: true
    },
    foundation: ({ rootEl, checkmarkEl, emit, getProps }) =>
      new MDCChipFoundation({
        addClass: className => {
          rootEl.addClass(className);
        },
        removeClass: className => rootEl.removeClass(className),
        hasClass: className => rootEl.hasClass(className),
        addClassToLeadingIcon: className => {
          // handled by props
        },
        removeClassFromLeadingIcon: className => {
          // handled by props
        },
        eventTargetHasClass: (target: HTMLElement, className) => {
          return (
            rootEl.hasClass(className) || target.classList.contains(className)
          );
        },
        notifyInteraction: () =>
          emit('onInteraction', { chipId }, true /* shouldBubble */),
        notifySelection: selected =>
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
          //TODO
        },
        getComputedStyleValue: propertyName =>
          rootEl.ref
            ? window.getComputedStyle(rootEl.ref).getPropertyValue(propertyName)
            : '',
        setStyleProperty: (propertyName, value) => {
          rootEl.setStyle(propertyName, value);
        },

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
        hasTrailingAction: () => {
          return !!getProps().trailingIcon;
        },
        setTrailingActionAttr: (attr: string, value: string) => {
          const safeAttr = attr === 'tabindex' ? 'tabIndex' : attr;
          trailingIconEl.setProp(safeAttr as any, value);
        },

        focusTrailingAction: () => {
          trailingIconEl.ref?.focus();
        },
        isRTL: () => {
          return rootEl.ref
            ? window
                .getComputedStyle(rootEl.ref)
                .getPropertyValue('direction') === 'rtl'
            : false;
        }
      })
  });

  const { rootEl, trailingIconEl, foundation } = foundationWithElements;

  const handleInteraction = (
    evt: React.MouseEvent & React.KeyboardEvent & MouseEvent & KeyboardEvent
  ) => {
    evt.type === 'click' && props.onClick?.(evt as any);
    evt.type === 'keydown' && props.onKeyDown?.(evt as any);
    return foundation.handleInteraction(evt);
  };

  const handleTransitionEnd = (
    evt: React.TransitionEvent & TransitionEvent
  ) => {
    foundation.handleTransitionEnd(evt);
  };

  const handleTrailingIconInteraction = (evt: any) => {
    return foundation.handleTrailingIconInteraction(evt);
  };

  rootEl.setProp('onClick', handleInteraction, true);
  rootEl.setProp('onKeyDown', handleInteraction, true);
  rootEl.setProp('onTransitionEnd', handleTransitionEnd, true);
  trailingIconEl.setProp('onClick', handleTrailingIconInteraction, true);
  trailingIconEl.setProp('onKeyDown', handleTrailingIconInteraction, true);

  return foundationWithElements;
};
