import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import { Snackbar } from './';
import { storyWithState } from '@rmwc/base/utils/story-with-state';

const SnackbarStory = storyWithState(
  state => ({
    show: boolean('show', state.show !== undefined ? state.show : true),
    alignStart: boolean('alignStart', state.alignStart || false),
    message: text('message', state.message || 'This is a new message'),
    actionText: text('actionText', state.actionText || 'Action'),
    timeout: number('timeout', state.timeout || 2750),
    multiline: boolean('multiline', state.multiline || false),
    actionOnBottom: boolean('actionOnBottom', state.actionOnBottom || false),
    dismissesOnAction: boolean(
      'dismissesOnAction',
      state.dismissesOnAction !== undefined ? state.dismissesOnAction : true
    )
  }),
  function() {
    return (
      <Snackbar
        show={this.state.show}
        message={this.state.message}
        alignStart={this.state.alignStart}
        actionOnBottom={this.state.actionOnBottom}
        dismissesOnAction={this.state.dismissesOnAction}
        multiline={this.state.multiline}
        actionText={this.state.actionText}
        timeout={this.state.timeout}
        onHide={() => {
          this.setState({ show: false });
          action('onHide')();
        }}
        onShow={() => {
          action('onShow')();
        }}
        actionHandler={action('actionHandler')}
      />
    );
  }
);

storiesOf('Snackbar', module).add('Snackbar', () => <SnackbarStory />);
