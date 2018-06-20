// @flow
import * as React from 'react';
import Icon from '../Icon';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export type GridListPropsT = {
  /** Use a 1px gutter. */
  tileGutter1?: boolean,
  /** Move the caption to the top of the card. */
  headerCaption?: boolean,
  /** Make the caption two lines. */
  twolineCaption?: boolean,
  /** Leaves space for a start aligned icon. */
  withIconAlignStart?: boolean,
  /** One of the following values: 1x1, 16x9, 2x3, 3x2, 4x3, 3x4. */
  tileAspect?: '1x1' | '16x9' | '2x3' | '3x2' | '4x3' | '3x4'
} & SimpleTagPropsT;

export const GridListRoot = simpleTag({
  displayName: 'GridListRoot',
  classNames: (props: GridListPropsT) => [
    'mdc-grid-list',
    {
      'mdc-grid-list--tile-gutter-1': props.tileGutter1,
      'mdc-grid-list--header-caption': props.headerCaption,
      'mdc-grid-list--twoline-caption': props.twolineCaption,
      'mdc-grid-list--with-icon-align-start': props.withIconAlignStart,
      [`mdc-grid-list--tile-aspect-${props.tileAspect || ''}`]: props.tileAspect
    }
  ],
  defaultProps: {
    tileGutter1: false,
    headerCaption: false,
    twolineCaption: false,
    withIconAlignStart: false,
    tileAspect: '1x1'
  },
  consumeProps: [
    'tileGutter1',
    'headerCaption',
    'twolineCaption',
    'withIconAlignStart',
    'tileAspect'
  ]
});

export const GridListTiles = simpleTag({
  displayName: 'GridListTiles',
  tag: 'ul',
  classNames: 'mdc-grid-list__tiles'
});

/** The primary content for a Grid tile */
export const GridTilePrimary = simpleTag({
  displayName: 'GridTilePrimary',
  classNames: 'mdc-grid-tile__primary'
});

export const GridTilePrimaryContent = simpleTag({
  displayName: 'GridTilePrimaryContent',
  classNames: 'mdc-grid-tile__primary-content',
  defaultProps: {
    wrap: true
  }
});
/****************************************************************
 * Public
 ****************************************************************/

/** A grid tile  */
export const GridTile = simpleTag({
  displayName: 'GridTile',
  tag: 'li',
  classNames: 'mdc-grid-tile'
});

/** The secondary content for a Grid tile */
export const GridTileSecondary = simpleTag({
  displayName: 'GridTileSecondary',
  tag: 'span',
  classNames: 'mdc-grid-tile__secondary'
});

/** The icon for a Grid tile. This is an instance of Icon and can take all of the same props. */
export const GridTileIcon = simpleTag({
  displayName: 'GridTileIcon',
  tag: Icon,
  classNames: 'mdc-grid-tile__icon'
});

/** The title for a Grid tile */
export const GridTileTitle = simpleTag({
  displayName: 'GridTileTitle',
  tag: 'span',
  classNames: 'mdc-grid-tile__title'
});

/** Supporting Text for the Grid Tile */
export const GridTileTitleSupportText = simpleTag({
  displayName: 'GridTileTitleSupportText',
  tag: 'span',
  classNames: 'mdc-grid-tile__support-text'
});

/**
 * Grid List Component
 */
export class GridList extends React.Component<GridListPropsT> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <GridListRoot {...rest}>
        <GridListTiles>{children}</GridListTiles>
      </GridListRoot>
    );
  }
}
