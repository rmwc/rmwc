/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import { Snackbar } from './';

describe('Snackbar', () => {
  it('renders', () => {
    mount(
      <Snackbar
        show
        onHide={evt => {}}
        message="This is a new message"
        actionText="Action"
        actionHandler={() => alert('Action clicked')}
      />
    );
  });
});
