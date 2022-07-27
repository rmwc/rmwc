import React from 'react';
import { render } from '@testing-library/react';
import { LineRipple } from './';

describe('LineRipple', () => {
  it('renders', () => {
    const { asFragment } = render(<LineRipple />);
    expect(asFragment()).toMatchSnapshot();
  });
});
