import React, { useState } from 'react';
import { Checkbox } from '@rmwc/checkbox';
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
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@rmwc/switch';
import { Select } from '@rmwc/select';

export default {
  title: 'Data Table',
  component: DataTable
} as Meta;

type Story = StoryObj<typeof DataTable>;

export const FormControllsDataTableStory: Story = {
  render: (args) => {
    const Component = () => {
      const [checked, setChecked] = useState<{ [index: number]: boolean }>({});
      const sampleRows = new Array(5).fill(undefined);

      return (
        <DataTable {...args}>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell hasFormControl>
                  <Checkbox />
                </DataTableHeadCell>
                <DataTableHeadCell>Label</DataTableHeadCell>
                <DataTableHeadCell>Header</DataTableHeadCell>
                <DataTableHeadCell>Header</DataTableHeadCell>
                <DataTableHeadCell>Toggle</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {sampleRows.map((v, i) => (
                <DataTableRow key={i} selected={checked[i]}>
                  <DataTableCell hasFormControl>
                    <Checkbox
                      checked={checked[i]}
                      onChange={(evt) => {
                        checked[i] = evt.currentTarget.checked;
                        setChecked({ ...checked });
                      }}
                    />
                  </DataTableCell>
                  <DataTableCell>Label</DataTableCell>
                  <DataTableCell>
                    <Select
                      placeholder="--Select--"
                      options={['Cookies', 'Pizza', 'Icecream']}
                    />
                  </DataTableCell>
                  <DataTableCell>R{i} C3</DataTableCell>
                  <DataTableCell>
                    <Switch />
                  </DataTableCell>
                </DataTableRow>
              ))}
            </DataTableBody>
          </DataTableContent>
        </DataTable>
      );
    };
    return <Component />;
  }
};

export const ControlledSortedDataTable: Story = {
  render: (args) => {
    const Component = () => {
      const [sortDir, setSortDir] = React.useState<null | number>(null);
      return (
        <DataTable>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Item</DataTableHeadCell>
                <DataTableHeadCell
                  alignEnd
                  sort={sortDir}
                  onClick={() => {
                    if (sortDir === 1) {
                      setSortDir(-1);
                    }
                    if (sortDir === -1) {
                      setSortDir(null);
                    }
                    if (sortDir === null) {
                      setSortDir(1);
                    }
                  }}
                >
                  Quantity (Click Me)
                </DataTableHeadCell>
                <DataTableHeadCell alignEnd>Unit price</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              <DataTableRow>
                <DataTableCell>Cookies</DataTableCell>
                <DataTableCell alignEnd>25</DataTableCell>
                <DataTableCell alignEnd>$2.90</DataTableCell>
              </DataTableRow>
              <DataTableRow selected>
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
      );
    };
    return <Component />;
  }
};

export const SimpleTableStory: Story = {
  render: (args) => (
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
  )
};

export const SimplifiedUsageStory: Story = {
  render: (args) => (
    <SimpleDataTable
      getRowProps={(row) => {
        return row[1] > 100 ? { activated: true } : {};
      }}
      getCellProps={(cell, index, isHead) => {
        const props = { isNumeric: index > 0, style: undefined };

        return !isHead && index === 2 && !cell.includes('$')
          ? { ...props, style: { color: 'red' } }
          : props;
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
  )
};
