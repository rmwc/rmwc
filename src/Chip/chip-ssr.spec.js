import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Chip, ChipText, ChipIcon, ChipSet, SimpleChip } from './';

describe('Chip', () => {
  it('renders', () => {
    mount(
      <ChipSet>
        <Chip>
          <ChipIcon icon="favorite" />
          <ChipText>One</ChipText>
        </Chip>
      </ChipSet>
    );
  });
});

describe('SimpleChip', () => {
  it('renders', () => {
    mount(
      <SimpleChip
        leadingIcon="face"
        trailingIcon="close"
        text="test"
        checkmark
      />
    );
  });
});

describe('ChipIcon', () => {
  it('renders', () => {
    mount(<ChipIcon icon="favorite" />);
  });
});
