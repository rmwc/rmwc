/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Segment, SegmentedButton } from './';

describe('Segmented Button SSR', () => {
  it('renders', () => {
    mount(
      <SegmentedButton>
        <Segment icon="favorite">Button</Segment>
      </SegmentedButton>
    );
  });
});
