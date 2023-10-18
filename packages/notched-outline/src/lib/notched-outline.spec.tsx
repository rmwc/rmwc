import React from 'react';
import { render } from '@testing-library/react';
import { NotchedOutline } from './notched-outline';

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
  it('renders with notch', () => {
    const { asFragment } = render(<NotchedOutline notch={1} />);
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="mdc-notched-outline mdc-notched-outline--notched mdc-notched-outline--no-label"
          notch="1"
        >
          <div
            class="mdc-notched-outline__leading"
          />
          <div
            class="mdc-notched-outline__notch"
            style="width: 9px;"
          />
          <div
            class="mdc-notched-outline__trailing"
          />
        </div>
      </DocumentFragment>
    `);
  });
});
