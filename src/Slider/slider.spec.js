import React from 'react';
import { mount } from 'enzyme';
import { Slider } from './';

describe('Slider', () => {
  it('renders', () => {
    mount(<Slider />);
  });

  it('can be discrete', () => {
    const el = mount(<Slider value={50} discrete />);
    expect(!!~el.html().search('mdc-slider--discrete')).toBe(true);
  });

  it('can have displayMarkers', () => {
    const el = mount(<Slider value={50} discrete displayMarkers />);
    expect(!!~el.html().search('mdc-slider--display-markers')).toBe(true);
  });

  it('can have custom classnames', () => {
    const el = mount(<Slider className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
