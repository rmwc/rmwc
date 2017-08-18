import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import simpleComponentFactory from '../_base/simple-component-factory';

export const GridCellEl = simpleComponentFactory(
	'GridCellEl', 'div',
	{className: 'mdc-layout-grid__cell'}
);

export const GridCell = props => {
	const { className, children, span, desktop, tablet, phone, ...rest } = props;

	const classes = classNames(
		className,
		{
			[`mdc-layout-grid__cell--span-${span}`]: span !== undefined,
			[`mdc-layout-grid__cell--span-${phone}-phone`]: phone !== undefined,
			[`mdc-layout-grid__cell--span-${tablet}-tablet`]: tablet !== undefined,
			[`mdc-layout-grid__cell--span-${desktop}-desktop`]: desktop !== undefined
		}
	);

	return <GridCellEl className={classes} {...rest}>
		{children}
	</GridCellEl>;
};

GridCell.propTypes = {
	...GridCellEl.propTypes,
	span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	desktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

GridCell.defaultProps = {
	...GridCellEl.defaultProps,
	span: undefined,
	phone: undefined,
	tablet: undefined,
	desktop: undefined
};

export default GridCell;