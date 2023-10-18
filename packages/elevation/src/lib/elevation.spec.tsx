import { render } from '@testing-library/react';
import React from 'react';
import { Elevation } from './elevation';

describe('Elevation', () => {
  it('renders', () => {
    const { asFragment } = render(<Elevation z={0} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have z value', () => {
    const { container } = render(<Elevation z="24" />);
    expect(container.firstChild).toHaveClass('mdc-elevation--z24');
  });

  it('can transition', () => {
    const { container } = render(<Elevation transition z={0} />);
    expect(container.firstChild).toHaveClass('mdc-elevation-transition');
  });

  it('can have custom classnames', () => {
    const { container } = render(
      <Elevation z={0} className={'my-custom-classname'} />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});
