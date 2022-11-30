import React from 'react';
import { render } from '@testing-library/react';
import { NotchedOutline } from './';

describe('NotchedOutline', () => {
  it('renders', () => {
    const { asFragment } = render(<NotchedOutline />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="mdc-notched-outline mdc-notched-outline--no-label"
        >
          <div
            class="mdc-notched-outline__leading"
          />
          <div
            class="mdc-notched-outline__notch"
          />
          <div
            class="mdc-notched-outline__trailing"
          />
        </div>
      </DocumentFragment>
    `);
  });
});
