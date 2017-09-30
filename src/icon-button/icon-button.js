import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';
import Icon from '../icon/icon';
import classNames from 'classnames';

export const IconButton = props => {
	// styles ripped from Angular Material https://material.angularjs.org/latest/demo/button
	const buttonStyle = {
		marginLeft: '6px',
		marginRight: '6px',
		height: '40px',
		minWidth: '0',
		lineHeight: '24px',
		padding: '8px',
		width: '40px',
		borderRadius: '50%',
	};

	const { className, children, use, style = {}, ...rest } = props;
	const mergedStyle = {
		...buttonStyle,
		...style,
	};

	const iconName = use || children;
	return (
		<Button
			className={classNames('rmwc-icon-button', className)}
			style={mergedStyle}
			{...rest}
		>
			<Icon use={iconName} />
		</Button>
	);
};

IconButton.propTypes = {
	use: PropTypes.string,
	...Button.propTypes,
};

IconButton.defaultProps = {
	use: undefined,
	...Button.defaultProps,
};

export default IconButton;
