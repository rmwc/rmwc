import { render, screen } from '@testing-library/react';
import React from 'react';
import { TouchTargetWrapper } from './touch-target';

describe('TouchTargetWrapper', () => {
  it('renders', () => {
    const { asFragment } = render(
      <TouchTargetWrapper>TouchTargetWrapper</TouchTargetWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
