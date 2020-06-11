import React from 'react';
import { mount } from 'enzyme';
import { Elevation } from './';

describe('Elevation', () => {
  it('renders', () => {
    mount(<Elevation z={0} />);
  });

  it('can have z value', () => {
    const el = mount(<Elevation z="24" />);
    expect(!!~el.html().search('mdc-elevation--z24')).toBe(true);
  });

  it('can transition', () => {
    const el = mount(<Elevation transition z={0} />);
    expect(!!~el.html().search('mdc-elevation-transition')).toBe(true);
  });

  it('can have custom classnames', () => {
    const el = mount(<Elevation z={0} className={'my-custom-classname'} />);
    expect(!!~el.html().search('my-custom-classname')).toEqual(true);
  });
});
