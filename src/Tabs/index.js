// @flow
import * as React from 'react';
import { MDCTabBar } from '@material/tabs/dist/mdc.tabs';
import { noop, simpleTag } from '../Base';

import { withMDC } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export const Tab: React.ComponentType<SimpleTagPropsT> = simpleTag({
  name: 'Tab',
  classNames: 'mdc-tab'
});

export const TabBarRoot: React.ComponentType<SimpleTagPropsT> = simpleTag({
  name: 'TabBarRoot',
  tag: 'nav',
  classNames: 'mdc-tab-bar'
});

export const TabBarIndicatorEl: React.ComponentType<
  SimpleTagPropsT
> = simpleTag({
  name: 'TabBarIndicatorEl',
  tag: 'span',
  classNames: 'mdc-tab-bar__indicator'
});

type TabBarPropsT = {
  /* Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onChange: Event => mixed,
  /* The index of the active tab. */
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
    if (!props || nextProps.activeTabIndex !== props.activeTabIndex) {
      api.activeTabIndex = nextProps.activeTabIndex;
      console.log(props, nextProps, api);
    }
  }
})(({ children, activeTabIndex, ...rest }) => (
  <TabBarRoot {...rest}>
    {children}
    <TabBarIndicatorEl />
  </TabBarRoot>
));

export default TabBar;
