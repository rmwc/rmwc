import * as React from 'react';
import PropTypes from 'prop-types';
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

const mdcTabBarEvents = {
  'MDCTabBar:change': (evt, props, api) => {
    evt.target.value = api.activeTabIndex;
    props.onChange(evt);
  }
};

export const TabBar_: React.ComponentType<TabBarPropsT> = withMDC({
  mdcConstructor: MDCTabBar,
  mdcEvents: mdcTabBarEvents,

  defaultProps: {
    onChange: noop,
    activeTabIndex: 0
  }
})(
  class extends React.Component<TabBarPropsT> {
    static displayName = 'TabBar';

    static contextTypes = {
      tabBarScrollerPresent: PropTypes.bool
    };

    render() {
      const { children, activeTabIndex, ...rest } = this.props;
      return (
        <TabBarRoot {...rest}
          className={
            this.context.tabBarScrollerPresent &&
            'mdc-tab-bar-scroller__scroll-frame__tabs'
          } >
          {children}
          < TabBarIndicatorEl />
        </TabBarRoot >
      );
    }
  }
  );

export class TabBar extends TabBar_ {
  static contextTypes = {
    tabBarApi: PropTypes.object,
    tabBarScrollerPresent: PropTypes.bool,
    tabBarScrollerReinit: PropTypes.func
  };

  mdcComponentInit() {
    if (!this.context.tabBarScrollerPresent) {
      super.mdcComponentInit();
    }
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (nextContext.tabBarScrollerPresent &&
      nextContext &&
      nextContext.tabBarApi &&
      this.mdcApi !== nextContext.tabBarApi) {
      //  set TabBar API created by TabBarScroller
      this.mdcApi = nextContext.tabBarApi;
      //  set activeTabIndex
      this.mdcApi.activeTabIndex = nextProps.activeTabIndex;
      // remove old listeners
      this.mdcUnregisterAllListeners();
      // Hook event handlers
      Object.entries(mdcTabBarEvents).forEach(([eventName, handler]) => {
        this.mdcRegisterListener(eventName, handler);
      });
    } else if (this.mdcApi &&
      (!this.props || this.props.activeTabIndex !== nextProps.activeTabIndex)) {
      this.mdcApi.activeTabIndex = nextProps.activeTabIndex;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.mdcApi) return;
    // check if tabs have changed
    const childrenDidChange =
      prevProps &&
      prevProps.children &&
      this.props &&
      this.props.children &&
      JSON.stringify(prevProps.children.map(({ key }) => key)) !==
      JSON.stringify(this.props.children.map(({ key }) => key));

    if (childrenDidChange && this.mdcApi.tabs_) {
      // destroy the foundation for all tabs 
      // manually to remove all  listeners 
      this.mdcApi.tabs_.forEach(mdcTab => {
        mdcTab.foundation_ && mdcTab.foundation_.destroy();
      });
      // when tab scroller is wrapping the component
      if (this.context.tabBarScrollerPresent) {
        // destroy the foundation
        this.mdcComponentDestroy();
        // trigger reinit on the scroller container
        this.context.tabBarScrollerReinit();
      } else {
        // reinit
        this.mdcComponentReinit();
      }
    }
  }
}


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

const TabBarScroller_: React.ComponentType = withMDC({
  mdcConstructor: MDCTabBarScroller
})(
  class extends React.Component {
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
  });

export class TabBarScroller extends TabBarScroller_ {
  static displayName = 'TabBarScroller';

  static childContextTypes = {
    tabBarScrollerReinit: PropTypes.func,
    tabBarApi: PropTypes.object,
    tabBarScrollerPresent: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.reinitTabScroller = this.reinitTabScroller.bind(this);
  }

  reinitTabScroller() {
    super.mdcComponentReinit();
    this.forceUpdate();
  }

  getChildContext() {
    return {
      tabBarScrollerReinit: this.reinitTabScroller,
      tabBarApi: this.mdcApi && this.mdcApi.tabBar_,
      tabBarScrollerPresent: true
    };
  }

  mdcComponentInit() {
    super.mdcComponentInit();
    this.forceUpdate();
  }
}
export default TabBar;