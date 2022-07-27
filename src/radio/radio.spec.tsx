import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './';

describe('Radio', () => {
  test('renders', () => {
    const { container } = render(<Radio label="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('can be checked', () => {
    render(<Radio checked onChange={() => {}} />);
    expect(screen.getByRole('radio')).toHaveAttribute('checked');
  });

  test('handles onChange', () => {
    let val = 0;
    render(<Radio checked onChange={() => val++} label="Click me" />);

    userEvent.click(screen.getByText('Click me'));

    waitFor(() => {
      expect(val).toBe(1);
    });
  });

  test('can be disabled', () => {
    render(<Radio disabled />);

    expect(screen.getByRole('radio')).toHaveAttribute('disabled');
  });

  test('can have custom classnames on input', () => {
    const { container } = render(<Radio className={'my-custom-classname'} />);
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});
