// @flow
import type { SimpleTagPropsT } from '@rmwc/base';

import * as React from 'react';
import { simpleTag } from '@rmwc/base';
import { Icon } from '@rmwc/icon';

type SharedDataTableCellPropsT = {
  /** Align content to the start of the cell. */
  alignStart?: boolean,
  /** Align content to the middle of the cell. */
  alignMiddle?: boolean,
  /** Align content to the end of the cell. */
  alignEnd?: boolean
} & SimpleTagPropsT;

export type DataTablePropsT = {
  /** The number of rows to affix to the top of the table when scrolling. */
  stickyRows?: 0 | 1,
  /** The number of columns to affix to the side of the table when scrolling. */
  stickyColumns?: 0 | 1
} & SimpleTagPropsT;

const DataTableRoot: React.ComponentType<DataTablePropsT> = simpleTag({
  displayName: 'DataTableRoot',
  tag: 'div',
  classNames: (props: DataTablePropsT) => [
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

/** The DataTable Component. */
export const DataTable: React.ComponentType<DataTablePropsT> = (
  props: DataTablePropsT
) => <DataTableRoot {...props} />;

DataTable.displayName = 'DataTable';

export const DataTableContent = simpleTag({
  displayName: 'DataTableContent',
  tag: 'table',
  classNames: 'rmwc-data-table__content'
});

/** A header for the data table. */
export const DataTableHead = simpleTag({
  displayName: 'DataTableHead',
  tag: 'thead',
  classNames: 'rmwc-data-table__head'
});

/** A body for the data table. */
export const DataTableBody = simpleTag({
  displayName: 'DataTableBody',
  tag: 'tbody',
  classNames: 'rmwc-data-table__body'
});

export type DataTableRowPropsT = {
  /** Styles the row in a selected state. */
  selected?: boolean,
  /** Styles the row in an activated state. */
  activated?: boolean
} & SimpleTagPropsT;

/** A row for the data table. */
const DataTableRowRoot = simpleTag({
  displayName: 'DataTableRowRoot',
  tag: 'tr',
  classNames: (props: DataTableRowPropsT) => [
    'rmwc-data-table__row',
    {
      'rmwc-data-table__row--selected': props.selected,
      'rmwc-data-table__row--activated': props.activated
    }
  ],
  consumeProps: ['activated', 'selected']
});

export const DataTableRow: React.ComponentType<DataTableRowPropsT> = (
  props: DataTableRowPropsT
) => <DataTableRowRoot {...props} />;
DataTableRow.displayName = 'DataTableRow';

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

export type DataTableHeadCellPropsT = {
  /** Make the column sortable. Null for not sorted, 1 for ascending, and -1 for descending. */
  sort?: null | 1 | -1,
  /** A callback for when the sorting method changes. */
  onSortChange?: (dir: null | 1 | -1) => mixed
} & SharedDataTableCellPropsT;

const DataTableHeadCellRoot: React.ComponentType<
  DataTableHeadCellPropsT
> = simpleTag({
  displayName: 'DataTableHeadCellRoot',
  tag: 'th',
  classNames: (props: DataTableHeadCellPropsT) => [
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
export const DataTableHeadCell: React.ComponentType<DataTableHeadCellPropsT> = (
  props: DataTableHeadCellPropsT
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

export type DataTableCellPropsT = SharedDataTableCellPropsT;

export const DataTableCellRoot: React.ComponentType<
  DataTableCellPropsT
> = simpleTag({
  displayName: 'DataTableCellRoot',
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

/** A cell for the data table. */
export const DataTableCell: React.ComponentType<DataTableCellPropsT> = (
  props: DataTableCellPropsT
) => <DataTableCellRoot {...props} />;

export type SimpleDataTablePropsT = {
  /** Data to render. */
  data: Array<any[]>,
  /** Table headers to render. */
  headers?: Array<any[]>,
  /** A function that allows you to return custom props for a row. */
  getRowProps?: (row: any[], index: number, isHead: boolean) => Object,
  /** A function that allows you to return custom props for a cell. */
  getCellProps?: (cell: any[], index: number, isHead: boolean) => Object
} & DataTablePropsT;

/** A simple data table to render matrices. */
export class SimpleDataTable extends React.Component<SimpleDataTablePropsT> {
  render() {
    const {
      data,
      headers,
      getRowProps = (row, index, isHead) => ({}),
      getCellProps = (row, index, isHead) => ({}),
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
