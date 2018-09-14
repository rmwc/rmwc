import * as React from 'react';
import { mount } from 'enzyme';
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
        header="Foo"
        body="You can pass the body prop, or anything you want as children."
        open
        onClose={evt => {}}
        onAccept={evt => console.log('Accepted')}
        onCancel={evt => console.log('Cancelled')}
      />
    );
  });

  it('simple Dialog renders with no children', () => {
    mount(
      <SimpleDialog
        title="This is a simple dialog"
        open
        onClose={evt => {}}
        onAccept={evt => console.log('Accepted')}
        onCancel={evt => console.log('Cancelled')}
      />
    );
  });

  it('simple Dialog renders with children', () => {
    mount(
      <SimpleDialog
        title="This is a simple dialog"
        open
        onClose={evt => {}}
        onAccept={evt => console.log('Accepted')}
        onCancel={evt => console.log('Cancelled')}
        acceptLabel={null}
        cancelLabel={null}
      >
        Hello
      </SimpleDialog>
    );
  });

  it('Dialog lifecycle', () => {
    const el = mount(
      <Dialog onClose={evt => {}}>
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

    el.setProps({ open: true });

    const acceptButton = el.find('button.mdc-dialog__footer__button--accept');
    acceptButton.simulate('click');

    el.setProps({ open: true });

    const cancelButton = el.find('button.mdc-dialog__footer__button--cancel');
    cancelButton.simulate('click');

    el.instance().foundation_.adapter_.notifyAccept();
    el.instance().foundation_.adapter_.notifyCancel();
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
