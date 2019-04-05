# Data Tables `RMWC Addon`

> Data tables display sets of data.

- Module **@rmwc/data-table**  
- Import styles:
  - import **'@rmwc/data-table/data-table.css'**;

## Standard Table

The DataTable components are intended to be flexible, properly styled, Material compliant HTML tables. Because of the complexities of working with datasets (especially large ones), the DataTable component DOES NOT handle pagination, data fetching, sorting, or performance of long lists.

```jsx render
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';

<DataTable>
  <DataTableContent>
    <DataTableHead>
      <DataTableRow>
        <DataTableHeadCell>Item</DataTableHeadCell>
        <DataTableHeadCell
          alignEnd
          sort={this.state.sortDir || null}
          onSortChange={sortDir => {
            this.setState({sortDir})
            console.log(sortDir)
          }}
        >
          Quantity (Click Me)
        </DataTableHeadCell>
        <DataTableHeadCell
          alignEnd
        >
          Unit price
        </DataTableHeadCell>
      </DataTableRow>
    </DataTableHead>
    <DataTableBody>
      <DataTableRow>
        <DataTableCell>Cookies</DataTableCell>
        <DataTableCell alignEnd>25</DataTableCell>
        <DataTableCell alignEnd>$2.90</DataTableCell>
      </DataTableRow>
      <DataTableRow activated>
        <DataTableCell>Pizza</DataTableCell>
        <DataTableCell alignEnd>50</DataTableCell>
        <DataTableCell alignEnd>$1.25</DataTableCell>
      </DataTableRow>
      <DataTableRow>
        <DataTableCell>Icecream</DataTableCell>
        <DataTableCell alignEnd>10</DataTableCell>
        <DataTableCell alignEnd>$2.35</DataTableCell>
      </DataTableRow>
    </DataTableBody>
  </DataTableContent>
</DataTable>
```

## Scrollable / Sticky Rows and Columns

You can set a fixed sized for your table container to make it scrollable. Additionally, you can specify `stickyRows` or `stickyColumns` to affix rows or columns. Currently, only 1 row / column is supported but more may be supported in a future release.

```jsx render
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';

import { Select } from '@rmwc/select';

<DataTable
  style={{ height: '300px', width: '375px' }}
  stickyRows={this.state.rows !== undefined ? +this.state.rows : 0}
  stickyColumns={this.state.cols !== undefined ? +this.state.cols : 0}
>
  <DataTableContent>
    <DataTableHead >
      <DataTableRow>
        <DataTableHeadCell>Label</DataTableHeadCell>
        {[...Array(7)].map((v, i) => (
          <DataTableHeadCell key={i}>Header</DataTableHeadCell>
        ))}
      </DataTableRow>
    </DataTableHead>
    <DataTableBody>
      {[...Array(50)].map((v, i) => (
        <DataTableRow key={i}>
          <DataTableCell>Label</DataTableCell>
          <DataTableCell>Row {i} Cell 1</DataTableCell>
          <DataTableCell>Row {i} Cell 2</DataTableCell>
          <DataTableCell>Row {i} Cell 3</DataTableCell>
          <DataTableCell>Row {i} Cell 4</DataTableCell>
          <DataTableCell>Row {i} Cell 5</DataTableCell>
          <DataTableCell>Row {i} Cell 6</DataTableCell>
          <DataTableCell>Row {i} Cell 7</DataTableCell>
        </DataTableRow>
      ))}
    </DataTableBody>
  </DataTableContent>
</DataTable>

<div>
  Sticky
  <Select
    label="Rows"
    options={['0','1']}
    value={this.state.rows || '0'}
    onChange={evt => this.setState({rows: evt.target.value})}
  />

  <Select
    label="Cols"
    options={['0','1']}
    value={this.state.cols || '0'}
    onChange={evt => this.setState({cols: evt.target.value})}
  />
</div>

```

## Form Controls

DataTables play nice with the rest of the RMWC form controls. You are responsible for scripting your own selection behavior.

```jsx render
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';

import { Select } from '@rmwc/select';
import { Checkbox } from '@rmwc/checkbox';
import { Switch } from '@rmwc/switch';

<DataTable>
  <DataTableContent>
    <DataTableHead >
      <DataTableRow>
        <DataTableHeadCell>
          <Checkbox/>Label
        </DataTableHeadCell>
        <DataTableHeadCell>Header</DataTableHeadCell>
        <DataTableHeadCell>Header</DataTableHeadCell>
        <DataTableHeadCell>Header</DataTableHeadCell>
        <DataTableHeadCell>Toggle</DataTableHeadCell>
      </DataTableRow>
    </DataTableHead>
    <DataTableBody>
      {[...Array(5)].map((v, i) => (
        <DataTableRow
          key={i}
          selected={this.state.checked && this.state.checked[i]}>
          <DataTableCell>
            <Checkbox
              checked={this.state.checked && this.state.checked[i]}
              onChange={evt => {
                const checked = this.state.checked || {};
                checked[i] = evt.target.checked;
                this.setState({checked})
              }}
            />Label
          </DataTableCell>
          <DataTableCell>
            <Select placeholder="--Select--" options={['Cookies', 'Pizza', 'Icecream']}/>
          </DataTableCell>
          <DataTableCell>Row {i} Cell 2</DataTableCell>
          <DataTableCell>Row {i} Cell 3</DataTableCell>
          <DataTableCell><Switch /></DataTableCell>
        </DataTableRow>
      ))}
    </DataTableBody>
  </DataTableContent>
</DataTable>
```

## Simplified Usage

If you just need to throw a table on the screen, you can pass an array of data to SimpleDataTable.

```jsx render
import { SimpleDataTable } from '@rmwc/data-table';

<SimpleDataTable
  getRowProps={row => {
    return row[1] > 100
      ? {activated: true}
      : {}
  }}
  getCellProps={(cell, index, isHead) => {
    return !isHead
      && index === 2
      && !cell.includes('$')
        ? {style: {color: 'red'}}
        : {}
  }}
  headers={[['Item', 'Quantity', 'Value']]}
  data={
    [
      ['Cookies', 25, '$12.40'],
      ['Pizza', 11, '$10.43'],
      ['Icecream', 3, '1.43'],
      ['Candy', 72, '$22.45'],
      ['Cakes', 101, '$215.05'],
      ['Muffins', 3, '$5.97']
    ]
  }
/>
```


```jsx renderOnly
import { DocProps } from '../doc-utils';
import * as docs from './generated-props.json';

<DocProps src={docs} components={[
 'DataTable',  
 'DataTableRow',  
 'DataTableCell',  
 'DataTableHead',  
 'DataTableBody',  
 'DataTableHeadCell',  
 'SimpleDataTable'
]}/>
```
