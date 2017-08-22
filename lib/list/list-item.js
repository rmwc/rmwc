import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Ripple } from '../ripple/ripple';
import { simpleComponentFactory } from '../_base/simple-component-factory';
import { propMeta } from '../_base/prop-meta';

export const ListItemRoot = simpleComponentFactory('ListItemRoot', {
	classNames: 'mdc-list-item'
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

export default ListItem;