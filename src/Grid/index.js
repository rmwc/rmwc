// @flow
import * as React from 'react';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

type GridCellPropsT = {
  /* A generic span value for all screen sizes. */
  span: string | number,
  /* A span value for phone screen sizes. */
  phone: string | number,
  /* A span value for tablet screen sizes. */
  tablet: string | number,
  /* A span value for desktop screen sizes. */
  desktop: string | number
} & SimpleTagPropsT;

export const GridCell: React.ComponentType<GridCellPropsT> = simpleTag({
  displayName: 'GridCell',
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
  defaultProps: {
    span: undefined,
    phone: undefined,
    tablet: undefined,
    desktop: undefined
  },
  consumeProps: ['span', 'phone', 'tablet', 'desktop']
});

export const GridRoot = simpleTag({
  displayName: 'GridRoot',
  classNames: 'mdc-layout-grid'
});

export const GridInner = simpleTag({
  displayName: 'GridInner',
  classNames: 'mdc-layout-grid__inner'
});

export const Grid = ({ children, ...rest }: SimpleTagPropsT) => (
  <GridRoot {...rest}>
    <GridInner>{children}</GridInner>
  </GridRoot>
);
