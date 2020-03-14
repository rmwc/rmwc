import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCTopAppBarFoundation } from '@material/top-app-bar';
import { useClassNames, Tag, createComponent } from '@rmwc/base';
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
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCTopAppBarFoundation | null>;
}

/** A TopAppBar component */
export const TopAppBar = createComponent<TopAppBarProps>(function TopAppBar(
  props,
  ref
) {
  return (
    <TopAppBarBase
      key={props.short ? 'short' : props.fixed ? 'fixed' : 'top-app-bar'}
      {...props}
      ref={ref}
    />
  );
});

const TopAppBarBase = createComponent<TopAppBarProps>(function TopAppBarBase(
  props,
  ref
) {
  const { rootEl } = useTopAppBarFoundation(props);
  const {
    onNav,
    scrollTarget,
    fixed,
    prominent,
    short,
    shortCollapsed,
    dense,
    foundationRef,
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
      {...rest}
      element={rootEl}
      className={className}
      ref={ref}
    />
  );
});

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
export const SimpleTopAppBar = createComponent<SimpleTopAppBarProps>(
  function SimpleTopAppBar(props, ref) {
    const {
      title,
      actionItems,
      navigationIcon,
      startContent,
      endContent,
      ...rest
    } = props;
    return (
      <TopAppBar {...rest} ref={ref}>
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
);

/*********************************************************************
 * Bits
 *********************************************************************/

/** A row for the app bar. */
export interface TopAppBarRowProps {}

/** A row for the app bar. */
export const TopAppBarRow = createComponent<TopAppBarRowProps>(
  function TopAppBarRow(props, ref) {
    const className = useClassNames(props, ['mdc-top-app-bar__row']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** A section for the app bar. */
export interface TopAppBarSectionProps {
  /** Aligns the section to the start. */
  alignStart?: boolean;
  /** Aligns the section to the end. */
  alignEnd?: boolean;
}

/** A section for the app bar. */
export const TopAppBarSection = createComponent<TopAppBarSectionProps>(
  function TopAppBarSection(props, ref) {
    const { alignStart, alignEnd, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-top-app-bar__section',
      {
        'mdc-top-app-bar__section--align-start': alignStart,
        'mdc-top-app-bar__section--align-end': alignEnd
      }
    ]);
    return <Tag tag="section" {...rest} ref={ref} className={className} />;
  }
);

/** A navigation icon for the top app bar. This is an instance of the Icon component. */
export interface TopAppBarNavigationIconProps extends IconButtonProps {}

/** A navigation icon for the top app bar. This is an instance of the IconButton component. */
export const TopAppBarNavigationIcon = createComponent<
  TopAppBarNavigationIconProps
>(function TopAppBarNavigationIcon(props, ref) {
  const className = useClassNames(props, ['mdc-top-app-bar__navigation-icon']);
  return <IconButton {...props} className={className} ref={ref} />;
});

/** Action items for the top app bar. This is an instance of the Icon component.*/
export interface TopAppBarActionItemProps extends IconButtonProps {}

/** Action items for the top app bar. This is an instance of the IconButton component.*/
export const TopAppBarActionItem = createComponent<TopAppBarActionItemProps>(
  function TopAppBarActionItem(props, ref) {
    const className = useClassNames(props, ['mdc-top-app-bar__action-item']);
    return <IconButton {...props} className={className} ref={ref} />;
  }
);

/** A title for the top app bar. */
export interface TopAppBarTitleProps {}

/** A title for the top app bar. */
export const TopAppBarTitle = createComponent<TopAppBarTitleProps>(
  function TopAppBarTitle(props, ref) {
    const className = useClassNames(props, ['mdc-top-app-bar__title']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

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
export const TopAppBarFixedAdjust = createComponent<TopAppBarFixedAdjustProps>(
  function TopAppBarFixedAdjust(props, ref) {
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
    return <Tag {...rest} ref={ref} className={className} />;
  }
);
