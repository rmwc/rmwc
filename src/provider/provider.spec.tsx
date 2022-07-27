import React from 'react';
import { render } from '@testing-library/react';
import { RMWCProvider } from './';
import { Button } from '@rmwc/button';
import { Icon } from '@rmwc/icon';

describe('Provider', () => {
  it('renders', () => {
    const { asFragment } = render(
      <RMWCProvider>
        <div />
      </RMWCProvider>
    );

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div />
      </DocumentFragment>
    `);
  });

  it('can set default ripple', () => {
    const { container } = render(
      <RMWCProvider ripple={false}>
        <Button />
      </RMWCProvider>
    );
    expect(container.firstChild).not.toHaveClass('mdc-ripple-surface');
  });

  it('can set icon options', () => {
    const { container } = render(
      <RMWCProvider icon={{ basename: 'my-icon-lib-test' }}>
        <Icon icon="foo" />
      </RMWCProvider>
    );
    expect(container.firstChild).toHaveClass('my-icon-lib-test');
  });
});
