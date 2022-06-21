import React from 'react';
import { render } from '@testing-library/react';
import {
  GridList,
  GridTile,
  GridTileIcon,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle
} from './';

describe('GridList', () => {
  it('renders', () => {
    const { asFragment } = render(
      <GridList>
        <GridTile>
          <GridTilePrimary>
            <GridTilePrimaryContent src="" alt="" />
          </GridTilePrimary>
          <GridTileSecondary>
            <GridTileIcon icon="icon" />
            <GridTileTitle>Tile</GridTileTitle>
          </GridTileSecondary>
        </GridTile>
      </GridList>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be tileGutter1', () => {
    const { container } = render(<GridList tileGutter1 />);
    expect(container.firstChild).toHaveClass('mdc-grid-list--tile-gutter-1');
  });

  it('can be headerCaption', () => {
    const { asFragment } = render(<GridList withIconAlignStart />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be headerCaption', () => {
    const { container } = render(<GridList headerCaption />);
    expect(container.firstChild).toHaveClass('mdc-grid-list--header-caption');
  });

  it('can be tileAspect 1x1', () => {
    const { container } = render(<GridList tileAspect="1x1" />);
    expect(container.firstChild).toHaveClass('mdc-grid-list--tile-aspect-1x1');
  });

  it('can be tileAspect undefined', () => {
    const { asFragment } = render(<GridList tileAspect={undefined} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have custom classnames', () => {
    [
      GridList,
      GridTile,
      GridTileIcon,
      GridTilePrimary,
      GridTileSecondary,
      GridTileTitle
    ].forEach((Component: React.ComponentType<any>) => {
      const { container } = render(
        <Component className={'my-custom-classname'} />
      );
      expect(container.firstChild).toHaveClass('my-custom-classname');
    });
  });
});
