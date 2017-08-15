import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Grid = props => {
	const { className, children, item, span, desktop, tablet, phone, cell, ...rest } = props;

	const classes = classNames(
		className,
		{
			'mdc-layout-grid': !cell,
			'mdc-layout-grid__cell': cell,
			[`mdc-layout-grid__cell--span-${span}`]: span !== undefined,
			[`mdc-layout-grid__cell--span-${phone}-phone`]: phone !== undefined,
			[`mdc-layout-grid__cell--span-${tablet}-tablet`]: tablet !== undefined,
			[`mdc-layout-grid__cell--span-${desktop}-desktop`]: desktop !== undefined,
		}
	)

	if (!cell) {
		return (
			<div className={classes} {...rest}>
				<div className="mdc-layout-grid__inner">
					{children}
				</div>
			</div>
		);
	} else {
		return (
			<div className={classes}  {...rest}>
				{children}
			</div>
		);
	}
}

Grid.propTypes = {
	span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	desktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Grid;