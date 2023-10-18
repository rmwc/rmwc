import React from 'react';

import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Grid, GridCell } from './grid';

const cells = Array(24).fill(undefined);
const cellStyle = {
  padding: '16px',
  backgroundColor: '#f2f2f2'
};

storiesOf('Grids', module).add('Grid', () => {
  const span = number('span', 4);
  return (
    <Grid>
      {cells.map((val, i) => (
        <GridCell style={cellStyle} span={span} key={i}>
          {i}
        </GridCell>
      ))}
    </Grid>
  );
});
