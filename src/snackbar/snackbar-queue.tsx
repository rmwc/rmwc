import React from 'react';
import {
  Snackbar,
  SnackbarProps,
  SnackbarAction,
  SnackbarActionProps
} from './snackbar';
import { MergeInterfacesT, IconPropT } from '@rmwc/types';

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

class ArrayEmitter<T> extends Array<T> {
  events_: { [evtName: string]: Array<Function> } = {};

  push(...items: T[]) {
    super.push(...items);
    this.trigger('change');
    return items.length;
  }

  on(event: string, cb: Function) {
    this.events_ = this.events_ || {};
    this.events_[event] = this.events_[event] || [];
    this.events_[event].push(cb);
  }
  off(event: string, cb: Function) {
    this.events_ = this.events_ || {};
    if (event in this.events_ === false) return;
    this.events_[event].splice(this.events_[event].indexOf(cb), 1);
  }
  trigger(event: string, ...args: any) {
    this.events_ = this.events_ || {};
    if (event in this.events_ === false) return;
    for (var i = 0; i < this.events_[event].length; i++) {
      this.events_[event][i].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    }
  }
}

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
  state: SnackbarQueueState = {
    message: this.props.messages[0]
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
    if (this.props.messages[0] !== this.state.message) {
      this.setState({
        message: this.props.messages[0]
      });
    }
  }

  removeMessage(message?: SnackbarQueueMessage) {
    if (!message) return;

    setTimeout(() => {
      const index = this.props.messages.indexOf(message);
      !!~index && this.props.messages.splice(index, 1);
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
                style={{ margin: '1rem auto', textAlign: 'center' }}
              >
                <img
                  src={image}
                  alt={`Image from ${image}`}
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
