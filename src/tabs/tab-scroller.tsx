import * as RMWC from '@rmwc/types';
import * as React from 'react';

import {
  MDCTabScrollerFoundation,
  util as scrollerUtil
} from '@material/tab-scroller';

import { FoundationComponent, componentFactory, matches } from '@rmwc/base';

export const TabScrollerRoot = componentFactory({
  displayName: 'TabScroller',
  classNames: ['mdc-tab-scroller']
});

export const TabScrollerScrollArea = componentFactory({
  displayName: 'TabScrollerScrollArea',
  classNames: ['mdc-tab-scroller__scroll-area']
});

export const TabScrollerScrollContent = componentFactory({
  displayName: 'TabScrollerScrollContent',
  classNames: ['mdc-tab-scroller__scroll-content']
});

export class TabScroller extends FoundationComponent<
  MDCTabScrollerFoundation,
  {}
> {
  private root = this.createElement('root');
  private area = this.createElement('area');
  private content = this.createElement('content');

  constructor(props: {}) {
    super(props);

    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  getDefaultFoundation() {
    return new MDCTabScrollerFoundation({
      eventTargetMatchesSelector: (evtTarget: EventTarget, selector: string) =>
        matches(evtTarget as HTMLElement, selector),
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      addScrollAreaClass: (className: string) => this.area.addClass(className),
      setScrollAreaStyleProperty: (prop: string, value: string) =>
        this.area.setStyle(prop, value),
      setScrollContentStyleProperty: (prop: string, value: string) =>
        this.content.setStyle(prop, value),
      getScrollContentStyleValue: (propName: string) => {
        const val =
          this.content.ref &&
          window.getComputedStyle(this.content.ref).getPropertyValue(propName);

        return val || 'none';
      },
      setScrollAreaScrollLeft: (scrollX: number) =>
        this.area.ref && (this.area.ref.scrollLeft = scrollX),
      getScrollAreaScrollLeft: () =>
        this.area.ref ? this.area.ref.scrollLeft : 0,
      getScrollContentOffsetWidth: () =>
        this.content.ref ? this.content.ref.offsetWidth : 0,
      getScrollAreaOffsetWidth: () =>
        this.area.ref ? this.area.ref.offsetWidth : 0,
      computeScrollAreaClientRect: () =>
        this.area.ref
          ? this.area.ref.getBoundingClientRect()
          : ({} as ClientRect),
      computeScrollContentClientRect: () =>
        this.content.ref
          ? this.content.ref.getBoundingClientRect()
          : ({} as ClientRect),
      computeHorizontalScrollbarHeight: () =>
        scrollerUtil.computeHorizontalScrollbarHeight(document)
    });
  }

  getScrollPosition() {
    return this.foundation.getScrollPosition();
  }

  getScrollContentWidth() {
    return this.content.ref ? this.content.ref.offsetWidth : 0;
  }

  incrementScroll(scrollXIncrement: number) {
    this.foundation.incrementScroll(scrollXIncrement);
  }

  scrollTo(scrollX: number) {
    this.foundation.scrollTo(scrollX);
  }

  handleInteraction() {
    this.foundation.handleInteraction();
  }

  handleTransitionEnd(evt: React.TransitionEvent | TransitionEvent) {
    this.foundation.handleTransitionEnd(evt as TransitionEvent);
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <TabScrollerRoot {...this.root.props(rest)} ref={this.root.setRef}>
        <TabScrollerScrollArea
          {...this.area.props({})}
          ref={this.area.setRef}
          onWheel={this.handleInteraction}
          onTouchStart={this.handleInteraction}
          onPointerDown={this.handleInteraction}
          onMouseDown={this.handleInteraction}
          onKeyDown={this.handleInteraction}
        >
          <TabScrollerScrollContent
            {...this.content.props({})}
            ref={this.content.setRef}
            onTransitionEnd={this.handleTransitionEnd}
          >
            {children}
          </TabScrollerScrollContent>
        </TabScrollerScrollArea>
      </TabScrollerRoot>
    );
  }
}
