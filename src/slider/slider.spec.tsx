import React from 'react';
import { render } from '@testing-library/react';
import { Slider } from './';

jest.spyOn(console, 'warn');

describe('Slider', () => {
  it('renders uncontrolled', () => {
    const { asFragment } = render(<Slider />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('warns when not displayMarkers and discrete', () => {
    render(<Slider displayMarkers />);
    expect(console.warn).toHaveBeenCalled();
  });

  it('renders with all props', () => {
    const { asFragment } = render(
      <Slider
        value={50}
        discrete
        displayMarkers
        min={0}
        max={100}
        step={10}
        disabled
        onChange={() => {}}
        onInput={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles min > 100', () => {
    render(<Slider min={101} max={200} value={102} />);
  });

  it('can have custom classnames', () => {
    const { container } = render(<Slider className={'my-custom-classname'} />);
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('can be a range slider', () => {
    const { asFragment, container } = render(<Slider range />);
    expect(container.firstChild).toHaveClass('mdc-slider--range');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with range slider props', () => {
    const { asFragment } = render(
      <Slider range value={9} valueStart={2} min={1} max={10} minRange={1} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
