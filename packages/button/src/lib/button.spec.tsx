import { RMWCProvider } from '@rmwc/provider';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './button';

describe('Button', () => {
  it('renders', () => {
    const { asFragment } = render(<Button>Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have an icon', () => {
    const { asFragment } = render(<Button icon="favorite">Button</Button>);
    expect(screen.getByText('favorite')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can have a trailing icon', () => {
    const { asFragment } = render(
      <Button trailingIcon="favorite">Button</Button>
    );
    expect(screen.getByText('favorite')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be raised', () => {
    const { container } = render(<Button raised />);
    expect(container.firstChild).toHaveClass('mdc-button--raised');
  });

  it('can be danger', () => {
    const { asFragment } = render(<Button danger />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can be unelevated', () => {
    const { container } = render(<Button unelevated />);
    expect(container.firstChild).toHaveClass('mdc-button--unelevated');
  });

  it('can be outlined', () => {
    const { container } = render(<Button outlined />);
    expect(container.firstChild).toHaveClass('mdc-button--outlined');
  });

  it('can be dense', () => {
    const { container } = render(<Button dense />);
    expect(container.firstChild).toHaveClass('mdc-button--dense');
  });

  it('can ripple', () => {
    const { container } = render(<Button ripple />);
    expect(container.firstChild).toHaveClass('mdc-button');
  });

  it('can not ripple', () => {
    const { container } = render(<Button ripple={undefined} />);
    expect(container.firstChild).toHaveClass('mdc-button');
  });

  it('can have custom classnames', () => {
    const { container } = render(<Button className={'my-custom-classname'} />);
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });

  it('can have a label', () => {
    render(<Button label="cookie" />);
    expect(screen.getByText('cookie')).toBeInTheDocument();
  });

  it('can read default ripple from provider', () => {
    const { container } = render(
      <RMWCProvider ripple={false}>
        <Button />
      </RMWCProvider>
    );
    expect(container.firstChild).not.toHaveClass('mdc-ripple-surface');
  });
});
