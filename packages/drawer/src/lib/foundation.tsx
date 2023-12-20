import {
  MDCDismissibleDrawerFoundation,
  MDCModalDrawerFoundation
} from '@material/drawer';
import {
  FocusTrap,
  focusTrapFactory,
  triggerWindowResize,
  useFoundation
} from '@rmwc/base';
import React, { useCallback, useEffect, useRef } from 'react';
import type { DrawerProps } from './types';

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
      foundation: ({ rootEl, emit, getProps }) => {
        let previousFocusEl: HTMLElement;

        return new MDCConstructor({
          //This delayes adding the class until next animation frame, fixes issue with draw getting stuck in open state
          addClass: (className: string) =>
            window.requestAnimationFrame(() => rootEl.addClass(className)),
          removeClass: (className: string) => rootEl.removeClass(className),
          hasClass: (className: string) => rootEl.hasClass(className),
          elementHasClass: (element: HTMLElement, className: string) =>
            element.classList.contains(className),
          saveFocus: () => {
            previousFocusEl = document.activeElement as HTMLElement;
          },
          restoreFocus: () => {
            if (
              rootEl?.ref?.contains(document.activeElement) &&
              previousFocusEl
            ) {
              previousFocusEl.focus();
            }
          },
          focusActiveNavigationItem: () => {
            const activeNavItemEl = rootEl.ref?.querySelector(
              `.mdc-deprecated-list-item--activated`
            );
            if (activeNavItemEl) {
              (activeNavItemEl as HTMLElement).focus();
            }
          },
          notifyClose: () => {
            emit('onClose', {}, true /* shouldBubble */);
          },
          notifyOpen: () => {
            emit('onOpen', {}, true /* shouldBubble */);
          },
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

    const handleScrimClick = useCallback(() => {
      (foundation as MDCModalDrawerFoundation).handleScrimClick?.();
    }, [foundation]);

    const { onKeyDown } = props;
    const handleKeyDown = useCallback(
      (evt: React.KeyboardEvent & KeyboardEvent) => {
        onKeyDown?.(evt);
        foundation.handleKeydown(evt);
      },
      [foundation, onKeyDown]
    );

    const { onTransitionEnd } = props;
    const handleTransitionEnd = useCallback(
      (evt: React.TransitionEvent & TransitionEvent) => {
        onTransitionEnd?.(evt);
        foundation.handleTransitionEnd(evt);
        triggerWindowResize();
      },
      [foundation, onTransitionEnd]
    );

    rootEl.setProp('onKeyDown', handleKeyDown, true);
    rootEl.setProp('onTransitionEnd', handleTransitionEnd, true);
    scrimEl.setProp('onClick', handleScrimClick, true);

    return { foundation, ...elements };
  };

//eslint-disable-next-line react-hooks/rules-of-hooks
export const useDismissableDrawerFoundation = useDrawerFoundationFactory(
  MDCDismissibleDrawerFoundation
);

//eslint-disable-next-line react-hooks/rules-of-hooks
export const useModalDrawerFoundation = useDrawerFoundationFactory(
  MDCModalDrawerFoundation
);
