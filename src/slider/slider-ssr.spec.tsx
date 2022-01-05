/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Slider } from './';

/*
As part of bumping MWC to v6, these tests are failing due to window not being defined.
MWC are fully aware of this server-side rendering error and already have a fix for it in v7.
See https://github.com/material-components/material-components-web/commit/95c73550e886c2832aa42cd065552551b6690a61.
So when we bump MWC from v6 to v7, we can reintroduce these tests.
What to do when bumped to v7:
- Change jest-environemnt to 'node' on line 2: @jest-environemnt node
- Remove .skip flags from the tests.
*/

describe('Slider SSR', () => {
  it.skip('renders uncontrolled', () => {
    mount(<Slider />);
  });

  it.skip('renders with all props', () => {
    mount(
      <Slider
        value={50}
        discrete
        displayMarkers
        min={0}
        max={100}
        step={10}
        disabled
        onChange={() => {}}
        onInput={() => {}}
      />
    );
  });
});
