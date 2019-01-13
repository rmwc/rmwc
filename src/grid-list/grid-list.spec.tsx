import * as React from 'react';
import { mount } from 'enzyme';
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
    mount(
      <GridList>
        <GridTile>
          <GridTilePrimary>
            <GridTilePrimaryContent wrap>
              <img src="" alt="" />
            </GridTilePrimaryContent>
          </GridTilePrimary>
          <GridTileSecondary>
            <GridTileIcon icon="icon" />
            <GridTileTitle>Tile</GridTileTitle>
          </GridTileSecondary>
        </GridTile>
      </GridList>
    );
  });

  it('can be tileGutter1', () => {
    const list = mount(<GridList tileGutter1 />);
    expect(!!~list.html().search('mdc-grid-list--tile-gutter-1')).toBe(true);
  });

  it('can be headerCaption', () => {
    mount(<GridList withIconAlignStart />);
  });

  it('can be headerCaption', () => {
    const list = mount(<GridList headerCaption />);
    expect(!!~list.html().search('mdc-grid-list--header-caption')).toBe(true);
  });

  it('can be tileAspect 1x1', () => {
    const list = mount(<GridList tileAspect="1x1" />);
    expect(!!~list.html().search('mdc-grid-list--tile-aspect-1x1')).toBe(true);
  });

  it('can be tileAspect undefined', () => {
    mount(<GridList tileAspect={undefined} />);
    mount(<GridList tileAspect={0} />);
  });

  it('can have custom classnames', () => {
    [
      GridList,
      GridTile,
      GridTileIcon,
      GridTilePrimary,
      GridTileSecondary,
      GridTileTitle
    ].forEach(Component => {
      const el = mount(<Component className={'my-custom-classname'} />);
      expect(!!~el.html().search('my-custom-classname')).toEqual(true);
    });
  });
});
