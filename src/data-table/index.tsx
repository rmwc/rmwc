import * as React from 'react';
import { componentFactory, ComponentProps } from '@rmwc/base';
import { Icon } from '@rmwc/icon';

type SharedDataTableCellPropsT = {
  /** Align content to the start of the cell. */
  alignStart?: boolean;
  /** Align content to the middle of the cell. */
  alignMiddle?: boolean;
  /** Align content to the end of the cell. */
  alignEnd?: boolean;
};

export interface DataTableProps {
  /** The number of rows to affix to the top of the table when scrolling. */
  stickyRows?: 0 | 1;
  /** The number of columns to affix to the side of the table when scrolling. */
  stickyColumns?: 0 | 1;
}

/** The DataTable Component. */
export const DataTable = componentFactory<DataTableProps>({
  displayName: 'DataTable',
  classNames: (props: DataTableProps) => [
    'rmwc-data-table',
    {
      'rmwc-data-table--sticky-columns': !!props.stickyColumns,
      'rmwc-data-table--sticky-columns-1': !!props.stickyColumns,
      'rmwc-data-table--sticky-rows': !!props.stickyRows,
      'rmwc-data-table--sticky-rows-1': !!props.stickyRows
    }
  ],
  consumeProps: ['stickyColumns', 'stickyRows']
});

/** The data table content. */
export const DataTableContent = componentFactory<{}>({
  displayName: 'DataTableContent',
  tag: 'table',
  classNames: ['rmwc-data-table__content']
});

/** A header for the data table. */
export const DataTableHead = componentFactory<{}>({
  displayName: 'DataTableHead',
  tag: 'thead',
  classNames: ['rmwc-data-table__head']
});

/** A body for the data table. */
export const DataTableBody = componentFactory<{}>({
  displayName: 'DataTableBody',
  tag: 'tbody',
  classNames: ['rmwc-data-table__body']
});

export interface DataTableRowProps {
  /** Styles the row in a selected state. */
  selected?: boolean;
  /** Styles the row in an activated state. */
  activated?: boolean;
}

/** A row for the data table. */
export const DataTableRow = componentFactory<{}>({
  displayName: 'DataTableRow',
  tag: 'tr',
  classNames: (props: DataTableRowProps) => [
    'rmwc-data-table__row',
    {
      'rmwc-data-table__row--selected': props.selected,
      'rmwc-data-table__row--activated': props.activated
    }
  ],
  consumeProps: ['activated', 'selected']
});

const DataTableSortIcon = () => (
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

export interface DataTableHeadCellProps extends SharedDataTableCellPropsT {
  /** Make the column sortable. Null for not sorted, 1 for ascending, and -1 for descending. */
  sort?: null | number;
  /** A callback for when the sorting method changes. Null for not sorted, 1 for ascending, and -1 for descending.*/
  onSortChange?: (dir: null | number) => void;
  /** Children to pass to the cell. */
  children?: React.ReactNode;
}

const DataTableHeadCellRoot = componentFactory<DataTableHeadCellProps>({
  displayName: 'DataTableHeadCellRoot',
  tag: 'th',
  classNames: (props: DataTableHeadCellProps) => [
    'rmwc-data-table__cell',
    'rmwc-data-table__head-cell',
    {
      'rmwc-data-table__head-cell--sortable': props.sort !== undefined,
      'rmwc-data-table__head-cell--sorted': !!props.sort,
      'rmwc-data-table__head-cell--sorted-ascending': props.sort === 1,
      'rmwc-data-table__head-cell--sorted-descending': props.sort === -1,
      'rmwc-data-table__cell--align-start': props.alignStart,
      'rmwc-data-table__cell--align-middle': props.alignMiddle,
      'rmwc-data-table__cell--align-end': props.alignEnd
    }
  ],
  consumeProps: [
    'alignStart',
    'alignMiddle',
    'alignEnd',
    'sort',
    'onSortChange'
  ]
});

/** A header cell for the data table. */
export const DataTableHeadCell = (
  props: DataTableHeadCellProps & ComponentProps
) => {
  const onClickProp =
    props.onSortChange && props.sort !== undefined
      ? {
          onClick: (evt: any) => {
            props.onSortChange &&
              props.onSortChange(
                props.sort === null ? 1 : props.sort === 1 ? -1 : null
              );

            props.onClick && props.onClick(evt);
          }
        }
      : {};

  return (
    <DataTableHeadCellRoot {...props} {...onClickProp}>
      {props.sort !== undefined && <DataTableSortIcon />}
      {props.children}
    </DataTableHeadCellRoot>
  );
};

DataTableHeadCell.displayName = 'DataTableHeadCell';

export interface DataTableCellPropsT extends SharedDataTableCellPropsT {}

/** A cell for the DataTable */
export const DataTableCell = componentFactory<DataTableCellPropsT>({
  displayName: 'DataTableCell',
  tag: 'td',
  classNames: (props: DataTableCellPropsT) => [
    'rmwc-data-table__cell',
    {
      'rmwc-data-table__cell--align-start': props.alignStart,
      'rmwc-data-table__cell--align-middle': props.alignMiddle,
      'rmwc-data-table__cell--align-end': props.alignEnd
    }
  ],
  consumeProps: ['alignStart', 'alignMiddle', 'alignEnd']
});

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
export class SimpleDataTable extends React.Component<SimpleDataTableProps> {
  render() {
    const {
      data,
      headers,
      getRowProps = (row: Object, index: number, isHead: boolean) => ({}),
      getCellProps = (row: Object, index: number, isHead: boolean) => ({}),
      ...rest
    } = this.props;

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
}
