import React from 'react';
import { mount } from 'enzyme';
import { Grid, GridCell } from './grid';

describe('Grid', () => {
	it('renders', () => {
		const grid = mount(<Grid />);
		const gridCell = mount(<GridCell />);
		expect(!!~grid.html().search('mdc-layout-grid')).toEqual(true);
		expect(!!~gridCell.html().search('mdc-layout-grid__cell')).toEqual(true);
	});
});
