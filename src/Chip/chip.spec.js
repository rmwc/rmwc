import React from 'react';
import { mount } from 'enzyme';
import { Chip, ChipSet } from './';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSet>
        <Chip>One</Chip>
      </ChipSet>
    );
  });
});
