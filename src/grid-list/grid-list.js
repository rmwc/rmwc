import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const GridListRoot = simpleComponentFactory('GridListRoot', {
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
  propTypes: {
    tileGutter1: PropTypes.bool,
    headerCaption: PropTypes.bool,
    twolineCaption: PropTypes.bool,
    withIconAlignStart: PropTypes.bool,
    tileAspect: PropTypes.oneOf(['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'])
  },
  defaultProps: {
    tileGutter1: false,
    headerCaption: false,
    twolineCaption: false,
    withIconAlignStart: false,
    tileAspect: '1x1'
  },
  propMeta: {
    tileGutter1: {
      type: 'Boolean',
      desc: 'Use a 1px gutter.'
    },
    headerCaption: {
      type: 'Boolean',
      desc: 'Move the caption to the top of the card.'
    },
    twolineCaption: {
      type: 'Boolean',
      desc: 'Make the caption two lines.'
    },
    withIconAlignStart: {
      type: 'Boolean',
      desc: 'Leaves space for a start aligned icon.'
    },
    tileAspect: {
      type: 'String',
      desc: 'One of the following values: 1x1, 16x9, 2x3, 3x2, 4x3, 3x4'
    }
  },
  consumeProps: [
    'tileGutter1',
    'headerCaption',
    'twolineCaption',
    'withIconAlignStart',
    'tileAspect'
  ]
});

export const GridListTiles = simpleComponentFactory('GridListTiles', {
  tag: 'ul',
  classNames: 'mdc-grid-list__tiles'
});

export const GridTile = simpleComponentFactory('GridTile', {
  tag: 'li',
  classNames: 'mdc-grid-tile'
});

export const GridTilePrimaryRoot = simpleComponentFactory('GridTilePrimary', {
  classNames: 'mdc-grid-tile__primary'
});

export const GridTilePrimaryContent = simpleComponentFactory(
  'GridTilePrimaryContent',
  {
    classNames: 'mdc-grid-tile__primary-content',
    defaultProps: {
      wrap: true
    }
  }
);

export const GridTilePrimary = props => {
  const { children, ...rest } = props;
  return (
    <GridTilePrimaryRoot {...rest}>
      <GridTilePrimaryContent>{children}</GridTilePrimaryContent>
    </GridTilePrimaryRoot>
  );
};

GridTilePrimary.propTypes = GridTilePrimaryRoot.propTypes;
GridTilePrimary.defaultProps = GridTilePrimaryRoot.defaultProps;
GridTilePrimary.propMeta = GridTilePrimaryRoot.propMeta;

export const GridTileSecondary = simpleComponentFactory('GridTileSecondary', {
  tag: 'span',
  classNames: 'mdc-grid-tile__secondary'
});

export const GridTileTitle = simpleComponentFactory('GridTileTitle', {
  tag: 'span',
  classNames: 'mdc-grid-tile__title'
});

export const GridTileTitleSupportText = simpleComponentFactory(
  'GridTileTitleSupportText',
  {
    tag: 'span',
    classNames: 'mdc-grid-tile__support-text'
  }
);

export const GridList = props => {
  const { children, ...rest } = props;
  return (
    <GridListRoot {...rest}>
      <GridListTiles>{children}</GridListTiles>
    </GridListRoot>
  );
};

GridList.propTypes = GridListRoot.propTypes;
GridList.defaultProps = GridListRoot.defaultProps;
GridList.propMeta = GridListRoot.propMeta;

export default GridList;

// <div class="mdc-grid-list">
// <ul class="mdc-grid-list__tiles">
// 	<li class="mdc-grid-tile">
// 		<div class="mdc-grid-tile__primary">
// 			<img class="mdc-grid-tile__primary-content" src="my-image.jpg" />
// 		</div>
// 		<span class="mdc-grid-tile__secondary">
// 			<span class="mdc-grid-tile__title">Title</span>
// 		</span>
// 	</li>
// 	<li class="mdc-grid-tile">
// 		<div class="mdc-grid-tile__primary">
// 			<img class="mdc-grid-tile__primary-content" src="my-image.jpg" />
// 		</div>
// 		<span class="mdc-grid-tile__secondary">
// 			<span class="mdc-grid-tile__title">Title</span>
// 		</span>
// 	</li>
// </ul>
// </div>
