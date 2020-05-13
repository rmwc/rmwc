import React from 'react';
import { mount } from 'enzyme';
import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell,
  SimpleDataTable
} from './';

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

  it('can have stickyRows', () => {
    const el = mount(
      <DataTable stickyRows={1}>
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
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    );
    expect(el.html().includes('rmwc-data-table--sticky-rows')).toBe(true);
  });

  it('can have stickyColumns', () => {
    const el = mount(
      <DataTable stickyColumns={1}>
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
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    );
    expect(el.html().includes('rmwc-data-table--sticky-columns')).toBe(true);
  });

  it('can have have activated row', () => {
    const el = mount(
      <DataTable>
        <DataTableContent>
          <DataTableBody>
            <DataTableRow activated>
              <DataTableCell>Cookies</DataTableCell>
              <DataTableCell>25</DataTableCell>
              <DataTableCell>$2.90</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    );
    expect(el.html().includes('rmwc-data-table__row--activated')).toBe(true);
  });

  it('can have have selected row', () => {
    const el = mount(
      <DataTable>
        <DataTableContent>
          <DataTableBody>
            <DataTableRow selected>
              <DataTableCell>Cookies</DataTableCell>
              <DataTableCell>25</DataTableCell>
              <DataTableCell>$2.90</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    );
    expect(el.html().includes('mdc-data-table__row--selected')).toBe(true);
  });

  it('can have have aligned cells', () => {
    const el = mount(
      <DataTable>
        <DataTableContent>
          <DataTableHead>
            <DataTableRow>
              <DataTableHeadCell alignStart>Item</DataTableHeadCell>
              <DataTableHeadCell alignMiddle>
                Quantity (Click Me)
              </DataTableHeadCell>
              <DataTableHeadCell alignEnd>Unit price</DataTableHeadCell>
            </DataTableRow>
          </DataTableHead>
          <DataTableBody>
            <DataTableRow>
              <DataTableCell alignStart>Cookies</DataTableCell>
              <DataTableCell alignMiddle>25</DataTableCell>
              <DataTableCell alignEnd>$2.90</DataTableCell>
            </DataTableRow>
          </DataTableBody>
        </DataTableContent>
      </DataTable>
    );
    expect(el.html().includes('rmwc-data-table__cell--align-start')).toBe(true);
    expect(el.html().includes('rmwc-data-table__cell--align-middle')).toBe(
      true
    );
    expect(el.html().includes('rmwc-data-table__cell--align-end')).toBe(true);
  });

  it('can have have sorted columns', () => {
    let dir: number | null = null;
    const getComp = () =>
      mount(
        <DataTable>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Item</DataTableHeadCell>
                <DataTableHeadCell sort={dir} onSortChange={(d) => (dir = d)}>
                  Quantity (Click Me)
                </DataTableHeadCell>
                <DataTableHeadCell>Unit price</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
          </DataTableContent>
        </DataTable>
      );

    const clickCell = (el: any) => {
      const cell = el.find('.rmwc-data-table__head-cell--sortable').first();
      cell.simulate('click');
    };

    let el = getComp();
    expect(el.html().includes('rmwc-data-table__head-cell--sortable')).toBe(
      true
    );

    clickCell(el);
    expect(dir).toBe(1);

    el = getComp();
    expect(
      el.html().includes('rmwc-data-table__head-cell--sorted-ascending')
    ).toBe(true);

    clickCell(el);
    expect(dir).toBe(-1);

    el = getComp();

    expect(
      el.html().includes('rmwc-data-table__head-cell--sorted-descending')
    ).toBe(true);

    clickCell(el);
    expect(dir).toBe(null);
  });
});

it('Sorted columns can have an onClick', () => {
  let value = 0;

  const el = mount(
    <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>Item</DataTableHeadCell>
            <DataTableHeadCell
              sort={null}
              onClick={(evt) => (value = 1)}
              onSortChange={(d) => {}}
            >
              Quantity (Click Me)
            </DataTableHeadCell>
            <DataTableHeadCell>Unit price</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
      </DataTableContent>
    </DataTable>
  );

  const cell = el.find('.rmwc-data-table__head-cell--sortable').first();
  cell.simulate('click');
  expect(value).toBe(1);
});

it('Sorted columns can be sorted by only providing sort and onClick prop', () => {
  let dir: number | null = null;

  const el = mount(
    <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell>Item</DataTableHeadCell>
            <DataTableHeadCell sort={dir} onClick={() => (dir = 1)}>
              Quantity (Click Me)
            </DataTableHeadCell>
            <DataTableHeadCell>Unit price</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
      </DataTableContent>
    </DataTable>
  );
  const cell = el.find('.rmwc-data-table__head-cell--sortable').first();
  cell.simulate('click');
  expect(dir).toBe(1);
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

  it('renders with options', () => {
    mount(
      <SimpleDataTable
        getRowProps={(row) => {
          return row[1] > 100 ? { activated: true } : {};
        }}
        getCellProps={(cell, index, isHead) => {
          return !isHead && index === 2 && !cell.includes('$')
            ? { style: { color: 'red' } }
            : {};
        }}
        headers={[['Item', 'Quantity', 'Value']]}
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
