import React from 'react';
import { render } from '@testing-library/react';
import { Ripple } from './';

describe('Ripple', () => {
  it('renders', () => {
    const { asFragment } = render(
      <Ripple>
        <div />
      </Ripple>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="mdc-ripple-surface"
        />
      </DocumentFragment>
    `);
  });

  it('can be primary', () => {
    const { container } = render(
      <Ripple primary>
        <div />
      </Ripple>
    );
    expect(container.firstChild).toHaveClass('mdc-ripple-surface--primary');
    expect(container.firstChild).toHaveClass('rmwc-ripple-surface--primary');
  });

  it('can be accent', () => {
    const { container } = render(
      <Ripple accent>
        <div />
      </Ripple>
    );
    expect(container.firstChild).toHaveClass('mdc-ripple-surface--accent');
    expect(container.firstChild).toHaveClass('rmwc-ripple-surface--accent');
  });

  it('can be surface', () => {
    const { container } = render(
      <Ripple surface>
        <div />
      </Ripple>
    );
    expect(container.firstChild).toHaveClass('mdc-ripple-surface');
  });

  it('can be unbounded', () => {
    const { container } = render(
      <Ripple unbounded>
        <div />
      </Ripple>
    );
    expect(container.firstChild).toHaveClass('mdc-ripple-upgraded--unbounded');
  });
});
