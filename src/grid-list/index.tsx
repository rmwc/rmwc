import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { Icon, IconProps } from '@rmwc/icon';
import { useClassNames, useTag } from '@rmwc/base/component';

/** Grid List Component */
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
export const GridList = React.forwardRef<
  any,
  GridListProps & RMWC.ComponentProps
>(function GridList(props, ref) {
  const Tag = useTag(props, 'div');

  const {
    tileGutter1,
    headerCaption,
    twolineCaption,
    withIconAlignStart,
    tileAspect = '1x1',
    children,
    ...rest
  } = props;

  const className = useClassNames(props, [
    'mdc-grid-list',
    {
      'mdc-grid-list--tile-gutter-1': tileGutter1,
      'mdc-grid-list--header-caption': headerCaption,
      'mdc-grid-list--twoline-caption': twolineCaption,
      'mdc-grid-list--with-icon-align-start': withIconAlignStart,
      [`mdc-grid-list--tile-aspect-${tileAspect || ''}`]: tileAspect
    }
  ]);

  return (
    <Tag {...rest} ref={ref} className={className}>
      <ul className="mdc-grid-list__tiles">{children}</ul>
    </Tag>
  );
});
GridList.displayName = 'GridList';

/** The primary content for a Grid tile */
export interface GridTilePrimaryProps {}

/** The primary content for a Grid tile */
export const GridTilePrimary = React.forwardRef<
  any,
  GridTilePrimaryProps & RMWC.ComponentProps
>(function GridTilePrimary(props, ref) {
  const Tag = useTag(props);
  const className = useClassNames(props, ['mdc-grid-tile__primary']);
  return <Tag ref={ref} {...props} className={className} />;
});
GridTilePrimary.displayName = 'GridTilePrimary';

/** The inner primary content for a Grid tile */
export interface GridTilePrimaryContentProps {}

/** The inner primary content for a Grid tile */
export const GridTilePrimaryContent = React.forwardRef<
  any,
  GridTilePrimaryContentProps & RMWC.ComponentProps
>(function GridTilePrimaryContent(props, ref) {
  const Tag = useTag(props, 'img');
  const className = useClassNames(props, ['mdc-grid-tile__primary-content']);
  return <Tag ref={ref} {...props} className={className} />;
});
GridTilePrimaryContent.displayName = 'GridTilePrimaryContent';

/** A grid tile */
export interface GridTileProps {}

/** A grid tile */
export const GridTile = React.forwardRef<
  any,
  GridTileProps & RMWC.ComponentProps
>(function GridTile(props, ref) {
  const Tag = useTag(props, 'li');
  const className = useClassNames(props, ['mdc-grid-tile']);
  return <Tag ref={ref} {...props} className={className} />;
});
GridTile.displayName = 'GridTile';

/** The secondary content for a Grid tile */
export interface GridTileSecondaryProps {}

/** The secondary content for a Grid tile */
export const GridTileSecondary = React.forwardRef<
  any,
  GridTileSecondaryProps & RMWC.ComponentProps
>(function GridTileSecondary(props, ref) {
  const Tag = useTag(props, 'span');
  const className = useClassNames(props, ['mdc-grid-tile__secondary']);
  return <Tag ref={ref} {...props} className={className} />;
});
GridTileSecondary.displayName = 'GridTileSecondary';

/** The icon for a Grid tile. This is an instance of Icon component. */
export interface GridTileIconProps extends IconProps {}

/** The icon for a Grid tile. This is an instance of Icon component. */
export const GridTileIcon = React.memo(
  React.forwardRef<any, GridTileIconProps & RMWC.ComponentProps>(
    function GridTileIcon(props, ref) {
      const className = useClassNames(props, ['mdc-grid-tile__icon']);
      return <Icon ref={ref} {...props} className={className} />;
    }
  )
);
GridTileIcon.displayName = 'GridTileIcon';

/** The title for a Grid tile */
export interface GridTileTitleProps {}

/** The title for a Grid tile */
export const GridTileTitle = React.forwardRef<
  any,
  GridTileTitleProps & RMWC.ComponentProps
>(function GridTileTitle(props, ref) {
  const Tag = useTag(props, 'span');
  const className = useClassNames(props, ['mdc-grid-tile__title']);
  return <Tag ref={ref} {...props} className={className} />;
});
GridTileTitle.displayName = 'GridTileTitle';

/** Supporting Text for the Grid Tile */
export interface GridTileTitleSupportTextProps {}

/** Supporting Text for the Grid Tile */
export const GridTileTitleSupportText = React.forwardRef<
  any,
  GridTileTitleSupportTextProps & RMWC.ComponentProps
>(function GridTileTitleSupportText(props, ref) {
  const Tag = useTag(props, 'span');
  const className = useClassNames(props, ['mdc-grid-tile__support-text']);
  return <Tag ref={ref} {...props} className={className} />;
});
GridTileTitleSupportText.displayName = 'GridTileTitleSupportText';
