import React from 'react';
import classNames from 'classnames';

export const Card = props => {
	const { className, children, ...rest } = props;
	const classes = classNames(
		'mdc-card',
		className
	);

	return (
		<div className={classes} {...rest}>{children}</div>
	);
};

export default Card;