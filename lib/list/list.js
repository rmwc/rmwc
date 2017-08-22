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
	propMeta: {
		dense: {
			type: 'Boolean',
			desc: 'Reduces the padding on List items.'
		},
		twoLine: {
			type: 'Boolean',
			desc: 'Gives more space for dual lined list items.'
		},
		avatarList: {
			type: 'Boolean',
			desc: 'Makes the list start detail circular for avatars.'
		}
	},
	consumeProps: [
		'dense',
		'twoLine',
		'avatarList'
	]
});

export default List;