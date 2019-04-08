import React from 'react';

import { Docs, DocsExample, DocProps } from '../doc-utils';
import propsSrc from './generated-props.json';
import examples from './generated-examples.json';

import {
  GridList,
  GridTile,
  GridTileIcon,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle
} from '.';

import { Checkbox } from '../checkbox';
import { Select } from '../select';

export default function() {
  return (
    <Docs
      title="Grid Lists"
      lead="Grid lists are an alternative to standard list views."
      module="@rmwc/grid-list"
      styles={['@material/grid-list/dist/mdc.grid-list.css']}
      docsLink="https://material.io/components/web/catalog/grid-lists/"
      examples={examples}
    >
      <DocsExample>
        {function Example() {
          const [state, setState] = React.useState({
            tileGutter1: false,
            headerCaption: false,
            twolineCaption: false,
            withIconAlignStart: false,
            tileAspect: '1x1'
          });

          return (
            <>
              <GridList
                tileGutter1={state.tileGutter1}
                headerCaption={state.headerCaption}
                twolineCaption={state.twolineCaption}
                withIconAlignStart={state.withIconAlignStart}
                // @ts-ignore
                tileAspect={state.tileAspect}
              >
                {Array(8)
                  .fill(undefined)
                  .map((val, i) => (
                    <GridTile key={i}>
                      <GridTilePrimary>
                        <GridTilePrimaryContent
                          src="images/backgrounds/mb-bg-fb-06.png"
                          alt="test"
                        />
                      </GridTilePrimary>
                      <GridTileSecondary>
                        <GridTileIcon icon="info" />
                        <GridTileTitle>Tile {i + 1}</GridTileTitle>
                      </GridTileSecondary>
                    </GridTile>
                  ))}
              </GridList>

              {[
                'tileGutter1',
                'headerCaption',
                'twoLineCaption',
                'withIconAlignStart'
              ].map(key => (
                <Checkbox
                  key={key}
                  label={key}
                  onChange={evt =>
                    setState({ ...state, [key]: evt.currentTarget.checked })
                  }
                />
              ))}

              <Select
                value={state.tileAspect}
                onChange={evt =>
                  setState({ ...state, tileAspect: evt.currentTarget.value })
                }
                label="tileAspect"
                options={['1x1', '16x9', '2x3', '3x2', '4x3', '3x4']}
              />
            </>
          );
        }}
      </DocsExample>

      <DocProps
        src={propsSrc}
        components={[
          'GridList',
          'GridTile',
          'GridTileIcon',
          'GridTilePrimary',
          'GridTileSecondary',
          'GridTileTitleSupportText',
          'GridTileTitle'
        ]}
      />
    </Docs>
  );
}
