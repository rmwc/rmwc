import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../Base/simple-component-factory';

export const Elevation = simpleComponentFactory('Elevation', {
	classNames: props => [
		`mdc-elevation--z${props.z}`,
		{ 'mdc-elevation-transition': props.transition }
	],
	propTypes: {
		z: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		transition: PropTypes.bool
	},
	defaultProps: {
		z: 0,
		transition: false
	},
	propMeta: {
		z: {
			type: ['Integer', 'String'],
			desc: 'A number from 0 - 24 for different levels of elevation'
		},
		transition: {
			type: 'Boolean',
			desc:
				'Allows for smooth transitions between elevations when the z value changes.'
		}
	},
	consumeProps: ['z', 'transition']
});

export default Elevation;
