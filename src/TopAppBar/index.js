// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';

import * as React from 'react';
import { MDCTopAppBar } from '@material/top-app-bar/dist/mdc.topAppBar';

import { Icon } from '../Icon';
import { simpleTag, withFoundation } from '../Base';

type TopAppAppBarPropsT = {
  /** Emits when the navigation icon is clicked. */
  onNav?: (evt: CustomEventT<void>) => mixed,
  /** Styles the top app bar as a fixed top app bar. */
  fixed?: boolean,
  /** Styles the top app bar as a prominent top app bar. */
  prominent?: boolean,
  /** Styles the top app bar as a short top app bar. */
  short?: boolean,
  /** Styles the top app bar to always be collapsed. */
  shortCollapsed?: boolean,
  /** Styles the top app bar to be dense. */
  dense?: boolean
} & SimpleTagPropsT;

export const TopAppBarRoot = simpleTag({
  displayName: 'TopAppBarRoot',
  tag: 'header',
  classNames: (props: TopAppAppBarPropsT) => [
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
export const TopAppBarRow = simpleTag({
  displayName: 'TopAppBarRow',
  classNames: 'mdc-top-app-bar__row'
});

type TopAppBarSectionPropsT = {
  /** Aligns the section to the start. */
  alignStart?: boolean,
  /** Aligns the section to the end. */
  alignEnd?: boolean
};

/** A section for the app bar. */
export class TopAppBarSection extends simpleTag({
  tag: 'section',
  classNames: (props: TopAppBarSectionPropsT) => [
    'mdc-top-app-bar__section',
    {
      'mdc-top-app-bar__section--align-Start': props.alignStart,
      'mdc-top-app-bar__section--align-end': props.alignEnd
    }
  ],
  consumeProps: ['alignStart', 'alignEnd']
})<TopAppBarSectionPropsT> {
  static displayName = 'TopAppBarSection';

  render() {
    return super.render();
  }
}

/** A navigation icon for the top app bar. This is an instance of the Icon component. */
export const TopAppBarNavigationIcon = simpleTag({
  displayName: 'TopAppBarNavigationIcon',
  classNames: 'mdc-top-app-bar__navigation-icon',
  tag: Icon
});

/** Action items for the top app bar. This is an instance of the Icon component.*/
export const TopAppBarActionItem = simpleTag({
  displayName: 'TopAppBarActionItem',
  classNames: 'mdc-top-app-bar__action-item',
  tag: Icon
});

/** A title for the top app bar. */
export const TopAppBarTitle = simpleTag({
  displayName: 'TopAppBarTitle',
  classNames: 'mdc-top-app-bar__title'
});

/** An optional component to fill the space when the TopAppBar is fixed. Place it directly after the TopAppBar. */
export const TopAppBarFixedAdjust = simpleTag({
  displayName: 'TopAppBarFixedAdjust',
  classNames: 'mdc-top-app-bar--fixed-adjust'
});

/** A TopAppBar component */
export class TopAppBar extends withFoundation({
  constructor: MDCTopAppBar,
  adapter: {}
})<TopAppAppBarPropsT> {
  static displayName = 'TopAppBar';

  render() {
    const { onNav, apiRef, ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return <TopAppBarRoot {...rest} elementRef={root_} />;
  }
}

export type SimpleTopAppBarPropsT = {
  /** The title for the App Bar. */
  title?: React.Node,
  /** An array of props that will be used to create TopAppBarActionItems. */
  actionItems?: Object[],
  /** Props for the NavigationIcon, which is an instance of the Icon component. You can also set this to `true` and use the `onNav` prop to handle interactions.*/
  navigationIcon?: Object | boolean,
  /** Additional content to place in the start section. */
  startContent?: React.Node,
  /** Additional content to place in the end section. */
  endContent?: React.Node
} & TopAppAppBarPropsT;

/** A simplified syntax for creating an AppBar. */
export class SimpleTopAppBar extends React.Component<SimpleTopAppBarPropsT> {
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
                use="menu"
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
