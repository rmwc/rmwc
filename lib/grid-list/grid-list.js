import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const GridListRoot = simpleComponentFactory('GridListRoot', {
	classNames: props => [
		'mdc-grid-list',
		{
			'mdc-grid-list--tile-gutter-1': props.gutter1,
			'mdc-grid-list--header-caption': props.headerCaption,
			'mdc-grid-list--twoline-caption': props.twolineCaption,
			'mdc-grid-list--with-icon-align-start': props.withIconAlignStart,
			[`mdc-grid-list--tile-aspect-${props.tileAspect}`]: props.tileAspect
		}
	],
	propTypes: {
		gutter1: PropTypes.bool,
		headerCaption: PropTypes.bool,
		twolineCaption: PropTypes.bool,
		withIconAlignStart: PropTypes.bool,
		tileAspect: PropTypes.oneOf(['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'])
	},
	defaultProps: {
		gutter1: false,
		headerCaption: false,
		twolineCaption: false,
		withIconAlignStart: false,
		tileAspect: '1x1'
	},
	consumeProps: [
		'gutter1',
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

export const GridTilePrimary = simpleComponentFactory('GridTilePrimary', {
	classNames: 'mdc-grid-tile__primary'
});

export const GridTilePrimaryContent = simpleComponentFactory('GridTilePrimaryContent', {
	classNames: 'mdc-grid-tile__primary-content'
});

export const GridTileSecondary = simpleComponentFactory('GridTileSecondary', {
	tag: 'span',
	classNames: 'mdc-grid-tile__secondary'
});

export const GridTileTitle = simpleComponentFactory('GridTileTitle', {
	tag: 'span',
	classNames: 'mdc-grid-tile__title'
});

export const GridTileTitleSupportText = simpleComponentFactory('GridTileTitleSupportText', {
	tag: 'span',
	classNames: 'mdc-grid-tile__support-text'
});

export const GridList = props => {
	const { children, ...rest } = props;
	return (
		<GridListRoot { ...rest }>
			<GridListTiles>{ children }</GridListTiles>
		</GridListRoot>
	);
};

GridList.propTypes = GridListRoot.propTypes;
GridList.defaultProps = GridListRoot.defaultProps;

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