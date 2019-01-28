import RMWC from '@rmwc/types';
import * as React from 'react';
import { Icon, IconProps } from '@rmwc/icon';
import { componentFactory } from '@rmwc/base';

export interface GridListProps {
  /** Use a 1px gutter. */
  tileGutter1?: boolean;
  /** Move the caption to the top of the card. */
  headerCaption?: boolean;
  /** Make the caption two lines. */
  twolineCaption?: boolean;
  /** Leaves space for a start aligned icon. */
  withIconAlignStart?: boolean;
  /** One of the following values: 1x1, 16x9, 2x3, 3x2, 4x3, 3x4. */
  tileAspect?: '1x1' | '16x9' | '2x3' | '3x2' | '4x3' | '3x4';
}

/** Grid List Component */
export const GridList = componentFactory<GridListProps>({
  displayName: 'GridList',
  classNames: (props: GridListProps) => [
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
  ],
  render: (
    { children, ...rest }: GridListProps & RMWC.ComponentProps,
    ref: any,
    Tag: any
  ) => (
    <Tag {...rest} ref={ref}>
      <ul className="mdc-grid-list__tiles">{children}</ul>
    </Tag>
  )
});

/** The primary content for a Grid tile */
export const GridTilePrimary = componentFactory<{}>({
  displayName: 'GridTilePrimary',
  classNames: ['mdc-grid-tile__primary']
});

export const GridTilePrimaryContent = componentFactory<{}>({
  displayName: 'GridTilePrimaryContent',
  tag: 'img',
  classNames: ['mdc-grid-tile__primary-content']
});
/****************************************************************
 * Public
 ****************************************************************/

/** A grid tile  */
export const GridTile = componentFactory<{}>({
  displayName: 'GridTile',
  tag: 'li',
  classNames: ['mdc-grid-tile']
});

/** The secondary content for a Grid tile */
export const GridTileSecondary = componentFactory<{}>({
  displayName: 'GridTileSecondary',
  tag: 'span',
  classNames: ['mdc-grid-tile__secondary']
});

export interface GridTileIconProps extends IconProps {}

/** The icon for a Grid tile. This is an instance of Icon component. */
export const GridTileIcon = componentFactory<GridTileIconProps>({
  displayName: 'GridTileIcon',
  tag: Icon,
  classNames: ['mdc-grid-tile__icon']
});

/** The title for a Grid tile */
export const GridTileTitle = componentFactory<{}>({
  displayName: 'GridTileTitle',
  tag: 'span',
  classNames: ['mdc-grid-tile__title']
});

/** Supporting Text for the Grid Tile */
export const GridTileTitleSupportText = componentFactory<{}>({
  displayName: 'GridTileTitleSupportText',
  tag: 'span',
  classNames: ['mdc-grid-tile__support-text']
});
