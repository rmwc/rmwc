var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { getProviderOptions } from '../Provider';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export var IconRoot = simpleComponentFactory('IconRoot', { tag: 'i' });

export var Icon = function (_React$Component) {
	_inherits(Icon, _React$Component);

	function Icon() {
		_classCallCheck(this, Icon);

		return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
	}

	_createClass(Icon, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.providerOptions = getProviderOptions(this.context);
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    use = _props.use,
			    children = _props.children,
			    rest = _objectWithoutProperties(_props, ['className', 'use', 'children']);

			var iconPrefix = this.providerOptions.iconPrefix;

			var content = use || children;

			return React.createElement(
				IconRoot,
				Object.assign({ className: iconPrefix + (className || '') }, rest),
				content
			);
		}
	}]);

	return Icon;
}(React.Component);

Object.defineProperty(Icon, 'contextTypes', {
	enumerable: true,
	writable: true,
	value: {
		RMWCOptions: PropTypes.object
	}
});
Object.defineProperty(Icon, 'propTypes', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		use: PropTypes.node
	}, IconRoot.propTypes)
});
Object.defineProperty(Icon, 'defaultProps', {
	enumerable: true,
	writable: true,
	value: Object.assign({
		use: undefined
	}, IconRoot.defaultProps)
});
export default Icon;
