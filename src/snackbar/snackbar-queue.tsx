import React from 'react';
import {
  Snackbar,
  SnackbarProps,
  SnackbarAction,
  SnackbarActionProps
} from './snackbar';
import { MergeInterfacesT, IconPropT } from '@rmwc/types';
import { ArrayEmitter } from '@rmwc/base';

interface SnackbarQueueMessageBase {
  title?: React.ReactNode;
  body?: React.ReactNode;
  icon?: IconPropT;
  actions?: Array<
    | NotificationAction
    | MergeInterfacesT<SnackbarActionProps, React.HTMLProps<any>>
  >;
}

export interface SnackbarQueueMessage
  extends SnackbarProps,
    MergeInterfacesT<SnackbarQueueMessageBase, NotificationOptions> {}

/** A snackbar queue for rendering messages */
export interface SnackbarQueueProps extends SnackbarProps {
  messages: ArrayEmitter<SnackbarQueueMessage>;
}

interface SnackbarQueueState {
  message?: SnackbarQueueMessage;
}

/** A snackbar queue for rendering messages */
export class SnackbarQueue extends React.Component<
  SnackbarQueueProps,
  SnackbarQueueState
> {
  static displayName = 'SnackbarQueue';

  state: SnackbarQueueState = {
    message: this.props.messages.array[0]
  };

  constructor(props: SnackbarQueueProps) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.props.messages.on('change', this.getMessage);
  }

  componentWillUnmount() {
    this.props.messages.off('change', this.getMessage);
  }

  getMessage() {
    if (this.props.messages.array[0] !== this.state.message) {
      this.setState({
        message: this.props.messages.array[0]
      });
    }
  }

  removeMessage(message?: SnackbarQueueMessage) {
    if (!message) return;

    setTimeout(() => {
      const index = this.props.messages.array.indexOf(message);
      !!~index && this.props.messages.array.splice(index, 1);
      this.setState(
        {
          message: undefined
        },
        this.getMessage
      );
    }, 75);
  }

  render() {
    const { messages, ...defaultSnackbarProps } = this.props;
    const { message } = this.state;

    const {
      body = '',
      image,
      title = '',
      onClose,
      actions,
      ...messageSnackbarProps
    } = (message || {}) as SnackbarQueueMessage;

    const actionProp = actions
      ? actions.map(({ title, label, ...rest }: any) => (
          <SnackbarAction {...rest} label={label || title} />
        ))
      : null;

    return (
      <Snackbar
        {...defaultSnackbarProps}
        {...messageSnackbarProps}
        open={!!message}
        message={
          <>
            {title}
            {!!title && !!body && <br />}
            {body}
            {!!image && (
              <div
                className="rmwc-snackbar__image"
                style={{
                  margin: '1rem auto',
                  textAlign: 'center'
                }}
              >
                <img
                  src={image}
                  alt={`${image}`}
                  style={{ maxWidth: '100%', maxHeight: '18rem' }}
                />
              </div>
            )}
          </>
        }
        onClose={evt => {
          onClose && onClose(evt);
          this.removeMessage(message);
        }}
        action={actionProp}
      />
    );
  }
}

/** Creates a snackbar queue */
export const createSnackbarQueue = (): {
  messages: ArrayEmitter<SnackbarQueueMessage>;
  notify: (message: SnackbarQueueMessage) => void;
} => {
  const messages = new ArrayEmitter<SnackbarQueueMessage>();

  return {
    messages,
    notify: (message: SnackbarQueueMessage) => {
      messages.push(message);
    }
  };
};
