# Data Tables

> Data tables display sets of data.

-   Module __@rmwc/data-table__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/data-table/styles';__
    -   Or include stylesheets
        -   __'@material/data-table/dist/mdc.data-table.css'__;
        -   __'@rmwc/data-table/data-table.css'__;
        -   __'@rmwc/icon/icon.css'__;

## Standard Table

The DataTable components are intended to be flexible, properly styled, Material compliant HTML tables. Because of the complexities of working with datasets (especially large ones), the DataTable component DOES NOT handle pagination, data fetching, sorting, or performance of long lists.

```js

function Example() {

  const \[sortDir, setSortDir\] \= React.useState(null);

  const items \= \[

    { item: 'Cookies', quantity: 25, price: '$2.90' },

    { item: 'Pizza', quantity: 50, price: '$1.25' },

    { item: 'Icecream', quantity: 10, price: '$2.35' }

  \];

  const sortedItems \=

    sortDir \=== 1

      ? items.sort((a, b) \=> a.quantity \- b.quantity)

      : items.sort((a, b) \=> b.quantity \- a.quantity);

  return (

    <DataTable\>

      <DataTableContent\>

        <DataTableHead\>

          <DataTableRow\>

            <DataTableHeadCell\>Item</DataTableHeadCell\>

            <DataTableHeadCell

              alignEnd

              sort\={sortDir}

              onSortChange\={(sortDir) \=> {

                setSortDir(sortDir);

                console.log(sortDir);

              }}

            \>

              Quantity (Click Me)

            </DataTableHeadCell\>

            <DataTableHeadCell alignEnd\>Unit price</DataTableHeadCell\>

          </DataTableRow\>

        </DataTableHead\>

        <DataTableBody\>

          {sortedItems.map((item) \=> (

            <DataTableRow key\={item.item}\>

              <DataTableCell\>{item.item}</DataTableCell\>

              <DataTableCell alignEnd\>{item.quantity}</DataTableCell\>

              <DataTableCell alignEnd\>{item.price}</DataTableCell\>

            </DataTableRow\>

          ))}

        </DataTableBody\>

      </DataTableContent\>

    </DataTable\>

  );

}


```

## Scrollable / Sticky Rows and Columns

You can set a fixed sized for your table container to make it scrollable. Additionally, you can specify `stickyRows` or `stickyColumns` to affix rows or columns. Currently, only 1 row / column is supported but more may be supported in a future release.

```js

function Example() {

  const \[rows, setRows\] \= React.useState(0);

  const \[cols, setCols\] \= React.useState(0);

  const sampleColumns \= Array(7).fill(undefined);

  const sampleRows \= Array(50).fill(undefined);

  return (

    <\>

      <DataTable

        style\={{ height: '300px', width: '375px' }}

        stickyRows\={rows}

        stickyColumns\={cols}

      \>

        <DataTableContent\>

          <DataTableHead\>

            <DataTableRow\>

              <DataTableHeadCell\>Label</DataTableHeadCell\>

              {sampleColumns.map((v, i) \=> (

                <DataTableHeadCell key\={i}\>Header</DataTableHeadCell\>

              ))}

            </DataTableRow\>

          </DataTableHead\>

          <DataTableBody\>

            {sampleRows.map((v, i) \=> (

              <DataTableRow key\={i}\>

                <DataTableCell\>Label</DataTableCell\>

                <DataTableCell\>R{i} C1</DataTableCell\>

                <DataTableCell\>R{i} C2</DataTableCell\>

                <DataTableCell\>R{i} C3</DataTableCell\>

                <DataTableCell\>R{i} C4</DataTableCell\>

                <DataTableCell\>R{i} C5</DataTableCell\>

                <DataTableCell\>R{i} C6</DataTableCell\>

                <DataTableCell\>R{i} C7</DataTableCell\>

              </DataTableRow\>

            ))}

          </DataTableBody\>

        </DataTableContent\>

      </DataTable\>

      <div className\="doc-controls"\>

        <Select

          label\="Sticky Rows"

          options\={\['0', '1'\]}

          value\={String(rows)}

          onChange\={(evt) \=> setRows(Number(evt.currentTarget.value))}

        />

        <Select

          label\="Sticky Cols"

          options\={\['0', '1'\]}

          value\={String(cols)}

          onChange\={(evt) \=> setCols(Number(evt.currentTarget.value))}

        />

      </div\>

    </\>

  );

}


```

## Form Controls

DataTables play nice with the rest of the RMWC form controls. You are responsible for scripting your own selection behavior.

```js

function Example() {

  const \[checked, setChecked\] \= React.useState({});

  const sampleRows \= new Array(5).fill(undefined);

  return (

    <DataTable\>

      <DataTableContent\>

        <DataTableHead\>

          <DataTableRow\>

            <DataTableHeadCell hasFormControl\>

              <Checkbox />

            </DataTableHeadCell\>

            <DataTableHeadCell\>Label</DataTableHeadCell\>

            <DataTableHeadCell\>Header</DataTableHeadCell\>

            <DataTableHeadCell\>Header</DataTableHeadCell\>

            <DataTableHeadCell\>Toggle</DataTableHeadCell\>

          </DataTableRow\>

        </DataTableHead\>

        <DataTableBody\>

          {sampleRows.map((v, i) \=> (

            <DataTableRow key\={i} selected\={checked\[i\]}\>

              <DataTableCell hasFormControl\>

                <Checkbox

                  checked\={checked\[i\]}

                  onChange\={(evt) \=> {

                    checked\[i\] \= evt.currentTarget.checked;

                    setChecked({ ...checked });

                  }}

                />

              </DataTableCell\>

              <DataTableCell\>Label</DataTableCell\>

              <DataTableCell\>

                <Select

                  placeholder\="\--Select--"

                  options\={\['Cookies', 'Pizza', 'Icecream'\]}

                />

              </DataTableCell\>

              <DataTableCell\>R{i} C3</DataTableCell\>

              <DataTableCell\>

                <Switch />

              </DataTableCell\>

            </DataTableRow\>

          ))}

        </DataTableBody\>

      </DataTableContent\>

    </DataTable\>

  );

}


```

## Simplified Usage

If you just need to throw a table on the screen, you can pass an array of data to SimpleDataTable.

```js

<SimpleDataTable

  getRowProps\={(row) \=> {

    return row\[1\] \> 100 ? { activated: true } : {};

  }}

  getCellProps\={(cell, index, isHead) \=> {

    const props \= { isNumeric: index \> 0, style: undefined };

    return !isHead && index \=== 2 && !cell.includes('$')

      ? { ...props, style: { color: 'red' } }

      : props;

  }}

  headers\={\[\['Item', 'Quantity', 'Value'\]\]}

  data\={\[

    \['Cookies', 25, '$12.40'\],

    \['Pizza', 11, '$10.43'\],

    \['Icecream', 3, '1.43'\],

    \['Candy', 72, '$22.45'\],

    \['Cakes', 101, '$215.05'\],

    \['Muffins', 3, '$5.97'\]

  \]}

/\>


```

## DataTable

## DataTableRow

## DataTableCell

## DataTableHead

## DataTableBody

## DataTableHeadCell

## SimpleDataTable