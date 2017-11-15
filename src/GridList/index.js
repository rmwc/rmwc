// @flow
import * as React from 'react';
import { simpleTag } from '../Base';
import type { SimpleTagPropsT } from '../Base';

type GridListRootPropsT = {
  /** Use a 1px gutter. */
  tileGutter1: boolean,
  /** Move the caption to the top of the card. */
  headerCaption: boolean,
  /** Make the caption two lines. */
  twolineCaption: boolean,
  /** Leaves space for a start aligned icon. */
  withIconAlignStart: boolean,
  /** One of the following values: 1x1, 16x9, 2x3, 3x2, 4x3, 3x4. */
  tileAspect: '1x1' | '16x9' | '2x3' | '3x2' | '4x3' | '3x4'
} & SimpleTagPropsT;

export const GridListRoot: React.ComponentType<GridListRootPropsT> = simpleTag({
  displayName: 'GridListRoot',
  classNames: props => [
    'mdc-grid-list',
    {
      'mdc-grid-list--tile-gutter-1': props.tileGutter1,
      'mdc-grid-list--header-caption': props.headerCaption,
      'mdc-grid-list--twoline-caption': props.twolineCaption,
      'mdc-grid-list--with-icon-align-start': props.withIconAlignStart,
      [`mdc-grid-list--tile-aspect-${props.tileAspect}`]: props.tileAspect
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

export const GridTile = simpleTag({
  displayName: 'GridTile',
  tag: 'li',
  classNames: 'mdc-grid-tile'
});

export const GridTilePrimaryRoot = simpleTag({
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

export const GridTilePrimary = ({ children, ...rest }: SimpleTagPropsT) => (
  <GridTilePrimaryRoot {...rest}>
    <GridTilePrimaryContent>{children}</GridTilePrimaryContent>
  </GridTilePrimaryRoot>
);

export const GridTileSecondary = simpleTag({
  displayName: 'GridTileSecondary',
  tag: 'span',
  classNames: 'mdc-grid-tile__secondary'
});

export const GridTileTitle = simpleTag({
  displayName: 'GridTileTitle',
  tag: 'span',
  classNames: 'mdc-grid-tile__title'
});

export const GridTileTitleSupportText = simpleTag({
  displayName: 'GridTileTitleSupportText',

  tag: 'span',
  classNames: 'mdc-grid-tile__support-text'
});

/**
 * Grid List Component
 */
export class GridList extends React.Component<GridListRootPropsT> {
  render() {
    const { children, ...rest } = this.props;
    return (
      <GridListRoot {...rest}>
        <GridListTiles>{children}</GridListTiles>
      </GridListRoot>
    );
  }
}

export default GridList;
