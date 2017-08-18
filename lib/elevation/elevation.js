import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import simpleComponentFactory from '../_base/simple-component-factory';

export const ElevationEl = simpleComponentFactory(
	'ElevationEl', 'div'
);

export const Elevation = props => {
	const {z, transition, className, children, ...rest} = props;
	const classes = classNames(
		className,
		`mdc-elevation--z${z}`,
		{
			'mdc-elevation-transition': transition
		}
	);

	return (
		<ElevationEl className={classes} { ...rest }>{children}</ElevationEl>
	);
};

Elevation.propTypes = {
	...ElevationEl.propTypes,
	z: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	transition: PropTypes.bool
};

Elevation.defaultProps = {
	...ElevationEl.defaultProps,
	z: 0,
	transition: false
};

export default Elevation;