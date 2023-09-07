import { render, screen } from '@testing-library/react';
import React from 'react';
import { Badge, BadgeAnchor } from './badge';

describe('Badge', () => {
  it('renders with label', () => {
    const { asFragment } = render(<Badge label="New" />);

    expect(screen.getByText('New')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('align end', () => {
    const { container } = render(<Badge align="end" />);

    expect(container.firstChild).toHaveClass('rmwc-badge--align-end');
  });

  it('align start', () => {
    const { container } = render(<Badge align="start" />);

    expect(container.firstChild).toHaveClass('rmwc-badge--align-start');
  });

  it('exited', () => {
    const { container } = render(<Badge exited />);

    expect(container.firstChild).toHaveClass('rmwc-badge--exited');
  });

  it('inset', () => {
    // cant assert, jsdom doesn't include css vars?
    const { asFragment } = render(<Badge inset="10rem" />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('BadgeAnchor', () => {
  it('renders', () => {
    const { asFragment } = render(<BadgeAnchor />);

    expect(asFragment()).toMatchSnapshot();
  });
});
