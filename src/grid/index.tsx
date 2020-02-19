import * as RMWC from '@rmwc/types';
import * as React from 'react';
import {
  getDisplayName,
  Tag,
  useClassNames,
  createComponent
} from '@rmwc/base';

/** A Grid component */
export interface GridProps {
  /** Specifies the grid should have fixed column width. */
  fixedColumnWidth?: boolean;
  /** Specifies the alignment of the whole grid. */
  align?: 'left' | 'right';
  /** Children for the Grid */
  children?: React.ReactNode;
}

/** A Grid component */
export const Grid = createComponent<GridProps>(function Grid(props, ref) {
  const { children, fixedColumnWidth, align, ...rest } = props;
  const needsInnerGrid = !(getDisplayName(children) === 'GridInner');
  const className = useClassNames(props, [
    'mdc-layout-grid',
    {
      [`mdc-layout-grid--align-${align || ''}`]: props.align !== undefined,
      'mdc-layout-grid--fixed-column-width': fixedColumnWidth
    }
  ]);

  return (
    <Tag {...rest} className={className} ref={ref}>
      {!!needsInnerGrid ? <GridInner>{children}</GridInner> : children}
    </Tag>
  );
});

/** A Grid cell */
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
export const GridCell = createComponent<GridCellProps>(function GridCell(
  props,
  ref
) {
  const { span, phone, tablet, desktop, order, align, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-layout-grid__cell',
    {
      [`mdc-layout-grid__cell--order-${order || ''}`]: order !== undefined,
      [`mdc-layout-grid__cell--align-${align || ''}`]: align !== undefined,
      [`mdc-layout-grid__cell--span-${span || ''}`]: span !== undefined,
      [`mdc-layout-grid__cell--span-${phone || ''}-phone`]: phone !== undefined,
      [`mdc-layout-grid__cell--span-${tablet || ''}-tablet`]:
        tablet !== undefined,
      [`mdc-layout-grid__cell--span-${desktop || ''}-desktop`]:
        props.desktop !== undefined
    }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});

/** By default, an inner grid component is included inside of <Grid>. Use GridInner when doing nested Grids. */
export interface GridInnerProps {}

/** By default, an inner grid component is included inside of <Grid>. Use GridInner when doing nested Grids. */
export const GridInner = createComponent<GridInnerProps>(function GridInner(
  props,
  ref
) {
  const className = useClassNames(props, ['mdc-layout-grid__inner']);
  return <Tag ref={ref} {...props} className={className} />;
});
