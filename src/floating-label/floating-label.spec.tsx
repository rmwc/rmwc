import React from 'react';
import { render } from '@testing-library/react';
import { FloatingLabel } from './';

describe('FloatingLabel', () => {
  it('renders', () => {
    const { asFragment } = render(<FloatingLabel />);
    expect(asFragment()).toMatchSnapshot();
  });
});
