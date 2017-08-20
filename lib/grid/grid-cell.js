import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
	consumeProps: [
		'span',
		'phone',
		'tablet',
		'desktop'
	]
});

export default GridCell;