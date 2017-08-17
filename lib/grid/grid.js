import React from 'react';
import PropTypes from 'prop-types';
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

Grid.propTypes = {
	span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	desktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Grid;