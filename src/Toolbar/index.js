// @flow
import * as React from 'react';
import { MDCToolbar } from '@material/toolbar/dist/mdc.toolbar';

import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type ToolbarRootPropsT = {
  /* Makes the toolbar fixed */
  fixed?: boolean,
  /* Adds a waterfall effect on scroll */
  waterfall?: boolean,
  /* Fixes the last row of a multi-row toolbar */
  fixedLastrowOnly?: boolean,
  /* makes the toolbar flexible */
  flexible?: boolean
} & SimpleTagPropsT;

export const ToolbarRoot: React.ComponentType<ToolbarRootPropsT> = simpleTag({
  displayName: 'Toolbar',
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
  /* Aligns the ToolbarSection at the start. */
  alignStart?: boolean,
  /* Aligns the ToolbarSection at the end. */
  alignEnd?: boolean,
  /* Makes the ToolbarSection shrink to fit. */
  shrinkToFit?: boolean
} & SimpleTagPropsT;

export const ToolbarSection: React.ComponentType<
  ToolbarSectionPropsT
> = simpleTag({
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
});

export const ToolbarRow = simpleTag({
  displayName: 'ToolbarRow',
  classNames: 'mdc-toolbar__row'
});

export const ToolbarFixedAdjust = simpleTag({
  displayName: 'ToolbarFixedAdjust',
  classNames: 'mdc-toolbar-fixed-adjust'
});

export const Toolbar = withMDC({
  mdcConstructor: MDCToolbar,
  mdcElementRef: true,
  onUpdate(props, nextProps, api, inst) {
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
})(({ mdcElementRef, ...rest }) => (
  <ToolbarRoot elementRef={mdcElementRef} {...rest} />
));

export default Toolbar;
