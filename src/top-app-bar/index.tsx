import * as RMWC from '@rmwc/types';
import { componentFactory, FoundationComponent } from '@rmwc/base';

import * as React from 'react';

import {
  MDCTopAppBarFoundation,
  MDCFixedTopAppBarFoundation,
  MDCShortTopAppBarFoundation
} from '@material/top-app-bar';

import { IconButton, IconButtonProps } from '@rmwc/icon-button';
import { withRipple } from '@rmwc/ripple';
import { SpecificEventListener } from '@material/base/types';

export type TopAppBarOnNavEventT = RMWC.CustomEventT<{}>;

export interface TopAppBarProps {
  /** Emits when the navigation icon is clicked. */
  onNav?: (evt: TopAppBarOnNavEventT) => void;
  /** Styles the top app bar as a fixed top app bar. */
  fixed?: boolean;
  /** Styles the top app bar as a prominent top app bar. */
  prominent?: boolean;
  /** Styles the top app bar as a short top app bar. */
  short?: boolean;
  /** Styles the top app bar to always be collapsed. */
  shortCollapsed?: boolean;
  /** Styles the top app bar to be dense. */
  dense?: boolean;
  /** Set a scrollTarget other than the window when you are using the TopAppBar inside of a nested scrolling DOM Element.*/
  scrollTarget?: Element | null;
}

const TopAppBarRoot = componentFactory<TopAppBarProps>({
  displayName: 'TopAppBarRoot',
  tag: 'header',
  classNames: (props: TopAppBarProps) => [
    'mdc-top-app-bar',
    {
      'mdc-top-app-bar--fixed': props.fixed,
      'mdc-top-app-bar--prominent': props.prominent,
      'mdc-top-app-bar--short': props.short || props.shortCollapsed,
      'mdc-top-app-bar--short-collapsed': props.shortCollapsed,
      'mdc-top-app-bar--dense': props.dense
    }
  ],
  consumeProps: ['fixed', 'prominent', 'short', 'shortCollapsed', 'dense']
});

/** A row for the app bar. */
export interface TopAppBarRowProps {}

/** A row for the app bar. */
export const TopAppBarRow = componentFactory<TopAppBarRowProps>({
  displayName: 'TopAppBarRow',
  classNames: ['mdc-top-app-bar__row']
});

/** A section for the app bar. */
export interface TopAppBarSectionProps {
  /** Aligns the section to the start. */
  alignStart?: boolean;
  /** Aligns the section to the end. */
  alignEnd?: boolean;
}

/** A section for the app bar. */
export const TopAppBarSection = componentFactory<TopAppBarSectionProps>({
  displayName: 'TopAppBarSection',
  tag: 'section',
  classNames: (props: TopAppBarSectionProps) => [
    'mdc-top-app-bar__section',
    {
      'mdc-top-app-bar__section--align-start': props.alignStart,
      'mdc-top-app-bar__section--align-end': props.alignEnd
    }
  ],
  consumeProps: ['alignStart', 'alignEnd']
});

/** A navigation icon for the top app bar. This is an instance of the Icon component. */
export interface TopAppBarNavigationIconProps extends IconButtonProps {}

/** A navigation icon for the top app bar. This is an instance of the Icon component. */
export const TopAppBarNavigationIcon = componentFactory<
  TopAppBarNavigationIconProps
>({
  displayName: 'TopAppBarNavigationIcon',
  classNames: ['mdc-top-app-bar__navigation-icon'],
  tag: IconButton
});

/** Action items for the top app bar. This is an instance of the IconButton component.*/
export interface TopAppBarActionItemProps extends IconButtonProps {}

/** Action items for the top app bar. This is an instance of the IconButton component.*/
export const TopAppBarActionItem = componentFactory<TopAppBarActionItemProps>({
  displayName: 'TopAppBarActionItem',
  classNames: ['mdc-top-app-bar__action-item'],
  tag: IconButton
});

/** A title for the top app bar. */
export interface TopAppBarTitleProps {}

