import RMWC from '@rmwc/types';
import * as React from 'react';
import { componentFactory } from '@rmwc/base';

export interface GridProps {
  /** Specifies the grid should have fixed column width. */
  fixedColumnWidth?: boolean;
  /** Specifies the alignment of the whole grid. */
  align?: 'left' | 'right';
  /** Children for the Grid */
  children?: React.ReactNode;
}

const GridRoot = componentFactory<GridProps>({
  displayName: 'GridRoot',
  classNames: (props: GridProps) => [
    'mdc-layout-grid',
    {
      [`mdc-layout-grid__cell--align-${props.align || ''}`]:
        props.align !== undefined,
      'mdc-layout-grid--fixed-column-width': props.fixedColumnWidth
    }
  ],
  consumeProps: ['fixedColumnWidth', 'align']
});

/** A Grid component */
export const Grid: React.ComponentType<GridProps & RMWC.ComponentProps> = ({
  children,
  ...rest
}: GridProps) => {
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

export interface GridCellProps {
  /** Default number of columns to span. */
  span?: number;
  /** Number of columns to span on a phone. */
  phone?: number;
  /** Number of columns to span on a tablet. */
  tablet?: number;
  /** Number of columns to span on a desktop. */
  desktop?: number;
  /** Specifies the order of the cell. */
  order?: number;
  /** Specifies the alignment of cell */
  align?: 'top' | 'middle' | 'bottom';
}

/** A Grid cell */
export const GridCell = componentFactory<GridCellProps>({
  displayName: 'GridCell',
  classNames: (props: GridCellProps) => [
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
});

/** By default, an inner grid component is included inside of <Grid>. Use GridInner when doing nested Grids. */
export const GridInner = componentFactory<{}>({
  displayName: 'GridInner',
  classNames: ['mdc-layout-grid__inner']
});
