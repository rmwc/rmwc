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

  it('Dialog lifecycle', done => {
    let opened = 0;
    let closed = 0;
    let lifecycle = [];

    const el = mount(
      <Dialog
        onOpen={() => opened++}
        onClose={() => closed++}
        onStateChange={state => lifecycle.push(state)}
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

    setTimeout(() => {
      const cancelButton = el.find('button.mdc-dialog__button').first();
      cancelButton.simulate('click');

      el.setProps({ open: false });
      setTimeout(() => {
        expect(opened).toBe(1);
        expect(closed).toBe(1);
        expect(lifecycle).toEqual(['opening', 'opened', 'closing', 'closed']);
        done();
      }, 1000);
    }, 1000);
  });

  it('standard Dialog renders', () => {
    const el = mount(
      <Dialog open onClose={evt => {}}>
        <DialogTitle>Dialog Title</DialogTitle>

        <DialogContent>This is a custom dialog.</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept">Sweet!</DialogButton>
        </DialogActions>
      </Dialog>
    );

    el.unmount();
  });

  it('foundation check', () => {
    const el = mount(
      <Dialog open onClose={evt => {}}>
        <DialogTitle>Dialog Title</DialogTitle>

        <DialogContent>This is a custom dialog.</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept" isDefaultAction>
            Sweet!
          </DialogButton>
        </DialogActions>
      </Dialog>
    );

    el.find('button')
      .first()
      .simulate('click');

    const adapter = el.instance().foundation.adapter_;
    adapter.addClass('test');
    adapter.removeClass('test');
    adapter.hasClass('test');
    adapter.addBodyClass('test');
    adapter.removeBodyClass('test');
    adapter.reverseButtons();
    adapter.clickDefaultButton();
  });
});
