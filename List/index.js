var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Ripple } from '../Ripple';
import { propMeta } from '../Base/prop-meta';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var ListItemRoot = simpleComponentFactory('ListItemRoot', {
	classNames: function classNames(props) {
		return ['mdc-list-item', {
			'mdc-permanent-drawer--selected': props.permanentDrawerSelected,
			'mdc-persistent-drawer--selected': props.persistentDrawerSelected,
			'mdc-temporary-drawer--selected': props.temporaryDrawerSelected
		}];
	},
	propTypes: {
		permanentDrawerSelected: PropTypes.bool,
		persistentDrawerSelected: PropTypes.bool,
		temporaryDrawerSelected: PropTypes.bool
	},
	defaultProps: {
		permanentDrawerSelected: false,
		persistentDrawerSelected: false,
		temporaryDrawerSelected: false
	},
	propMeta: {
		permanentDrawerSelected: {
			type: 'Boolean',
			desc: 'A modifer for a selected item in Permanent Drawer.'
		},
		persistentDrawerSelected: {
			type: 'Boolean',
			desc: 'A modifer for a selected item in Persistent Drawer.'
		},
		temporaryDrawerSelected: {
			type: 'Boolean',
			desc: 'A modifer for a selected item in Temporary Drawer.'
		}
	},
	consumeProps: ['permanentDrawerSelected', 'persistentDrawerSelected', 'temporaryDrawerSelected']
});

export var ListItemText = simpleComponentFactory('ListItemText', {
	tag: 'span',
	classNames: 'mdc-list-item__text'
});

export var ListItemTextSecondary = simpleComponentFactory('ListItemTextSecondary', {
	tag: 'span',
	classNames: 'mdc-list-item__text__secondary'
});

export var ListItemStartDetail = simpleComponentFactory('ListItemStartDetail', {
	classNames: 'mdc-list-item__start-detail',
	defaultProps: {
		wrap: true
	}
});

export var ListItemEndDetail = simpleComponentFactory('ListItemStartDetail', {
	classNames: 'mdc-list-item__end-detail',
	defaultProps: {
		wrap: true
	}
});

export var ListGroup = simpleComponentFactory('ListGroup', {
	classNames: 'mdc-list-group'
});

export var ListGroupSubheader = simpleComponentFactory('ListGroupSubheader', {
	classNames: 'mdc-list-group__subheader'
});

export var ListDivider = simpleComponentFactory('ListDivider', {
	classNames: 'mdc-list-divider'
});

export var ListItem = function (_React$Component) {
	_inherits(ListItem, _React$Component);

	function ListItem() {
		_classCallCheck(this, ListItem);

		return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
	}

	_createClass(ListItem, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    ripple = _props.ripple,
			    rest = _objectWithoutProperties(_props, ['ripple']);

			var li = React.createElement(ListItemRoot, rest);

			if (ripple) {
				return React.createElement(
					Ripple,
					null,
					li
				);
			}

			return li;
		}
	}]);

	return ListItem;
}(React.Component);

Object.defineProperty(ListItem, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		ripple: PropTypes.bool
	}, ListItemRoot.propTypes)
});
Object.defineProperty(ListItem, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		ripple: false
	}, ListItemRoot.defaultProps)
});
Object.defineProperty(ListItem, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta(Object.assign({
		ripple: {
			type: 'Boolean',
			desc: 'Adds a ripple to the list items'
		}
	}, ListItemRoot.propMeta))
});
export var List = simpleComponentFactory('List', {
	classNames: function classNames(props) {
		return ['mdc-list', {
			'mdc-list--dense': props.dense,
			'mdc-list--two-line': props.twoLine,
			'mdc-list--avatar-list': props.avatarList
		}];
	},
	propTypes: {
		dense: PropTypes.bool,
		twoLine: PropTypes.bool,
		avatarList: PropTypes.bool
	},
	defaultProps: {
		dense: false,
		twoLine: false,
		avatarList: false
	},
	propMeta: {
		dense: {
			type: 'Boolean',
			desc: 'Reduces the padding on List items.'
		},
		twoLine: {
			type: 'Boolean',
			desc: 'Gives more space for dual lined list items.'
		},
		avatarList: {
			type: 'Boolean',
			desc: 'Makes the list start detail circular for avatars.'
		}
	},
	consumeProps: ['dense', 'twoLine', 'avatarList']
});

export default List;
