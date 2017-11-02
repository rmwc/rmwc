import React from 'react';
import { mount } from 'enzyme';
import { Grid, GridCell } from './';

describe('Grid', () => {
	it('renders', () => {
		const grid = mount(<Grid />);
		const gridCell = mount(<GridCell />);
		expect(!!~grid.html().search('mdc-layout-grid')).toEqual(true);
		expect(!!~gridCell.html().search('mdc-layout-grid__cell')).toEqual(true);
	});

	it('can have custom classnames', () => {
		[Grid, GridCell].forEach(Component => {
			const el = mount(<Component className={'my-custom-classname'} />);
			expect(!!~el.html().search('my-custom-classname')).toEqual(true);
		});
	});
});
