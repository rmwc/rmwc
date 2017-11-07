function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Icon from '../Icon';
import classNames from 'classnames';

var IconButton = function IconButton(props) {
	// styles ripped from Angular Material https://material.angularjs.org/latest/demo/button
	var buttonStyle = {
		marginLeft: '6px',
		marginRight: '6px',
		height: '40px',
		minWidth: '0',
		lineHeight: '24px',
		padding: '8px',
		width: '40px',
		borderRadius: '50%'
	};

	var className = props.className,
	    children = props.children,
	    use = props.use,
	    _props$style = props.style,
	    style = _props$style === undefined ? {} : _props$style,
	    rest = _objectWithoutProperties(props, ['className', 'children', 'use', 'style']);

	var mergedStyle = Object.assign({}, buttonStyle, style);

	var iconName = use || children;
	return React.createElement(
		Button,
		Object.assign({
			className: classNames('rmwc-icon-button', className),
			style: mergedStyle
		}, rest),
		React.createElement(Icon, { use: iconName })
	);
};

export { IconButton };
IconButton.propTypes = Object.assign({
	use: PropTypes.node
}, Button.propTypes);

IconButton.defaultProps = Object.assign({
	use: undefined
}, Button.defaultProps);

export default IconButton;
