import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
import { useKnob } from '@rmwc/base/utils/use-knob';
import { Button } from '@rmwc/button';

const DialogStory = function () {
  let [open, setOpen] = useKnob('boolean', 'open', true);

  return (
    <Dialog
      open={open}
      foundationRef={console.log}
      onClose={(evt) => {
        console.log(evt.detail.action);
        setOpen(false);
      }}
    >
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>This is a standard dialog.</DialogContent>
      <DialogActions>
        <DialogButton action="close">Cancel</DialogButton>
        <DialogButton action="accept" isDefaultAction>
          Sweet!
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
};

function SimpleDialogStory() {
  const [open, setOpen] = useKnob('boolean', 'open', true);
  const [title] = useKnob('text', 'title', 'This is a simple dialog');
  const [body] = useKnob(
    'text',
    'body',
    'You can pass the body prop, or anything you want as children.'
  );
  const [acceptLabel] = useKnob('text', 'acceptLabel', 'Accept');
  const [cancelLabel] = useKnob('text', 'cancelLabel', 'Cancel');

  return (
    <SimpleDialog
      title={title}
      body={body}
      open={open}
      onClose={(evt) => {
        setOpen(false);
        action('onClose')();
      }}
      acceptLabel={acceptLabel}
      cancelLabel={cancelLabel}
    />
  );
}

const { dialogs, alert, confirm, prompt } = createDialogQueue();

storiesOf('Dialogs', module)
  .add('Dialog', () => <DialogStory />)
  .add('SimpleDialog', () => <SimpleDialogStory />)
  .add('DialogQueue', () => {
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
  });
