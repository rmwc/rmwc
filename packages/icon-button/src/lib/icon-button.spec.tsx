import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { IconButton } from './icon-button';
import { RMWCProvider } from '@rmwc/provider';

describe('', () => {
  it('renders with icon as string', () => {
    const { asFragment } = render(
      <IconButton icon="star" label="Rate this!" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with icon as path', () => {
    const { asFragment } = render(
      <IconButton icon="images/icons/twitter.png" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with icon as JSX', () => {
    const { asFragment } = render(
      <IconButton icon={<div />} label="Tweet it!" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as toggle', () => {
    const { asFragment } = render(
      <IconButton onIcon="favorite" icon="favorite_border" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders controlled', () => {
    const { asFragment } = render(
      <IconButton
        checked={true}
        onClick={() => {}}
        onIcon="star"
        icon="star_border"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('handles onChange', async () => {
    let value = 0;
    render(
      <IconButton
        onChange={() => (value += 1)}
        onIcon="favorite"
        icon="favorite_border"
      />
    );

    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(value).toEqual(1));
  });

  it('forwards props only once', async () => {
    render(<IconButton icon="favorite_border" data-testid="forwarded-props" />);
    expect(screen.getAllByTestId('forwarded-props').length).toEqual(1);
  });

  it('can have custom classnames', () => {
    const { container } = render(
      <IconButton icon="star" className={'my-custom-classname'} />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('adheres to ripple from provider', () => {
    const { rerender } = render(
      <RMWCProvider ripple={true}>
        <IconButton icon="star" label="Rate this!" />
      </RMWCProvider>
    );
    expect(screen.getByRole('button')).toHaveClass(
      'mdc-ripple-upgraded--unbounded'
    );

    rerender(
      <RMWCProvider ripple={false}>
        <IconButton icon="star" label="Rate this!" />
      </RMWCProvider>
    );
    expect(screen.getByRole('button')).not.toHaveClass(
      'mdc-ripple-upgraded--unbounded'
    );
  });
});
