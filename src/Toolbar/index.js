// @flow
import * as React from 'react';
import { MDCToolbar } from '@material/toolbar/dist/mdc.toolbar';
import { Icon } from '../Icon';
import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

export const ToolbarRoot = simpleTag({
  tag: 'header',
  classNames: props => [
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
  displayName: 'ToolbarSection',
  tag: 'section',
  classNames: props => [
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

export const Toolbar = withMDC({
  mdcConstructor: MDCToolbar,
  mdcElementRef: true,
  onMount(props, api, inst) {
    const el = inst.mdcGetRootElement();
    if (
      api &&
      el &&
      el.nextSibling &&
      (el.nextSibling.getAttribute('class') || '').includes(
        'mdc-toolbar-fixed-adjust'
      )
    ) {
      api.fixedAdjustElement = el.nextSibling;
    }
  },
  onUpdate(props, nextProps, api, inst) {
    // MDC cant change these gracefully
    // if our props change, we have to reinit the component
    const didChange = [
      'fixedLastrowOnly',
      'flexible',
      'flexibleDefaultBehavior'
    ].some(key => {
      if (props && nextProps) {
        return props[key] !== nextProps[key];
      }

      return false;
    });

    if (didChange && api) {
      // clean up flexible classes
      const root = api.root_;
      if (root) {
        root.classList.remove('mdc-toolbar--flexible-space-maximized');
        root.classList.remove('mdc-toolbar--flexible-space-minimized');
      }

      // reset first row height
      const firstRow = api.firstRowElement_;
      firstRow && firstRow.style.removeProperty('height');

      // reset the titles style
      const title = api.titleElement_;
      title && title.style.removeProperty('font-size');

      // reset fixedAdjustElement
      api.fixedAdjustElement &&
        api.fixedAdjustElement.style.removeProperty('height');

      // delay re-init for a frame otherwise MDC doesn't
      // catch the class and style changes
      window.requestAnimationFrame(() => {
        inst.mdcComponentReinit();
      });
    }
  }
})(
  class extends React.Component<ToolbarPropsT> {
    static displayName = 'Toolbar';

    render() {
      //$FlowFixMe
      const { mdcElementRef, ...rest } = this.props;
      return <ToolbarRoot elementRef={mdcElementRef} {...rest} />;
    }
  }
);
