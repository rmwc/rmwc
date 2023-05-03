import React from 'react';
import { render, screen } from '@testing-library/react';
import { TouchTargetWrapper } from '.';

describe('TouchTargetWrapper', () => {
  it('renders', () => {
    const { asFragment } = render(
      <TouchTargetWrapper>TouchTargetWrapper</TouchTargetWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
