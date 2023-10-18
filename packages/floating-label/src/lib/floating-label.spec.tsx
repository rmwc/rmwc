import { render } from '@testing-library/react';
import React from 'react';
import { FloatingLabel } from './floating-label';

describe('FloatingLabel', () => {
  it('renders', () => {
    const { asFragment } = render(<FloatingLabel />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders with float', () => {
    const { asFragment } = render(<FloatingLabel float />);
    expect(asFragment()).toMatchSnapshot();
  });
});
