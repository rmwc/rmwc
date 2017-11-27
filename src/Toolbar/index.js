// @flow
import * as React from 'react';
import { MDCToolbar } from '@material/toolbar/dist/mdc.toolbar';
import { Icon } from '../Icon';
import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type ToolbarRootPropsT = {
 /** Makes the toolbar fixed */
 fixed?: boolean,
 /** Adds a waterfall effect on scroll */
 waterfall?: boolean,
 /** Fixes the last row of a multi-row toolbar */
 fixedLastrowOnly?: boolean,
 /** makes the toolbar flexible */
 flexible?: boolean
} & SimpleTagPropsT;

export const ToolbarRoot: React.ComponentType<ToolbarRootPropsT> = simpleTag({
  tag: 'header',
  classNames: props => [
    'mdc-toolbar',
    {
      'mdc-toolbar--fixed': props.fixed,
      'mdc-toolbar--waterfall': props.waterfall,
      'mdc-toolbar--fixed-lastrow-only': props.fixedLastrowOnly,
      'mdc-toolbar--flexible': props.flexible
    }
  ],
  defaultProps: {
    fixed: false,
    waterfall: false,
    fixedLastrowOnly: false,
    flexible: false
  },
  consumeProps: ['fixed', 'waterfall', 'fixedLastrowOnly', 'flexible']
});

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
 * A Menu Icon For the Toolbar
 */
type ToolbarMenuIconPropsT = {
 /** The icon to use */
 use: React.Node
};

export const ToolbarMenuIcon = (props: ToolbarMenuIconPropsT) => (
  <Icon {...props} className={(props.className, 'mdc-toolbar__menu-icon')} />
);

/**
 * A standard Icon for toolbar actions
 */
type ToolbarIconPropsT = {
 /** The icon to use */
 use: React.Node
};

export const ToolbarIcon = (props: ToolbarIconPropsT) => (
  <Icon {...props} className={(props.className, 'mdc-toolbar__icon')} />
);

export const Toolbar = withMDC({
  mdcConstructor: MDCToolbar,
  mdcElementRef: true,
  onUpdate(props, nextProps, api, inst) {
    var toolbarquery = MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
    toolbarquery.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');
    const didChange = ['fixedLastrowOnly', 'flexible'].some(key => {
      if (api && props) {
        api[key] !== props[key];
      }
    });
    if (didChange) {
      const firstRow = inst
        .mdcGetRootElement()
        .querySelector('.mdc-toolbar__row');
      firstRow && firstRow.removeAttribute('style');
      inst.mdcComponentReinit();
    }
  }
})(
  class extends React.Component<ToolbarRootPropsT> {
  static displayName = 'Toolbar';

  render() {
    const { mdcElementRef, ...rest } = this.props;
    return <ToolbarRoot elementRef={mdcElementRef} {...rest} />;
  }
  }
);

export default Toolbar;
