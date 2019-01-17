import * as React from 'react';

import {
  MDCTabScrollerFoundation,
  util as scrollerUtil
  // @ts-ignore
} from '@material/tab-scroller';

import { FoundationComponent, componentFactory } from '@rmwc/base';

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

export class TabScroller extends FoundationComponent<{}> {
  root = this.createElement('root');
  area = this.createElement('area');
  content = this.createElement('content');

  constructor(props: {}) {
    super(props);

    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  getDefaultFoundation() {
    const adapter = /** @type {!MDCTabScrollerAdapter} */ ({
      eventTargetMatchesSelector: (
        evtTarget: EventTarget,
        selector: string
      ) => {
        const MATCHES = scrollerUtil.getMatchesProperty(HTMLElement.prototype);
        return (evtTarget as any)[MATCHES](selector);
      },
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      addScrollAreaClass: (className: string) => this.area.addClass(className),
      setScrollAreaStyleProperty: (prop: string, value: string) =>
        this.area.setStyle(prop, value),
      setScrollContentStyleProperty: (prop: string, value: string) =>
        this.content.setStyle(prop, value),
      getScrollContentStyleValue: (propName: string) =>
        this.content.el &&
        window.getComputedStyle(this.content.el).getPropertyValue(propName),
      setScrollAreaScrollLeft: (scrollX: number) =>
        this.area.el && (this.area.el.scrollLeft = scrollX),
      getScrollAreaScrollLeft: () => this.area.el && this.area.el.scrollLeft,
      getScrollContentOffsetWidth: () =>
        this.content.el && this.content.el.offsetWidth,
      getScrollAreaOffsetWidth: () => this.area.el && this.area.el.offsetWidth,
      computeScrollAreaClientRect: () =>
        this.area.el && this.area.el.getBoundingClientRect(),
      computeScrollContentClientRect: () =>
        this.content.el && this.content.el.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () =>
        scrollerUtil.computeHorizontalScrollbarHeight(document)
    });

    return new MDCTabScrollerFoundation(adapter);
  }

  getScrollPosition() {
    return this.foundation.getScrollPosition();
  }

  getScrollContentWidth() {
    return this.content.el && this.content.el.offsetWidth;
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

  handleTransitionEnd(evt: React.TransitionEvent) {
    this.foundation.handleTransitionEnd(evt);
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <TabScrollerRoot {...this.root.props(rest)} ref={this.root.setEl}>
        <TabScrollerScrollArea
          {...this.area.props({})}
          ref={this.area.setEl}
          onWheel={this.handleInteraction}
          onTouchStart={this.handleInteraction}
          onPointerDown={this.handleInteraction}
          onMouseDown={this.handleInteraction}
          onKeyDown={this.handleInteraction}
        >
          <TabScrollerScrollContent
            {...this.content.props({})}
            ref={this.content.setEl}
            onTransitionEnd={this.handleTransitionEnd}
          >
            {children}
          </TabScrollerScrollContent>
        </TabScrollerScrollArea>
      </TabScrollerRoot>
    );
  }
}
