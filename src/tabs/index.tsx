import {
  ComponentProps,
  CustomEventT,
  componentFactory,
  FoundationComponent
} from '@rmwc/base';
import { IconProps } from '@rmwc/icon';

import * as React from 'react';
// @ts-ignore
import { MDCTabBarFoundation } from '@material/tab-bar';
// @ts-ignore
import { MDCTabFoundation } from '@material/tab';

import {
  MDCTabScrollerFoundation,
  util as scrollerUtil
  // @ts-ignore
} from '@material/tab-scroller';
import {
  MDCFadingTabIndicatorFoundation,
  MDCTabIndicatorFoundation,
  MDCSlidingTabIndicatorFoundation
  // @ts-ignore
} from '@material/tab-indicator';
import { Icon } from '@rmwc/icon';
import { withFoundation, syncFoundationProp } from '@rmwc/base';
import { randomId } from '@rmwc/base/utils/randomId';

/************************************************************
 * TabBar
 ************************************************************/
export type TabBarEventDetailT = {
  index: number;
};

export interface TabBarProps {
  /** Callback when the active tab changes. Receives event as an argument with event.target.value set to the activeTabIndex. */
  onActivate?: (evt: CustomEventT<TabBarEventDetailT>) => void;
  /** The index of the active tab. */
  activeTabIndex?: number;
}

export const TabBarRoot = componentFactory<TabBarProps>({
  displayName: 'TabBarRoot',
  tag: 'nav',
  classNames: (props: TabBarProps & { isTabScroller?: boolean }) => [
    'mdc-tab-bar',
    {
      'mdc-tab-scroller__scroll-frame__tabs': props.isTabScroller
    }
  ],
  consumeProps: ['isTabScroller']
});

export const TabScrollerRoot = componentFactory({
  displayName: 'TabScroller',
  classNames: ['mdc-tab-scroller']
});

export class TabScroller extends FoundationComponent<{}> {
  root = this.createElement('root');
  area = this.createElement('area');
  content = this.createElement('content');

  constructor(props: {}) {
    super(props);

    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  getDefaultFoundation() {
    const adapter = /** @type {!MDCTabScrollerAdapter} */ ({
      eventTargetMatchesSelector: (
        evtTarget: EventTarget,
        selector: string
      ) => {
        const MATCHES = scrollerUtil.getMatchesProperty(HTMLElement.prototype);
        return (evtTarget as any)[MATCHES](selector);
      },
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      addScrollAreaClass: (className: string) => this.area.addClass(className),
      setScrollAreaStyleProperty: (prop: string, value: string) =>
        this.area.setStyle(prop, value),
      setScrollContentStyleProperty: (prop: string, value: string) =>
        this.content.setStyle(prop, value),
      getScrollContentStyleValue: (propName: string) =>
        this.content.el &&
        window.getComputedStyle(this.content.el).getPropertyValue(propName),
      setScrollAreaScrollLeft: (scrollX: number) =>
        this.area.el && (this.area.el.scrollLeft = scrollX),
      getScrollAreaScrollLeft: () => this.area.el && this.area.el.scrollLeft,
      getScrollContentOffsetWidth: () =>
        this.content.el && this.content.el.offsetWidth,
      getScrollAreaOffsetWidth: () => this.area.el && this.area.el.offsetWidth,
      computeScrollAreaClientRect: () =>
        this.area.el && this.area.el.getBoundingClientRect(),
      computeScrollContentClientRect: () =>
        this.content.el && this.content.el.getBoundingClientRect(),
      computeHorizontalScrollbarHeight: () =>
        scrollerUtil.computeHorizontalScrollbarHeight(document)
    });

    return new MDCTabScrollerFoundation(adapter);
  }

  getScrollPosition() {
    return this.foundation.getScrollPosition();
  }

  getScrollContentWidth() {
    return this.content.el && this.content.el.offsetWidth;
  }

  incrementScroll(scrollXIncrement: number) {
    this.foundation.incrementScroll(scrollXIncrement);
  }

  scrollTo(scrollX: number) {
    this.foundation.scrollTo(scrollX);
  }

  handleInteraction() {
    this.foundation.handleInteraction();
  }

  handleTransitionEnd(evt: React.TransitionEvent) {
    this.foundation.handleTransitionEnd(evt);
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <TabScrollerRoot {...this.root.props(rest)} ref={this.root.setEl}>
        <TabScrollerScrollArea
          {...this.area.props({})}
          ref={this.area.setEl}
          onWheel={this.handleInteraction}
          onTouchStart={this.handleInteraction}
          onPointerDown={this.handleInteraction}
          onMouseDown={this.handleInteraction}
          onKeyDown={this.handleInteraction}
        >
          <TabScrollerScrollContent
            {...this.content.props({})}
            ref={this.content.setEl}
            onTransitionEnd={this.handleTransitionEnd}
          >
            {children}
          </TabScrollerScrollContent>
        </TabScrollerScrollArea>
      </TabScrollerRoot>
    );
  }
}

