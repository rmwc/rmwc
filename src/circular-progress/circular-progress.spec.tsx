import React from 'react';
import { render } from '@testing-library/react';
import { CircularProgress } from './';

describe('CircularProgress', () => {
  it('renders', () => {
    const { asFragment } = render(<CircularProgress />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be xsmall', () => {
    const { container, rerender } = render(<CircularProgress size="xsmall" />);
    expect(
      container.getElementsByClassName(
        'mdc-circular-progress__indeterminate-circle-graphic'
      )[0]
    ).toHaveAttribute('viewBox', '0 0 18 18');

    rerender(<CircularProgress size="small" />);
    expect(
      container.getElementsByClassName(
        'mdc-circular-progress__indeterminate-circle-graphic'
      )[0]
    ).toHaveAttribute('viewBox', '0 0 20 20');

    rerender(<CircularProgress size="medium" />);
    expect(
      container.getElementsByClassName(
        'mdc-circular-progress__indeterminate-circle-graphic'
      )[0]
    ).toHaveAttribute('viewBox', '0 0 24 24');

    rerender(<CircularProgress size="large" />);
    expect(
      container.getElementsByClassName(
        'mdc-circular-progress__indeterminate-circle-graphic'
      )[0]
    ).toHaveAttribute('viewBox', '0 0 36 36');

    rerender(<CircularProgress size="xlarge" />);
    expect(
      container.getElementsByClassName(
        'mdc-circular-progress__indeterminate-circle-graphic'
      )[0]
    ).toHaveAttribute('viewBox', '0 0 48 48');

    rerender(<CircularProgress size={72} />);
    expect(
      container.getElementsByClassName(
        'mdc-circular-progress__indeterminate-circle-graphic'
      )[0]
    ).toHaveAttribute('viewBox', '0 0 72 72');
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
