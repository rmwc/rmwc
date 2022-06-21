import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Snackbar,
  SnackbarAction,
  createSnackbarQueue,
  SnackbarQueue
} from './';

describe('Snackbar', () => {
  it('renders', () => {
    const { asFragment } = render(
      <Snackbar
        open
        timeout={1000}
        onClose={() => {}}
        message="This is a new message"
        action={<div />}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('can be leading', () => {
    const { container } = render(
      <Snackbar open message="This is a new message" leading />
    );
    expect(container.firstChild).toHaveClass('mdc-snackbar--leading');
  });

  it('can have an icon', () => {
    render(
      <Snackbar icon="favorite" open message="This is a new message" leading />
    );
    expect(screen.getByText('favorite')).toBeInTheDocument();
  });

  it('can be multiline', () => {
    render(<Snackbar open message="This is a new message" />);
  });

  it('can dismissesOnAction', () => {
    render(<Snackbar open message="This is a new message" dismissesOnAction />);
  });

  it('can be have JSX as children', () => {
    render(
      <Snackbar>
        <div>Hello World</div>
      </Snackbar>
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
  it('can be have JSX in message prop', () => {
    render(<Snackbar message={<div>Hello World</div>} />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('handles events', async () => {
    const onClose = jest.fn();
    render(
      <Snackbar
        open
        timeout={1000}
        onClose={onClose}
        message="This is a new message"
        dismissIcon
        action={<SnackbarAction label="foo" />}
      />
    );

    userEvent.click(screen.getByText('close'));

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
  });
});

describe('SnackbarQueue', () => {
  it('renders', () => {
    const queue = createSnackbarQueue();
    const { asFragment } = render(<SnackbarQueue messages={queue.messages} />);
    expect(asFragment).toMatchSnapshot();
  });

  it('notifies', async () => {
    const queue = createSnackbarQueue();
    render(<SnackbarQueue messages={queue.messages} />);
    // check multiple notifications
    queue.notify({
      title: 'myNotificationTitle1',
      body: 'myNotificationBody1',
      // timeout: 500,
      onClose: () => {}
    });

    queue.notify({
      title: 'myNotificationTitle2',
      body: 'myNotificationBody2',
      // timeout: 500,
      image: 'test',
      actions: [
        {
          // NotificationAction api format
          title: 'Fix It!',
          icon: 'close',
          action: 'fixit' // action will be available as evt.detail.reason in the onClose event
        },
        {
          // OR SnackbarActionProps format
          label: 'Continue...',
          icon: 'check',
          onClick: () => {}
        }
      ]
    });

    waitFor(() => {
      expect(screen.getByText('myNotificationTitle1')).toBeInTheDocument();
      expect(screen.getByText('myNotificationBody1')).toBeInTheDocument();
    });

    waitFor(() => {
      expect(screen.getByText('myNotificationTitle2')).toBeInTheDocument();
      expect(screen.getByText('myNotificationBody2')).toBeInTheDocument();
    });
  });
});
