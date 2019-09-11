import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { componentFactory, FoundationComponent } from '@rmwc/base';

import { MDCTabBarFoundation } from '@material/tab-bar';
import { MDCTabInteractionEvent } from '@material/tab';
import { TabScroller } from './tab-scroller';
import { Tab } from './tab';
import { TabBarContext, TabBarContextT } from './tab-bar-context';

/************************************************************
 * TabBar
 ************************************************************/
export type TabBarOnActivateEventT = RMWC.CustomEventT<{
  index: number;
}>;

/** The TabBar component */
export interface TabBarProps {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. evt.detail = { index: number; } */
  onActivate?: (evt: TabBarOnActivateEventT) => void;
  /** The index of the active tab. */
  activeTabIndex?: number;
  /** Specifies whether the indicator should slide or fade. Defaults to slide. */
  indicatorTransition?: 'slide' | 'fade';
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
export class TabBar extends FoundationComponent<
  MDCTabBarFoundation,
  TabBarProps
> {
  static displayName = 'TabBar';

  private root = this.createElement('root');
  private currentActiveTabIndex = this.props.activeTabIndex || 0;
  tabScroller: TabScroller | null = null;
  tabList: any[] = [];
  contextApi: TabBarContextT = {
    onTabInteraction: (evt: MDCTabInteractionEvent) =>
      this.handleTabInteraction(evt),
    registerTab: (tab: typeof Tab) => this.tabList.push(tab),
    unregisterTab: (tab: typeof Tab) =>
      this.tabList.splice(this.tabList.indexOf(tab), 1),
    indicatorTransition: 'slide'
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

    // to make this even more annoying, Tabs focus by default
    // restore the focus and scroll position after we activate the tab
    const activeElement: any = window.document.activeElement;
    const [scrollX, scrollY] = [window.scrollX, window.scrollY];

    //activate the tab
    (this.foundation as any).adapter_.activateTabAtIndex(
      this.props.activeTabIndex || 0,
      (this.foundation as any).adapter_.getTabIndicatorClientRectAtIndex(
        undefined
      )
    );
    this.foundation.scrollIntoView(this.props.activeTabIndex || 0);

    // restore focus and scroll
    activeElement && activeElement.focus();
    window.scrollTo(scrollX, scrollY);
  }

  activateTab(index: number) {
    const foundation = this.foundation as any;
    this.currentActiveTabIndex = index;
    const previousActiveIndex = foundation.adapter_.getPreviousActiveTabIndex();
    if (!foundation.indexIsInRange_(index) || index === previousActiveIndex) {
      return;
    }

    foundation.adapter_.notifyTabActivated(index);

    setTimeout(() => {
      if (
        this.props.activeTabIndex === index ||
        this.props.activeTabIndex === undefined
      ) {
        foundation.adapter_.deactivateTabAtIndex(previousActiveIndex);
        foundation.adapter_.activateTabAtIndex(
          index,
          foundation.adapter_.getTabIndicatorClientRectAtIndex(
            previousActiveIndex
          )
        );
        foundation.scrollIntoView(index);
      } else {
        // reset the currentActiveTab index because we didnt actually change
        this.currentActiveTabIndex = previousActiveIndex;
      }
    });
  }

  getDefaultFoundation() {
    return new MDCTabBarFoundation(
      /** @type {!MDCTabBarAdapter} */ {
        scrollTo: (scrollX: number) => {
          this.tabScroller && this.tabScroller.scrollTo(scrollX);
        },

        incrementScroll: (scrollXIncrement: number) =>
          this.tabScroller &&
          this.tabScroller.incrementScroll(scrollXIncrement),
        getScrollPosition: () =>
          this.tabScroller ? this.tabScroller.getScrollPosition() : 0,
        getScrollContentWidth: () =>
          this.tabScroller ? this.tabScroller.getScrollContentWidth() : 0,
        getOffsetWidth: () => (this.root.ref ? this.root.ref.offsetWidth : 0),
        isRTL: () =>
          !!this.root.ref &&
          window
            .getComputedStyle(this.root.ref)
            .getPropertyValue('direction') === 'rtl',
        setActiveTab: (index: number) => this.activateTab(index),
        activateTabAtIndex: (index: number, clientRect: ClientRect) => {
          this.tabList[index] && this.tabList[index].activate(clientRect);
        },
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
          return tabElements ? tabElements.indexOf(activeElement) : -1;
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
      }
    );
  }

  sync(props: TabBarProps, prevProps: TabBarProps) {
    // this will re-activate the appropriate tabs if they get-rendered
    if (
      props.activeTabIndex !== prevProps.activeTabIndex &&
      props.activeTabIndex !== this.currentActiveTabIndex
    ) {
      typeof props.activeTabIndex === 'number' &&
        this.activateTab(props.activeTabIndex);
    }
  }

  getTabElements(): Element[] | null {
    return [].slice.call(
      this.root.ref &&
        this.root.ref.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR)
    );
  }

  handleTabInteraction(evt: MDCTabInteractionEvent) {
    this.foundation.handleTabInteraction(evt);
  }

  handleKeyDown(evt: React.KeyboardEvent | KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt as React.KeyboardEvent);
    this.foundation.handleKeyDown(evt as KeyboardEvent);
  }

  render() {
    const { children, activeTabIndex, onActivate, ...rest } = this.props;

    return (
      <TabBarContext.Provider
        value={{
          ...this.contextApi,
          indicatorTransition: this.props.indicatorTransition || 'slide'
        }}
      >
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
