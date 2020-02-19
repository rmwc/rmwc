import * as RMWC from '@rmwc/types';
import React, { useRef } from 'react';

import { Tag, useClassNames, createComponent } from '@rmwc/base';

import { MDCTabInteractionEvent } from '@material/tab';
import { TabScroller } from './tab-scroller';
import { TabBarContext, TabBarContextT } from './tab-bar-context';
import { useTabBarFoundation } from './tab-bar-foundation';

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

export const TabBar = createComponent<TabBarProps>(function TabBar(props, ref) {
  const { children, activeTabIndex, onActivate, ...rest } = props;

  const {
    rootEl,
    handleTabInteraction,
    setTabScrollerApi,
    registerTab,
    unregisterTab
  } = useTabBarFoundation(props);

  const contextApi = useRef<TabBarContextT>({
    onTabInteraction: (evt: MDCTabInteractionEvent) =>
      handleTabInteraction(evt),
    registerTab,
    unregisterTab,
    indicatorTransition: props.indicatorTransition || 'slide'
  });

  const className = useClassNames(props, ['mdc-tab-bar']);

  return (
    <TabBarContext.Provider value={contextApi.current}>
      <Tag tag="nav" element={rootEl} {...rest} className={className} ref={ref}>
        <TabScroller apiRef={setTabScrollerApi}>{children}</TabScroller>
      </Tag>
    </TabBarContext.Provider>
  );
});
