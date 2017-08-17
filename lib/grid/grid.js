import React from 'react';
import classNames from 'classnames';

export const Grid = props => {
	const { className, children, span, desktop, tablet, phone, ...rest } = props;

	const classes = classNames(
		'mdc-layout-grid',
		className
	);

	return (
		<div className={classes} {...rest}>
			<div className="mdc-layout-grid__inner">
				{children}
			</div>
		</div>
	);
};

export default Grid;