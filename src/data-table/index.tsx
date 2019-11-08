import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { Icon } from '@rmwc/icon';
import { useClassNames, useTag } from '@rmwc/base/component';

interface SharedDataTableCellProps {
  /** Align content to the start of the cell. */
  alignStart?: boolean;
  /** Align content to the middle of the cell. */
  alignMiddle?: boolean;
  /** Align content to the end of the cell. */
  alignEnd?: boolean;
}

/** The DataTable Component. */
export interface DataTableProps {
  /** The number of rows to affix to the top of the table when scrolling. */
  stickyRows?: number;
  /** The number of columns to affix to the side of the table when scrolling. */
  stickyColumns?: number;
}

/** The DataTable Component. */
export const DataTable = React.forwardRef<
  any,
  DataTableProps & RMWC.ComponentProps
>(function DataTable(props, ref) {
  const Tag = useTag(props);
  const { stickyColumns, stickyRows, ...rest } = props;
  const className = useClassNames(props, [
    'rmwc-data-table',
    {
      'rmwc-data-table--sticky-columns': !!stickyColumns,
      'rmwc-data-table--sticky-columns-1': !!stickyColumns,
      'rmwc-data-table--sticky-rows': !!stickyRows,
      'rmwc-data-table--sticky-rows-1': !!stickyRows
    }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});
DataTable.displayName = 'DataTable';

/** The data table content. */
export interface DataTableContentProps {}

/** The data table content. */
export const DataTableContent = React.forwardRef<
  any,
  DataTableContentProps & RMWC.ComponentProps
>(function DataTableContent(props, ref) {
  const Tag = useTag(props, 'table');
  const className = useClassNames(props, ['rmwc-data-table__content']);
  return <Tag ref={ref} {...props} className={className} />;
});
DataTableContent.displayName = 'DataTableContent';

/** A header for the data table. */
export interface DataTableHeadProps {}

/** A header for the data table. */
export const DataTableHead = React.forwardRef<
  any,
  DataTableHeadProps & RMWC.ComponentProps
>(function DataTableHead(props, ref) {
  const Tag = useTag(props, 'thead');
  const className = useClassNames(props, ['rmwc-data-table__head']);
  return <Tag ref={ref} {...props} className={className} />;
});
DataTableHead.displayName = 'DataTableHead';

/** A body for the data table. */
export interface DataTableBodyProps {}

/** A body for the data table. */
export const DataTableBody = React.forwardRef<
  any,
  DataTableBodyProps & RMWC.ComponentProps
>(function DataTableBody(props, ref) {
  const Tag = useTag(props, 'tbody');
  const className = useClassNames(props, ['rmwc-data-table__body']);
  return <Tag ref={ref} {...props} className={className} />;
});
DataTableBody.displayName = 'DataTableBody';

/** A row for the data table. */
export interface DataTableRowProps {
  /** Styles the row in a selected state. */
  selected?: boolean;
  /** Styles the row in an activated state. */
  activated?: boolean;
}

/** A row for the data table. */
export const DataTableRow = React.forwardRef<
  any,
  DataTableRowProps & RMWC.ComponentProps
>(function DataTableRow(props, ref) {
  const Tag = useTag(props, 'tr');
  const { activated, selected, ...rest } = props;
  const className = useClassNames(props, [
    'rmwc-data-table__row',
    {
      'rmwc-data-table__row--selected': props.selected,
      'rmwc-data-table__row--activated': props.activated
    }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});
DataTableRow.displayName = 'DataTableRow';

const DataTableSortIcon = React.memo(function DataTableSortIcon() {
  return (
    <Icon
      className="rmwc-data-table__sort-icon"
      icon={
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
          />
        </svg>
      }
    />
  );
});

/** A header cell for the data table. */
export interface DataTableHeadCellProps extends SharedDataTableCellProps {
  /** Make the column sortable. Null for not sorted, 1 for ascending, and -1 for descending. */
  sort?: null | number;
  /** A callback for when the sorting method changes. Null for not sorted, 1 for ascending, and -1 for descending.*/
  onSortChange?: (dir: null | number) => void;
  /** Children to pass to the cell. */
  children?: React.ReactNode;
}

/** A header cell for the data table. */
export const DataTableHeadCell = React.forwardRef<
  any,
  DataTableHeadCellProps & RMWC.ComponentProps
>(function DataTableHeadCell(props, ref) {
  const Tag = useTag(props, 'th');

  const {
    alignStart,
    alignMiddle,
    alignEnd,
    sort,
    onSortChange,
    onClick,
    children,
    ...rest
  } = props;

  const className = useClassNames(props, [
    'rmwc-data-table__cell',
    'rmwc-data-table__head-cell',
    {
      'rmwc-data-table__head-cell--sortable': sort !== undefined,
      'rmwc-data-table__head-cell--sorted': !!sort,
      'rmwc-data-table__head-cell--sorted-ascending': sort === 1,
      'rmwc-data-table__head-cell--sorted-descending': sort === -1,
      'rmwc-data-table__cell--align-start': alignStart,
      'rmwc-data-table__cell--align-middle': alignMiddle,
      'rmwc-data-table__cell--align-end': alignEnd
    }
  ]);

  const onClickProp =
    onSortChange && sort !== undefined
      ? {
          onClick: (evt: any) => {
            onSortChange &&
              onSortChange(sort === null ? 1 : sort === 1 ? -1 : null);

            onClick && onClick(evt);
          }
        }
      : {};

  return (
    <Tag {...rest} {...onClickProp} className={className} ref={ref}>
      {sort !== undefined && <DataTableSortIcon />}
      {children}
    </Tag>
  );
});
DataTableHeadCell.displayName = 'DataTableHeadCell';

/** A cell for the DataTable */
export interface DataTableCellProps extends SharedDataTableCellProps {}

/** A cell for the DataTable */
export const DataTableCell = React.forwardRef<
  any,
  DataTableCellProps & RMWC.ComponentProps
>(function DataTableCell(props, ref) {
  const Tag = useTag(props, 'td');
  const { alignStart, alignMiddle, alignEnd, ...rest } = props;
  const className = useClassNames(props, [
    'rmwc-data-table__cell',
    {
      'rmwc-data-table__cell--align-start': props.alignStart,
      'rmwc-data-table__cell--align-middle': props.alignMiddle,
      'rmwc-data-table__cell--align-end': props.alignEnd
    }
  ]);
  return <Tag ref={ref} {...rest} className={className} />;
});
DataTableCell.displayName = 'DataTableCell';

/** A simple data table to render matrices. */
export interface SimpleDataTableProps extends DataTableProps {
  /** Data to render. */
  data: Array<any[]>;
  /** Table headers to render. */
  headers?: Array<any[]>;
  /** A function that allows you to return custom props for a row. */
  getRowProps?: (row: any[], index: number, isHead: boolean) => Object;
  /** A function that allows you to return custom props for a cell. */
  getCellProps?: (cell: any[], index: number, isHead: boolean) => Object;
}

/** A simple data table to render matrices. */
export function SimpleDataTable(props: SimpleDataTableProps) {
  const {
    data,
    headers,
    getRowProps = (row: Object, index: number, isHead: boolean) => ({}),
    getCellProps = (row: Object, index: number, isHead: boolean) => ({}),
    ...rest
  } = props;

  return (
    <DataTable {...rest}>
      <DataTableContent>
        {!!headers && (
          <DataTableHead>
            {headers.map((row, i) => (
              <DataTableRow key={i} {...getRowProps(row, i, true)}>
                {row.map((cell, j) => (
                  <DataTableHeadCell key={j} {...getCellProps(cell, j, true)}>
                    {cell}
                  </DataTableHeadCell>
                ))}
              </DataTableRow>
            ))}
          </DataTableHead>
        )}
        <DataTableBody>
          {data.map((row, i) => (
            <DataTableRow key={i} {...getRowProps(row, i, false)}>
              {row.map((cell, j) => (
                <DataTableCell key={j} {...getCellProps(cell, j, false)}>
                  {cell}
                </DataTableCell>
              ))}
            </DataTableRow>
          ))}
        </DataTableBody>
      </DataTableContent>
    </DataTable>
  );
}
