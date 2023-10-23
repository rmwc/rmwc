import { useFoundation } from '@rmwc/base';
import React, { useEffect, useRef } from 'react';
import { TopAppBarProps } from './top-app-bar';

import {
  MDCFixedTopAppBarFoundation,
  MDCShortTopAppBarFoundation,
  MDCTopAppBarAdapter,
  MDCTopAppBarFoundation
} from '@material/top-app-bar';

export const useTopAppBarFoundation = (
  props: TopAppBarProps & React.HTMLProps<any>
) => {
  const scrollTargetRef = useRef<EventTarget | null>(null);
  const navIconRef = useRef<HTMLElement | null>(null);

  const { foundation, ...elements } = useFoundation({
    props,
    elements: {
      rootEl: true
    },
    foundation: ({ rootEl, emit }) => {
      const adapter: MDCTopAppBarAdapter = {
        hasClass: (className: string) => rootEl.hasClass(className),
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        setStyle: (property: string, value: string) =>
          rootEl.setStyle(property, value),

        getTopAppBarHeight: () => rootEl.ref?.clientHeight || 0,
        notifyNavigationIconClicked: () => emit('onNav', {}),
        getViewportScrollY: () => {
          const target = scrollTargetRef.current as any;
          return target
            ? target['pageYOffset' in target ? 'pageYOffset' : 'scrollTop']
            : 0;
        },
        getTotalActionItems: () => {
          return rootEl.ref
            ? rootEl.ref.querySelectorAll(
                MDCTopAppBarFoundation.strings.ACTION_ITEM_SELECTOR
              ).length
            : 0;
        }
      };

      let foundation;
      if (props.short) {
        foundation = new MDCShortTopAppBarFoundation(adapter);
      } else if (props.fixed) {
        foundation = new MDCFixedTopAppBarFoundation(adapter);
      } else {
        foundation = new MDCTopAppBarFoundation(adapter);
      }

      return foundation;
    }
  });

  const { rootEl } = elements;

  useEffect(() => {
    const target =
      props.scrollTarget || rootEl.ref?.ownerDocument?.defaultView || window;
    const handleTargetScroll = foundation.handleTargetScroll.bind(foundation);
    target.addEventListener('scroll', handleTargetScroll as EventListener);
    scrollTargetRef.current = target;

    return () => {
      target.removeEventListener('scroll', handleTargetScroll as EventListener);
    };
  }, [props.scrollTarget, scrollTargetRef, foundation, rootEl.ref]);

  useEffect(() => {
    navIconRef.current =
      rootEl.ref?.querySelector<HTMLElement>(
        MDCTopAppBarFoundation.strings.NAVIGATION_ICON_SELECTOR
      ) || null;

    const handler = foundation.handleNavigationClick.bind(foundation);
    navIconRef.current?.addEventListener('click', handler);

    return () => {
      navIconRef.current?.removeEventListener('click', handler);
    };
  }, [rootEl.ref, foundation]);

  // The Top App Bar sets these values in its constructor...
  // Reinit them after mount
  useEffect(() => {
    // @ts-ignore
    foundation.lastScrollPosition = foundation.adapter.getViewportScrollY();
    // @ts-ignore
    foundation.topAppBarHeight = foundation.adapter.getTopAppBarHeight();
  }, [foundation]);

  return { foundation, ...elements };
};
