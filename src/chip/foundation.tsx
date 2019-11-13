import { ChipProps } from './';
import { useId } from '@rmwc/base';
import { useFoundation } from '@rmwc/base';
import { MDCChipFoundation } from '@material/chips';

export const useChipFoundation = (props: ChipProps & React.HTMLProps<any>) => {
  const chipId = useId('chip', props);

  const foundationWithElements = useFoundation({
    props,
    elements: {
      rootEl: true,
      trailingIconEl: true,
      checkmarkEl: true
    },
    foundation: ({ rootEl, checkmarkEl, emit }) =>
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
        getComputedStyleValue: propertyName =>
          rootEl.ref
            ? window.getComputedStyle(rootEl.ref).getPropertyValue(propertyName)
            : '',
        setStyleProperty: (propertyName, value) => {
          rootEl.setStyle(propertyName, value);
        },

        hasLeadingIcon: () => !!props.icon,
        getRootBoundingClientRect: () =>
          rootEl.ref?.getBoundingClientRect() || ({} as ClientRect),
        getCheckmarkBoundingClientRect: () =>
          checkmarkEl.ref?.getBoundingClientRect() || ({} as ClientRect),
        setAttr: (attr, value) => rootEl.setProp(attr as any, value)
      })
  });

  const { rootEl, trailingIconEl, foundation } = foundationWithElements;

  const handleInteraction = (
    evt: React.MouseEvent & React.KeyboardEvent & MouseEvent & KeyboardEvent
  ) => {
    evt.type === 'click' && props.onClick?.(evt);
    evt.type === 'keydown' && props.onKeyDown?.(evt);
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
