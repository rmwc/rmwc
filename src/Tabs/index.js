// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';

import * as React from 'react';
import { MDCTab } from '@material/tab/dist/mdc.tab';
import {
  MDCTabBar,
  MDCTabBarFoundation
} from '@material/tab-bar/dist/mdc.tabBar';
import { Icon } from '../Icon';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

// function recursiveMap(children: React.Node, fn) {
//   return React.Children.map(
//     children,
//     //$FlowFixMe
//     (child: React.Element<{ children: any }>) => {
//       if (!React.isValidElement(child)) {
//         return child;
//       }

//       if ('children' in child.props) {
//         //$FlowFixMe
//         child = React.cloneElement(child, {
//           children: recursiveMap(child.props.children, fn)
//         });
//       }

//       return fn(child);
//     }
//   );
// }

export type TabBarEventDetailT = {
  index: number
};

export type TabBarPropsT = {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onActivated?: (evt: CustomEventT<TabBarEventDetailT>) => mixed,
  /** The index of the active tab. */
  activeTabIndex?: number
} & SimpleTagPropsT;

export const TabBarRoot = simpleTag({
  displayName: 'TabBarRoot',
  tag: 'nav',
  classNames: (props: TabBarPropsT & { isTabScroller?: boolean }) => [
    'mdc-tab-bar',
    {
      'mdc-tab-scroller__scroll-frame__tabs': props.isTabScroller
    }
  ],
  consumeProps: ['isTabScroller']
});

export const TabBarIndicator = simpleTag({
  displayName: 'TabBarIndicator',
  tag: 'span',
  classNames: 'mdc-tab-bar__indicator'
});

export const TabScroller = simpleTag({
  displayName: 'TabScroller',
  classNames: 'mdc-tab-scroller'
});

export const TabScrollerScrollArea = simpleTag({
  displayName: 'TabScrollerScrollArea',
  classNames: 'mdc-tab-scroller__scroll-area'
});

export const TabScrollerScrollContent = simpleTag({
  displayName: 'TabScrollerScrollContent',
  classNames: 'mdc-tab-scroller__scroll-content'
});

/******************************************************
 * Public
 *******************************************************/

export type TabPropsT = {
  /** A label for the tab. */
  label?: React.Node,
  /** The label for the tab, passed as children. */
  children?: React.Node,
  /** The icon to use for the tab. */
  icon?: React.Node,
  /** Puts the tab in an active state */
  active?: boolean,
  /** Stacks the icon on top of the text label */
  stacked?: boolean,
  /** Hides the indicator */
  hideIndicator?: boolean,
  /** Restricts the indicator to the content */
  restrictIndicator?: boolean
};

/** A Tab component */
export const TabRoot = simpleTag({
  displayName: 'Tab',
  tag: 'button',
  classNames: (props: TabPropsT) => [
    'mdc-tab',
    {
      'mdc-tab--active': props.active,
      'mdc-tab--stacked': props.stacked
    }
  ],
  consumeProps: ['active', 'stacked']
});

export const Tab = ({
  children,
  label,
  icon,
  active,
  stacked,
  restrictIndicator,
  ...rest
}: TabPropsT) => {
  const indicator = (
    <span className="mdc-tab-indicator">
      <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
    </span>
  );

  return (
    <TabRoot active={active} stacked={stacked} {...rest}>
      <div className="mdc-tab__content">
        {!!icon && <TabIcon use={icon} />}
        {(children !== undefined || label !== undefined) && (
          <span className="mdc-tab__text-label">
            {label}
            {children}
          </span>
        )}
        {!!restrictIndicator && indicator}
      </div>
      {!restrictIndicator && indicator}
      <div className="mdc-tab__ripple" />
    </TabRoot>
  );
};

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

