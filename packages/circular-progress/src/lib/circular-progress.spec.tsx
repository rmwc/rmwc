import { render } from '@testing-library/react';
import React from 'react';
import { CircularProgress } from './circular-progress';

describe('CircularProgress', () => {
  it('renders', () => {
    const { asFragment } = render(<CircularProgress />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be different sizes', () => {
    const { container, rerender } = render(<CircularProgress size="xsmall" />);
    expect(
      container.getElementsByClassName('rmwc-circular-progress--xsmall')[0]
    ).toBeInTheDocument();

    rerender(<CircularProgress size="small" />);

    expect(
      container.getElementsByClassName('rmwc-circular-progress--small')[0]
    ).toBeInTheDocument();

    rerender(<CircularProgress size="medium" />);
    expect(
      container.getElementsByClassName('rmwc-circular-progress--medium')[0]
    ).toBeInTheDocument();

    rerender(<CircularProgress size="large" />);
    expect(
      container.getElementsByClassName('rmwc-circular-progress--large')[0]
    ).toBeInTheDocument();

    rerender(<CircularProgress size="xlarge" />);
    expect(
      container.getElementsByClassName('rmwc-circular-progress--xlarge')[0]
    ).toBeInTheDocument();
  });

  it('can have number as size', () => {
    const { asFragment } = render(<CircularProgress size={72} />);
    expect(asFragment()).toMatchSnapshot();
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
