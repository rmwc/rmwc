/**
 * @jest-environment node
 */

import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Button, ButtonIcon } from './';

describe('Button SSR', () => {
  it('renders', () => {
    mount(
      <Button>
        <ButtonIcon icon="favorite" />
        Button
      </Button>
    );
  });
});
