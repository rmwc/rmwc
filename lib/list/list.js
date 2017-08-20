import React from 'react';
import PropTypes from 'prop-types';

import { simpleComponentFactory } from '../_base/simple-component-factory';

export const List = simpleComponentFactory('List', {
	classNames: props => [
		'mdc-list',
		{
			'mdc-list--dense': props.dense,
			'mdc-list--two-line': props.twoLine,
			'mdc-list--avatar-list': props.avatarList
		}
	],
	propTypes: {
		dense: PropTypes.bool,
		twoLine: PropTypes.bool,
		avatarList: PropTypes.bool
	},
	defaultProps: {
		dense: false,
		twoLine: false,
		avatarList: false
	},
	consumeProps: [
		'dense',
		'twoLine',
		'avatarList'
	]
});

export default List;