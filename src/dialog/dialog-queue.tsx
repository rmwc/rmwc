import * as React from 'react';
import { SimpleDialog, SimpleDialogProps, DialogOnCloseEventT } from './dialog';
import { ArrayEmitter, randomId } from '@rmwc/base';
import { TextField, TextFieldProps } from '@rmwc/textfield';
import { ComponentProps, MergeInterfacesT } from '@rmwc/types';

interface DialogQueueInputBase extends SimpleDialogProps {
  id?: string;
  /** Props for the input when using the prompt dialog. Only applies to prompt. */
  inputProps?: MergeInterfacesT<TextFieldProps, ComponentProps>;
}

export interface DialogQueueInput
  extends MergeInterfacesT<DialogQueueInputBase, ComponentProps> {}

interface DialogQueueSpec extends DialogQueueInput {
  id: string;
  resolve: (response: any) => void;
  reject: (reason: any) => void;
}

/** A snackbar queue for rendering messages */
export interface DialogQueueProps extends SimpleDialogProps {
  dialogs: ArrayEmitter<DialogQueueSpec>;
}

interface DialogQueueState {
  closingDialogs: { [id: string]: true };
}

/** A snackbar queue for rendering messages */
export class DialogQueue extends React.Component<
  MergeInterfacesT<DialogQueueProps, ComponentProps>,
  DialogQueueState
> {
  static displayName = 'DialogQueue';

  state: DialogQueueState = {
    closingDialogs: {}
  };

  constructor(props: DialogQueueProps) {
    super(props);
    this.forceUpdate = this.forceUpdate.bind(this);
    this.props.dialogs.on('change', this.forceUpdate);
  }

  componentWillUnmount() {
    this.props.dialogs.off('change', this.forceUpdate);
  }

  removeDialog(evt: DialogOnCloseEventT, dialog: DialogQueueSpec) {
    this.setState(
      {
        closingDialogs: {
          ...this.state.closingDialogs,
          [dialog.id]: true
        }
      },
      () => {
        dialog.resolve(evt);
        setTimeout(() => {
          const index = this.props.dialogs.array.indexOf(dialog);
          !!~index && this.props.dialogs.array.splice(index, 1);

          const { closingDialogs } = this.state;
          delete closingDialogs[dialog.id];

          this.setState({
            closingDialogs
          });
        }, 150);
      }
    );
  }

  render() {
    const { dialogs, ...defaultDialogProps } = this.props;

    // A simple way to show only one at a time
    // We loop through until we find a dialog thats not closing
    // When one is closing, we flip this flag and render all of the other ones in a closed state
    // This ensures we get the proper animations for closing dialogs
    let foundOpen = false;

    return dialogs.array.map(dialog => {
      const { resolve, reject, id, inputProps, ...rest } = dialog;

      const rendered = (
        <SimpleDialog
          {...defaultDialogProps}
          {...rest}
          key={id}
          open={!this.state.closingDialogs[id] && !foundOpen}
          onClose={evt => {
            this.removeDialog(evt, dialog);
            dialog.onClose && dialog.onClose(evt);
          }}
        />
      );

      if (!this.state.closingDialogs[id]) {
        foundOpen = true;
      }

      return rendered;
    });
  }
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
class PromptBody extends React.Component<{
  body?: React.ReactNode;
  inputProps?: MergeInterfacesT<TextFieldProps, ComponentProps>;
  apiRef: (getValue: () => string) => void;
}> {
  static displayName = 'PromptBody';

  state = {
    value: ''
  };

  componentDidMount() {
    this.props.apiRef(() => this.state.value);
  }

  render() {
    return (
      <div>
        {!!this.props.body && (
          <div style={{ marginBottom: '1rem' }}>{this.props.body}</div>
        )}
        <TextField
          style={{ width: '100%' }}
          autoFocus
          {...this.props.inputProps}
          value={this.state.value}
          onChange={evt => this.setState({ value: evt.currentTarget.value })}
        />
      </div>
    );
  }
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
