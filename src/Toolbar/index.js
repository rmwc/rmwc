// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import { MDCToolbar } from '@material/toolbar/dist/mdc.toolbar';
import { Icon } from '../Icon';
import { simpleTag } from '../Base';
import { withFoundation } from '../Base/withFoundation';

export type ToolbarPropsT = {
  /** Makes the toolbar fixed */
  fixed?: boolean,
  /** Adds a waterfall effect on scroll */
  waterfall?: boolean,
  /** Fixes the last row of a multi-row toolbar */
  fixedLastrowOnly?: boolean,
  /** makes the toolbar flexible */
  flexible?: boolean,
  /** further defines the background and title movement behavior, use in conjunction with flexible. */
  flexibleDefaultBehavior?: boolean
} & SimpleTagPropsT;

export const ToolbarRoot = simpleTag({
  tag: 'header',
  classNames: (props: ToolbarPropsT) => [
    'mdc-toolbar',
    {
      'mdc-toolbar--fixed': props.fixed,
      'mdc-toolbar--waterfall': props.waterfall,
      'mdc-toolbar--fixed-lastrow-only': props.fixedLastrowOnly,
      'mdc-toolbar--flexible': props.flexible,
      'mdc-toolbar--flexible-default-behavior': props.flexibleDefaultBehavior
    }
  ],
  defaultProps: {
    fixed: false,
    waterfall: false,
    fixedLastrowOnly: false,
    flexible: false,
    flexibleDefaultBehavior: false
  },
  consumeProps: [
    'fixed',
    'waterfall',
    'fixedLastrowOnly',
    'flexible',
    'flexibleDefaultBehavior'
  ]
});

/** A Toolbar title  */
export const ToolbarTitle = simpleTag({
  displayName: 'ToolbarTitle',
  classNames: 'mdc-toolbar__title'
});

type ToolbarSectionPropsT = {
  /** Aligns the ToolbarSection at the start. */
  alignStart?: boolean,
  /** Aligns the ToolbarSection at the end. */
  alignEnd?: boolean,
  /** Makes the ToolbarSection shrink to fit. */
  shrinkToFit?: boolean
} & SimpleTagPropsT;

export class ToolbarSection extends simpleTag({
  tag: 'section',
  classNames: (props: ToolbarSectionPropsT) => [
    'mdc-toolbar__section',
    {
      'mdc-toolbar__section--align-start': props.alignStart,
      'mdc-toolbar__section--align-end': props.alignEnd,
      'mdc-toolbar__section--shrink-to-fit': props.shrinkToFit
    }
  ],
  defaultProps: {
    alignStart: false,
    alignEnd: false,
    shrinkToFit: false
  },
  consumeProps: ['alignStart', 'alignEnd', 'shrinkToFit']
})<ToolbarSectionPropsT> {
  static displayName = 'ToolbarSection';

  render() {
    return super.render();
  }
}

/** A Toolbar row  */
export const ToolbarRow = simpleTag({
  displayName: 'ToolbarRow',
  classNames: 'mdc-toolbar__row'
});

/**
 * This component can be placed after a fixed Toolbar component to fill in the space.
 */
export const ToolbarFixedAdjust = simpleTag({
  displayName: 'ToolbarFixedAdjust',
  classNames: 'mdc-toolbar-fixed-adjust'
});

/**
 * A Menu Icon For the Toolbar. This is an instance of the Icon component.
 */
export const ToolbarMenuIcon = simpleTag({
  displayName: 'ToolbarMenuIcon',
  tag: Icon,
  classNames: 'mdc-toolbar__menu-icon'
});

/**
 * A standard Icon for toolbar actions. This is an instance of the Icon component.
 */
export const ToolbarIcon = simpleTag({
  displayName: 'ToolbarIcon',
  tag: Icon,
  classNames: 'mdc-toolbar__icon'
});

export class Toolbar extends withFoundation({
  constructor: MDCToolbar,
  adapter: {}
})<ToolbarPropsT> {
  static displayName = 'Toolbar';
  fixedAdjustElement: any;
  root_: any;

  componentDidMount() {
    super.componentDidMount();
    if (
      this.root_ &&
      this.root_.nextSibling &&
      (this.root_.nextSibling.getAttribute('class') || '').includes(
        'mdc-toolbar-fixed-adjust'
      )
    ) {
      this.fixedAdjustElement = this.root_.nextSibling;
    }
  }

  render() {
    const { ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return <ToolbarRoot elementRef={root_} {...rest} />;
  }
}
