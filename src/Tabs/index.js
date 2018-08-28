// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';
import type { IconPropsT } from '../Icon';

import * as React from 'react';
import { MDCTabBar } from '@material/tab-bar/dist/mdc.tabBar';
import { Icon } from '../Icon';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

/************************************************************
 * TabBar
 ************************************************************/
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

/** The TabBar component */
export class TabBar extends withFoundation({
  constructor: MDCTabBar,
  adapter: {
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
    window.requestAnimationFrame(() => {
      syncFoundationProp(
        nextProps.activeTabIndex,
        this.activeTabIndex,
        () => (this.activeTabIndex = Number(nextProps.activeTabIndex))
      );
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
      </TabBarRoot>
    );
  }
}

/************************************************************
 * Tab
 ************************************************************/
export type TabPropsT = {
  /** A label for the tab. */
  label?: React.Node,
  /** The label for the tab, passed as children. */
  children?: React.Node,
  /** The icon to use for the tab. */
  icon?: React.Node,
  /** Stacks the icon on top of the text label */
  stacked?: boolean,
  /** Restricts the indicator to the content */
  restrictIndicator?: boolean
} & IconPropsT;

export const TabRoot = simpleTag({
  displayName: 'TabRoot',
  tag: 'button',
  classNames: (props: TabPropsT) => [
    'mdc-tab',
    {
      'mdc-tab--stacked': props.stacked
    }
  ],
  consumeProps: ['stacked']
});

export class TabIndicator extends React.PureComponent<{}> {
  render() {
    return (
      <span className="mdc-tab-indicator">
        <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline" />
      </span>
    );
  }
}

/** A Tab icon. This is an instance of the Icon component. */
export const TabIcon = simpleTag({
  displayName: 'TabIcon',
  tag: Icon,
  classNames: 'mdc-tab__icon'
});

/** A Tab component */
export const Tab = ({
  children,
  label,
  icon,
  iconOptions,
  stacked,
  restrictIndicator,
  ...rest
}: TabPropsT) => {
  return (
    <TabRoot stacked={stacked} {...rest}>
      <div className="mdc-tab__content">
        {!!icon && <TabIcon icon={icon} iconOptions={iconOptions} />}
        {(children !== undefined || label !== undefined) && (
          <span className="mdc-tab__text-label">
            {label}
            {children}
          </span>
        )}
        {!!restrictIndicator && <TabIndicator />}
      </div>
      {!restrictIndicator && <TabIndicator />}
      <div className="mdc-tab__ripple" />
    </TabRoot>
  );
};

Tab.displayName = 'Tab';
