// @flow
import * as React from 'react';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

/****************************************************************
 * Private
 ****************************************************************/
export const GridRoot = simpleTag({
  displayName: 'GridRoot',
  classNames: 'mdc-layout-grid'
});

/****************************************************************
 * Public
 ****************************************************************/
type GridCellPropsT = {
  /** A generic span value for all screen sizes. */
  span?: string | number,
  /** A span value for phone screen sizes. */
  phone?: string | number,
  /** A span value for tablet screen sizes. */
  tablet?: string | number,
  /** A span value for desktop screen sizes. */
  desktop?: string | number
} & SimpleTagPropsT;

export class GridCell extends simpleTag({
  displayName: 'GridCell',
  defaultProps: {
    span: undefined,
    phone: undefined,
    tablet: undefined,
    desktop: undefined
  },
  classNames: props => [
    'mdc-layout-grid__cell',
    {
      [`mdc-layout-grid__cell--span-${props.span}`]: props.span !== undefined,
      [`mdc-layout-grid__cell--span-${props.phone}-phone`]:
        props.phone !== undefined,
      [`mdc-layout-grid__cell--span-${props.tablet}-tablet`]:
        props.tablet !== undefined,
      [`mdc-layout-grid__cell--span-${props.desktop}-desktop`]:
        props.desktop !== undefined
    }
  ],
  consumeProps: ['span', 'phone', 'tablet', 'desktop']
})<GridCellPropsT> {
  render() {
    return super.render();
  }
}
export const GridInner = simpleTag({
  displayName: 'GridInner',
  classNames: 'mdc-layout-grid__inner'
});

export const Grid = ({ children, ...rest }: SimpleTagPropsT) => (
  <GridRoot {...rest}>
    <GridInner>{children}</GridInner>
  </GridRoot>
);
