import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './';

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

  it('can have custom classnames', () => {
    const { container } = render(
      <IconButton icon="star" className={'my-custom-classname'} />
    );
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});
