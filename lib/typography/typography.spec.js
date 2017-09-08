import React from 'react';
import { mount } from 'enzyme';
import { Typography } from './typography';

describe('IconToggle', () => {
  it('renders', () => {
    mount(<Typography kind="body1" />);
  });

  it('can be adjustMargin', () => {
    const el = mount(<Typography kind="body1" adjustMargin />);
    expect(el.hasClass('mdc-typography--adjust-margin')).toBe(true);
  });
});
