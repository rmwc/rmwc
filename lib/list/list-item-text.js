import React from 'react';

import { simpleComponentFactory } from '../_base/simple-component-factory';

export const ListItemText = simpleComponentFactory('ListItemText', {
	tag: 'span',
	classNames: 'mdc-list-item__text'
});

export const ListItemTextSecondary = simpleComponentFactory('ListItemTextSecondary', {
	tag: 'span',
	classNames: 'mdc-list-item__text__secondary'
});

export default ListItemText;