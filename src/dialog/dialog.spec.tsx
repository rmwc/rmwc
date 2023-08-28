import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { asFragment } = render(
      <SimpleDialog
        title="This is a simple dialog"
        header="Foo"
        body="You can pass the body prop, or anything you want as children."
        open
        onClose={(evt) => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('simple Dialog renders with no children', () => {
    const { asFragment } = render(
      <SimpleDialog
        title="This is a simple dialog"
        open
        onClose={(evt) => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('simple Dialog renders with children', () => {
    const { asFragment } = render(
      <SimpleDialog title="This is a simple dialog" open onClose={(evt) => {}}>
        Hello
      </SimpleDialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('triggers onOpen', () => {
    const onOpen = jest.fn();
    render(
      <SimpleDialog title="This is a simple dialog" open onOpen={onOpen}>
        Hello
      </SimpleDialog>
    );

    expect(onOpen).toHaveBeenCalled();
  });

  it('triggers onClose', () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <SimpleDialog
        title="This is a simple dialog"
        open={true}
        onClose={onClose}
      >
        Hello
      </SimpleDialog>
    );

    expect(onClose).not.toHaveBeenCalled();

    rerender(
      <SimpleDialog
        title="This is a simple dialog"
        open={false}
        onClose={onClose}
      >
        Hello
      </SimpleDialog>
    );

    expect(onClose).toHaveBeenCalled();
  });

  it('standard Dialog renders', () => {
    const el = render(
      <Dialog open onClose={(evt) => {}}>
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
});

describe('DialogQueue', () => {
  it('renders', () => {
    const queue = createDialogQueue();
    const el = render(<DialogQueue dialogs={queue.dialogs} />);
    el.unmount();
  });

  it('alerts and accepts', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);

    queue.alert({ title: 'myAlert' });

    expect(screen.getByText('myAlert')).toBeInTheDocument();

    userEvent.click(screen.getByText('OK'));

    await waitFor(() =>
      expect(screen.queryByText('OK')).not.toBeInTheDocument()
    );
  });

  it('confirms and returns true', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' });

    expect(screen.getByText('myConfirm')).toBeInTheDocument();

    userEvent.click(screen.getByText('OK'));

    await waitFor(() =>
      expect(screen.queryByText('OK')).not.toBeInTheDocument()
    );
  });

  it('confirms and returns false', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' });

    expect(screen.getByText('myConfirm')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));

    await waitFor(() =>
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    );
  });

  it('prompts and returns value', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);

    queue.prompt({ title: 'myPrompt' });

    expect(screen.getByText('myPrompt')).toBeInTheDocument();

    userEvent.click(screen.getByText('Accept'));

    await waitFor(() =>
      expect(screen.queryByText('Accept')).not.toBeInTheDocument()
    );
  });

  it('prompts and returns null', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);

    queue.prompt({ title: 'myPrompt', body: 'CUSTOM BODY' });

    expect(screen.getByText('myPrompt')).toBeInTheDocument();
    expect(screen.getByText('CUSTOM BODY')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));

    await waitFor(() =>
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    );
  });

  it('supports onClose', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);
    const onClose = jest.fn();
    queue.alert({ onClose });

    userEvent.click(screen.getByText('OK'));

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
