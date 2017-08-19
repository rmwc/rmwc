import React from 'react';

import simpleComponentFactory from '../_base/simple-component-factory';

export const GridRoot = simpleComponentFactory(
	'GridRoot', 'div',
	{className: 'mdc-layout-grid'}
);

export const GridInner = simpleComponentFactory(
	'GridInner', 'div',
	{className: 'mdc-layout-grid__inner'}
);

export const Grid = props => {
	const { children, span, desktop, tablet, phone, ...rest } = props;

	return (
		<GridRoot {...rest}>
			<GridInner>
				{children}
			</GridInner>
		</GridRoot>
	);
};

export default Grid;