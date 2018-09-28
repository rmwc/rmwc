import * as React from 'react';
import { mount } from 'enzyme';
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
        onClose={evt => {}}
      />
    );
  });

  it('simple Dialog renders with no children', () => {
    mount(
      <SimpleDialog title="This is a simple dialog" open onClose={evt => {}} />
    );
  });

  it('simple Dialog renders with children', () => {
    mount(
      <SimpleDialog title="This is a simple dialog" open onClose={evt => {}}>
        Hello
      </SimpleDialog>
    );
  });

  it('Dialog lifecycle', () => {
    const el = mount(
      <Dialog
        onClose={evt => {
          console.log('Close');
        }}
      >
        <DialogTitle>Dialog Title</DialogTitle>

        <DialogContent>This is a custom dialog.</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept">Sweet!</DialogButton>
        </DialogActions>
      </Dialog>
    );

    el.setProps({ open: true });

    const acceptButton = el.find('button.mdc-dialog__button').last();
    acceptButton.simulate('click');

    el.setProps({ open: true });

    const cancelButton = el.find('button.mdc-dialog__button').first();
    cancelButton.simulate('click');
  });

  it('standard Dialog renders', () => {
    mount(
      <Dialog open onClose={evt => {}}>
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
