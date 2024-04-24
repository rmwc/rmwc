import React, { useState } from 'react';
import { Button } from '@rmwc/button'; // replace with your actual component import
import { Snackbar, SnackbarAction } from './snackbar'; // replace with your actual component import
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SnackbarQueue, createSnackbarQueue } from './snackbar-queue';

export default {
  title: 'Snackbar',
  component: Snackbar
} as Meta;

type Story = StoryObj<typeof Snackbar>;

function SnackbarStory(props: {
  open?: boolean;
  leading?: boolean;
  message?: string;
  actionText?: string;
  timeout?: number;
  stacked?: boolean;
  dismissesOnAction?: boolean;
}) {
  const {
    open,
    leading,
    message,
    actionText,
    timeout,
    stacked,
    dismissesOnAction
  } = props;

  return (
    <Snackbar
      open={open}
      message={message}
      leading={leading}
      stacked={stacked}
      foundationRef={console.log}
      dismissesOnAction={dismissesOnAction}
      action={
        <SnackbarAction
          label={actionText}
          onClick={() => console.log('Click Me')}
        />
      }
      timeout={timeout}
      onClose={() => {
        action('onClose')();
      }}
      onOpen={() => {
        action('onOpen')();
      }}
    />
  );
}

const { messages, notify, clearAll } = createSnackbarQueue();

export const SimpleSnackbarStory: Story = {
  render: (args) => <SnackbarStory {...args} />
};

export const SnackbarQueueStory: Story = {
  render: (args) => (
    <>
      <SnackbarQueue messages={messages} />
      <Button
        label="Notify"
        onClick={() => {
          notify({
            timeout: -1,
            title: <b>Warning</b>,
            body: 'You have selected pizza instead icecream!',
            icon: 'warning',
            dismissesOnAction: true,
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
          });
        }}
      />
    </>
  )
};

export const SnackbarQueueAPIStory: Story = {
  render: (args) => (
    <>
      <SnackbarQueue messages={messages} />
      <Button
        label="Notify"
        onClick={() => {
          const { close } = notify({
            timeout: -1,
            title: <b>Warning</b>,
            body: 'You have selected pizza instead icecream!',
            icon: 'warning',
            dismissesOnAction: true,
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
          });

          setTimeout(() => {
            close();
          }, 1500);
        }}
      />
    </>
  )
};

export const SnackbarQueueAPIClearAllStory: Story = {
  render: (args) => {
    const Component = () => {
      React.useEffect(() => {
        new Array(40).fill(undefined).forEach(() => {
          notify({
            timeout: 1000,
            title: <b>Warning</b>,
            body: 'You have selected pizza instead icecream!',
            icon: 'warning',
            dismissesOnAction: true,
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
          });
        });
      }, []);
      return (
        <>
          <SnackbarQueue messages={messages} />
          <Button onClick={clearAll}>Clear All</Button>
        </>
      );
    };
    return <Component />;
  }
};
