/**
 * @jest-environment node
 */
import * as React from 'react';
import { renderToString as mount } from 'react-dom/server';
import {
  Dialog,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop,
  SimpleDialog
} from './';

describe('Dialog', () => {
  it('simple Dialog renders', () => {
    mount(
      <SimpleDialog
        title="This is a simple dialog"
        body="You can pass the body prop, or anything you want as children."
        open
        onClose={evt => {}}
        onAccept={evt => console.log('Accepted')}
        onCancel={evt => console.log('Cancelled')}
      />
    );
  });

  it('standard Dialog renders', () => {
    mount(
      <Dialog open onClose={evt => {}}>
        <DialogSurface>
          <DialogHeader>
            <DialogHeaderTitle>Dialog Title</DialogHeaderTitle>
          </DialogHeader>
          <DialogBody scrollable>This is a custom dialog.</DialogBody>
          <DialogFooter>
            <DialogFooterButton cancel>Cancel</DialogFooterButton>
            <DialogFooterButton accept>Sweet!</DialogFooterButton>
          </DialogFooter>
        </DialogSurface>
        <DialogBackdrop />
      </Dialog>
    );
  });
});
