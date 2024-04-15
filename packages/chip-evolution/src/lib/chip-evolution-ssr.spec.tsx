// @vitest-environment node

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { ChipEvolution } from './chip-evolution';
import { ChipSetEvolution } from './chip-set-evolution';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSetEvolution>
        <ChipEvolution icon="favorite" label="One" />
      </ChipSetEvolution>
    );
  });
});
