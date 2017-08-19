import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import simpleComponentFactory from '../_base/simple-component-factory';

export const ElevationRoot = simpleComponentFactory(
	'ElevationRoot', 'div'
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
		<ElevationRoot className={classes} { ...rest }>{children}</ElevationRoot>
	);
};

Elevation.propTypes = {
	...ElevationRoot.propTypes,
	z: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	transition: PropTypes.bool
};

Elevation.defaultProps = {
	...ElevationRoot.defaultProps,
	z: 0,
	transition: false
};

export default Elevation;