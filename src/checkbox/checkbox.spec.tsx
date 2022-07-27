import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './';

describe('Checkbox', () => {
  test('renders', () => {
    const { asFragment } = render(<Checkbox />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('can be checked', () => {
    const { container, rerender } = render(
      <Checkbox checked={false} onChange={() => {}} />
    );
    const input = screen.getByRole('checkbox') as HTMLInputElement;

    expect(container.firstChild).not.toHaveClass('mdc-checkbox--selected');
    expect(input.checked).toBe(false);

    rerender(<Checkbox checked={true} onChange={() => {}} />);

    expect(container.firstChild).toHaveClass('mdc-checkbox--selected');
    expect(input.checked).toBe(true);
  });

  test('handles onChange', async () => {
    const onChange = jest.fn();
    render(<Checkbox checked={true} onChange={onChange} label="Click me" />);

    userEvent.click(screen.getByText('Click me'));

    await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
  });

  test('can be disabled', () => {
    const { container } = render(<Checkbox disabled />);

    expect(container.firstChild).toHaveClass('mdc-checkbox--disabled');
  });

  test('can be indeterminate', () => {
    const { container } = render(<Checkbox indeterminate />);

    expect(container.firstChild).toHaveClass('mdc-checkbox--selected');
  });

  test('can have a label', () => {
    render(<Checkbox label="hello world" />);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  test('can have custom classnames on input', () => {
    const { container } = render(
      <Checkbox className={'my-custom-classname'} />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('supports inputRef as an object reference', () => {
    const inputObjectRef: any = { current: null };
    render(<Checkbox inputRef={inputObjectRef} />);
    expect(inputObjectRef.current instanceof HTMLInputElement).toBeTruthy();
  });

  it('supports inputRef as a function reference', () => {
    let inputObjectRef: any;
    const objectRefFunc: any = (el: HTMLInputElement) => {
      inputObjectRef = el;
    };
    render(<Checkbox inputRef={objectRefFunc} />);
    expect(inputObjectRef instanceof HTMLInputElement).toBeTruthy();
  });
});
