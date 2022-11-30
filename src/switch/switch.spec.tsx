import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './';

describe('Switch', () => {
  test('renders', () => {
    const { asFragment } = render(<Switch />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('can be checked', () => {
    render(<Switch checked onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('checked');
  });

  test('handles onChange', async () => {
    let value = 0;
    render(<Switch checked={true} onChange={() => value++} />);

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

  it('supports inputRef as an object reference', () => {
    const inputObjectRef: any = { current: null };
    render(<Switch inputRef={inputObjectRef} />);
    expect(inputObjectRef.current instanceof HTMLInputElement).toBeTruthy();
  });

  it('supports inputRef as a function reference', () => {
    let inputObjectRef: any;
    const objectRefFunc: any = (el: HTMLInputElement) => {
      inputObjectRef = el;
    };
    render(<Switch inputRef={objectRefFunc} />);
    expect(inputObjectRef instanceof HTMLInputElement).toBeTruthy();
  });
});
