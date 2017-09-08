import React from 'react';
import { mount } from 'enzyme';
import { LinearProgress } from './linear-progress';

describe('LinearProgress', () => {
  it('renders', () => {
    const el = mount(<LinearProgress progress={0.5} />);
    expect(el.hasClass('mdc-linear-progress')).toBe(true);
  });

  it('can be accent', () => {
    const el = mount(<LinearProgress accent />);
    expect(el.hasClass('mdc-linear-progress--accent')).toBe(true);
  });

  it('can buffer', () => {
    const el = mount(<LinearProgress buffer={0.8} />);
  });

  it('can be indeterminate', () => {
    const el = mount(<LinearProgress determinate={false} />);
    expect(el.hasClass('mdc-linear-progress--determinate')).toBe(false);
  });

  it('can be reversed', () => {
    const el = mount(<LinearProgress reversed />);
    expect(el.hasClass('mdc-linear-progress--reversed')).toBe(true);
  });
});
