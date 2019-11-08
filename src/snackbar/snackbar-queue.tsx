import React, { useState, useEffect } from 'react';
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
  const [message, setMessage] = useState<SnackbarQueueMessage | undefined>(
    messages.array[0]
  );

  useEffect(() => {
    messages.on('change', getMessage);
    return () => messages.off('change', getMessage);
  }, []);

  useEffect(() => {
    getMessage();
  });

  const getMessage = () => {
    const newMessage = messages.array[0];
    if (newMessage && newMessage !== message) {
      setMessage(newMessage);
    }
  };

  const removeMessage = (message?: SnackbarQueueMessage) => {
    if (!message) return;

    setTimeout(() => {
      const index = messages.array.indexOf(message);
      !!~index && messages.array.splice(index, 1);
      setMessage(undefined);
    }, 75);
  };

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
        removeMessage(message);
      }}
      action={actionProp}
    />
  );
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
