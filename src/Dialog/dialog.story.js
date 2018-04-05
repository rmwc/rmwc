import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import {
  Dialog,
  SimpleDialog,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from './';
import { storyWithState } from '../Base/story-with-state';

const DialogStory = storyWithState(
  state => ({
    open: boolean('open', state.open !== undefined ? state.open : true)
  }),
  function() {
    return (
      <Dialog
        open={this.state.open}
        onClose={evt => {
          this.setState({ open: false });
          action('onClose')();
        }}
      >
        <DialogSurface>
          <DialogHeader>
            <DialogHeaderTitle>Dialog Title</DialogHeaderTitle>
          </DialogHeader>
          <DialogBody>This is a custom dialog.</DialogBody>
          <DialogFooter>
            <DialogFooterButton cancel>Cancel</DialogFooterButton>
            <DialogFooterButton accept>Sweet!</DialogFooterButton>
          </DialogFooter>
        </DialogSurface>
        <DialogBackdrop />
      </Dialog>
    );
  }
);

const SimpleDialogStory = storyWithState(
  state => ({
    open: boolean('open', state.open !== undefined ? state.open : true),
    title: text('title', state.title || 'This is a simple dialog'),
    body: text(
      'body',
      state.body ||
        'You can pass the body prop, or anything you want as children.'
    ),
    scrollable: boolean('scrollable', state.scrollable || false),
    acceptLabel: text('acceptLabel', state.acceptLabel || 'Accept'),
    cancelLabel: text('cancelLabel', state.cancelLabel || 'Cancel')
  }),
  function() {
    return (
      <SimpleDialog
        title={this.state.title}
        body={this.state.body}
        open={this.state.open}
        onClose={evt => {
          this.setState({ open: false });
          action('onClose')();
        }}
        scrollable={this.state.scrollable}
        acceptLabel={this.state.acceptLabel}
        cancelLabel={this.state.cancelLabel}
        onAccept={action('onAccept')}
        onCancel={action('onCancel')}
      />
    );
  }
);

storiesOf('Dialogs', module)
  .add('Dialog', () => <DialogStory />)
  .add('SimpleDialog', () => <SimpleDialogStory />);
