import * as RMWC from '@rmwc/types';
import React from 'react';
import { useClassNames, Tag } from '@rmwc/base';

import { IconButton, IconButtonProps } from '@rmwc/icon-button';
import { useTopAppBarFoundation } from './foundation';

/*********************************************************************
 * Events
 *********************************************************************/

export type TopAppBarOnNavEventT = RMWC.CustomEventT<{}>;

/*********************************************************************
 * TopAppBar
 *********************************************************************/

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

/** A TopAppBar component */
export const TopAppBar = (props: TopAppBarProps & RMWC.ComponentProps) => (
  <TopAppBarBase
    key={props.short ? 'short' : props.fixed ? 'fixed' : 'top-app-bar'}
    {...props}
  />
);

function TopAppBarBase(props: TopAppBarProps & RMWC.ComponentProps) {
  const { rootEl } = useTopAppBarFoundation(props);
  const {
    onNav,
    scrollTarget,
    fixed,
    prominent,
    short,
    shortCollapsed,
    dense,
    ...rest
  } = props;
  const className = useClassNames(props, [
    'mdc-top-app-bar',
    {
      'mdc-top-app-bar--fixed': fixed,
      'mdc-top-app-bar--prominent': prominent,
      'mdc-top-app-bar--short': short || shortCollapsed,
      'mdc-top-app-bar--short-collapsed': shortCollapsed,
      'mdc-top-app-bar--dense': dense
    }
  ]);

  return (
    <Tag
      tag="header"
      {...rootEl.props({ ...rest, className })}
      ref={rootEl.setRef}
    />
  );
}

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

/*********************************************************************
 * Bits
 *********************************************************************/

/** A row for the app bar. */
export interface TopAppBarRowProps {}

/** A row for the app bar. */
export const TopAppBarRow = React.forwardRef<
  any,
  TopAppBarRowProps & RMWC.ComponentProps
>(function TopAppBarRow(props, ref) {
  const className = useClassNames(props, ['mdc-top-app-bar__row']);
  return <Tag ref={ref} {...props} className={className} />;
});
TopAppBarRow.displayName = 'TopAppBarRow';

/** A section for the app bar. */
export interface TopAppBarSectionProps {
  /** Aligns the section to the start. */
  alignStart?: boolean;
  /** Aligns the section to the end. */
  alignEnd?: boolean;
}

/** A section for the app bar. */
export const TopAppBarSection = React.forwardRef<
  any,
  TopAppBarSectionProps & RMWC.ComponentProps
>(function TopAppBarSection(props, ref) {
  const { alignStart, alignEnd, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-top-app-bar__section',
    {
      'mdc-top-app-bar__section--align-start': alignStart,
      'mdc-top-app-bar__section--align-end': alignEnd
    }
  ]);
  return <Tag tag="section" ref={ref} {...rest} className={className} />;
});
TopAppBarSection.displayName = 'TopAppBarSection';

/** A navigation icon for the top app bar. This is an instance of the Icon component. */
export interface TopAppBarNavigationIconProps extends IconButtonProps {}

/** A navigation icon for the top app bar. This is an instance of the IconButton component. */
export const TopAppBarNavigationIcon = function TopAppBarNavigationIcon(
  props: TopAppBarNavigationIconProps & RMWC.ComponentProps
) {
  const className = useClassNames(props, ['mdc-top-app-bar__navigation-icon']);
  return <IconButton {...props} className={className} />;
};

/** Action items for the top app bar. This is an instance of the Icon component.*/
export interface TopAppBarActionItemProps extends IconButtonProps {}

/** Action items for the top app bar. This is an instance of the IconButton component.*/
export const TopAppBarActionItem = function TopAppBarActionItem(
  props: TopAppBarActionItemProps & RMWC.ComponentProps
) {
  const className = useClassNames(props, ['mdc-top-app-bar__action-item']);
  return <IconButton {...props} className={className} />;
};

/** A title for the top app bar. */
export interface TopAppBarTitleProps {}

/** A title for the top app bar. */
export const TopAppBarTitle = React.forwardRef<
  any,
  TopAppBarTitleProps & RMWC.ComponentProps
>(function TopAppBarTitle(props, ref) {
  const className = useClassNames(props, ['mdc-top-app-bar__title']);
  return <Tag ref={ref} {...props} className={className} />;
});
TopAppBarTitle.displayName = 'TopAppBarTitle';

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
export const TopAppBarFixedAdjust = React.forwardRef<
  any,
  TopAppBarFixedAdjustProps & RMWC.ComponentProps
>(function TopAppBarFixedAdjust(props, ref) {
  const { dense, denseProminent, prominent, short, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-top-app-bar--fixed-adjust',
    {
      'mdc-top-app-bar--dense-fixed-adjust': props.dense,
      'mdc-top-app-bar--prominent-fixed-adjust': props.prominent,
      'mdc-top-app-bar--dense-prominent-fixed-adjust': props.denseProminent,
      'mdc-top-app-bar--short-fixed-adjust': props.short
    }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});
TopAppBarFixedAdjust.displayName = 'TopAppBarFixedAdjust';
