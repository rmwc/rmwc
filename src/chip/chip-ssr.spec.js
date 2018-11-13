/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Chip, ChipSet } from './';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSet>
        <Chip leadingIcon="favorite" label="One" />
      </ChipSet>
    );
  });
});
