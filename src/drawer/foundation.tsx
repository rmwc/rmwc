import {
  MDCModalDrawerFoundation,
  MDCDismissibleDrawerFoundation
} from '@material/drawer';
import { DrawerProps } from '.';
import { useFoundation, FocusTrap, focusTrapFactory } from '@rmwc/base';
import { useRef, useEffect } from 'react';

const useDrawerFoundationFactory = (
  MDCConstructor:
    | typeof MDCModalDrawerFoundation
    | typeof MDCDismissibleDrawerFoundation
) =>
  function useDrawerFoundation(props: DrawerProps & React.HTMLProps<any>) {
    const focusTrapRef = useRef<FocusTrap>();

    const { foundation, ...elements } = useFoundation({
      props,
      elements: {
        rootEl: true,
        scrimEl: true
      },
      foundation: ({ rootEl, emit }) => {
        let previousFocusEl: HTMLElement;

        return new MDCConstructor({
          addClass: (className: string) => rootEl.addClass(className),
          removeClass: (className: string) => rootEl.removeClass(className),
          hasClass: (className: string) => rootEl.hasClass(className),
          elementHasClass: (element: HTMLElement, className: string) =>
            element.classList.contains(className),
          saveFocus: () => {
            previousFocusEl = document.activeElement as HTMLElement;
          },
          restoreFocus: () => {
            if (
              rootEl.ref &&
              rootEl.ref.contains(document.activeElement) &&
              previousFocusEl
            ) {
              previousFocusEl.focus();
            }
          },
          focusActiveNavigationItem: () => {
            const activeNavItemEl = rootEl.ref?.querySelector(
              `.mdc-list-item--activated`
            );
            if (activeNavItemEl) {
              (activeNavItemEl as HTMLElement).focus();
            }
          },
          notifyClose: () => emit('onClose', {}, true /* shouldBubble */),
          notifyOpen: () => emit('onOpen', {}, true /* shouldBubble */),
          trapFocus: () => {
            try {
              focusTrapRef.current?.trapFocus();
            } catch (err) {}
          },
          releaseFocus: () => {
            try {
              focusTrapRef.current?.releaseFocus();
            } catch (err) {}
          }
        });
      }
    });

    const { rootEl, scrimEl } = elements;

    useEffect(() => {
      if (rootEl.ref) {
        focusTrapRef.current = focusTrapFactory(rootEl.ref);
      }
    }, [rootEl.ref]);

    useEffect(() => {
      props.open ? foundation.open() : foundation.close();
    }, [props.open, foundation]);

    const handleScrimClick = () => {
      (foundation as MDCModalDrawerFoundation).handleScrimClick?.();
    };

    const handleKeyDown = (evt: React.KeyboardEvent & KeyboardEvent) => {
      props.onKeyDown?.(evt);
      foundation.handleKeydown(evt);
    };

    const handleTransitionEnd = (
      evt: React.TransitionEvent & TransitionEvent
    ) => {
      props.onTransitionEnd?.(evt);
      foundation.handleTransitionEnd(evt);
    };

    rootEl.setProp('onKeyDown', handleKeyDown, true);
    rootEl.setProp('onTransitionEnd', handleTransitionEnd, true);
    scrimEl.setProp('onClick', handleScrimClick, true);

    return { foundation, ...elements };
  };

export const useDismissableDrawerFoundation = useDrawerFoundationFactory(
  MDCDismissibleDrawerFoundation
);

export const useModalDrawerFoundation = useDrawerFoundationFactory(
  MDCModalDrawerFoundation
);
