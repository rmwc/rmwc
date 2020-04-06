/**
 * @jest-environment node
 */
import React from 'react';
import { renderToString as mount } from 'react-dom/server';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
  SimpleDialog
} from './';

describe('Dialog', () => {
  it('simple Dialog renders', () => {
    mount(
      <SimpleDialog
        title="This is a simple dialog"
        header="Foo"
        body="You can pass the body prop, or anything you want as children."
        open
        onClose={(evt) => {}}
      />
    );
  });

  it('standard Dialog renders', () => {
    mount(
      <Dialog open onClose={(evt) => {}}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>This is a custom dialog.</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept">Sweet!</DialogButton>
        </DialogActions>
      </Dialog>
    );
  });
});
