import * as RMWC from '@rmwc/types';
import * as React from 'react';
//@ts-ignore
import { MDCDialogFoundation } from '@material/dialog';

import {
  FoundationComponent,
  componentFactory,
  createFocusTrap,
  FocusTrap,
  closest,
  matches
} from '@rmwc/base';
import { Button, ButtonProps } from '@rmwc/button';

const isScrollable = (el: HTMLElement) => {
  return el.scrollHeight > el.offsetHeight;
};

const areTopsMisaligned = (els: HTMLElement[] | null) => {
  const tops = new Set();
  [].forEach.call(els, (el: HTMLElement) => tops.add(el.offsetTop));
  return tops.size > 1;
};

const DialogRoot = componentFactory<{}>({
  displayName: 'DialogRoot',
  defaultProps: {
    role: 'alertdialog',
    'aria-modal': true
  },
  classNames: ['mdc-dialog']
});

class DialogScrim extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-dialog__scrim" />;
  }
}

/** The Dialog title. */
export const DialogTitle = componentFactory<{}>({
  displayName: 'DialogTitle',
  tag: 'h2',
  classNames: ['mdc-dialog__title']
});

/** The Dialog content. */
export const DialogContent = componentFactory<{}>({
  displayName: 'DialogContent',
  classNames: ['mdc-dialog__content']
});

/** Actions container for the Dialog. */
export const DialogActions = componentFactory<{}>({
  displayName: 'DialogActions',
  classNames: ['mdc-dialog__actions']
});

export interface DialogButtonProps extends ButtonProps {
  /** An action returned in evt.detail.action to the onClose handler. */
  action?: string;
  /** Indicates this is the default selected action when pressing enter */
  isDefaultAction?: boolean;
}

/** Action buttons for the Dialog. */
export class DialogButton extends React.Component<
  DialogButtonProps & RMWC.ComponentProps
