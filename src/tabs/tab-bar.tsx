import {
  componentFactory,
  FoundationComponent,
  CustomEventT
} from '@rmwc/base';

import * as React from 'react';
// @ts-ignore
import { MDCTabBarFoundation } from '@material/tab-bar';
import { TabScroller } from './tab-scroller';
import { Tab } from './tab';
import { TabBarContext } from './tab-bar-context';

/************************************************************
 * TabBar
 ************************************************************/
export interface TabBarProps {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onActivate?: (
    evt: CustomEventT<{
      index: number;
    }>
  ) => void;
  /** The index of the active tab. */
  activeTabIndex?: number;
}

export const TabBarRoot = componentFactory<TabBarProps>({
  displayName: 'TabBarRoot',
  tag: 'nav',
  classNames: (props: TabBarProps & { isTabScroller?: boolean }) => [
    'mdc-tab-bar',
    {
      'mdc-tab-scroller__scroll-frame__tabs': props.isTabScroller
    }
  ],
  consumeProps: ['isTabScroller']
});

/** The TabBar component */
export class TabBar extends FoundationComponent<TabBarProps> {
  static displayName = 'TabBar';

  root = this.createElement('root');
  tabScroller: TabScroller | null = null;
  tabList: any[] = [];
  contextApi = {
    onTabInteraction: (evt: Event) => this.handleTabInteraction(evt),
    registerTab: (tab: typeof Tab) => this.tabList.push(tab),
    unregisterTab: (tab: typeof Tab) =>
      this.tabList.splice(this.tabList.indexOf(tab), 1)
  };

  constructor(props: TabBarProps) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTabInteraction = this.handleTabInteraction.bind(this);
  }

  componentDidMount() {
    super.componentDidMount();

    // This corrects an issue where passing in 0 or no activeTabIndex
    // causes the first tab of the set to not be active

    window.requestAnimationFrame(() => {
      // to make this even more annoying, Tabs focus by default
      // restore the focus and scroll position after we activate the tab
      const activeElement: any = window.document.activeElement;
      const [scrollX, scrollY] = [window.scrollX, window.scrollY];

      //activate the tab
      this.foundation.activateTab(this.props.activeTabIndex || 0);

      // restore focus and scroll
      activeElement && activeElement.focus();
      window.scrollTo(scrollX, scrollY);
    });
  }

  getDefaultFoundation() {
    return new MDCTabBarFoundation(
      /** @type {!MDCTabBarAdapter} */ ({
        scrollTo: (scrollX: number) => {
          this.tabScroller && this.tabScroller.scrollTo(scrollX);
        },

        incrementScroll: (scrollXIncrement: number) =>
          this.tabScroller &&
          this.tabScroller.incrementScroll(scrollXIncrement),
        getScrollPosition: () =>
          this.tabScroller && this.tabScroller.getScrollPosition(),
        getScrollContentWidth: () =>
          this.tabScroller && this.tabScroller.getScrollContentWidth(),
        getOffsetWidth: () => this.root.ref && this.root.ref.offsetWidth,
        isRTL: () =>
          this.root.ref &&
          window
            .getComputedStyle(this.root.ref)
            .getPropertyValue('direction') === 'rtl',
        setActiveTab: (index: number) => this.foundation.activateTab(index),
        activateTabAtIndex: (index: number, clientRect: ClientRect) =>
          this.tabList[index] && this.tabList[index].activate(clientRect),
        deactivateTabAtIndex: (index: number) =>
          this.tabList[index] && this.tabList[index].deactivate(),
        focusTabAtIndex: (index: number) => this.tabList[index].focus(),
        getTabIndicatorClientRectAtIndex: (index: number) =>
          this.tabList[index] &&
          this.tabList[index].computeIndicatorClientRect(),
        getTabDimensionsAtIndex: (index: number) =>
          this.tabList[index] && this.tabList[index].computeDimensions(),
        getPreviousActiveTabIndex: () => {
          for (let i = 0; i < this.tabList.length; i++) {
            if (this.tabList[i].active) {
              return i;
            }
          }
          return -1;
        },
        getFocusedTabIndex: () => {
          const tabElements = this.getTabElements();
          const activeElement = document.activeElement as Element;
          return tabElements && tabElements.indexOf(activeElement);
        },
        getIndexOfTabById: (id: string) => {
          for (let i = 0; i < this.tabList.length; i++) {
            if (this.tabList[i].id === id) {
              return i;
            }
          }
          return -1;
        },
        getTabListLength: () => this.tabList.length,
        notifyTabActivated: (index: number) =>
          this.emit('onActivate', { index }, true)
      })
    );
  }

  sync(props: TabBarProps, prevProps: TabBarProps) {
    if (props.activeTabIndex !== prevProps.activeTabIndex) {
      this.foundation.activateTab(props.activeTabIndex);
    }
  }

  getTabElements(): Element[] | null {
    return [].slice.call(
      this.root.ref &&
        this.root.ref.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR)
    );
  }

  handleTabInteraction(evt: Event) {
    this.foundation.handleTabInteraction(evt);
  }

  handleKeyDown(evt: React.KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation.handleKeyDown(evt);
  }

  render() {
    const { children, activeTabIndex, onActivate, ...rest } = this.props;

    return (
      <TabBarContext.Provider value={this.contextApi}>
        <TabBarRoot
          {...rest}
          ref={this.root.setRef}
          onKeyDown={this.handleKeyDown}
        >
          <TabScroller ref={(api: TabScroller) => (this.tabScroller = api)}>
            {children}
          </TabScroller>
        </TabBarRoot>
      </TabBarContext.Provider>
    );
  }
}
