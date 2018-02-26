import React from 'react';
import { mount } from 'enzyme';
import { Chip, ChipText, ChipIcon, ChipSet } from './';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSet>
        <Chip>
          <ChipIcon use="favorite" />
          <ChipText>One</ChipText>
        </Chip>
      </ChipSet>
    );
  });
});

describe('ChipIcon', () => {
  it('renders', () => {
    mount(<ChipIcon use="favorite" />);
  });

  it('can be leading', () => {
    mount(<ChipIcon leading use="favorite" />);
  });

  it('can be trailing', () => {
    mount(<ChipIcon trailing use="favorite" />);
  });
});
