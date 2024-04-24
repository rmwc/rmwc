# Layout Grid

Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

- Module **@rmwc/grid**
- Import styles:
  - Using CSS Loader
    - import '@rmwc/grid/styles';
  - Or include stylesheets
    - **'@material/layout-grid/dist/mdc.layout-grid.css'**
- MDC Docs: [https://material.io/develop/web/components/layout-grid/](https://material.io/develop/web/components/layout-grid/)

```jsx
<Grid>
  <GridCell span={4}>1</GridCell>
  <GridCell span={4}>2</GridCell>
  <GridCell span={4}>3</GridCell>
</Grid>
```

```jsx
<Grid>
  {/* If you need additional control over height of your grid, or need to add SubGrids, you can add your own GridRow components. */}
  <GridRow>
    <GridCell span={6}>1</GridCell>
    <GridCell span={6}>
      <GridRow>
        <GridCell span={6}>a</GridCell>
        <GridCell span={6}>b</GridCell>
      </GridRow>
    </GridCell>
  </GridRow>
</Grid>
```

## Grid

A Grid component

### Props

| Name               | Type                | Description                                        |
| ------------------ | ------------------- | -------------------------------------------------- |
| `align`            | `"left" \| "right"` | Specifies the alignment of the whole grid.         |
| `children`         | `ReactNode`         | Children for the Grid                              |
| `fixedColumnWidth` | `boolean`           | Specifies the grid should have fixed column width. |

## GridCell

A Grid cell

### Props

| Name      | Type                            | Description                             |
| --------- | ------------------------------- | --------------------------------------- |
| `align`   | `"middle" \| "top" \| "bottom"` | Specifies the alignment of cell         |
| `desktop` | `number`                        | Number of columns to span on a desktop. |
| `order`   | `number`                        | Specifies the order of the cell.        |
| `phone`   | `number`                        | Number of columns to span on a phone.   |
| `span`    | `number`                        | Default number of columns to span.      |
| `tablet`  | `number`                        | Number of columns to span on a tablet.  |

## GridRow

By default, an inner grid component is included inside of <Grid>. Use GridRow when doing nested Grids.
