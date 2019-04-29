import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useKnob } from '../base/utils/use-knob';
import {
  SnackbarQueue,
  createSnackbarQueue,
  Snackbar,
  SnackbarAction
} from '.';
import { Button } from '../button';

function SnackbarStory() {
  const [open, setOpen] = useKnob('boolean', 'open', true);
  const [leading] = useKnob('boolean', 'leading', false);
  const [message] = useKnob('text', 'message', 'This is a new message');
  const [actionText] = useKnob('text', 'actionText', 'Action');
  const [timeout] = useKnob('number', 'timeout', 2750);
  const [stacked] = useKnob('boolean', 'stacked', false);
  const [dismissesOnAction] = useKnob('boolean', 'dismissesOnAction', false);

  return (
    <Snackbar
      open={open}
      message={message}
      leading={leading}
      stacked={stacked}
      dismissesOnAction={dismissesOnAction}
      action={
        <SnackbarAction
          label={actionText}
          onClick={() => console.log('Click Me')}
        />
      }
      timeout={timeout}
      onClose={() => {
        setOpen(false);
        action('onClose')();
      }}
      onOpen={() => {
        action('onOpen')();
      }}
    />
  );
}

const { messages, notify } = createSnackbarQueue();

storiesOf('Snackbar', module)
  .add('Snackbar', () => <SnackbarStory />)
  .add('SnackbarQueue', function() {
    return (
      <>
        <SnackbarQueue messages={messages} />
        <Button
          label="Notify"
          onClick={() =>
            notify({
              title: <b>Warning</b>,
              body: 'You have selected pizza instead icecream!',
              icon: 'warning',
              actions: [
                {
                  // NotificationAction api format
                  title: 'Fix It!',
                  icon: 'close',
                  action: 'fixit'
                },
                {
                  // OR SnackbarActionProps format
                  label: 'Continue...',
                  icon: 'check',
                  onClick: () => {}
                }
              ]
            })
          }
        />
      </>
    );
  });