export const TabScrollerScrollArea = componentFactory({
  displayName: 'TabScrollerScrollArea',
  classNames: ['mdc-tab-scroller__scroll-area']
});

export const TabScrollerScrollContent = componentFactory({
  displayName: 'TabScrollerScrollContent',
  classNames: ['mdc-tab-scroller__scroll-content']
});

type TabBarContextT = {
  onTabInteraction: (evt: any) => void;
  registerTab: (tab: any) => {};
  unregisterTab: (tab: any) => {};
};

const TabBarContext = React.createContext({
  onTabInteraction: (evt: any) => {},
  registerTab: (tab: any) => {},
  unregisterTab: (tab: any) => {}
});

const withTabBarContext = () => <P extends { contextApi?: TabBarContextT }>(
  Component: React.ComponentType<P & { contextApi?: TabBarContextT }>
): React.ComponentType<P & { contextApi?: TabBarContextT }> => (props: P) => (
  <TabBarContext.Consumer>
    {contextApi => <Component {...props} contextApi={contextApi} />}
  </TabBarContext.Consumer>
);

/** The TabBar component */
export class TabBar extends FoundationComponent<TabBarProps> {
  static displayName = 'TabBar';

  root = this.createElement('root');
  tabScroller: TabScroller | null = null;
  tabList: any[] = [];
  contextApi = {
    onTabInteraction: (evt: Event) => this.handleTabInteraction(evt),
    registerTab: (tab: any) => this.tabList.push(tab),
    unregisterTab: (tab: any) =>
      this.tabList.splice(this.tabList.indexOf(tab), 1)
  };

  constructor(props: TabBarProps) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTabInteraction = this.handleTabInteraction.bind(this);
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
      this.foundation.activateTab(this.props.activeTabIndex || 0);