> {
  static displayName = 'DialogButton';
  render() {
    const { action = '', className, isDefaultAction, ...rest } = this.props;
    return (
      <Button
        {...rest}
        data-mdc-dialog-action={action}
        className={[
          className,
          'mdc-dialog__button',
          isDefaultAction && 'mdc-dialog__button--default'
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }
}

export interface DialogProps {
  /** Whether or not the Dialog is showing. */
  open?: boolean;
  /** Callback for when the Dialog opens. */
  onOpen?: (evt: RMWC.CustomEventT<{}>) => void;
  /** Callback for when the Dialog closes. */
  onClose?: (evt: RMWC.CustomEventT<{action?: string}>) => void;
  /** Callback to use if you need more direct access to the Dialog's lifecycle. */
  onStateChange?: (state: 'opening' | 'opened' | 'closing' | 'closed') => void;
}

/** A Dialog component. */
export class Dialog extends FoundationComponent<DialogProps> {
  static displayName = 'Dialog';

  private root = this.createElement('root');
  container: null | HTMLElement = null;
  content: null | HTMLElement = null;
  buttons: null | HTMLElement[] = null;
  defaultButton: null | HTMLElement = null;
  focusTrap: FocusTrap | null = null;
  handleDocumentKeydown: (evt: Event) => void = () => {};

  constructor(props: DialogProps) {
    super(props);
    this.handleInteraction = this.handleInteraction.bind(this);
  }

  open() {
    if (!this.foundation.isOpen_) {
      document.addEventListener('keydown', this.handleDocumentKeydown);
      this.foundation.open();
    }
  }

  close() {
    if (this.foundation.isOpen_) {
      document.removeEventListener('keydown', this.handleDocumentKeydown);
      this.foundation.close();
    }
  }

  componentDidMount() {
    super.componentDidMount();
    this.container =
      this.root.ref &&
      this.root.ref.querySelector(
        MDCDialogFoundation.strings.CONTAINER_SELECTOR
      );
    this.content =
      this.root.ref &&
      this.root.ref.querySelector(MDCDialogFoundation.strings.CONTENT_SELECTOR);
    this.buttons =
      this.root.ref &&
      [].slice.call(
        this.root.ref.querySelectorAll(
          MDCDialogFoundation.strings.BUTTON_SELECTOR
        )
      );
    this.defaultButton =
      this.root.ref &&
      this.root.ref.querySelector(
        MDCDialogFoundation.strings.DEFAULT_BUTTON_SELECTOR
      );

    this.container &&
      (this.focusTrap = createFocusTrap(this.container, {
        initialFocus: this.defaultButton || undefined,
        escapeDeactivates: false,
        clickOutsideDeactivates: true
      }));

    this.handleDocumentKeydown = this.foundation.handleDocumentKeydown.bind(
      this.foundation
    );

    document.addEventListener('keydown', this.handleDocumentKeydown);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    document.removeEventListener('keydown', this.handleDocumentKeydown);
  }

  sync(props: DialogProps) {
    if (this.props.open) {
      this.open();
    } else {
      this.close();
    }
  }

  getDefaultFoundation() {
    return new MDCDialogFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      hasClass: (className: string) => this.root.hasClass(className),
      addBodyClass: (className: string) =>
        document.body && document.body.classList.add(className),
      removeBodyClass: (className: string) =>
        document.body && document.body.classList.remove(className),
      eventTargetMatches: (target: HTMLElement, selector: string) =>
        matches(target, selector),
      trapFocus: () => this.focusTrap && this.focusTrap.activate(),
      releaseFocus: () => this.focusTrap && this.focusTrap.deactivate(),
      isContentScrollable: () => !!this.content && isScrollable(this.content),
      areButtonsStacked: () => areTopsMisaligned(this.buttons),
      getActionFromEvent: (evt: React.SyntheticEvent<HTMLElement> & Event) => {
        const element = closest(
          evt.target,
          `[${MDCDialogFoundation.strings.ACTION_ATTRIBUTE}]`
        );
        return (
          element &&
          element.getAttribute(MDCDialogFoundation.strings.ACTION_ATTRIBUTE)
        );
      },
      clickDefaultButton: () => {
        if (this.defaultButton) {
          this.defaultButton.click();
        }
      },
      reverseButtons: () => {
        this.buttons && this.buttons.reverse();
        this.buttons &&
          this.buttons.forEach(
            button =>
              button.parentElement && button.parentElement.appendChild(button)
          );
      },
      notifyOpening: () => {
        this.emit('onOpen', {});
        this.props.onStateChange && this.props.onStateChange('opening');
      },
      notifyOpened: () => {
        this.emit('onOpened', {});
        this.props.onStateChange && this.props.onStateChange('opened');
      },
      notifyClosing: (action: string) => {
        this.emit('onClose', action ? { action } : {});
        this.props.onStateChange && this.props.onStateChange('closing');
      },
      notifyClosed: (action: string) => {
        this.emit('onClosed', action ? { action } : {});
        this.props.onStateChange && this.props.onStateChange('closed');
      }
    });
  }

  handleInteraction(evt: React.MouseEvent & React.KeyboardEvent) {
    evt.type === 'click' && this.props.onClick && this.props.onClick(evt);
    evt.type === 'keydown' && this.props.onKeyDown && this.props.onKeyDown(evt);
    return this.foundation.handleInteraction(evt);
  }

  render() {
    const {
      children,
      open,
      onOpen,
      onClose,
      onStateChange,
      ...rest
    } = this.props;
    return (
      <DialogRoot
        {...this.root.props(rest)}
        ref={this.root.setRef}
        onClick={this.handleInteraction}
        onKeyDown={this.handleInteraction}
      >
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">{children}</div>
        </div>
        <DialogScrim />
      </DialogRoot>
    );
  }
}

export interface SimpleDialogProps extends DialogProps {
  /** A title for the default Dialog template. */
  title?: React.ReactNode;
  /** Additional Dialog header content for the default Dialog template. */
  header?: React.ReactNode;
  /** Body content for the default Dialog template, rendered before children. */
  body?: React.ReactNode;
  /** Additional footer content for the default Dialog template, rendered before any buttons. */
  footer?: React.ReactNode;
  /** Creates an accept button for the default Dialog template with a given label. You can pass `null` to remove the button.*/
  acceptLabel?: React.ReactNode;
  /** Creates an cancel button for the default Dialog with a given label. You can pass `null` to remove the button.*/
  cancelLabel?: React.ReactNode;
  /** Any children will be rendered in the body of the default Dialog template. */
  children?: React.ReactNode;
  /** Allow the body to be scrollable */
  scrollable?: boolean;
}

/** A non-standard SimpleDialog component for ease of use. */
export class SimpleDialog extends React.Component<SimpleDialogProps> {
  static defaultProps = {
    title: undefined,
    header: undefined,
    body: undefined,
    footer: undefined,
    acceptLabel: 'Accept',
    cancelLabel: 'Cancel',
    open: false,
    children: undefined
  };

  render() {
    const {
      title,
      header,
      body,
      footer,
      acceptLabel,
      cancelLabel,
      children,
      open,
      ...rest
    } = this.props;

    return (
      <Dialog open={open} {...rest}>
        {(!!title || !!header) && (
          <DialogTitle>
            {!!title && title}
            {!!header && header}
          </DialogTitle>
        )}
        {(!!body || children) && (
          <DialogContent>
            {body}
            {children}
          </DialogContent>
        )}

        {(!!cancelLabel || !!acceptLabel) && (
          <DialogActions>
            {!!footer && { footer }}
            {!!cancelLabel && (
              <DialogButton action="close">{cancelLabel}</DialogButton>
            )}
            {!!acceptLabel && (
              <DialogButton action="accept" isDefaultAction>
                {acceptLabel}
              </DialogButton>
            )}
          </DialogActions>
        )}
      </Dialog>
    );
  }
}
