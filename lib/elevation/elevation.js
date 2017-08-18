import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import simpleComponentFactory from '../_base/simple-component-factory';

const ElevationBase = simpleComponentFactory('ElevationBase', 'div');

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
		<ElevationBase className={classes} { ...rest }>{children}</ElevationBase>
	);
};

Elevation.propTypes = {
	...ElevationBase.propTypes,
	z: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	transition: PropTypes.bool
};

Elevation.defaultProps = {
	...ElevationBase.defaultProps,
	z: 0,
	transition: false
};

export default Elevation;