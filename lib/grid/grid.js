import React from 'react';

import { simpleComponentFactory } from '../_base/simple-component-factory';

export const GridRoot = simpleComponentFactory('GridRoot', {
	classNames: 'mdc-layout-grid'
});

export const GridInner = simpleComponentFactory('GridInner', {
	classNames: 'mdc-layout-grid__inner'
});

export const Grid = props => {
	const { children, ...rest } = props;

	return (
		<GridRoot {...rest}>
			<GridInner>
				{children}
			</GridInner>
		</GridRoot>
	);
};

export default Grid;