# Layout Grid

> Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

- Module **@rmwc/grid**
- Import styles:
  - import **'@material/layout-grid/dist/mdc.layout-grid.css'**
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
  {/* If you need additional control over height of your grid, or need to add SubGrids, you can add your own GridInner components. */}
  <GridInner>
    <GridCell span={4}>1</GridCell>
    <GridCell span={4}>
      <GridInner>
        <GridCell span={4}>a</GridCell>
        <GridCell span={4}>b</GridCell>
        <GridCell span={4}>c</GridCell>
      </GridInner>
    </GridCell>
  </GridInner>
</Grid>
```

## Grid
### Props

| Name | Type | Description |
|------|------|-------------|
| `align` | `"left" | "right"` | Specifies the alignment of the whole grid. |
| `children` | `React.ReactNode` | Children for the Grid |
| `fixedColumnWidth` | `undefined | false | true` | Specifies the grid should have fixed column width. |


## GridCell
### Props

| Name | Type | Description |
|------|------|-------------|
| `align` | `"top" | "middle" | "bottom"` | Specifies the alignment of cell |
| `desktop` | `undefined | number` | Number of columns to span on a desktop. |
| `order` | `undefined | number` | Specifies the order of the cell. |
| `phone` | `undefined | number` | Number of columns to span on a phone. |
| `span` | `undefined | number` | Default number of columns to span. |
| `tablet` | `undefined | number` | Number of columns to span on a tablet. |


## GridInner


