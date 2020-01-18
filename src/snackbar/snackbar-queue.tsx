import React, { useState, useEffect, useCallback } from 'react';
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

/** A snackbar queue for rendering messages */
export function SnackbarQueue({
  messages,
  ...defaultSnackbarProps
}: SnackbarQueueProps) {
  const currentMessage = messages.array[0];
  const [, setIteration] = useState(0);
  const [message, setMessage] = useState<SnackbarQueueMessage | undefined>(
    messages.array[0]
  );

  const removeMessage = useCallback(
    (message?: SnackbarQueueMessage) => {
      message && messages.remove(message);
    },
    [messages]
  );

  useEffect(() => {
    let timerId: number;
    const doChange = () => {
      if (messages.array[0] !== message) {
        setIteration(val => val + 1);
        timerId = window.setTimeout(() => setMessage(messages.array[0]), 150);
      }
    };
    messages.on('change', doChange);
    return () => {
      timerId && clearTimeout(timerId);
      messages.off('change', doChange);
    };
  }, [messages, message]);

  const {
    body = '',
    image,
    title = '',
    onClose,
    actions,
    ...messageSnackbarProps
  } = message || {};

  const actionProp = actions
    ? actions.map(({ title, label, ...rest }: any) => (
        <SnackbarAction {...rest} label={label || title} />
      ))
    : null;

  // We are open if we have a message
  // and the current one is the one in state
  const open = message && message === currentMessage;

  return (
    <Snackbar
      {...defaultSnackbarProps}
      {...messageSnackbarProps}
      open={open}
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
        onClose?.(evt);
        removeMessage(message);
      }}
      action={actionProp}
    />
  );
}

/** Creates a snackbar queue */
export const createSnackbarQueue = (): {
  messages: ArrayEmitter<SnackbarQueueMessage>;
  clearAll: () => void;
  notify: (message: SnackbarQueueMessage) => { close: () => void };
} => {
  const messages = new ArrayEmitter<SnackbarQueueMessage>();

  return {
    messages,
    clearAll: () => messages.empty(),
    notify: (message: SnackbarQueueMessage) => {
      messages.push(message);
      return {
        close: () => {
          messages.remove(message);
        }
      };
    }
  };
};
