import {
  componentFactory,
  FoundationComponent,
  ComponentProps,
  CustomEventT
} from '@rmwc/base';
import { IconProps } from '@rmwc/icon';

import * as React from 'react';

import {
  MDCTopAppBarFoundation,
  MDCFixedTopAppBarFoundation,
  MDCShortTopAppBarFoundation
  // @ts-ignore
} from '@material/top-app-bar';

import { Icon } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';

export interface TopAppBarProps {
  /** Emits when the navigation icon is clicked. */
  onNav?: (evt: CustomEventT<{}>) => void;
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
}

export const TopAppBarRoot = componentFactory<TopAppBarProps>({
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
export const TopAppBarRow = componentFactory<{}>({
  displayName: 'TopAppBarRow',
  classNames: ['mdc-top-app-bar__row']
});

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
export const TopAppBarNavigationIcon = withRipple({ unbounded: true })(
  componentFactory<IconProps>({
    displayName: 'TopAppBarNavigationIcon',
    classNames: ['mdc-top-app-bar__navigation-icon'],
    tag: Icon
  })
);

/** Action items for the top app bar. This is an instance of the Icon component.*/
export const TopAppBarActionItem = withRipple({ unbounded: true })(
  componentFactory<IconProps>({
    displayName: 'TopAppBarActionItem',
    classNames: ['mdc-top-app-bar__action-item'],
    tag: Icon
  })
);

/** A title for the top app bar. */
export const TopAppBarTitle = componentFactory<{}>({
  displayName: 'TopAppBarTitle',
  classNames: ['mdc-top-app-bar__title']
});

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
class TopAppBarBase extends FoundationComponent<TopAppBarProps> {
  static displayName = 'TopAppBar';

  root = this.createElement('root');
  navIcon: HTMLElement | null = null;
  scrollTarget: Window | null = null;

  componentDidMount() {
    super.componentDidMount();
    this.scrollTarget = window;
    this.navIcon =
      this.root.ref &&
      this.root.ref.querySelector(
        MDCTopAppBarFoundation.strings.NAVIGATION_ICON_SELECTOR
      );
  }

  getDefaultFoundation() {
    /** @type {!MDCTopAppBarAdapter} */
    const adapter = /** @type {!MDCTopAppBarAdapter} */ (Object.assign({
      hasClass: (className: string) => this.root.hasClass(className),
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      setStyle: (property: string, value: string) =>
        this.root.ref && this.root.ref.style.setProperty(property, value),
      getTopAppBarHeight: () =>
        this.root && this.root.ref && this.root.ref.clientHeight,
      registerNavigationIconInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) => {
        if (this.navIcon) {
          this.navIcon.addEventListener(evtType, handler);
        }
      },
      deregisterNavigationIconInteractionHandler: (
        evtType: string,
        handler: (evt: Event) => void
      ) => {
        if (this.navIcon) {
          this.navIcon.removeEventListener(evtType, handler);
        }
      },
      notifyNavigationIconClicked: () => {
        this.emit(MDCTopAppBarFoundation.strings.NAVIGATION_EVENT, {});
      },
      registerScrollHandler: (handler: (evt: Event) => void) =>
        this.scrollTarget &&
        this.scrollTarget.addEventListener('scroll', handler),
      deregisterScrollHandler: (handler: (evt: Event) => void) =>
        this.scrollTarget &&
        this.scrollTarget.removeEventListener('scroll', handler),
      registerResizeHandler: (handler: (evt: Event) => void) =>
        window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler: (evt: Event) => void) =>
        window.removeEventListener('resize', handler),
      getViewportScrollY: () =>
        this.scrollTarget &&
        this.scrollTarget[
          // @ts-ignore
          this.scrollTarget === window ? 'pageYOffset' : 'scrollTop'
        ],
      getTotalActionItems: () =>
        this.root.ref &&
        this.root.ref.querySelectorAll(
          MDCTopAppBarFoundation.strings.ACTION_ITEM_SELECTOR
        ).length
    }));

    /** @type {!MDCTopAppBarBaseFoundation} */
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

  render() {
    const { onNav, ...rest } = this.props;
    return <TopAppBarRoot {...this.root.props(rest)} ref={this.root.setRef} />;
  }
}

export const TopAppBar = (props: TopAppBarProps & ComponentProps) => (
  <TopAppBarBase
    key={props.short ? 'short' : props.fixed ? 'fixed' : 'top-app-bar'}
    {...props}
  />
);

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
export class SimpleTopAppBar extends React.Component<SimpleTopAppBarProps> {
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
