// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import { MDCTopAppBar } from '@material/top-app-bar/dist/mdc.topAppBar';

import { Icon } from '../Icon';
import { simpleTag } from '../Base';
import { withFoundation } from '../Base/MDCFoundation';

export const TopAppBarRoot = simpleTag({
  displayName: 'TopAppBarRoot',
  tag: 'header',
  classNames: props => [
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
  classNames: props => [
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

/** A navigation icon fro the top app bar. This is an instance of the Icon component. */
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

type TopAppAppBarPropsT = {
  /** Emits when the navigation icon is clicked. */
  onNav?: (evt: Event) => mixed,
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

/** A TopAppBar component */
export class TopAppBar extends withFoundation({
  constructor: MDCTopAppBar,
  adapter: {}
})<TopAppAppBarPropsT, {}> {
  static displayName = 'TopAppBar';

  render() {
    const { onNav, ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return (
      <TopAppBarRoot {...rest} elementRef={root_} className={this.classes} />
    );
  }
}
