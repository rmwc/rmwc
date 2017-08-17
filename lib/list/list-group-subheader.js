import React from 'react';
import classNames from 'classnames';

export const ListGroupSubheader = props => {
	const {
		className,
		children,
		...rest } = props;

	const classes = classNames(
		'mdc-list-group__subheader',
		className
	);
	return (
		<div className={classes} {...rest}>{children}</div>
	);
};

export default ListGroupSubheader;