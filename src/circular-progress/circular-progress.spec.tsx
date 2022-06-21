import React from 'react';
import { render } from '@testing-library/react';
import { CircularProgress } from './';

describe('CircularProgress', () => {
  it('renders', () => {
    const { asFragment } = render(<CircularProgress />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be sizes', () => {
    render(<CircularProgress size="xsmall" />);
    render(<CircularProgress size="small" />);
    render(<CircularProgress size="medium" />);
    render(<CircularProgress size="large" />);
    render(<CircularProgress size="xlarge" />);
    render(<CircularProgress size={72} />);
  });

  it('can be determinate', () => {
    render(<CircularProgress progress={0.3} />);
  });

  it('can have a different max / min', () => {
    render(<CircularProgress min={0} max={100} progress={30} />);
    render(<CircularProgress progress={-1} />);
    render(<CircularProgress progress={2} />);
  });
});
