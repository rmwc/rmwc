// @flow
import * as React from 'react';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export type GridPropsT = {
  /** Specifies the grid should have fixed column width. */
  fixedColumnWidth?: boolean,
  /** Specifies the alignment of the whole grid. */
  align?: 'left' | 'right'
} & SimpleTagPropsT;

export const GridRoot = simpleTag({
  displayName: 'GridRoot',
  classNames: (props: GridPropsT) => [
    'mdc-layout-grid',
    {
      [`mdc-layout-grid__cell--align-${props.align || ''}`]:
        props.align !== undefined,
      'mdc-layout-grid--fixed-column-width': props.fixedColumnWidth
    }
  ],
  consumeProps: ['fixedColumnWidth', 'align']
});

export type GridCellPropsT = {
  /** Default number of columns to span. */
  span?: string | number,
  /** Number of columns to span on a phone. */
  phone?: string | number,
  /** Number of columns to span on a tablet. */
  tablet?: string | number,
  /** Number of columns to span on a desktop. */
  desktop?: string | number,
  /** Specifies the order of the cell. */
  order?: string | number,
  /** Specifies the alignment of cell */
  align?: 'top' | 'middle' | 'bottom'
} & SimpleTagPropsT;

/** A Grid cell */
export class GridCell extends simpleTag({
  displayName: 'GridCell',
  defaultProps: {
    span: undefined,
    phone: undefined,
    tablet: undefined,
    desktop: undefined,
    order: undefined
  },
  classNames: (props: GridCellPropsT) => [
    'mdc-layout-grid__cell',
    {
      [`mdc-layout-grid__cell--order-${props.order || ''}`]:
        props.order !== undefined,
      [`mdc-layout-grid__cell--align-${props.align || ''}`]:
        props.align !== undefined,
      [`mdc-layout-grid__cell--span-${props.span || ''}`]:
        props.span !== undefined,
      [`mdc-layout-grid__cell--span-${props.phone || ''}-phone`]:
        props.phone !== undefined,
      [`mdc-layout-grid__cell--span-${props.tablet || ''}-tablet`]:
        props.tablet !== undefined,
      [`mdc-layout-grid__cell--span-${props.desktop || ''}-desktop`]:
        props.desktop !== undefined
    }
  ],
  consumeProps: ['span', 'phone', 'tablet', 'desktop', 'order', 'align']
})<GridCellPropsT> {
  render() {
    return super.render();
  }
}

/** By default, an inner grid component is included inside of <Grid>. Use GridInner when doing nested Grids. */
export const GridInner = simpleTag({
  displayName: 'GridInner',
  classNames: 'mdc-layout-grid__inner'
});

/** A Grid component */
export const Grid: React.ComponentType<GridPropsT> = ({
  children,
  ...rest
}: GridPropsT) => {
  const child: any = children;
  const needsInnerGrid = !(
    child &&
    typeof child === 'object' &&
    (child.type || {}).displayName === 'GridInner'
  );
  return (
    <GridRoot {...rest}>
      {!!needsInnerGrid ? <GridInner>{children}</GridInner> : children}
    </GridRoot>
  );
};

Grid.displayName = 'Grid';
