import { CustomEventT } from '@rmwc/base';
import { ButtonProps } from '@rmwc/button';

import * as React from 'react';
//@ts-ignore
import { MDCDialogFoundation } from '@material/dialog';
import createFocusTrap from 'focus-trap';

import { Button } from '@rmwc/button';
import { FoundationComponent, Component, noop } from '@rmwc/base';

const strings = MDCDialogFoundation.strings;

const isScrollable = (el: HTMLElement) => {
  return el.scrollHeight > el.offsetHeight;
};

const areTopsMisaligned = (els: HTMLElement[] | null) => {
  const tops = new Set();
  [].forEach.call(els, (el: HTMLElement) => tops.add(el.offsetTop));
  return tops.size > 1;
};

const closest = (
  element: HTMLElement | EventTarget | null,
  selector: string
) => {
  if (element instanceof Element) {
    if (element && element.closest) {
      return element.closest(selector);
    }

    let el: HTMLElement | null = element;
    while (el) {
      if (matches(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
  }
  return null;
};

const matches = (element: HTMLElement, selector: string) => {
  const nativeMatches =
    element.matches ||
    element.webkitMatchesSelector ||
    // @ts-ignore
    element.msMatchesSelector;
  return nativeMatches.call(element, selector);
};

class DialogRoot extends Component<{}> {
  static displayName = 'DialogRoot';
  static defaultProps: {
    role: 'alertdialog';
    'aria-modal': true;
  };
  classNames = ['mdc-dialog'];
}

class DialogScrim extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="mdc-dialog__scrim" />;
  }
}

/** @extends React.Component */
/** The Dialog title. */
export class DialogTitle extends Component<{}> {
  static displayName = 'DialogTitle';
  tag = 'h2';
  classNames = ['mdc-dialog__title'];
}

/** @extends React.Component */
/** The Dialog content. */
export class DialogContent extends Component<{}> {
  static displayName = 'DialogContent';
  classNames = ['mdc-dialog__content'];
}

/** @extends React.Component */
/** Actions container for the Dialog. */
export class DialogActions extends Component<{}> {
  static displayName = 'DialogActions';
  classNames = ['mdc-dialog__actions'];
}

export type DialogButtonPropsT = {
  /** An action returned in evt.detail.action to the onClose handler. */
  action?: string;
  /** Indicates this is the default selected action when pressing enter */
  isDefaultAction?: boolean;
} & ButtonProps;

/** Action buttons for the Dialog. */
export class DialogButton extends React.Component<
  DialogButtonPropsT & { className?: string }
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

export type DialogPropsT = {
  /** Whether or not the Dialog is showing. */
  open: boolean;
  /** Callback for when the Dialog opens. */
  onOpen?: (evt: CustomEventT<void>) => void;
  /** Callback for when the Dialog closes. */
  onClose?: (evt: CustomEventT<void>) => void;
  /** Callback to use if you need more direct access to the Dialog's lifecycle. */
  onStateChange?: (state: 'opening' | 'opened' | 'closing' | 'closed') => void;
};

/** A Dialog component. */
export class Dialog extends FoundationComponent<DialogPropsT> {
  static displayName = 'Dialog';
  root_: null | HTMLElement = null;
  container_: null | HTMLElement = null;
  content_: null | HTMLElement = null;
  buttons_: null | HTMLElement[] = null;
  defaultButton_: null | HTMLElement = null;
  focusTrap_: any;
  handleInteraction_: any;
  handleDocumentKeydown_: any;

  constructor(props: DialogPropsT) {
    super(props);
    this.createClassList('root_');
  }

  open() {
    if (!this.foundation_.isOpen_) {
      document.addEventListener('keydown', this.handleDocumentKeydown_);
      this.foundation_.open();
    }
  }

  close() {
    if (this.foundation_.isOpen_) {
      document.removeEventListener('keydown', this.handleDocumentKeydown_);
      this.foundation_.close();
    }
  }

  componentDidMount() {
    this.container_ =
      this.root_ && this.root_.querySelector(strings.CONTAINER_SELECTOR);
    this.content_ =
      this.root_ && this.root_.querySelector(strings.CONTENT_SELECTOR);
    this.buttons_ =
      this.root_ &&
      [].slice.call(this.root_.querySelectorAll(strings.BUTTON_SELECTOR));
    this.defaultButton_ =
      this.root_ && this.root_.querySelector(strings.DEFAULT_BUTTON_SELECTOR);

    this.container_ &&
      (this.focusTrap_ = createFocusTrap(this.container_, {
        initialFocus: this.defaultButton_ || undefined,
        escapeDeactivates: false,
        clickOutsideDeactivates: true
      }));

    this.handleInteraction_ = this.foundation_.handleInteraction.bind(
      this.foundation_
    );

    this.root_ && this.root_.addEventListener('click', this.handleInteraction_);
    this.root_ &&
      this.root_.addEventListener('keydown', this.handleInteraction_);
    this.handleDocumentKeydown_ = this.foundation_.handleDocumentKeydown.bind(
      this.foundation_
    );

    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    document.removeEventListener('keydown', this.handleDocumentKeydown_);
    this.root_ &&
      this.root_.removeEventListener('click', this.handleInteraction_);
    this.root_ &&
      this.root_.removeEventListener('keydown', this.handleInteraction_);
  }

  sync(props: DialogPropsT) {
    if (this.props.open) {
      this.open();
    } else {
      this.close();
    }
  }

  getDefaultFoundation() {
    return new MDCDialogFoundation({
      addClass: (className: string) => {
        // a hack to make sure the open animation is triggered
        if (className === 'mdc-dialog--open') {
          window.requestAnimationFrame(() => {
            this.classList.root_.add(className);
          });
        } else {
          this.classList.root_.add(className);
        }
      },
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      hasClass: (className: string) => this.classList.root_.has(className),
      addBodyClass: (className: string) =>
        document.body && document.body.classList.add(className),
      removeBodyClass: (className: string) =>
        document.body && document.body.classList.remove(className),
      eventTargetMatches: (target: HTMLElement, selector: string) =>
        matches(target, selector),
      computeBoundingRect: () =>
        this.root_ && this.root_.getBoundingClientRect(),
      trapFocus: () => this.focusTrap_.activate(),
      releaseFocus: () => this.focusTrap_.deactivate(),
      isContentScrollable: () => !!this.content_ && isScrollable(this.content_),
      areButtonsStacked: () => areTopsMisaligned(this.buttons_),
      getActionFromEvent: (event: React.SyntheticEvent<HTMLElement>) => {
        const element = closest(event.target, `[${strings.ACTION_ATTRIBUTE}]`);
        return element && element.getAttribute(strings.ACTION_ATTRIBUTE);
      },
      clickDefaultButton: () => {
        if (this.defaultButton_) {
          this.defaultButton_.click();
        }
      },
      reverseButtons: () => {
        this.buttons_ && this.buttons_.reverse();
        this.buttons_ &&
          this.buttons_.forEach(
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
        {...rest}
        elementRef={ref => (this.root_ = ref)}
        className={this.classList.root_.renderToString()}
      >
        <div className="mdc-dialog__container">
          <div className="mdc-dialog__surface">{children}</div>
        </div>
        <DialogScrim />
      </DialogRoot>
    );
  }
}

export type SimpleDialogPropsT = {
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
} & DialogPropsT;

/** A non-standard SimpleDialog component for ease of use. */
export class SimpleDialog extends React.Component<SimpleDialogPropsT> {
  static defaultProps = {
    title: undefined,
    header: undefined,
    body: undefined,
    footer: undefined,
    acceptLabel: 'Accept',
    cancelLabel: 'Cancel',
    open: false,
    onClose: noop,
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
              <DialogButton action="accept">{acceptLabel}</DialogButton>
            )}
          </DialogActions>
        )}
      </Dialog>
    );
  }
}
