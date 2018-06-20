/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Grid, GridCell } from './';

describe('Grid SSR', () => {
  it('renders', () => {
    mount(
      <Grid>
        <GridCell>One</GridCell>
        <GridCell>Two</GridCell>
      </Grid>
    );
  });
});
