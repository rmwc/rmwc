import { render } from '@testing-library/react';
import { RMWCProvider } from './provider';

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
});
