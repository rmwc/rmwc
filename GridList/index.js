function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var GridListRoot = simpleComponentFactory('GridListRoot', {
	classNames: function classNames(props) {
		return ['mdc-grid-list', _defineProperty({
			'mdc-grid-list--tile-gutter-1': props.tileGutter1,
			'mdc-grid-list--header-caption': props.headerCaption,
			'mdc-grid-list--twoline-caption': props.twolineCaption,
			'mdc-grid-list--with-icon-align-start': props.withIconAlignStart
		}, 'mdc-grid-list--tile-aspect-' + props.tileAspect, props.tileAspect)];
	},
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
	consumeProps: ['tileGutter1', 'headerCaption', 'twolineCaption', 'withIconAlignStart', 'tileAspect']
});

export var GridListTiles = simpleComponentFactory('GridListTiles', {
	tag: 'ul',
	classNames: 'mdc-grid-list__tiles'
});

export var GridTile = simpleComponentFactory('GridTile', {
	tag: 'li',
	classNames: 'mdc-grid-tile'
});

export var GridTilePrimaryRoot = simpleComponentFactory('GridTilePrimary', {
	classNames: 'mdc-grid-tile__primary'
});

export var GridTilePrimaryContent = simpleComponentFactory('GridTilePrimaryContent', {
	classNames: 'mdc-grid-tile__primary-content',
	defaultProps: {
		wrap: true
	}
});

var GridTilePrimary = function GridTilePrimary(props) {
	var children = props.children,
	    rest = _objectWithoutProperties(props, ['children']);

	return React.createElement(
		GridTilePrimaryRoot,
		rest,
		React.createElement(
			GridTilePrimaryContent,
			null,
			children
		)
	);
};

export { GridTilePrimary };
GridTilePrimary.propTypes = GridTilePrimaryRoot.propTypes;
GridTilePrimary.defaultProps = GridTilePrimaryRoot.defaultProps;
GridTilePrimary.propMeta = GridTilePrimaryRoot.propMeta;

export var GridTileSecondary = simpleComponentFactory('GridTileSecondary', {
	tag: 'span',
	classNames: 'mdc-grid-tile__secondary'
});

export var GridTileTitle = simpleComponentFactory('GridTileTitle', {
	tag: 'span',
	classNames: 'mdc-grid-tile__title'
});

export var GridTileTitleSupportText = simpleComponentFactory('GridTileTitleSupportText', {
	tag: 'span',
	classNames: 'mdc-grid-tile__support-text'
});

var GridList = function GridList(props) {
	var children = props.children,
	    rest = _objectWithoutProperties(props, ['children']);

	return React.createElement(
		GridListRoot,
		rest,
		React.createElement(
			GridListTiles,
			null,
			children
		)
	);
};

export { GridList };
GridList.propTypes = GridListRoot.propTypes;
GridList.defaultProps = GridListRoot.defaultProps;
GridList.propMeta = GridListRoot.propMeta;

export default GridList;
