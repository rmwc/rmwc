// @vitest-environment node

import React from 'react';
import { renderToString as mount } from 'react-dom/server';

import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableContent,
  DataTableHead,
  DataTableHeadCell,
  DataTableRow,
  SimpleDataTable
} from './data-table';

describe('DataTable', () => {
  it('renders', () => {
    mount(
      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell>Item</DataTableHeadCell>
              <DataTableHeadCell>Quantity (Click Me)</DataTableHeadCell>
              <DataTableHeadCell>Unit price</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell>Cookies</DataTableCell>
              <DataTableCell>25</DataTableCell>
              <DataTableCell>$2.90</DataTableCell>
            </DataTableRow>
            <DataTableRow>
              <DataTableCell>Pizza</DataTableCell>
              <DataTableCell>50</DataTableCell>
              <DataTableCell>$1.25</DataTableCell>
            </DataTableRow>
            <DataTableRow>
              <DataTableCell>Icecream</DataTableCell>
              <DataTableCell>10</DataTableCell>
              <DataTableCell>$2.35</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    );
  });
});

describe('SimpleDataTable', () => {
  it('renders', () => {
    mount(
      <SimpleDataTable
        data={[
          ['Cookies', 25, '$12.40'],
          ['Pizza', 11, '$10.43'],
          ['Icecream', 3, '1.43'],
          ['Candy', 72, '$22.45'],
          ['Cakes', 101, '$215.05'],
          ['Muffins', 3, '$5.97']
        ]}
      />
    );
  });
});