/** The TabBar component */
export class TabBar extends withFoundation({
  constructor: MDCTabBar,
  adapter: {
    activateTabAtIndex: function activateTabAtIndex(index, clientRect) {
      return this.tabList_[index] && this.tabList_[index].activate(clientRect);
    },
    deactivateTabAtIndex: function deactivateTabAtIndex(index) {
      return this.tabList_[index] && this.tabList_[index].deactivate();
    },
    getTabIndicatorClientRectAtIndex: function getTabIndicatorClientRectAtIndex(
      index
    ) {
      return (
        this.tabList_[index] &&
        this.tabList_[index].computeIndicatorClientRect()
      );
    },
    getTabDimensionsAtIndex: function getTabDimensionsAtIndex(index) {
      return this.tabList_[index] && this.tabList_[index].computeDimensions();
    }
  }
})<TabBarPropsT> {
  static displayName = 'TabBar';

  activeTabIndex: number;
  tabList_: any;
  tabFactory_: Function;
  getTabElements_: Function;
  layout: Function;
  activateTab: Function;
  root_: any;

  syncWithProps(nextProps: TabBarPropsT) {
    syncFoundationProp(nextProps.activeTabIndex, this.activeTabIndex, () => {
      this.activateTab(nextProps.activeTabIndex);
    });
  }

  componentDidMount() {
    super.componentDidMount();

    // This corrects an issue where passing in 0 or no activeTabIndex
    // causes the first tab of the set to not be active
    if (
      this.props.activeTabIndex === 0 ||
      this.props.activeTabIndex === undefined
    ) {
      window.requestAnimationFrame(() => {
        this.foundation_ && this.activateTab(0);
      });
    }
  }

  componentDidUpdate(prevProps: TabBarPropsT) {
    // Children changing is a pain...
    // We have to perform a lot of cleanup and sometimes we have to reinit
    const childrenDidChange =
      prevProps &&
      prevProps.children &&
      this.props &&
      this.props.children &&
      JSON.stringify(
        React.Children.map(
          prevProps.children,
          (child: any) => 'key' in child && child.key
        )
      ) !==
        JSON.stringify(
          React.Children.map(
            this.props.children,
            (child: any) => 'key' in child && child.key
          )
        );

    const tabsLengthMismatch =
      React.Children.toArray(this.props.children).length !==
      this.tabList_.length;

    if (childrenDidChange || tabsLengthMismatch) {
      this.tabList_.forEach(mdcTab => {
        mdcTab.foundation_ && mdcTab.foundation_.destroy();
      });
      this.tabList_ = this.getTabElements_().map(el => this.tabFactory_(el));
      this.syncWithProps(this.props);
    }
  }

  getTabElements_() {
    const arr: any = [];
    return arr.slice.call(
      this.root_.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR)
    );
  }

  render() {
    const {
      children,
      activeTabIndex,
      apiRef,
      onActivated,
      ...rest
    } = this.props;
    const { root_ } = this.foundationRefs;

    return (
      <TabBarRoot {...rest} elementRef={root_}>
        <TabScroller>
          <TabScrollerScrollArea>
            <TabScrollerScrollContent>{children}</TabScrollerScrollContent>
          </TabScrollerScrollArea>
        </TabScroller>
        <TabBarIndicator />
      </TabBarRoot>
    );
  }
}

export type TabScrollerPropsT = {
  /** The forward indicator to use, gets passed to the Icon use prop. An SVG has been included by default to work correctly without material-icons. */
  indicatorForward?: React.Node,
  /** The back indicator to use, gets passed to the Icon use prop. An SVG has been included by default to work correctly without material-icons.  */
  indicatorBack?: React.Node,
  /** Children to render */
  children?: React.Node
};

// /** The TabBar Scroll container */
// export class TabScroller extends withFoundation({
//   constructor: MDCTabScroller,
//   adapter: {}
// })<TabScrollerPropsT> {
//   static displayName = 'TabScroller';

//   static defaultProps = {
//     indicatorForward: (
//       <svg
//         style={{ fill: 'currentColor' }}
//         height="24"
//         viewBox="0 0 24 24"
//         width="24"
//       >
//         <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
//         <path d="M0 0h24v24H0z" fill="none" />
//       </svg>
//     ),
//     indicatorBack: (
//       <svg
//         style={{ fill: 'currentColor' }}
//         height="24"
//         viewBox="0 0 24 24"
//         width="24"
//       >
//         <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
//         <path d="M0 0h24v24H0z" fill="none" />
//       </svg>
//     )
//   };

//   tabBarApi: Object;
//   layout: Function;

//   initialize() {
//     super.initialize(() => this.tabBarApi);
//   }

//   componentDidUpdate() {
//     this.layout();
//   }

//   render() {
//     const { children, indicatorForward, indicatorBack, ...rest } = this.props;
//     const { root_ } = this.foundationRefs;
//     const newChildren = recursiveMap(children, child => {
//       if (child.type.displayName && child.type.displayName === 'TabBar') {
//         return React.cloneElement(child, {
//           ...child.props,
//           isTabScroller: true,
//           ref: tabBarApi => (this.tabBarApi = tabBarApi)
//         });
//       }

//       return child;
//     });

//     return (
//       <TabScrollerRoot {...rest} elementRef={root_}>
//         <TabScrollerIndicator back>
//           <TabScrollerIndicatorInner use={indicatorBack} />
//         </TabScrollerIndicator>
//         <TabScrollerScrollFrame>{newChildren}</TabScrollerScrollFrame>
//         <TabScrollerIndicator forward>
//           <TabScrollerIndicatorInner use={indicatorForward} />
//         </TabScrollerIndicator>
//       </TabScrollerRoot>
//     );
//   }
// }
