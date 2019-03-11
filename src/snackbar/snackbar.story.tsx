import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Snackbar } from './';
import { useKnob } from '../base/utils/use-knob';

function SnackbarStory() {
  const [show, setShow] = useKnob('boolean', 'show', true);
  const [alignStart] = useKnob('boolean', 'alignStart', false);
  const [message] = useKnob('text', 'message', 'This is a new message');
  const [actionText] = useKnob('text', 'actionText', 'Action');
  const [timeout] = useKnob('number', 'timeout', 2750);
  const [multiline] = useKnob('boolean', 'multiline', false);
  const [actionOnBottom] = useKnob('boolean', 'actionOnBottom', false);
  const [dismissesOnAction] = useKnob('boolean', 'dismissesOnAction', false);

  return (
    <Snackbar
      show={show}
      message={message}
      alignStart={alignStart}
      actionOnBottom={actionOnBottom}
      dismissesOnAction={dismissesOnAction}
      multiline={multiline}
      actionText={actionText}
      timeout={timeout}
      onHide={() => {
        setShow(false);
        action('onHide')();
      }}
      onShow={() => {
        action('onShow')();
      }}
      actionHandler={action('actionHandler')}
    />
  );
}

storiesOf('Snackbar', module).add('Snackbar', () => <SnackbarStory />);
