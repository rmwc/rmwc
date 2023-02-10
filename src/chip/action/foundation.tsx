import { useFoundation } from '@rmwc/base';
import {
  MDCChipActionAdapter,
  MDCChipActionAttributes,
  MDCChipActionCssClasses,
  MDCChipPrimaryActionFoundation,
  MDCChipTrailingActionFoundation
} from '@material/chips';
import { ActionHTMLProps, PrimaryActionProps } from '.';

export const usePrimaryActionFoundation = (
  props: PrimaryActionProps & ActionHTMLProps
) => {
  const foundationWithElements = useFoundation({
    props,
    elements: { rootEl: true },
    foundation: ({ rootEl, emit }) => {
      const adapter: MDCChipActionAdapter = {
        emitEvent: (eventName, eventDetail) => {
          emit(eventName, eventDetail, true);
        },
        focus: () => rootEl.ref?.focus(),
        getAttribute: (attr: MDCChipActionAttributes) =>
          rootEl.ref && rootEl.ref.getAttribute(attr),
        setAttribute: (attr: MDCChipActionAttributes, value: string) =>
          rootEl.setProp(attr as any, value),
        getElementID: () => rootEl.ref?.id ?? '',
        removeAttribute: (attr: MDCChipActionAttributes) =>
          rootEl.ref?.removeAttribute(attr)
      };
      if (
        rootEl.ref?.classList.contains(MDCChipActionCssClasses.TRAILING_ACTION)
      ) {
        return new MDCChipTrailingActionFoundation(adapter);
      }
      return new MDCChipPrimaryActionFoundation(adapter);
    }
  });

  const { foundation, rootEl } = foundationWithElements;

  const handleClick = (event: any) => {
    props.onClick?.(event);
    props.onInteraction?.(event);
    foundation.handleClick();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    props.onInteraction?.(event as any);
    foundation.handleKeydown(event);
  };

  rootEl.setProp('onClick', handleClick, true);
  rootEl.setProp('onKeyDown', handleKeyDown, true);

  return foundationWithElements;
};
