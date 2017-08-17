import React from 'react';
import classNames from 'classnames';

export const ListGroup = props => {
	const {
		className,
		children,
		...rest } = props;

	const classes = classNames(
		'mdc-list-group',
		className
	);
	return (
		<div className={classes} {...rest}>{children}</div>
	);
};

export default ListGroup;