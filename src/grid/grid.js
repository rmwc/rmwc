import React from 'react';
import PropTypes from 'prop-types';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const GridCell = simpleComponentFactory('GridCell', {
	classNames: props => [
		'mdc-layout-grid__cell',
		{
			[`mdc-layout-grid__cell--span-${props.span}`]: props.span !== undefined,
			[`mdc-layout-grid__cell--span-${props.phone}-phone`]: props.phone !== undefined,
			[`mdc-layout-grid__cell--span-${props.tablet}-tablet`]: props.tablet !== undefined,
			[`mdc-layout-grid__cell--span-${props.desktop}-desktop`]: props.desktop !== undefined
		}
	],
	propTypes: {
		span: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		tablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		desktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	},
	defaultProps: {
		span: undefined,
		phone: undefined,
		tablet: undefined,
		desktop: undefined
	},
	propMeta: {
		span: {
			type: 'Number',
			desc: 'A generic span value for all screen sizes.'
		},
		phone: {
			type: 'Number',
			desc: 'A span value for phone screen sizes.'
		},
		tablet: {
			type: 'Number',
			desc: 'A span value for tablet screen sizes.'
		},
		desktop: {
			type: 'Number',
			desc: 'A span value for desktop screen sizes.'
		}
	},
	consumeProps: [
		'span',
		'phone',
		'tablet',
		'desktop'
	]
});

export const GridRoot = simpleComponentFactory('GridRoot', {
	classNames: 'mdc-layout-grid'
});

export const GridInner = simpleComponentFactory('GridInner', {
	classNames: 'mdc-layout-grid__inner'
});

export const Grid = props => {
	const { children, ...rest } = props;

	return (
		<GridRoot {...rest}>
			<GridInner>
				{children}
			</GridInner>
		</GridRoot>
	);
};