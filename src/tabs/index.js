// @flow
import type { SimpleTagPropsT, CustomEventT } from '@rmwc/base';
import type { IconPropsT } from '@rmwc/icon';

import * as React from 'react';
import { MDCTabBar } from '@material/tab-bar/dist/mdc.tabBar';
import { Icon } from '@rmwc/icon';
import { simpleTag, withFoundation, syncFoundationProp } from '@rmwc/base';

/************************************************************
 * TabBar
 ************************************************************/
export type TabBarEventDetailT = {
  index: number
};

export type TabBarPropsT = {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onActivate?: (evt: CustomEventT<TabBarEventDetailT>) => mixed,
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
    syncFoundationProp(
      nextProps.activeTabIndex,
      this.props.activeTabIndex,
      () => this.foundation_ && this.activateTab(nextProps.activeTabIndex)
    );
  }

  componentDidMount() {
    super.componentDidMount();

    // This corrects an issue where passing in 0 or no activeTabIndex
    // causes the first tab of the set to not be active
    // request animation frame required to avoid test failure issues
    window.requestAnimationFrame(() => {
      // to make this even more annoying, Tabs focus by default
      // restore the focus and scroll position after we activate the tab
      const activeElement: any = window.document.activeElement;
      const [scrollX, scrollY] = [window.scrollX, window.scrollY];

      //activate the tab
      this.foundation_ && this.activateTab(this.props.activeTabIndex || 0);

      // restore focus and scroll
      activeElement && activeElement.focus();
      window.scrollTo(scrollX, scrollY);
    });
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
          (child: any) => (child && child.key) || {}
        )
      ) !==
        JSON.stringify(
          React.Children.map(
            this.props.children,
            (child: any) => (child && child.key) || {}
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
      onActivate,
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
} & IconPropsT &
  SimpleTagPropsT;

export const TabRoot: React.ComponentType<TabPropsT> = simpleTag({
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
export const TabIcon: React.ComponentType<IconPropsT> = simpleTag({
  displayName: 'TabIcon',
  tag: Icon,
  classNames: 'mdc-tab__icon'
});

/** A Tab component */
export const Tab: React.ComponentType<TabPropsT> = ({
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
