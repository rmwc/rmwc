import * as React from 'react';
import { mount } from 'enzyme';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
  SimpleDialog,
  createDialogQueue,
  DialogQueue
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
    let lifecycle: string[] = [];

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
        expect(opened).toBe(3);
        expect(closed).toBe(3);
        expect(lifecycle).toEqual([
          'opening',
          'closing',
          'opening',
          'opened',
          'closing',
          'opening',
          'closing',
          'closed'
        ]);
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

    const adapter = ((el.instance() as Dialog).foundation as any).adapter_;
    adapter.addClass('test');
    adapter.removeClass('test');
    adapter.hasClass('test');
    adapter.addBodyClass('test');
    adapter.removeBodyClass('test');
    adapter.reverseButtons();
    adapter.clickDefaultButton();
  });
});

describe('DialogQueue', () => {
  it('renders', () => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    el.unmount();
  });

  it('alerts and accepts', done => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.alert({ title: 'myAlert' }).then(resp => {
      expect(resp).toBe('accept');

      // wait for cleanup
      setTimeout(() => {
        done();
      }, 200);
    });

    el.update();
    expect(el.html().includes('myAlert')).toBe(true);
    setTimeout(() => {
      el.find('.mdc-dialog__button')
        .first()
        .simulate('click');
    }, 100);
  });

  it('alerts and closes', done => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.alert({ title: 'myAlert' }).then(resp => {
      expect(resp).toBe('close');
      done();
    });

    el.update();

    el.find('.mdc-dialog__scrim')
      .first()
      .simulate('click');
  });

  it('confirms and returns true', done => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' }).then(resp => {
      expect(resp).toBe(true);
      done();
    });

    el.update();
    expect(el.html().includes('myConfirm')).toBe(true);

    el.find('[action="accept"]')
      .first()
      .simulate('click');
  });

  it('confirms and returns false', done => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' }).then(resp => {
      expect(resp).toBe(false);
      done();
    });

    el.update();

    el.find('[action="close"]')
      .first()
      .simulate('click');
  });

  it('prompts and returns value', done => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.prompt({ title: 'myPrompt' }).then(resp => {
      expect(resp).toBe('WORKING');
      done();
    });

    el.update();
    expect(el.html().includes('myPrompt')).toBe(true);

    el.find('TextField').simulate('change', {
      currentTarget: { value: 'WORKING' }
    });
    (el.find('PromptBody').instance().state as any).value = 'WORKING';

    el.update();

    el.find('[action="accept"]')
      .first()
      .simulate('click');
  });

  it('prompts and returns null', done => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    queue.prompt({ title: 'myPrompt', body: 'CUSTOM BODY' }).then(resp => {
      expect(resp).toBe(null);
      done();
    });

    el.update();

    expect(el.html().includes('CUSTOM BODY')).toBe(true);

    el.find('[action="close"]')
      .first()
      .simulate('click');
  });

  it('supports onClose', () => {
    const queue = createDialogQueue();
    const el = mount(<DialogQueue dialogs={queue.dialogs} />);
    const onClose = jest.fn();
    queue.alert({ onClose });

    el.update();

    el.find('.mdc-dialog__button')
      .first()
      .simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
