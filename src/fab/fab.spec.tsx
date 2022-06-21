import React from 'react';
import { render, screen } from '@testing-library/react';
import { Fab } from './';

describe('Fab', () => {
  it('renders', () => {
    const { container } = render(<Fab />);
    expect(container.firstChild).toHaveClass('mdc-fab');
    expect(container).toMatchSnapshot();
  });

  it('can be mini', () => {
    const { container } = render(<Fab mini />);
    expect(container.firstChild).toHaveClass('mdc-fab--mini');
  });

  it('can ripple', () => {
    const { container } = render(<Fab ripple />);
    expect(container.firstChild).toHaveClass('mdc-fab');
  });

  it('cannot ripple', () => {
    const { container } = render(<Fab ripple={false} />);
    expect(container.firstChild).not.toHaveClass('mdc-ripple-surface');
  });

  it('can be extended', () => {
    render(<Fab label="test-label" icon="favorite" />);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('can have custom classnames', () => {
    const { container } = render(<Fab className={'my-custom-classname'} />);
    expect(container.firstChild).toHaveClass('my-custom-classname');
  });
});
