// @flow
import * as React from 'react';
import { MDCTabBar } from '@material/tabs/dist/mdc.tabs';
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
  });

export default TabBar;
