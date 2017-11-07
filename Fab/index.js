var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getProviderOptions } from '../Provider';
import { Ripple } from '../Ripple';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var FabRoot = simpleComponentFactory('FabRoot', Object.assign({
	tag: 'button',
	classNames: function classNames(props) {
		return ['mdc-fab', {
			'mdc-fab--mini': props.mini
		}];
	},
	propTypes: {
		mini: PropTypes.bool
	},
	defaultProps: {
		mini: false
	}
}, process.env.NODE_ENV === 'production' ? {} : {
	propMeta: {
		mini: {
			type: 'Boolean',
			desc: 'Make the Fab smaller.'
		}
	}
}, {
	consumeProps: ['mini']
}));

export var FabIcon = simpleComponentFactory('FabIcon', {
	tag: 'span',
	classNames: 'mdc-fab__icon'
});

export var Fab = function (_React$Component) {
	_inherits(Fab, _React$Component);

	function Fab() {
		_classCallCheck(this, Fab);

		return _possibleConstructorReturn(this, (Fab.__proto__ || Object.getPrototypeOf(Fab)).apply(this, arguments));
	}

	_createClass(Fab, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.providerOptions = getProviderOptions(this.context);
		}
	}, {
		key: 'render',
		value: function render() {
			var buttonDefaultRipple = this.providerOptions.buttonDefaultRipple;

			var _props = this.props,
			    ripple = _props.ripple,
			    className = _props.className,
			    children = _props.children,
			    rest = _objectWithoutProperties(_props, ['ripple', 'className', 'children']);

			var shouldRipple = ripple === undefined ? buttonDefaultRipple : ripple;

			var classes = classNames(this.providerOptions.iconPrefix, className);
			var button = React.createElement(
				FabRoot,
				Object.assign({ className: classes }, rest),
				React.createElement(
					FabIcon,
					null,
					children
				)
			);

			if (shouldRipple) {
				return React.createElement(
					Ripple,
					null,
					button
				);
			}

			return button;
		}
	}]);

	return Fab;
}(React.Component);

Object.defineProperty(Fab, 'contextTypes', {
	enumerable: true,
	writable: true,
	value: {
		RMWCOptions: PropTypes.object
	}
});
Object.defineProperty(Fab, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		ripple: PropTypes.bool
	}, FabRoot.propTypes)
});
Object.defineProperty(Fab, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		ripple: undefined
	}, FabRoot.defaultProps)
});
Fab.propMeta = Object.assign({}, FabRoot.propMeta, {
	ripple: {
		type: 'Boolean',
		desc: 'Adds or disables a ripple from the Fab.'
	}
});

export default Fab;
