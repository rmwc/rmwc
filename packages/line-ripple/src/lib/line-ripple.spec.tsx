import { render } from '@testing-library/react';
import React from 'react';
import { LineRipple } from './line-ripple';

describe('LineRipple', () => {
  it('renders', () => {
    const { asFragment } = render(<LineRipple />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders as active', () => {
    const { asFragment } = render(<LineRipple active />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders with center', () => {
    const { asFragment } = render(<LineRipple center={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
