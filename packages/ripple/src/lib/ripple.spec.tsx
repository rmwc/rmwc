import { render } from '@testing-library/react';
import React from 'react';
import { Ripple } from './ripple';
import { RMWCProvider } from '@rmwc/provider';

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

  it('matches snapshot for ripple set to false', () => {
    const { asFragment } = render(
      <RMWCProvider ripple={false}>
        <Ripple unbounded>
          <div />
        </Ripple>
      </RMWCProvider>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div />
      </DocumentFragment>
    `);
  });

  it('matches snapshot for ripple set to true', () => {
    const { asFragment } = render(
      <RMWCProvider ripple={true}>
        <Ripple unbounded>
          <div />
        </Ripple>
      </RMWCProvider>
    );
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="mdc-ripple-upgraded--unbounded mdc-ripple-surface"
          data-mdc-ripple-is-unbounded="true"
        />
      </DocumentFragment>
    `);
  });
});
