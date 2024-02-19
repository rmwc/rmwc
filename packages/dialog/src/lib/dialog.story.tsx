import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
  SimpleDialog
} from './dialog';
import { createDialogQueue, DialogQueue } from './dialog-queue';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '@rmwc/button';

export default {
  title: 'Dialog',
  component: Dialog
} as Meta;

type Story = StoryObj<typeof Dialog>;

export const DialogStory: Story = {
  render: (args) => {
    return (
      <Dialog {...args}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>This is a dialog</DialogContent>
        <DialogActions>
          <DialogButton action="dismiss">Dismiss</DialogButton>
          <DialogButton action="confirm">Confirm</DialogButton>
        </DialogActions>
      </Dialog>
    );
  },
  args: {
    open: true
  }
};

export const SimpleDialogStory: Story = {
  render: (args) => {
    return (
      <SimpleDialog
        {...args}
        onClose={(evt) => {
          console.log(evt.detail.action);
        }}
        title="This is a simple dialog"
        body="You can pass the body prop, or anything you want as children."
        acceptLabel="Sweet!"
      />
    );
  },
  args: {
    open: true
  }
};

export const SimpleDialogQueueStory: StoryObj<typeof DialogQueue> = {
  render: (args) => {
    const dialogQueue = createDialogQueue();

    return (
      <>
        <Button
          onClick={() => {
            dialogQueue.alert({
              title: 'Hello!',
              body: 'You have been alerted!',
              acceptLabel: 'OK'
            });
          }}
        >
          Alert
        </Button>
        <DialogQueue dialogs={dialogQueue.dialogs} />
      </>
    );
  }
};

const { dialogs, alert, confirm, prompt } = createDialogQueue();

export const PreventOutsideDismissBugStory: Story = {
  render: (args) => {
    const Component = () => {
      const [open, setOpen] = useState(false);
      const [preventOutsideDismiss, setPreventOutsideDismiss] = useState(false);
      return (
        <React.Fragment>
          To see the bug in action:
          <br />
          <ol>
            <li>Open the dialog using the button below.</li>
            <li>
              Observe that `preventOutsideDismiss` is `false` and is working as
              expected
            </li>
            <li>Click the "TOGGLE" button</li>
            <li>
              Observe that the dialog is CORRECTLY NOT DISMISSED when clicking
              outside
            </li>
            <li>
              Observe that the dialog is INCORRECTLY DISMISSED when using the
              escape key
            </li>
          </ol>
          <br />
          <Button raised icon="bug_report" onClick={() => setOpen(true)}>
            Open Dialog
          </Button>
          <Dialog
            open={open}
            preventOutsideDismiss={preventOutsideDismiss}
            onClosed={() => setOpen(false)}
          >
            <DialogTitle>Prevent Dismiss Demo</DialogTitle>
            <DialogContent>
              Prevent outside dismiss is currently:{' '}
              {preventOutsideDismiss.toString()}
            </DialogContent>
            <Button onClick={() => setPreventOutsideDismiss((p) => !p)}>
              Toggle
            </Button>
          </Dialog>
        </React.Fragment>
      );
    };
    return <Component />;
  }
};

export const DialogQueueStory: Story = {
  render: (args) => {
    const fireAlert = () => alert({}).then((res) => console.log(res));
    const fireConfirm = () => confirm({}).then((res) => console.log(res));
    const firePrompt = () =>
      prompt({ inputProps: { outlined: true } }).then((res) =>
        console.log(res)
      );

    return (
      <>
        <Button label="Alert" onClick={fireAlert} />
        <Button label="Confirm" onClick={fireConfirm} />
        <Button label="Prompt" onClick={firePrompt} />
        <Button
          label="All"
          onClick={() => {
            fireAlert();
            fireConfirm();
            firePrompt();
          }}
        />
        <DialogQueue dialogs={dialogs} />
      </>
    );
  }
};
