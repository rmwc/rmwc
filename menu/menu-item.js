import React from 'react';
import classNames from 'classnames';
import ListItem from '../list/list-item';

const MenuItem = props => (
	<ListItem role="menuitem" tabIndex="0" {...props}>{props.children}</ListItem>
);

export default MenuItem;