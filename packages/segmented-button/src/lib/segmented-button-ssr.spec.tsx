// @vitest-environment node

import { renderToString as mount } from 'react-dom/server';
import { Segment } from './segment';
import { SegmentedButton } from './segmented-button';

describe('Segmented Button SSR', () => {
  it('renders', () => {
    mount(
      <SegmentedButton>
        <Segment icon="favorite">Button</Segment>
      </SegmentedButton>
    );
  });
});