      // restore focus and scroll
      activeElement && activeElement.focus();
      window.scrollTo(scrollX, scrollY);
    });
  }

  getDefaultFoundation() {
    return new MDCTabBarFoundation(
      /** @type {!MDCTabBarAdapter} */ ({
        scrollTo: (scrollX: number) =>
          this.tabScroller && this.tabScroller.scrollTo(scrollX),
        incrementScroll: (scrollXIncrement: number) =>
          this.tabScroller &&
          this.tabScroller.incrementScroll(scrollXIncrement),
        getScrollPosition: () =>
          this.tabScroller && this.tabScroller.getScrollPosition(),
        getScrollContentWidth: () =>
          this.tabScroller && this.tabScroller.getScrollContentWidth(),
        getOffsetWidth: () => this.root.el && this.root.el.offsetWidth,
        isRTL: () =>
          this.root.el &&
          window
            .getComputedStyle(this.root.el)
            .getPropertyValue('direction') === 'rtl',
        setActiveTab: (index: number) => this.foundation.activateTab(index),
        activateTabAtIndex: (index: number, clientRect: ClientRect) =>
          this.tabList[index] && this.tabList[index].activate(clientRect),
        deactivateTabAtIndex: (index: number) =>
          this.tabList[index] && this.tabList[index].deactivate(),
        focusTabAtIndex: (index: number) => this.tabList[index].focus(),
        getTabIndicatorClientRectAtIndex: (index: number) =>
          this.tabList[index] &&
          this.tabList[index].computeIndicatorClientRect(),
        getTabDimensionsAtIndex: (index: number) =>
          this.tabList[index] && this.tabList[index].computeDimensions(),
        getPreviousActiveTabIndex: () => {
          for (let i = 0; i < this.tabList.length; i++) {
            if (this.tabList[i].active) {
              return i;
            }
          }
          return -1;
        },
        getFocusedTabIndex: () => {
          const tabElements = this.getTabElements();
          const activeElement = document.activeElement as Element;
          return tabElements && tabElements.indexOf(activeElement);
        },
        getIndexOfTabById: (id: string) => {
          for (let i = 0; i < this.tabList.length; i++) {
            if (this.tabList[i].id === id) {
              return i;
            }
          }
          return -1;
        },
        getTabListLength: () => this.tabList.length,
        notifyTabActivated: (index: number) =>
          this.emit('onActivate', { index }, true)
      })
    );
  }

  sync(props: TabBarProps, prevProps: TabBarProps) {
    if (props.activeTabIndex !== prevProps.activeTabIndex) {
      this.foundation.activateTab(props.activeTabIndex);
    }
  }

  getTabElements(): Element[] | null {
    return [].slice.call(
      this.root.el &&
        this.root.el.querySelectorAll(MDCTabBarFoundation.strings.TAB_SELECTOR)
    );
  }

  handleTabInteraction(evt: Event) {
    this.foundation.handleTabInteraction(evt);
  }

  handleKeyDown(evt: React.KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation.handleKeyDown(evt);
  }

  // activeTabIndex?: number;
  // tabList_: any;
  // tabFactory_: any;
  // getTabElements_: any;
  // layout: any;
  // activateTab: any;
  // root_: any;

  // syncWithProps(nextProps: TabBarProps) {
  //   syncFoundationProp(
  //     nextProps.activeTabIndex,
  //     this.props.activeTabIndex,
  //     () => this.foundation && this.activateTab(nextProps.activeTabIndex)
  //   );
  // }

  // componentDidMount() {
  //   super.componentDidMount();

  //   // This corrects an issue where passing in 0 or no activeTabIndex
  //   // causes the first tab of the set to not be active
  //   // request animation frame required to avoid test failure issues
  //   window.requestAnimationFrame(() => {
  //     // to make this even more annoying, Tabs focus by default
  //     // restore the focus and scroll position after we activate the tab
  //     const activeElement: any = window.document.activeElement;
  //     const [scrollX, scrollY] = [window.scrollX, window.scrollY];

  //     //activate the tab
  //     this.foundation && this.activateTab(this.props.activeTabIndex || 0);

  //     // restore focus and scroll
  //     activeElement && activeElement.focus();
  //     window.scrollTo(scrollX, scrollY);
  //   });
  // }

  // componentDidUpdate(prevProps: TabBarProps & ComponentProps) {
  //   // Children changing is a pain...
  //   // We have to perform a lot of cleanup and sometimes we have to reinit
  //   const childrenDidChange =
  //     prevProps &&
  //     prevProps.children &&
  //     this.props &&
  //     this.props.children &&
  //     JSON.stringify(
  //       React.Children.map(
  //         prevProps.children,
  //         (child: any) => (child && child.key) || {}
  //       )
  //     ) !==
  //       JSON.stringify(
  //         React.Children.map(
  //           this.props.children,
  //           (child: any) => (child && child.key) || {}
  //         )
  //       );

  //   const tabsLengthMismatch =
  //     React.Children.toArray(this.props.children).length !==
  //     this.tabList_.length;

  //   if (childrenDidChange || tabsLengthMismatch) {
  //     this.tabList_.forEach((mdcTab: any) => {
  //       mdcTab.foundation && mdcTab.foundation.destroy();
  //     });
  //     this.tabList_ = this.getTabElements_().map((el: HTMLElement) =>
  //       this.tabFactory_(el)
  //     );
  //     this.syncWithProps(this.props);
  //   }
  // }

  render() {
    const { children, activeTabIndex, onActivate, ...rest } = this.props;

    return (
      <TabBarContext.Provider value={this.contextApi}>
        <TabBarRoot
          {...rest}
          ref={this.root.setEl}
          onKeyDown={this.handleKeyDown}
        >
          <TabScroller ref={(api: TabScroller) => (this.tabScroller = api)}>
            {children}
          </TabScroller>
        </TabBarRoot>
      </TabBarContext.Provider>
    );
  }
}

