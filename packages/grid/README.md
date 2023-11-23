# Layout Grid

> Material design’s responsive UI is based on a column-variate grid layout. It has 12 columns on desktop, 8 columns on tablet and 4 columns on phone.

-   Module __@rmwc/grid__
-   Import styles:
    -   Using CSS Loader
        -   import __'@rmwc/grid/styles';__
    -   Or include stylesheets
        -   __'@material/layout-grid/dist/mdc.layout-grid.css'__;
-   MDC Docs: [https://material.io/develop/web/components/layout-grid/](https://material.io/develop/web/components/layout-grid/)

Standard Grid

```js

<Grid\>

  <GridCell span\={4}\>1</GridCell\>

  <GridCell span\={4}\>2</GridCell\>

  <GridCell span\={4}\>3</GridCell\>

</Grid\>


```

Sub Grids

```js

<Grid\>

  {/\* If you need additional control over height of your grid, or need to add SubGrids, you can add your own GridRow components. \*/}

  <GridRow\>

    <GridCell span\={6}\>1</GridCell\>

    <GridCell span\={6}\>

      <GridRow\>

        <GridCell span\={6}\>a</GridCell\>

        <GridCell span\={6}\>b</GridCell\>

      </GridRow\>

    </GridCell\>

  </GridRow\>

</Grid\>


```

## Grid

## GridCell

## GridRowGridTilePrimary\>

                <GridTilePrimaryContent

                  src\="images/backgrounds/mb-bg-fb-06.png"

                  alt\="test"

                />

              </GridTilePrimary\>

              <GridTileSecondary\>

                <GridTileIcon icon\="info" />

                <GridTileTitle\>Tile {i + 1}</GridTileTitle\>

              </GridTileSecondary\>

            </GridTile\>

          ))}

      </GridList\>

      {\[

        'tileGutter1',

        'headerCaption',

        'twoLineCaption',

        'withIconAlignStart'

      \].map((key) \=> (

        <Checkbox

          key\={key}

          label\={key}

          onChange\={(evt) \=>

            setState({ ...state, \[key\]: evt.currentTarget.checked })

          }

        />

      ))}

      <Select

        value\={state.tileAspect}

        onChange\={(evt) \=>

          setState({

            ...state,

            tileAspect: String(evt.currentTarget.value)

          })

        }

        label\="tileAspect"

        options\={\['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'\]}

      />

    </\>

  );

}


```

## GridList

## GridTile

## GridTileIcon

## GridTilePrimary

## GridTileSecondary

## GridTileTitleSupportText

## GridTileTitle