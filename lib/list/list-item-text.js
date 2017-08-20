import React from 'react';
import PropTypes from 'prop-types';

import { simpleComponentFactory } from '../_base/simple-component-factory';

export const ListItemText = simpleComponentFactory('ListItemText', {
	tag: 'span',
	classNames: props => [
		{
			'mdc-list-item__text__secondary': props.secondary,
			'mdc-list-item__text': !props.secondary
		}
	],
	propTypes: {
		secondary: PropTypes.bool
	},
	defaultProps: {
		secondary: false
	},
	consumeProps: [
		'secondary'
	]
});

export default ListItemText;