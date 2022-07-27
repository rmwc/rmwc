import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('handles onChange', async () => {
    let value = 0;
    render(<Slider onChange={() => value++} />);
    userEvent.click(screen.getByRole('slider'));
    await waitFor(() => expect(value).toEqual(1));
  });

  it('handles onInput', async () => {
    let value = 0;
    render(<Slider onInput={() => value++} />);
    userEvent.click(screen.getByRole('slider'));
    await waitFor(() => expect(value).toEqual(1));
  });

  it('handles min > 100', () => {
    render(<Slider min={101} max={200} />);
  });

  it('handles out of bounds', () => {
    render(<Slider value={0} min={1} max={2} />);
    render(<Slider value={3} min={1} max={2} />);
  });

  it('can have custom classnames', () => {
    const { container } = render(<Slider className={'my-custom-classname'} />);
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});
