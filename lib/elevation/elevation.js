import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const Elevation = simpleComponentFactory('Elevation', {
	classNames: props => [
		`mdc-elevation--z${props.z}`,
		{'mdc-elevation-transition': props.transition}
	],
	propTypes: {
		z: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		transition: PropTypes.bool
	},
	defaultProps: {
		z: 0,
		transition: false
	},
	consumeProps: [
		'z',
		'transition'
	]
});

export default Elevation;