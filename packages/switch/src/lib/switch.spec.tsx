import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Switch } from './switch';

describe('Switch', () => {
  test('renders', () => {
    const { asFragment } = render(<Switch />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('can be checked', () => {
    render(<Switch checked={true} />);
    expect(screen.getByRole('switch')).toHaveClass('mdc-switch--selected');
  });

  test('handles onChange', async () => {
    let value = 0;
    render(<Switch checked={true} onClick={() => value++} />);

    userEvent.click(screen.getByRole('switch'));

    await waitFor(() => expect(value).toEqual(1));
  });

  test('can be disabled', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('disabled');
  });

  test('can have a label', () => {
    render(<Switch label="hello world" />);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  test('can have custom classnames on input', () => {
    const { container } = render(<Switch className={'my-custom-classname'} />);
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});
