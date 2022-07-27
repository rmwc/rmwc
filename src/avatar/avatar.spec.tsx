import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar, AvatarCount, AvatarGroup } from './';

describe('Avatar', () => {
  it('renders', () => {
    const { asFragment } = render(<Avatar src="test" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with contain', () => {
    const { asFragment } = render(<Avatar src="test" contain />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as AvatarGroup', () => {
    const { asFragment } = render(<AvatarGroup />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as AvatarCount with value of 4', () => {
    const { asFragment } = render(<AvatarCount value={4} />);

    expect(screen.getByText('4')).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });

  it('handles two names', () => {
    render(<Avatar name="James Friedman" />);

    expect(screen.getByText('JF')).toBeInTheDocument();
  });

  it('handles one name', () => {
    render(<Avatar name="James" />);

    expect(screen.getByText('J')).toBeInTheDocument();
  });
});
