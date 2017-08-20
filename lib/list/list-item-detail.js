import React from 'react';
import PropTypes from 'prop-types';

import { simpleComponentFactory } from '../_base/simple-component-factory';

export const ListItemDetail = simpleComponentFactory('ListItemDetail', {
	classNames: props => [
		{
			'mdc-list-item__start-detail': props.start || (props.start === false && props.end === false),
			'mdc-list-item__end-detail': props.end
		}
	],
	propTypes: {
		start: PropTypes.bool,
		end: PropTypes.bool
	},
	defaultProps: {
		start: false,
		end: false,
		wrap: true
	},
	consumeProps: [
		'start',
		'end'
	]
});

export default ListItemDetail;