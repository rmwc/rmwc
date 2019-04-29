/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Snackbar } from './snackbar';

describe('Snackbar', () => {
  it('renders', () => {
    mount(
      <Snackbar
        open
        onClose={evt => {}}
        message="This is a new message"
        action={<div />}
      />
    );
  });
});
