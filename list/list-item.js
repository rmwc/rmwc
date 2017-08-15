import React from 'react';
import classNames from 'classnames';

export const ListItem = props => {
	const {
		className,
		children,
		...rest } = props;

	const classes = classNames(
		'mdc-list-item',
		className
	);
	return (
		<li className={classes} {...rest}>{children}</li>
	);
}

export default ListItem;