// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { MDCTabBar, MDCTabBarScroller } from '@material/tabs/dist/mdc.tabs';
import { Icon } from '../Icon';
import { noop, simpleTag } from '../Base';

import { withMDC } from '../Base';
import type { SimpleTagPropsT } from '../Base';

/******************************************************
 * Private
 *******************************************************/
export const TabBarRoot = simpleTag({
  displayName: 'TabBarRoot',
  tag: 'nav',
  classNames: props => [
    'mdc-tab-bar',
    {
      'mdc-tab-bar-scroller__scroll-frame__tabs': props.isTabScroller
    }
  ],
  consumeProps: ['isTabScroller']
});

export const TabBarIndicator = simpleTag({
  displayName: 'TabBarIndicator',
  tag: 'span',
  classNames: 'mdc-tab-bar__indicator'
});

export const TabBarScrollerRoot = simpleTag({
  displayName: 'TabBarScrollerRoot',
  tag: 'div',
  classNames: 'mdc-tab-bar-scroller'
});

export const TabBarScrollerIndicator = simpleTag({
  displayName: 'TabBarScrollerIndicatorBack',
  tag: 'div',
  classNames: props => [
    'mdc-tab-bar-scroller__indicator',
    {
      'mdc-tab-bar-scroller__indicator--back': props.back,
      'mdc-tab-bar-scroller__indicator--forward': props.forward
    }
  ],
  consumeProps: ['forward', 'back']
});

export const TabBarScrollerIndicatorInner = simpleTag({
  displayName: 'TabBarScrollerIndicatorInner',
  tag: Icon,
  classNames: 'mdc-tab-bar-scroller__indicator__inner'
});

export const TabBarScrollerScrollFrame = simpleTag({
  displayName: 'TabBarScrollerScrollFrameEl',
  tag: 'div',
  classNames: 'mdc-tab-bar-scroller__scroll-frame'
});

/******************************************************
 * Public
 *******************************************************/

/** A Tab component */
export const Tab = simpleTag({
  displayName: 'Tab',
  classNames: 'mdc-tab'
});

/** A Tab icon. This is an instance of the Icon component. */
export const TabIcon = simpleTag({
  displayName: 'TabIcon',
  tag: Icon,
  classNames: 'mdc-tab__icon'
});

/** Text that goes under a Tab icon */
export const TabIconText = simpleTag({
  displayName: 'TabIconText',
  tag: 'span',
  classNames: 'mdc-tab__icon-text'
});

type TabBarPropsT = {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onChange?: (evt: Event) => mixed,
  /** The index of the active tab. */
  activeTabIndex: number
} & SimpleTagPropsT;

/** The TabBar component */
export const TabBar: React.ComponentType<TabBarPropsT> = withMDC({
  getMdcConstructorOrInstance: (props, context) => {
    // TabBarScroller handles the TabBar instantiation for us
    // if we double instantiate, we end up with errors.
    // Here we are seeing if TabBarScroller passed us the api instance
    // via context
    if (context && context.isTabScroller) {
      return context.tabBarApi;
    }

    return MDCTabBar;
  },
  mdcEvents: {
    'MDCTabBar:change': (evt, props, api) => {
      evt.target.value = api.activeTabIndex;
      props.onChange(evt);
    }
  },
  contextTypes: { isTabScroller: PropTypes.bool, tabBarApi: PropTypes.any },
  defaultProps: {
    onChange: noop,
    activeTabIndex: 0
  },
  onUpdate: (props, nextProps, api, inst) => {
    if (!api) return;

    if (!props || nextProps.activeTabIndex !== props.activeTabIndex) {
      api.activeTabIndex = api.tabs[Number(nextProps.activeTabIndex)] ?
        nextProps.activeTabIndex + '' :
        undefined;
    }
  },
  didUpdate: (props, nextProps, api, inst) => {
    if (!api) {
      // if we dont have an api, it might be being held hostage by the TabBar scroller
      // Grab it if its available from the context and re-init the component
      if (inst.context.tabBarApi) {
        inst.mdcComponentReinit();
      }
      return;
    }

    const childrenDidChange =
      props &&
      props.children &&
      nextProps &&
      nextProps.children &&
      JSON.stringify(props.children.map(({ key }) => key)) !==
        JSON.stringify(nextProps.children.map(({ key }) => key));

    // destroy the foundation for all tabs manually to remove all  listeners
    if (childrenDidChange && api.tabs) {
      api.tabs.forEach(mdcTab => {
        mdcTab.foundation_ && mdcTab.foundation_.destroy();
      });

      inst.mdcComponentReinit();
    }
  }
})(
  class extends React.PureComponent<TabBarPropsT> {
    static displayName = 'TabBar';

    static contextTypes = {
      isTabScroller: PropTypes.bool
    };

    render() {
      const { children, activeTabIndex, ...rest } = this.props;
      return (
        <TabBarRoot isTabScroller={this.context.isTabScroller} {...rest}>
          {children}
          <TabBarIndicator />
        </TabBarRoot>
      );
    }
  }
);

type TabBarScrollerPropsT = {
  /** The forward indicator to use, gets passed to the Icon use prop. An SVG has been included by default to work correctly without material-icons. */
  indicatorForward?: React.Node,
  /** The back indicator to use, gets passed to the Icon use prop. An SVG has been included by default to work correctly without material-icons.  */
  indicatorBack?: React.Node
};

type TabBarScrollerStateT = {
  tabBarApi: ?mixed
};

/** The TabBar Scroll container */
export const TabBarScroller = withMDC({
  mdcConstructor: MDCTabBarScroller,
  mdcApiRef: true
})(
  class extends React.Component<TabBarScrollerPropsT, TabBarScrollerStateT> {
    static displayName = 'TabBarScroller';

    static defaultProps = {
      indicatorForward: (
        <svg
          style={{ fill: 'currentColor' }}
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      ),
      indicatorBack: (
        <svg
          style={{ fill: 'currentColor' }}
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      )
    };

    /**
     * The tab bar scroller inits the tabBar for us
     * We have to jump through some context hoops to get the tabBar api instance back to the TabBar
     */
    getChildContext() {
      return { isTabScroller: true, tabBarApi: this.state.tabBarApi };
    }

    componentWillReceiveProps(props) {
      if (
        props &&
        props.mdcApiRef &&
        props.mdcApiRef.tabBar &&
        props.mdcApiRef.tabBar !== this.state.tabBarApi
      ) {
        this.setState({ tabBarApi: props.mdcApiRef.tabBar });
      }
    }

    state = {
      tabBarApi: null
    };

    static childContextTypes = {
      isTabScroller: PropTypes.bool,
      tabBarApi: PropTypes.any
    };

    render() {
      const {
        children,
        indicatorForward,
        indicatorBack,
        mdcApiRef,
        ...rest
      } = this.props;
      return (
        <TabBarScrollerRoot {...rest}>
          <TabBarScrollerIndicator back>
            <TabBarScrollerIndicatorInner use={indicatorBack} />
          </TabBarScrollerIndicator>
          <TabBarScrollerScrollFrame>{children}</TabBarScrollerScrollFrame>
          <TabBarScrollerIndicator forward>
            <TabBarScrollerIndicatorInner use={indicatorForward} />
          </TabBarScrollerIndicator>
        </TabBarScrollerRoot>
      );
    }
  }
);
