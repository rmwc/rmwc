import React from 'react';
import { mount } from 'enzyme';
import { LinearProgress } from './';

describe('LinearProgress', () => {
  it('renders', () => {
    const el = mount(<LinearProgress progress={0.5} />);
    expect(el.html().includes('mdc-linear-progress')).toBe(true);
  });

  it('can be accent', () => {
    const el = mount(<LinearProgress accent />);
    expect(el.html().includes('mdc-linear-progress--accent')).toBe(true);
  });

  it('can buffer', () => {
    mount(<LinearProgress buffer={0.8} />);
  });

  it('can be indeterminate', () => {
    const el = mount(<LinearProgress determinate={false} />);
    expect(el.html().includes('mdc-linear-progress--determinate')).toBe(false);
  });

  it('can be reversed', () => {
    const el = mount(<LinearProgress reversed />);
    expect(el.html().includes('mdc-linear-progress--reversed')).toBe(true);
  });

  it('can have custom classnames', () => {
    const el = mount(<LinearProgress className={'my-custom-classname'} />);
    expect(el.html().includes('my-custom-classname')).toEqual(true);
  });
});
