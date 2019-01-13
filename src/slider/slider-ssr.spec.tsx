/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Slider } from './';

describe('Slider SSR', () => {
  it('renders uncontrolled', () => {
    mount(<Slider />);
  });

  it('renders with all props', () => {
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
