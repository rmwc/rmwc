import React from 'react';
import classNames from 'classnames';

export const ListDivider = props => {
	const {
		className,
		children,
		...rest } = props;

	const classes = classNames(
		'mdc-list-divider',
		className
	);
	return (
		<div className={classes} {...rest}>{children}</div>
	);
};

export default ListDivider;