import React from 'react';
import { Grid, GridCell } from './grid'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Grids/Grid',
  component: Grid
} as Meta;

type Story = StoryObj<typeof Grid>;

const cells = Array(24).fill(undefined);
const cellStyle = {
  padding: '16px',
  backgroundColor: '#f2f2f2'
};

export const GridStory: Story = {
  render: (args) => (
    <Grid {...args}>
      {cells.map((val, i) => (
        <GridCell style={cellStyle} span={args.span} key={i}>
          {i}
        </GridCell>
      ))}
    </Grid>
  ),
  args: {
    span: 4
  }
};
