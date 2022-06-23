import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { asFragment } = render(
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

    expect(asFragment()).toMatchSnapshot();
  });

  it('can have stickyRows', () => {
    const { container } = render(
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
    expect(container.firstChild).toHaveClass('rmwc-data-table--sticky-rows');
  });

  it('can have stickyColumns', () => {
    const { container } = render(
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
    expect(container.firstChild).toHaveClass('rmwc-data-table--sticky-columns');
  });

  it('can have have activated row', () => {
    render(
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
    expect(screen.getByRole('row')).toHaveClass(
      'rmwc-data-table__row--activated'
    );
  });

  it('can have have selected row', () => {
    render(
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
    expect(screen.getByRole('row')).toHaveClass(
      'mdc-data-table__row--selected'
    );
  });

  it('can have have aligned cells', () => {
    render(
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
    expect(screen.getByRole('columnheader', { name: 'Item' })).toHaveClass(
      'rmwc-data-table__cell--align-start'
    );
    expect(
      screen.getByRole('columnheader', { name: 'Quantity (Click Me)' })
    ).toHaveClass('rmwc-data-table__cell--align-middle');
    expect(
      screen.getByRole('columnheader', { name: 'Unit price' })
    ).toHaveClass('rmwc-data-table__cell--align-end');
  });

  it('can have sorted columns', () => {
    const Comp = (dir: number | null) => (
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
    const { rerender } = render(Comp(null));

    expect(
      screen.getByRole('columnheader', { name: 'Quantity (Click Me)' })
    ).toHaveClass('rmwc-data-table__head-cell--sortable');

    userEvent.click(screen.getByText('Quantity (Click Me)'));
    rerender(Comp(1));
    expect(
      screen.getByRole('columnheader', { name: 'Quantity (Click Me)' })
    ).toHaveClass('rmwc-data-table__head-cell--sorted-ascending');

    userEvent.click(screen.getByText('Quantity (Click Me)'));
    rerender(Comp(-1));
    expect(
      screen.getByRole('columnheader', { name: 'Quantity (Click Me)' })
    ).toHaveClass('rmwc-data-table__head-cell--sorted-descending');
  });
});

it('Sorted columns can have an onClick', async () => {
  let value = 0;

  render(
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

  userEvent.click(screen.getByText('Quantity (Click Me)'));

  await waitFor(() => expect(value).toBe(1));
});

it('Sorted columns can be sorted by only providing sort and onClick prop', async () => {
  let dir: number | null = null;

  render(
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
  userEvent.click(screen.getByText('Quantity (Click Me)'));
  await waitFor(() => expect(dir).toBe(1));
});

describe('SimpleDataTable', () => {
  it('renders', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with options', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
  });
});
