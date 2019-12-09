import React from 'react';
import { mount } from 'enzyme';
import { Badge, BadgeAnchor } from '.';

describe('Badge', () => {
  it('renders', () => {
    mount(<Badge />);
  });

  it('label', () => {
    const el = mount(<Badge label="New" />);
    expect(el.html().includes('New')).toBe(true);
  });

  it('align', () => {
    const el = mount(<Badge align="end" />);
    expect(el.html().includes('rmwc-badge--align-end')).toBe(true);

    const el2 = mount(<Badge align="start" />);
    expect(el2.html().includes('rmwc-badge--align-start')).toBe(true);
  });

  it('inset', () => {
    // cant assert, jsdom doesn't include css vars?
    mount(<Badge inset="10rem" />);
  });
});

describe('BadgeAnchor', () => {
  it('renders', () => {
    mount(<BadgeAnchor />);
  });
});