/** A title for the top app bar. */
export const TopAppBarTitle = componentFactory<TopAppBarTitleProps>({
  displayName: 'TopAppBarTitle',
  classNames: ['mdc-top-app-bar__title']
});

/** An optional component to fill the space when the TopAppBar is fixed. Place it directly after the TopAppBar. */
export interface TopAppBarFixedAdjustProps {
  /** Class used to style the content below the dense top app bar to prevent the top app bar from covering it. */
  dense?: boolean;
  /** Class used to style the content below the prominent top app bar to prevent the top app bar from covering it. */
  prominent?: boolean;
  /** Class used to style the content below the top app bar when styled as both prominent and dense, to prevent the top app bar from covering it. */
  denseProminent?: boolean;
  /** Class used to style the content below the short top app bar to prevent the top app bar from covering it. */
  short?: boolean;
}

/** An optional component to fill the space when the TopAppBar is fixed. Place it directly after the TopAppBar. */
export const TopAppBarFixedAdjust = componentFactory<TopAppBarFixedAdjustProps>(
  {
    displayName: 'TopAppBarFixedAdjust',
    classNames: (props: TopAppBarFixedAdjustProps) => [
      'mdc-top-app-bar--fixed-adjust',
      {
        'mdc-top-app-bar--dense-fixed-adjust': props.dense,
        'mdc-top-app-bar--prominent-fixed-adjust': props.prominent,
        'mdc-top-app-bar--dense-prominent-fixed-adjust': props.denseProminent,
        'mdc-top-app-bar--short-fixed-adjust': props.short
      }
    ],
    consumeProps: ['dense', 'denseProminent', 'prominent', 'short']
  }
);

/** A TopAppBar component */
class TopAppBarBase extends FoundationComponent<
  | MDCShortTopAppBarFoundation
  | MDCFixedTopAppBarFoundation
  | MDCTopAppBarFoundation,
  TopAppBarProps
> {
  static displayName = 'TopAppBar';

  private root = this.createElement('root');
  navIcon: HTMLElement | null = null;
  scrollTarget: EventTarget | null = null;
  handleTargetScroll!: SpecificEventListener<'scroll'>;
  handleNavigationClick!: EventListener;

  get window() {
    return this.root.ref &&
      this.root.ref.ownerDocument &&
      this.root.ref.ownerDocument.defaultView
      ? this.root.ref.ownerDocument.defaultView
      : window;
  }

  componentDidMount() {
    super.componentDidMount();

    if (!this.props.scrollTarget) {
      this.handleTargetScroll = this.foundation.handleTargetScroll.bind(
        this.foundation
      );
      this.setScrollTarget(this.window);
    }

    this.navIcon =
      this.root.ref &&
      this.root.ref.querySelector(
        MDCTopAppBarFoundation.strings.NAVIGATION_ICON_SELECTOR
      );

    this.handleNavigationClick = this.foundation.handleNavigationClick.bind(
      this.foundation
    );

    this.navIcon &&
      this.navIcon.addEventListener('click', this.handleNavigationClick);
  }

  componentWillUnmount() {
    this.navIcon &&
      this.navIcon.removeEventListener('click', this.handleNavigationClick);

    super.componentWillUnmount();
  }

  getDefaultFoundation() {
    const adapter = {
      hasClass: (className: string) => this.root.hasClass(className),
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setStyle: (property: string, value: string) =>
        this.root.ref && this.root.ref.style.setProperty(property, value),
      getTopAppBarHeight: () =>
        this.root.ref ? this.root.ref.clientHeight : 0,
      notifyNavigationIconClicked: () => {
        this.emit('onNav', {});
      },
      registerScrollHandler: (handler: SpecificEventListener<'scroll'>) =>
        this.scrollTarget &&
        this.scrollTarget.addEventListener('scroll', handler as EventListener),
      deregisterScrollHandler: (handler: SpecificEventListener<'scroll'>) =>
        this.scrollTarget &&
        this.scrollTarget.removeEventListener(
          'scroll',
          handler as EventListener
        ),
      registerResizeHandler: (handler: SpecificEventListener<'resize'>) =>
        this.scrollTarget &&
        this.scrollTarget.addEventListener('resize', handler as EventListener),
      deregisterResizeHandler: (handler: SpecificEventListener<'resize'>) =>
        this.scrollTarget &&
        this.scrollTarget.removeEventListener(
          'resize',
          handler as EventListener
        ),
      getViewportScrollY: () =>
        this.scrollTarget &&
        (this.scrollTarget as any)[
          'pageYOffset' in this.scrollTarget ? 'pageYOffset' : 'scrollTop'
        ],
      getTotalActionItems: () =>
        this.root.ref
          ? this.root.ref.querySelectorAll(
              MDCTopAppBarFoundation.strings.ACTION_ITEM_SELECTOR
            ).length
          : 0
    };

    let foundation;
    if (this.props.short) {
      foundation = new MDCShortTopAppBarFoundation(adapter);
    } else if (this.props.fixed) {
      foundation = new MDCFixedTopAppBarFoundation(adapter);
    } else {
      foundation = new MDCTopAppBarFoundation(adapter);
    }

    return foundation;
  }

  setScrollTarget(target: EventTarget) {
    // Remove scroll handler from the previous scroll target
    this.scrollTarget &&
      this.scrollTarget.removeEventListener(
        'scroll',
        this.handleTargetScroll as EventListener
      );

    this.scrollTarget = target;

    // Initialize scroll handler on the new scroll target
    this.handleTargetScroll = this.foundation.handleTargetScroll.bind(
      this.foundation
    );
    this.scrollTarget.addEventListener(
      'scroll',
      this.handleTargetScroll as EventListener
    );
  }

  sync(props: TopAppBarProps) {
    this.syncProp(props.scrollTarget, this.scrollTarget, () => {
      this.scrollTarget = props.scrollTarget || this.window;
      this.setScrollTarget(this.scrollTarget);
    });
  }

  render() {
    const { onNav, scrollTarget, ...rest } = this.props;
    return <TopAppBarRoot {...this.root.props(rest)} ref={this.root.setRef} />;
  }
}

