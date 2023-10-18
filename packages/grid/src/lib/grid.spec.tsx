import { render } from '@testing-library/react';
import React from 'react';
import { Grid, GridCell, GridRow } from './grid';

describe('Grid', () => {
  it('renders grid', () => {
    const grid = render(<Grid />);

    expect(grid.container.firstChild).toHaveClass('mdc-layout-grid');

    expect(grid.asFragment()).toMatchSnapshot();
  });

  it('renders gridCell', () => {
    const gridCell = render(<GridCell />);

    expect(gridCell.container.firstChild).toHaveClass('mdc-layout-grid__cell');

    expect(gridCell.asFragment()).toMatchSnapshot();
  });

  it('can be fixedColumnWidth', () => {
    const { asFragment } = render(<Grid fixedColumnWidth />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('automatically renders inner grid', () => {
    const { container } = render(<Grid />);
    expect(container.firstChild?.firstChild).toHaveClass(
      'mdc-layout-grid__inner'
    );
  });

  it('can have a custom GridRow component', () => {
    const { asFragment } = render(
      <Grid>
        <GridRow />
      </Grid>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be align', () => {
    const { asFragment } = render(
      <>
        <Grid align="left" />
        <Grid align="right" />
      </>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('GridCell span', () => {
    const { asFragment } = render(<GridCell span={4} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('GridCell phone', () => {
    const { asFragment } = render(<GridCell phone={4} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('GridCell tablet', () => {
    const { asFragment } = render(<GridCell tablet={4} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('GridCell desktop', () => {
    const { asFragment } = render(<GridCell desktop={4} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('GridCell order', () => {
    const { asFragment } = render(<GridCell order={4} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('GridCell align', () => {
    const { asFragment } = render(<GridCell align="top" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    [Grid, GridCell].forEach((Component: React.ComponentType<any>) => {
      const { container } = render(
        <Component className={'my-custom-classname'} />
      );
      expect(container.firstChild).toHaveClass('my-custom-classname');
    });
  });
});
