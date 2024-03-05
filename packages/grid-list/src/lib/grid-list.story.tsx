import React from 'react';
import {
  GridList,
  GridTile,
  GridTileIcon,
  GridTilePrimary,
  GridTilePrimaryContent,
  GridTileSecondary,
  GridTileTitle
} from './grid-list'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Grids/GridList',
  component: GridList
} as Meta;

type Story = StoryObj<typeof GridList>;

export const GridListStory: Story = {
  render: (args) => {
    return (
      <GridList {...args}>
        {Array(4)
          .fill(undefined)
          .map((val, i) => (
            <GridTile key={i}>
              <GridTilePrimary>
                <GridTilePrimaryContent src="https://material-components-web.appspot.com/images/1-1.jpg" />
              </GridTilePrimary>
              <GridTileSecondary>
                <GridTileIcon>star_border</GridTileIcon>
                <GridTileTitle>Tile {i + 1}</GridTileTitle>
              </GridTileSecondary>
            </GridTile>
          ))}
      </GridList>
    );
  },
  args: {
    tileGutter1: false,
    headerCaption: false,
    twolineCaption: false,
    withIconAlignStart: false,
    tileAspect: {
      '1x1': '1x1',
      '16x9': '16x9',
      '2x3': '2x3',
      '3x2': '3x2',
      '4x3': '4x3',
      '3x4': '3x4'
    }
  }
};
