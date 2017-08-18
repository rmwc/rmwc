import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import simpleComponentFactory from '../_base/simple-component-factory';

const GridCellBase = simpleComponentFactory('GridCellBase', 'div');

export const GridCell = props => {
	const { className, children, span, desktop, tablet, phone, ...rest } = props;

	const classes = classNames(
		'mdc-layout-grid__cell',
		className,
		{
			[`mdc-layout-grid__cell--span-${span}`]: span !== undefined,
			[`mdc-layout-grid__cell--span-${phone}-phone`]: phone !== undefined,
			[`mdc-layout-grid__cell--span-${tablet}-tablet`]: tablet !== undefined,
			[`mdc-layout-grid__cell--span-${desktop}-desktop`]: desktop !== undefined
		}
	);

	return <GridCellBase className={classes} {...rest}>
		{children}
	</GridCellBase>;
};

GridCell.propTypes = {
	...GridCellBase.propTypes,
	span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	tablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	desktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

GridCell.defaultProps = {
	...GridCellBase.defaultProps,
	span: undefined,
	phone: undefined,
	tablet: undefined,
	desktop: undefined
};

export default GridCell;