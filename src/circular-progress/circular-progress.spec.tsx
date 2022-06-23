import React from 'react';
import { render } from '@testing-library/react';
import { CircularProgress } from './';

describe('CircularProgress', () => {
  it('renders', () => {
    const { asFragment } = render(<CircularProgress />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be sizes', () => {
    const { container, rerender } = render(<CircularProgress size="xsmall" />);
    expect(container.firstChild).toHaveClass(
      'rmwc-circular-progress--size-xsmall'
    );

    rerender(<CircularProgress size="small" />);
    expect(container.firstChild).toHaveClass(
      'rmwc-circular-progress--size-small'
    );

    rerender(<CircularProgress size="medium" />);
    expect(container.firstChild).toHaveClass(
      'rmwc-circular-progress--size-medium'
    );

    rerender(<CircularProgress size="large" />);
    expect(container.firstChild).toHaveClass(
      'rmwc-circular-progress--size-large'
    );

    rerender(<CircularProgress size="xlarge" />);
    expect(container.firstChild).toHaveClass(
      'rmwc-circular-progress--size-xlarge'
    );

    rerender(<CircularProgress size={72} />);
    expect(container).toMatchSnapshot();
  });

  it('can be determinate', () => {
    const { asFragment } = render(<CircularProgress progress={0.3} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have a different max / min', () => {
    const { container, rerender } = render(
      <CircularProgress min={0} max={100} progress={30} />
    );
    expect(container.firstChild).toHaveAttribute('aria-valuemax', '100');
    expect(container.firstChild).toHaveAttribute('aria-valuemin', '0');
    expect(container.firstChild).toHaveAttribute('aria-valuenow', '30');

    rerender(<CircularProgress progress={-1} />);
    expect(container.firstChild).toHaveAttribute('aria-valuenow', '-1');

    rerender(<CircularProgress progress={2} />);
    expect(container.firstChild).toHaveAttribute('aria-valuenow', '2');
  });
});
