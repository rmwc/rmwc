import { useFoundation } from '@rmwc/base';
import { matches } from '@rmwc/base';
import {
  MDCTabScrollerFoundation,
  util as scrollerUtil
} from '@material/tab-scroller';
import { TabScrollerApi, TabScrollerProps } from './tab-scroller';

export const useTabScrollerFoundation = (
  props: TabScrollerProps & React.HTMLProps<any>
) => {
  const { foundation, ...elements } = useFoundation({
    props,
    api: ({ foundation, contentEl }): TabScrollerApi => {
      const f = foundation as MDCTabScrollerFoundation;
      return {
        scrollTo: (scrollX: number) => f.scrollTo(scrollX),
        incrementScroll: (scrollXIncrement: number) =>
          f.incrementScroll(scrollXIncrement),
        getScrollPosition: () => f.getScrollPosition(),
        getScrollContentWidth: () => contentEl.ref?.offsetWidth || 0
      };
    },
    elements: { rootEl: true, areaEl: true, contentEl: true },
    foundation: ({ rootEl, areaEl, contentEl }) => {
      return new MDCTabScrollerFoundation({
        eventTargetMatchesSelector: (
          evtTarget: EventTarget,
          selector: string
        ) => matches(evtTarget as HTMLElement, selector),
        addClass: (className: string) => rootEl.addClass(className),
        removeClass: (className: string) => rootEl.removeClass(className),
        addScrollAreaClass: (className: string) => areaEl.addClass(className),
        setScrollAreaStyleProperty: (prop: string, value: string) =>
          areaEl.setStyle(prop, value),
        setScrollContentStyleProperty: (prop: string, value: string) =>
          contentEl.setStyle(prop, value),
        getScrollContentStyleValue: (propName: string) => {
          const val =
            contentEl.ref &&
            window.getComputedStyle(contentEl.ref).getPropertyValue(propName);

          return val || 'none';
        },
        setScrollAreaScrollLeft: (scrollX: number) =>
          areaEl.ref && (areaEl.ref.scrollLeft = scrollX),
        getScrollAreaScrollLeft: () => (areaEl.ref ? areaEl.ref.scrollLeft : 0),
        getScrollContentOffsetWidth: () =>
          contentEl.ref ? contentEl.ref.offsetWidth : 0,
        getScrollAreaOffsetWidth: () =>
          areaEl.ref ? areaEl.ref.offsetWidth : 0,
        computeScrollAreaClientRect: () =>
          areaEl.ref ? areaEl.ref.getBoundingClientRect() : ({} as ClientRect),
        computeScrollContentClientRect: () =>
          contentEl.ref
            ? contentEl.ref.getBoundingClientRect()
            : ({} as ClientRect),
        computeHorizontalScrollbarHeight: () =>
          scrollerUtil.computeHorizontalScrollbarHeight(document)
      });
    }
  });

  const { areaEl, contentEl } = elements;

  const handleInteraction = () => {
    foundation.handleInteraction();
  };

  const handleTransitionEnd = (
    evt: React.TransitionEvent | TransitionEvent
  ) => {
    foundation.handleTransitionEnd(evt as TransitionEvent);
  };

  areaEl.setProp('onWheel', handleInteraction, true);
  areaEl.setProp('onTouchStart', handleInteraction, true);
  areaEl.setProp('onPointerDown', handleInteraction, true);
  areaEl.setProp('onMouseDown', handleInteraction, true);
  areaEl.setProp('onKeyDown', handleInteraction, true);

  contentEl.setProp('onTransitionEnd', handleTransitionEnd, true);

  return { ...elements };
};