/************************************************************
 * Tab
 ************************************************************/
export interface TabProps extends IconProps {
  /** A label for the tab. */
  label?: any;
  /** The label for the tab, passed as children. */
  children?: React.ReactNode;
  /** The icon to use for the tab. */
  icon?: React.ReactNode;
  /** Stacks the icon on top of the text label */
  stacked?: boolean;
  /** Restricts the indicator to the content */
  restrictIndicator?: boolean;
  /** Fires when a tab has been interacted with. This is captures both keyboard and click events. */
  onInteraction?: boolean;
}

/** A Tab component */
export const Tab = withTabBarContext()(
  class extends FoundationComponent<
    TabProps & { contextApi?: TabBarContextT }
  > {
    static displayName = 'Tab';

    root = this.createElement('root');
    tabIndicator: TabIndicator | null = null;
    content: HTMLDivElement | null = null;
    _id = randomId('tab');

    constructor(props: TabProps & { contextApi?: TabBarContextT }) {
      super(props);
      this.props.contextApi && this.props.contextApi.registerTab(this);
      this.handleClick = this.handleClick.bind(this);
    }

    componentWillUnmount() {
      this.props.contextApi && this.props.contextApi.unregisterTab(this);
    }

    get id() {
      return this.props.id
        ? this.props.id
        : (this as any)._reactInternalFiber.key || this._id;
    }

    getDefaultFoundation() {
      return new MDCTabFoundation(
        /** @type {!MDCTabAdapter} */ ({
          setAttr: (attr: string, value: any) => this.root.addProp(attr, value),
          addClass: (className: string) => this.root.addClass(className),
          removeClass: (className: string) => this.root.removeClass(className),
          hasClass: (className: string) => this.root.hasClass(className),
          activateIndicator: (previousIndicatorClientRect: ClientRect) =>
            this.tabIndicator &&
            this.tabIndicator.activate(previousIndicatorClientRect),
          deactivateIndicator: () =>
            this.tabIndicator && this.tabIndicator.deactivate(),
          notifyInteracted: () => {
            const evt = this.emit(
              'onInteraction',
              { tabId: this.id },
              true /* bubble */
            );

            this.props.contextApi &&
              this.props.contextApi.onTabInteraction(evt);
          },
          getOffsetLeft: () => this.root.el && this.root.el.offsetLeft,
          getOffsetWidth: () => this.root.el && this.root.el.offsetWidth,
          getContentOffsetLeft: () => this.content && this.content.offsetLeft,
          getContentOffsetWidth: () => this.content && this.content.offsetWidth,
          focus: () => this.root.el && this.root.el.focus()
        })
      );
    }

    handleClick(evt: React.MouseEvent) {
      this.props.onClick && this.props.onClick(evt);
      this.foundation.handleClick(evt);
    }

    /**
     * Getter for the active state of the tab
     * @return {boolean}
     */
    get active() {
      return this.foundation.isActive();
    }

    set focusOnActivate(focusOnActivate: string) {
      this.foundation.setFocusOnActivate(focusOnActivate);
    }

    activate(computeIndicatorClientRect: ClientRect) {
      this.foundation.activate(computeIndicatorClientRect);
    }

    /**
     * Deactivates the tab
     */
    deactivate() {
      this.foundation.deactivate();
    }

    computeIndicatorClientRect() {
      return this.tabIndicator && this.tabIndicator.computeContentClientRect();
    }

    computeDimensions() {
      return this.foundation.computeDimensions();
    }

    focus() {
      this.root.el && this.root.el.focus();
    }

    render() {
      const {
        children,
        label,
        icon,
        iconOptions,
        stacked,
        restrictIndicator,
        contextApi,
        ...rest
      } = this.props;
      return (
        <TabRoot
          {...this.root.props(rest)}
          onClick={this.handleClick}
          stacked={stacked}
          ref={this.root.setEl}
        >
          <div className="mdc-tab__content" ref={el => (this.content = el)}>
            {!!icon && <TabIcon icon={icon} iconOptions={iconOptions} />}
            {(children !== undefined || label !== undefined) && (
              <span className="mdc-tab__text-label">
                {label}
                {children}
              </span>
            )}
            {!!restrictIndicator && (
              <TabIndicator
                ref={(api: TabIndicator) => (this.tabIndicator = api)}
              />
            )}
          </div>
          {!restrictIndicator && (
            <TabIndicator
              ref={(api: TabIndicator) => (this.tabIndicator = api)}
            />
          )}
          <div className="mdc-tab__ripple" />
        </TabRoot>
      );
    }
  }
);

