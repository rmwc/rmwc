import { Portal, PortalProvider } from '@rmwc/base';
import { Button } from '@rmwc/button';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogButton,
  DialogContent,
  DialogTitle,
  SimpleDialog
} from './dialog';
import { DialogQueue, createDialogQueue } from './dialog-queue';

describe('Dialog', () => {
  it('simple Dialog renders', () => {
    const { asFragment } = render(
      <SimpleDialog
        title="This is a simple dialog"
        header="Foo"
        body="You can pass the body prop, or anything you want as children."
        open
        onClose={(evt) => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('simple Dialog renders with no children', () => {
    const { asFragment } = render(
      <SimpleDialog
        title="This is a simple dialog"
        open
        onClose={(evt) => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('simple Dialog renders with children', () => {
    const { asFragment } = render(
      <SimpleDialog title="This is a simple dialog" open onClose={(evt) => {}}>
        Hello
      </SimpleDialog>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('triggers onOpen', () => {
    const onOpen = vi.fn();
    render(
      <SimpleDialog title="This is a simple dialog" open onOpen={onOpen}>
        Hello
      </SimpleDialog>
    );

    expect(onOpen).toHaveBeenCalled();
  });

  it('triggers onClose', () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <SimpleDialog
        title="This is a simple dialog"
        open={true}
        onClose={onClose}
      >
        Hello
      </SimpleDialog>
    );

    expect(onClose).not.toHaveBeenCalled();

    rerender(
      <SimpleDialog
        title="This is a simple dialog"
        open={false}
        onClose={onClose}
      >
        Hello
      </SimpleDialog>
    );

    expect(onClose).toHaveBeenCalled();
  });

  it('standard Dialog renders', () => {
    const el = render(
      <Dialog open onClose={(evt) => {}}>
        <DialogTitle>Dialog Title</DialogTitle>

        <DialogContent>This is a custom dialog.</DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept">Sweet!</DialogButton>
        </DialogActions>
      </Dialog>
    );

    el.unmount();
  });

  describe('using with Portal', () => {
    it('does not mount twice', async () => {
      const Content = ({ value, inc }: { value: number; inc: () => void }) => {
        useEffect(() => {
          inc();
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return <span>{`Opened ${value} times`}</span>;
      };
      const MyComp = () => {
        const [open, setOpen] = useState(false);
        const [counter, setCounter] = useState(0);

        return (
          <>
            <Portal />
            <Button onClick={() => setOpen(true)}>Open</Button>
            <Dialog renderToPortal open={open} onClosed={() => setOpen(false)}>
              <DialogContent>
                <Content value={counter} inc={() => setCounter((c) => c + 1)} />
              </DialogContent>
            </Dialog>
            )
          </>
        );
      };
      render(<MyComp />);
      userEvent.click(screen.getByRole('button', { name: /open/i }));
      expect(await screen.findByText('Opened 1 times')).toBeInTheDocument();
    });

    it('renders to portal when using PortalProvider and renderToPortal is true', () => {
      const MyComp = () => {
        const [open, setOpen] = useState(false);

        return (
          <PortalProvider>
            <div data-testid="portal-sibling">
              <Button
                data-testid="trigger-button"
                onClick={() => setOpen(true)}
              >
                Open
              </Button>
              <Dialog
                renderToPortal={true}
                open={open}
                onClosed={() => setOpen(false)}
              >
                <DialogContent>
                  <Button data-testid="dialog-content-button" />
                </DialogContent>
              </Dialog>
            </div>
            <Portal data-testid="rmwc-portal" />
          </PortalProvider>
        );
      };

      render(<MyComp />);
      const portalSibling = screen.getByTestId('portal-sibling');
      const portalElement = screen.getByTestId('rmwc-portal');
      const dialogContentButton = screen.getByTestId('dialog-content-button');

      expect(portalSibling).not.toContainElement(dialogContentButton);
      expect(portalElement).toContainElement(dialogContentButton);
    });

    it('does not render to portal when using PortalProvider and renderToPortal is false', () => {
      const MyComp = () => {
        const [open, setOpen] = useState(false);

        return (
          <PortalProvider>
            <div data-testid="portal-sibling">
              <Button
                data-testid="trigger-button"
                onClick={() => setOpen(true)}
              >
                Open
              </Button>
              <Dialog
                renderToPortal={false}
                open={open}
                onClosed={() => setOpen(false)}
              >
                <DialogContent>
                  <Button data-testid="dialog-content-button" />
                </DialogContent>
              </Dialog>
            </div>
            <Portal data-testid="rmwc-portal" />
          </PortalProvider>
        );
      };

      render(<MyComp />);
      const portalSibling = screen.getByTestId('portal-sibling');
      const portalElement = screen.getByTestId('rmwc-portal');
      const dialogContentButton = screen.getByTestId('dialog-content-button');

      expect(portalSibling).toContainElement(dialogContentButton);
      expect(portalElement).not.toContainElement(dialogContentButton);
    });

    it('renders to portal when not using PortalProvider and renderToPortal is true', () => {
      const MyComp = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <div data-testid="portal-sibling">
              <Button
                data-testid="trigger-button"
                onClick={() => setOpen(true)}
              >
                Open
              </Button>
              <Dialog
                renderToPortal={true}
                open={open}
                onClosed={() => setOpen(false)}
              >
                <DialogContent>
                  <Button data-testid="dialog-content-button" />
                </DialogContent>
              </Dialog>
            </div>
            <Portal data-testid="rmwc-portal" />
          </>
        );
      };

      render(<MyComp />);
      const portalSibling = screen.getByTestId('portal-sibling');
      const portalElement = screen.getByTestId('rmwc-portal');
      const dialogContentButton = screen.getByTestId('dialog-content-button');

      expect(portalSibling).not.toContainElement(dialogContentButton);
      expect(portalElement).toContainElement(dialogContentButton);
    });

    it('does not render to portal when not using PortalProvider and renderToPortal is false', () => {
      const MyComp = () => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <div data-testid="portal-sibling">
              <Button
                data-testid="trigger-button"
                onClick={() => setOpen(true)}
              >
                Open
              </Button>
              <Dialog
                renderToPortal={false}
                open={open}
                onClosed={() => setOpen(false)}
              >
                <DialogContent>
                  <Button data-testid="dialog-content-button" />
                </DialogContent>
              </Dialog>
            </div>
            <Portal data-testid="rmwc-portal" />
          </>
        );
      };

      render(<MyComp />);
      const portalSibling = screen.getByTestId('portal-sibling');
      const portalElement = screen.getByTestId('rmwc-portal');
      const dialogContentButton = screen.getByTestId('dialog-content-button');

      expect(portalSibling).toContainElement(dialogContentButton);
      expect(portalElement).not.toContainElement(dialogContentButton);
    });
  });
});

describe('DialogQueue', () => {
  it('renders', () => {
    const queue = createDialogQueue();
    const el = render(<DialogQueue dialogs={queue.dialogs} />);
    el.unmount();
  });

  it('alerts and accepts', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);

    queue.alert({ title: 'myAlert' });

    expect(await screen.findByText('myAlert')).toBeInTheDocument();

    userEvent.click(screen.getByText('OK'));

    await waitFor(() =>
      expect(screen.queryByText('OK')).not.toBeInTheDocument()
    );
  });

  it('confirms and returns true', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' });

    expect(await screen.findByText('myConfirm')).toBeInTheDocument();

    userEvent.click(screen.getByText('OK'));

    await waitFor(() =>
      expect(screen.queryByText('OK')).not.toBeInTheDocument()
    );
  });

  it('confirms and returns false', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);
    queue.confirm({ title: 'myConfirm' });

    expect(await screen.findByText('myConfirm')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));

    await waitFor(() =>
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    );
  });

  it('prompts and returns value', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);

    queue.prompt({ title: 'myPrompt' });

    expect(await screen.findByText('myPrompt')).toBeInTheDocument();

    userEvent.click(screen.getByText('Accept'));

    await waitFor(() =>
      expect(screen.queryByText('Accept')).not.toBeInTheDocument()
    );
  });

  it('prompts and returns null', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);

    queue.prompt({ title: 'myPrompt', body: 'CUSTOM BODY' });

    expect(await screen.findByText('myPrompt')).toBeInTheDocument();
    expect(screen.getByText('CUSTOM BODY')).toBeInTheDocument();

    userEvent.click(screen.getByText('Cancel'));

    await waitFor(() =>
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    );
  });

  it('supports onClose', async () => {
    const queue = createDialogQueue();
    render(<DialogQueue dialogs={queue.dialogs} />);
    const onClose = vi.fn();
    queue.alert({ onClose });

    userEvent.click(await screen.findByText('OK'));

    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
