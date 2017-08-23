import React from 'react';
import { ListItem } from '../list/list';

export const MenuItem = props => (
	<ListItem role="menuitem" tabIndex="0" {...props}>{props.children}</ListItem>
);

MenuItem.propTypes = ListItem.propTypes;
MenuItem.defaultProps = ListItem.defaultProps;
MenuItem.propMeta = ListItem.propMeta;

export default MenuItem;