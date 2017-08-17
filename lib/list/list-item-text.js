import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const ListItemText = props => {
	const {
		className,
		secondary,
		children,
		...rest } = props;

	const classes = classNames(
		className,
		{
			'mdc-list-item__text__secondary': secondary,
			'mdc-list-item__text': !secondary
		}
	);
	return (
		<span className={classes} {...rest}>{children}</span>
	);
};

ListItemText.propTypes = {
	secondary: PropTypes.bool
};

ListItemText.defaultProps = {
	secondary: false
};

export default ListItemText;