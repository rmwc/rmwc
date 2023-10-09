// @vitest-environment node

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Chip } from './chip';
import { ChipSet } from './chip-set';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSet>
        <Chip icon="favorite" label="One" />
      </ChipSet>
    );
  });
});
