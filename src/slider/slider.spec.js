import React from 'react';
import { mount } from 'enzyme';
import { Slider } from './slider';

describe('Slider', () => {
  it('renders', () => {
    const el = mount(<Slider value={50} onChange={() => {}} />);
    expect(el.hasClass('mdc-slider')).toBe(true);
  });

  it('can be discrete', () => {
    const el = mount(<Slider value={50} discrete />);
    expect(el.hasClass('mdc-slider--discrete')).toBe(true);
  });

  it('can have displayMarkers', () => {
    const el = mount(<Slider value={50} discrete displayMarkers />);
    expect(el.hasClass('mdc-slider--display-markers')).toBe(true);
  });
});
