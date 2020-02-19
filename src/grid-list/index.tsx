import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { Icon, IconProps } from '@rmwc/icon';
import {
  useClassNames,
  Tag,
  createComponent,
  createMemoComponent
} from '@rmwc/base';

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
export const GridList = createComponent<GridListProps>(function GridList(
  props,
  ref
) {
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

/** The primary content for a Grid tile */
export interface GridTilePrimaryProps {}

/** The primary content for a Grid tile */
export const GridTilePrimary = createComponent<GridTilePrimaryProps>(
  function GridTilePrimary(props, ref) {
    const className = useClassNames(props, ['mdc-grid-tile__primary']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** The inner primary content for a Grid tile */
export interface GridTilePrimaryContentProps {}

/** The inner primary content for a Grid tile */
export const GridTilePrimaryContent = createComponent<
  GridTilePrimaryContentProps
>(function GridTilePrimaryContent(props, ref) {
  const className = useClassNames(props, ['mdc-grid-tile__primary-content']);
  return <Tag tag="img" {...props} ref={ref} className={className} />;
});

/** A grid tile */
export interface GridTileProps {}

/** A grid tile */
export const GridTile = createComponent<GridTileProps>(function GridTile(
  props,
  ref
) {
  const className = useClassNames(props, ['mdc-grid-tile']);
  return <Tag tag="li" {...props} ref={ref} className={className} />;
});

/** The secondary content for a Grid tile */
export interface GridTileSecondaryProps {}

/** The secondary content for a Grid tile */
export const GridTileSecondary = createComponent<GridTileSecondaryProps>(
  function GridTileSecondary(props, ref) {
    const className = useClassNames(props, ['mdc-grid-tile__secondary']);
    return <Tag tag="span" {...props} ref={ref} className={className} />;
  }
);

/** The icon for a Grid tile. This is an instance of Icon component. */
export interface GridTileIconProps extends IconProps {}

/** The icon for a Grid tile. This is an instance of Icon component. */
export const GridTileIcon = createMemoComponent<GridTileIconProps>(
  function GridTileIcon(props, ref) {
    const className = useClassNames(props, ['mdc-grid-tile__icon']);
    return <Icon {...props} ref={ref} className={className} />;
  }
);

/** The title for a Grid tile */
export interface GridTileTitleProps {}

/** The title for a Grid tile */
export const GridTileTitle = createComponent<GridTileTitleProps>(
  function GridTileTitle(props, ref) {
    const className = useClassNames(props, ['mdc-grid-tile__title']);
    return <Tag tag="span" {...props} ref={ref} className={className} />;
  }
);

/** Supporting Text for the Grid Tile */
export interface GridTileTitleSupportTextProps {}

/** Supporting Text for the Grid Tile */
export const GridTileTitleSupportText = createComponent<
  GridTileTitleSupportTextProps
>(function GridTileTitleSupportText(props, ref) {
  const className = useClassNames(props, ['mdc-grid-tile__support-text']);
  return <Tag tag="span" {...props} ref={ref} className={className} />;
});
