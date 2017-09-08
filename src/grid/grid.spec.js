import React from 'react';
import { mount } from 'enzyme';
import { Grid, GridCell } from './grid';

describe('Grid', () => {
  it('renders', () => {
    const grid = mount(<Grid />);
    const gridCell = mount(<GridCell />);
    expect(grid.hasClass('mdc-layout-grid')).toEqual(true);
    expect(gridCell.hasClass('mdc-layout-grid__cell')).toEqual(true);
  });
});
