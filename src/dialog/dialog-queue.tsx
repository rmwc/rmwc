// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as RMWC from '@rmwc/types';
import React, { useState, useEffect } from 'react';
import {
  SimpleDialog,
  SimpleDialogProps,
  SimpleDialogHTMLProps,
  DialogOnCloseEventT
} from './dialog';
import { ArrayEmitter, randomId } from '@rmwc/base';
import { TextField, TextFieldProps, TextFieldHTMLProps } from '@rmwc/textfield';

export interface DialogQueueInput
  extends SimpleDialogProps,
    SimpleDialogHTMLProps {
  id?: string;
  /** Props for the input when using the prompt dialog. Only applies to prompt. */
  inputProps?: TextFieldProps & TextFieldHTMLProps;
}

interface DialogQueueSpec extends DialogQueueInput {
  id: string;
  resolve: (response: any) => void;
  reject: (reason: any) => void;
}

/** A snackbar queue for rendering messages */
export interface DialogQueueProps extends SimpleDialogProps {
  dialogs: ArrayEmitter<DialogQueueSpec>;
}

/** A snackbar queue for rendering messages */
export function DialogQueue({
  dialogs,
  ...defaultDialogProps
}: DialogQueueProps) {
  const [, setIteration] = useState(0);
  const [closingDialogs, setClosingDialogs] = useState<{ [key: string]: true }>(
    {}
  );

  useEffect(() => {
    const forceUpdate = () => setIteration(val => val + 1);
    dialogs.on('change', forceUpdate);
    return () => {
      dialogs.off('change', forceUpdate);
    };
  }, [dialogs]);

  const removeDialog = (evt: DialogOnCloseEventT, dialog: DialogQueueSpec) => {
    setClosingDialogs({
      ...closingDialogs,
      [dialog.id]: true
    });

    dialog.resolve(evt);
    setTimeout(() => {
      // remove the dialog from our array
      const index = dialogs.array.indexOf(dialog);
      !!~index && dialogs.array.splice(index, 1);

      // remove it from the closing state
      const newClosingDialogs = { ...closingDialogs };
      delete newClosingDialogs[dialog.id];
      setClosingDialogs(newClosingDialogs);
    }, 150);
  };

  // A simple way to show only one at a time
  // We loop through until we find a dialog thats not closing
  // When one is closing, we flip this flag and render all of the other ones in a closed state
  // This ensures we get the proper animations for closing dialogs
  let foundOpen = false;

  return (
    <>
      {dialogs.array.map(dialog => {
        const { resolve, reject, id, inputProps, ...rest } = dialog;

        const rendered = (
          <SimpleDialog
            {...defaultDialogProps}
            {...rest}
            key={id}
            open={!closingDialogs[id] && !foundOpen}
            onClose={evt => {
              removeDialog(evt, dialog);
              dialog.onClose && dialog.onClose(evt);
            }}
          />
        );

        if (!closingDialogs[id]) {
          foundOpen = true;
        }

        return rendered;
      })}
    </>
  );
}

/**
 * A base dialog factory that handle setting up the promise
 * With some consistent behavior
 */
const dialogFactory = (
  factory: (dialog: DialogQueueSpec) => DialogQueueSpec,
  queue: ArrayEmitter<DialogQueueSpec>
) => (dialog: DialogQueueInput) => {
  return new Promise((resolve, reject) => {
    const d = factory({ id: randomId(), ...dialog, resolve, reject });
    queue.push(d);
  });
};

/**
 * Handle prompt dialogs
 * We have to jump through a few hoops to get the value back out
 */
function PromptBody({
  body,
  inputProps,
  apiRef
}: {
  body?: React.ReactNode;
  inputProps?: DialogQueueInput['inputProps'];
  apiRef: (getValue: () => string) => void;
}) {
  const [value, setValue] = useState('');

  useEffect(() => {
    apiRef(() => value);
  }, [apiRef, value]);

  return (
    <div>
      {!!body && <div style={{ marginBottom: '1rem' }}>{body}</div>}
      <TextField
        style={{ width: '100%' }}
        autoFocus
        {...inputProps}
        value={value}
        onChange={evt => {
          setValue(evt.currentTarget.value);
        }}
      />
    </div>
  );
}

const promptFactory = (dialog: DialogQueueSpec): DialogQueueSpec => {
  let getValue: any = () => '';

  const body = (
    <PromptBody
      body={dialog.body}
      inputProps={dialog.inputProps}
      apiRef={_getValue => (getValue = _getValue)}
    />
  );

  return {
    title: 'Prompt',
    ...dialog,
    body,
    resolve: (evt: DialogOnCloseEventT) => {
      dialog.resolve(evt.detail.action === 'accept' ? getValue() : null);
      getValue = undefined;
    }
  };
};

/** Alerts */
const alertFactory = (dialog: DialogQueueSpec): DialogQueueSpec => ({
  title: 'Alert',
  body: 'You have been alerted!',
  acceptLabel: 'OK',
  cancelLabel: null,
  ...dialog,
  resolve: (evt: DialogOnCloseEventT) => dialog.resolve(evt.detail.action)
});

/** Confirm */
const confirmFactory = (dialog: DialogQueueSpec): DialogQueueSpec => ({
  title: 'Confirm',
  body: 'Are you sure you want do that?',
  acceptLabel: 'OK',
  cancelLabel: 'Cancel',
  ...dialog,
  resolve: (evt: DialogOnCloseEventT) =>
    dialog.resolve(evt.detail.action === 'accept')
});

/** Creates a snackbar queue */
export const createDialogQueue = (): {
  dialogs: ArrayEmitter<DialogQueueSpec>;
  alert: (dialog: DialogQueueInput) => Promise<any>;
  confirm: (dialog: DialogQueueInput) => Promise<any>;
  prompt: (dialog: DialogQueueInput) => Promise<any>;
} => {
  const dialogs = new ArrayEmitter<DialogQueueSpec>();

  return {
    dialogs,
    alert: dialogFactory(alertFactory, dialogs),
    confirm: dialogFactory(confirmFactory, dialogs),
    prompt: dialogFactory(promptFactory, dialogs)
  };
};
