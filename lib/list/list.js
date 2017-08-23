import React from 'react';
import PropTypes from 'prop-types';
import { Ripple } from '../ripple/ripple';
import { propMeta } from '../_base/prop-meta';
import { simpleComponentFactory } from '../_base/simple-component-factory';

export const ListItemRoot = simpleComponentFactory('ListItemRoot', {
	classNames: 'mdc-list-item'
});

export const ListItemText = simpleComponentFactory('ListItemText', {
	tag: 'span',
	classNames: 'mdc-list-item__text'
});

export const ListItemTextSecondary = simpleComponentFactory('ListItemTextSecondary', {
	tag: 'span',
	classNames: 'mdc-list-item__text__secondary'
});

export const ListItemStartDetail = simpleComponentFactory('ListItemStartDetail', {
	classNames: 'mdc-list-item__start-detail',
	defaultProps: {
		wrap: true
	}
});

export const ListItemEndDetail = simpleComponentFactory('ListItemStartDetail', {
	classNames: 'mdc-list-item__end-detail',
	defaultProps: {
		wrap: true
	}
});

export const ListGroup = simpleComponentFactory('ListGroup', {
	classNames: 'mdc-list-group'
});

export const ListGroupSubheader = simpleComponentFactory('ListGroupSubheader', {
	classNames: 'mdc-list-group__subheader'
});

export const ListDivider = simpleComponentFactory('ListDivider', {
	classNames: 'mdc-list-divider'
});

export class ListItem extends React.Component {
	static propTypes = {
		ripple: PropTypes.bool,
		...ListItemRoot.propTypes
	}

	static defaultProps = {
		ripple: false,
		...ListItemRoot.defaultProps
	}

	static propMeta = propMeta({
		ripple: {
			type: 'Boolean',
			desc: 'Adds a ripple to the list items'
		},
		...ListItemRoot.propMeta
	});

	render() {
		const {
			ripple,
			...rest } = this.props;

		const li = <ListItemRoot {...rest} />;

		if (ripple) {
			return <Ripple>{li}</Ripple>;
		}

		return li;
	}
}

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