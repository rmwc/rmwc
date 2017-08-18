import React from 'react';
import ListItem from '../list/list-item';

export const MenuItem = props => (
	<ListItem role="menuitem" tabIndex="0" {...props}>{props.children}</ListItem>
);

export default MenuItem;