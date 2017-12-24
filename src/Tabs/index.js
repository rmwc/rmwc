// @flow
import * as React from 'react';
import { MDCTabBar, MDCTabBarScroller } from '@material/tabs/dist/mdc.tabs';
import { noop, simpleTag } from '../Base';

import { withMDC } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export const Tab = simpleTag({
  displayName: 'Tab',
  classNames: 'mdc-tab'
});

export const TabBarRoot = simpleTag({
  displayName: 'TabBarRoot',
  tag: 'nav',
  classNames: 'mdc-tab-bar'
});

export const TabBarIndicatorEl = simpleTag({
  displayName: 'TabBarIndicatorEl',
  tag: 'span',
  classNames: 'mdc-tab-bar__indicator'
});

type TabBarPropsT = {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onChange?: (evt: Event) => mixed,
  /** The index of the active tab. */
  activeTabIndex: number
} & SimpleTagPropsT;

export const TabBar: React.ComponentType<TabBarPropsT> = withMDC({
  mdcConstructor: MDCTabBar,
  mdcEvents: {
    'MDCTabBar:change': (evt, props, api) => {
      evt.target.value = api.activeTabIndex;
      props.onChange(evt);
    }
  },
  defaultProps: {
    onChange: noop,
    activeTabIndex: 0
  },
  onUpdate: (props, nextProps, api) => {
    if (!api) {
      return;
    }
    if (!props || nextProps.activeTabIndex !== props.activeTabIndex) {
      api.activeTabIndex = nextProps.activeTabIndex;
    }
  }
})(
  class extends React.Component<TabBarPropsT> {
    static displayName = 'TabBar';

    render() {
      const { children, activeTabIndex, ...rest } = this.props;
      return (
        <TabBarRoot {...rest}>
          {children}
          <TabBarIndicatorEl />
        </TabBarRoot>
      );
    }
  }
);

export const TabBarScrollerRoot = simpleTag({
  displayName: 'TabBarScrollerRoot',
  tag: 'div',
  classNames: 'mdc-tab-bar-scroller'
});

export const TabBarScrollerIndicatorBackEl = simpleTag({
  displayName: 'TabBarScrollerIndicatorBackEl',
  tag: 'div',
  classNames: [
    'mdc-tab-bar-scroller__indicator',
    'mdc-tab-bar-scroller__indicator--back'
  ]
});
export const TabBarScrollerIndicatorForwardEl = simpleTag({
  displayName: 'TabBarScrollerIndicatorForwardEl',
  tag: 'div',
  classNames: [
    'mdc-tab-bar-scroller__indicator',
    'mdc-tab-bar-scroller__indicator--forward'
  ]
});

export const TabBarScrollerIndicatorInnerEl = simpleTag({
  displayName: 'TabBarScrollerIndicatorInnerEl',
  tag: 'a',
  classNames: ['mdc-tab-bar-scroller__indicator__inner', 'material-icons']
});

export const TabBarScrollerScrollFrameEl = simpleTag({
  displayName: 'TabBarScrollerScrollFrameEl',
  tag: 'div',
  classNames: 'mdc-tab-bar-scroller__scroll-frame'
});

export const TabBarScroller: React.ComponentType = withMDC({
  mdcConstructor: function(el) {
    if (el) {
      const tabBarEl = el.querySelector('.mdc-tab-bar');
      if (tabBarEl) {
        tabBarEl.classList.add('mdc-tab-bar-scroller__scroll-frame__tabs');
      }
    }
    return new MDCTabBarScroller(el);
  }
})(
  class extends React.Component {
    static displayName = 'TabBarScroller';

    render() {
      const { children, ...rest } = this.props;
      return (
        <TabBarScrollerRoot {...rest}>
          <TabBarScrollerIndicatorBackEl>
            <TabBarScrollerIndicatorInnerEl>
              navigate_before
            </TabBarScrollerIndicatorInnerEl>
          </TabBarScrollerIndicatorBackEl>
          <TabBarScrollerScrollFrameEl>{children}</TabBarScrollerScrollFrameEl>
          <TabBarScrollerIndicatorForwardEl>
            <TabBarScrollerIndicatorInnerEl>
              navigate_next
            </TabBarScrollerIndicatorInnerEl>
          </TabBarScrollerIndicatorForwardEl>
        </TabBarScrollerRoot>
      );
    }
  }
);

export default TabBar;
