/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import {
  GridList,
  GridTile,
  GridTileIcon,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle
} from './grid-list';

describe('GridList SSR', () => {
  it('renders', () => {
    mount(
      <GridList>
        <GridTile>
          <GridTilePrimary>
            <GridTilePrimaryContent src="" alt="" />
          </GridTilePrimary>
          <GridTileSecondary>
            <GridTileIcon icon="icon" />
            <GridTileTitle>Tile</GridTileTitle>
          </GridTileSecondary>
        </GridTile>
      </GridList>
    );
  });
});