export const TopAppBar = (props: TopAppBarProps & RMWC.ComponentProps) => (
  <TopAppBarBase
    key={props.short ? 'short' : props.fixed ? 'fixed' : 'top-app-bar'}
    {...props}
  />
);

/** A simplified syntax for creating an AppBar. */
export interface SimpleTopAppBarProps extends TopAppBarProps {
  /** The title for the App Bar. */
  title?: React.ReactNode;
  /** An array of props that will be used to create TopAppBarActionItems. */
  actionItems?: Object[];
  /** Props for the NavigationIcon, which is an instance of the Icon component. You can also set this to `true` and use the `onNav` prop to handle interactions.*/
  navigationIcon?: Object | boolean;
  /** Additional content to place in the start section. */
  startContent?: React.ReactNode;
  /** Additional content to place in the end section. */
  endContent?: React.ReactNode;
}

/** A simplified syntax for creating an AppBar. */
export class SimpleTopAppBar extends React.Component<
  SimpleTopAppBarProps & RMWC.ComponentProps
> {
  static displayName = 'SimpleTopAppBar';

  render() {
    const {
      title,
      actionItems,
      navigationIcon,
      startContent,
      endContent,
      ...rest
    } = this.props;
    return (
      <TopAppBar {...rest}>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            {!!navigationIcon && (
              <TopAppBarNavigationIcon
                icon="menu"
                {...(typeof navigationIcon === 'boolean' ? {} : navigationIcon)}
              />
            )}
            {!!title && <TopAppBarTitle>{title}</TopAppBarTitle>}
            {startContent}
          </TopAppBarSection>

          {(!!actionItems || endContent) && (
            <TopAppBarSection alignEnd>
              {endContent}
              {!!actionItems &&
                actionItems.map((actionItemProps, index) => (
                  <TopAppBarActionItem {...actionItemProps} key={index} />
                ))}
            </TopAppBarSection>
          )}
        </TopAppBarRow>
      </TopAppBar>
    );
  }
}