export const TabRoot = componentFactory<TabProps>({
  displayName: 'TabRoot',
  tag: 'button',
  classNames: (props: TabProps) => [
    'mdc-tab',
    {
      'mdc-tab--stacked': props.stacked
    }
  ],
  consumeProps: ['stacked']
});

export class TabIndicator extends FoundationComponent<{}> {
  root = this.createElement('root');
  content = this.createElement('content');

  getDefaultFoundation() {
    const adapter = /** @type {!MDCTabIndicatorAdapter} */ (Object.assign({
      addClass: (className: string) => {
        this.root.addClass(className);
      },
      removeClass: (className: string) => {
        this.root.removeClass(className);
      },
      computeContentClientRect: () =>
        this.content.el && this.content.el.getBoundingClientRect(),
      setContentStyleProperty: (prop: string, value: string) => {
        this.content.setStyle(prop, value);
      }
    }));

    // if (this.root.hasClass(MDCTabIndicatorFoundation.cssClasses.FADE)) {
    //   return new MDCFadingTabIndicatorFoundation(adapter);
    // }

    // Default to the sliding indicator
    return new MDCSlidingTabIndicatorFoundation(adapter);
  }

  activate(previousIndicatorClientRect: ClientRect) {
    // Early exit if no indicator is present to handle cases where an indicator
    // may be activated without a prior indicator state
    if (!previousIndicatorClientRect) {
      this.foundation.adapter_.addClass(
        MDCTabIndicatorFoundation.cssClasses.ACTIVE
      );
      return;
    }

    const currentClientRect = this.computeContentClientRect();
    const widthDelta =
      previousIndicatorClientRect.width / currentClientRect.width;
    const xPosition = previousIndicatorClientRect.left - currentClientRect.left;
    this.foundation.adapter_.addClass(
      MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION
    );
    this.foundation.adapter_.setContentStyleProperty(
      'transform',
      `translateX(${xPosition}px) scaleX(${widthDelta})`
    );

    requestAnimationFrame(() => {
      this.foundation.adapter_.removeClass(
        MDCTabIndicatorFoundation.cssClasses.NO_TRANSITION
      );
      this.foundation.adapter_.addClass(
        MDCTabIndicatorFoundation.cssClasses.ACTIVE
      );
      this.foundation.adapter_.setContentStyleProperty('transform', '');
    });
  }

  deactivate() {
    this.foundation.deactivate();
  }

  computeContentClientRect() {
    return this.foundation.computeContentClientRect();
  }

  render() {
    return (
      <span {...this.root.props({ className: 'mdc-tab-indicator' })}>
        <span
          ref={this.content.setEl}
          {...this.content.props({})}
          className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
        />
      </span>
    );
  }
}

/** A Tab icon. This is an instance of the Icon component. */
export const TabIcon = componentFactory<IconProps>({
  displayName: 'TabIcon',
  tag: Icon,
  classNames: ['mdc-tab__icon']
});
