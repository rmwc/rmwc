import React from 'react';

import simpleComponentFactory from '../_base/simple-component-factory';

export const GridEl = simpleComponentFactory(
	'GridEl', 'div',
	{className: 'mdc-layout-grid'}
);

export const GridInnerEl = simpleComponentFactory(
	'GridInnerEl', 'div',
	{className: 'mdc-layout-grid__inner'}
);

export const Grid = props => {
	const { children, span, desktop, tablet, phone, ...rest } = props;

	return (
		<GridEl {...rest}>
			<GridInnerEl>
				{children}
			</GridInnerEl>
		</GridEl>
	);
};

export default Grid;