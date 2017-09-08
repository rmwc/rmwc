import React from 'react';
import { mount } from 'enzyme';
import {
  Dialog,
  DialogRoot,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from './dialog';

describe('Dialog', () => {
  it('simple Dialog renders', () => {
    mount(
      <Dialog
        title="This is a simple dialog"
        body="You can pass the body prop, or anything you want as children."
        open={true}
        onClose={evt => {}}
        onAccept={evt => alert('Accepted')}
        onCancel={evt => alert('Cancelled')}
      />
    );
  });

  it('custom Dialog renders', () => {
    mount(
      <Dialog open={true} onClose={evt => {}}>
        <DialogRoot>
          <DialogSurface>
            <DialogHeader>
              <DialogHeaderTitle>Dialog Title</DialogHeaderTitle>
            </DialogHeader>
            <DialogBody>This is a custom dialog.</DialogBody>
            <DialogFooter>
              <DialogFooterButton cancel>Cancel</DialogFooterButton>
              <DialogFooterButton accept>Sweet!</DialogFooterButton>
            </DialogFooter>
          </DialogSurface>
          <DialogBackdrop />
        </DialogRoot>
      </Dialog>
    );
  });
});
