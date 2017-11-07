var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple/dist/mdc.ripple';
import { propMeta } from '../Base/prop-meta';

export var Ripple = function (_React$Component) {
	_inherits(Ripple, _React$Component);

	function Ripple() {
		_classCallCheck(this, Ripple);

		return _possibleConstructorReturn(this, (Ripple.__proto__ || Object.getPrototypeOf(Ripple)).apply(this, arguments));
	}

	_createClass(Ripple, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.el = ReactDOM.findDOMNode(this);
			this.initRipple();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this.checkProps(nextProps);
		}
	}, {
		key: 'checkProps',
		value: function checkProps(nextProps) {
			if (this.api.unbounded !== nextProps.unbounded) {
				this.api.unbounded = nextProps.unbounded;
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps) {
			var _this2 = this;

			var didChange = ['primary', 'accent', 'unbounded'].some(function (key) {
				return _this2.props[key] !== prevProps[key];
			});
			if (didChange) {
				this.destroyRipple();
				this.initRipple();
				this.forceUpdate();
			}
		}
	}, {
		key: 'initRipple',
		value: function initRipple() {
			// a stupid hack for the test environment where this ends up undefined
			if (process.env.NODE_ENV === 'test') {
				this.el.dataset = {};
			}

			this.api = new MDCRipple(this.el);
			this.checkProps(this.props);
		}
	}, {
		key: 'destroyRipple',
		value: function destroyRipple() {
			this.api.destroy();
		}
	}, {
		key: 'render',
		value: function render() {
			var child = React.Children.only(this.props.children);
			var _props = this.props,
			    accent = _props.accent,
			    primary = _props.primary;

			/**
    * Collect the ripple classes so we make sure React doesnt
    * destroy them when we re-render.
    */

			var rippleClasses = (this.el ? this.el.getAttribute('class').split(' ') : []).filter(function (cls) {
				if (~['mdc-ripple-surface--primary', 'mdc-ripple-surface--accent', 'mdc-ripple-surface'].indexOf(cls)) {
					return false;
				}

				return cls.startsWith('mdc-ripple');
			});

			var classes = classNames.apply(undefined, ['mdc-ripple-surface', child.props.className].concat(_toConsumableArray(rippleClasses), [{
				'mdc-ripple-surface--primary': primary,
				'mdc-ripple-surface--accent': accent
			}]));

			var dedupedClasses = Array.from(new Set(classes.split(' '))).join(' ');

			return React.cloneElement(child, Object.assign({}, child.props, {
				className: dedupedClasses
			}));
		}
	}]);

	return Ripple;
}(React.Component);

Object.defineProperty(Ripple, 'propTypes', {
	enumerable: true,
	writable: true,
	value: {
		primary: PropTypes.bool,
		accent: PropTypes.bool,
		unbounded: PropTypes.bool
	}
});
Object.defineProperty(Ripple, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: {
		primary: false,
		accent: false,
		unbounded: false
	}
});
Object.defineProperty(Ripple, 'propMeta', {
	enumerable: true,
	writable: true,
	value: propMeta({
		primary: {
			type: 'Boolean',
			desc: 'Uses the primary palette.'
		},
		accent: {
			type: 'Boolean',
			desc: 'Uses the accent palette.'
		},
		unbounded: {
			type: 'Boolean',
			desc: 'Make the Ripple unbounded, like the ones used in Checkboxes.'
		}
	})
});
export default Ripple;
