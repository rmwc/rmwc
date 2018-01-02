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
  },
  didUpdate: (props, nextProps, api, inst) => {
    if (!api) return;

    const childrenDidChange =
      props &&
      props.children &&
      nextProps &&
      nextProps.children &&
      JSON.stringify(props.children.map(({ key }) => key)) !==
        JSON.stringify(nextProps.children.map(({ key }) => key));
    // destroy the foundation for all tabs manually to remove all  listeners
    if (childrenDidChange && api.tabs_) {
      api.tabs_.forEach(mdcTab => {
        mdcTab.foundation_ && mdcTab.foundation_.destroy();
      });

      inst.mdcComponentReinit();
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

export const TabBarScrollerIndicatorBack = simpleTag({
  displayName: 'TabBarScrollerIndicatorBack',
  tag: 'div',
  classNames: [
    'mdc-tab-bar-scroller__indicator',
    'mdc-tab-bar-scroller__indicator--back'
  ]
});
export const TabBarScrollerIndicatorForward = simpleTag({
  displayName: 'TabBarScrollerIndicatorForward',
  tag: 'div',
  classNames: [
    'mdc-tab-bar-scroller__indicator',
    'mdc-tab-bar-scroller__indicator--forward'
  ]
});

export const TabBarScrollerIndicatorInner = simpleTag({
  displayName: 'TabBarScrollerIndicatorInner',
  tag: 'a',
  classNames: ['mdc-tab-bar-scroller__indicator__inner', 'material-icons']
});

export const TabBarScrollerScrollFrame = simpleTag({
  displayName: 'TabBarScrollerScrollFrameEl',
  tag: 'div',
  classNames: 'mdc-tab-bar-scroller__scroll-frame'
});

export const TabBarScroller = withMDC({
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
          <TabBarScrollerIndicatorBack>
            <TabBarScrollerIndicatorInner>
              navigate_before
            </TabBarScrollerIndicatorInner>
          </TabBarScrollerIndicatorBack>
          <TabBarScrollerScrollFrame>{children}</TabBarScrollerScrollFrame>
          <TabBarScrollerIndicatorForward>
            <TabBarScrollerIndicatorInner>
              navigate_next
            </TabBarScrollerIndicatorInner>
          </TabBarScrollerIndicatorForward>
        </TabBarScrollerRoot>
      );
    }
  }
);

export default TabBar;
