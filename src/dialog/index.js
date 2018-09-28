// @flow
import type { CustomEventT } from '@rmwc/base';
import type { ButtonPropsT } from '@rmwc/button';

import * as React from 'react';
import { MDCDialogFoundation } from '@material/dialog/dist/mdc.dialog';
import * as util from '@material/dialog/util';
import { closest, matches } from '@material/dom/ponyfill';
import createFocusTrap from 'focus-trap';

import Button from '@rmwc/button';
import { FoundationComponent, Component, noop } from '@rmwc/base';

const strings = MDCDialogFoundation.strings;

class DialogRoot extends Component<{}> {
  static displayName = 'DialogRoot';
  static defaultProps: {
    role: 'alertdialog',
    'aria-modal': true
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

export class DialogTitle extends Component<{}> {
  static displayName = 'DialogTitle';
  tag = 'h2';
  classNames = ['mdc-dialog__title'];
}

export class DialogContent extends Component<{}> {
  static displayName = 'DialogContent';
  classNames = ['mdc-dialog__content'];
}

export class DialogActions extends Component<{}> {
  static displayName = 'DialogActions';
  classNames = ['mdc-dialog__actions'];
}

export class DialogButton extends React.Component<ButtonPropsT> {
  static displayName = 'DialogButton';
  render() {
    const { accept, close, className, isDefault, ...rest } = this.props;
    const dataProps = {};

    if (accept) {
      dataProps['data-mdc-dialog-action'] = 'accept';
    }

    if (close) {
      dataProps['data-mdc-dialog-action'] = 'close';
    }

    return (
      <Button
        {...rest}
        {...dataProps}
        className={[
          className,
          'mdc-dialog__button',
          isDefault && 'mdc-dialog__button--default'
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }
}

export type DialogPropsT = {
  /** Whether or not the Dialog is showing. */
  open: boolean,
  /** Callback for when the Dialog opens. */
  onOpen?: (evt: CustomEventT<void>) => mixed,
  /** Callback for when the Dialog closes. */
  onClose?: (evt: CustomEventT<void>) => mixed
};

export class Dialog extends FoundationComponent<DialogPropsT> {
  static displayName = 'Dialog';
  root_: ?HTMLElement;
  container_: ?HTMLElement;
  content_: ?HTMLElement;
  buttons_: ?(HTMLElement[]);
  defaultButton_: ?HTMLElement;
  focusTrap_: any;
  handleInteraction_: Function;
  handleDocumentKeydown_: Function;

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

    this.focusTrap_ = createFocusTrap(this.container_, {
      escapeDeactivates: false, // Dialog foundation handles escape key
      clickOutsideDeactivates: true // Allow handling of scrim clicks
    });

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
      addClass: className => {
        // a hack to make sure the open animation is triggered
        if (className === 'mdc-dialog--open') {
          window.requestAnimationFrame(() => {
            this.classList.root_.add(className);
          });
        } else {
          this.classList.root_.add(className);
        }
      },
      removeClass: className => this.classList.root_.remove(className),
      hasClass: className => this.classList.root_.has(className),
      addBodyClass: className =>
        document.body && document.body.classList.add(className),
      removeBodyClass: className =>
        document.body && document.body.classList.remove(className),
      eventTargetMatches: (target, selector) => matches(target, selector),
      computeBoundingRect: () =>
        this.root_ && this.root_.getBoundingClientRect(),
      trapFocus: () => this.focusTrap_.activate(),
      releaseFocus: () => this.focusTrap_.deactivate(),
      isContentScrollable: () =>
        !!this.content_ && util.isScrollable(this.content_),
      areButtonsStacked: () => util.areTopsMisaligned(this.buttons_),
      getActionFromEvent: event => {
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
      notifyOpening: () => this.emit('onOpen', {}),
      notifyOpened: () => this.emit('onOpened', {}),
      notifyClosing: action => this.emit('onClose', action ? { action } : {}),
      notifyClosed: action => this.emit('onClosed', action ? { action } : {})
    });
  }

  render() {
    const {
      children,
      open,
      onOpen,
      onOpening,
      onClose,
      onClosing,
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

// constructor: MDCDialog,
// adapter: {
//   notifyAccept: function() {
//     const evt = this.emit(MDCDialogFoundation.strings.ACCEPT_EVENT);
//     this.props.onClose && this.props.onClose(evt);
//   },
//   notifyCancel: function() {
//     const evt = this.emit(MDCDialogFoundation.strings.CANCEL_EVENT);
//     this.props.onClose && this.props.onClose(evt);
//   }
// }
// })<DialogPropsT> {

//   show: Function;
//   close: Function;
//   open: boolean;

//   syncWithProps(nextProps: DialogPropsT) {
//     // open
//     syncFoundationProp(nextProps.open, this.open, () => {
//       nextProps.open ? this.show() : this.close();
//     });
//   }

//   render() {
//     const { open, onAccept, onCancel, onClose, apiRef, ...rest } = this.props;
//     const { root_ } = this.foundationRefs;

//     return <DialogRoot {...rest} elementRef={root_} />;
//   }
// }

export type SimpleDialogPropsT = {
  /** A title for the default Dialog template. */
  title?: React.Node,
  /** Additional Dialog header content for the default Dialog template. */
  header?: React.Node,
  /** Body content for the default Dialog template, rendered before children. */
  body?: React.Node,
  /** Additional footer content for the default Dialog template, rendered before any buttons. */
  footer?: React.Node,
  /** Creates an accept button for the default Dialog template with a given label. You can pass `null` to remove the button.*/
  acceptLabel?: React.Node,
  /** Creates an cancel button for the default Dialog with a given label. You can pass `null` to remove the button.*/
  cancelLabel?: React.Node,
  /** Any children will be rendered in the body of the default Dialog template. */
  children?: React.Node,
  /** Allow the body to be scrollable */
  scrollable?: boolean
} & DialogPropsT;

/** A non-standard SimpleDialog component for ease of use. */
export class SimpleDialog extends React.Component<SimpleDialogPropsT> {
  static defaultProps = {
    title: undefined,
    header: undefined,
    body: undefined,
    footer: undefined,
    scrollable: undefined,
    acceptLabel: 'Accept',
    cancelLabel: 'Cancel',
    open: false,
    onAccept: noop,
    onCancel: noop,
    onClose: noop,
    children: undefined
  };

  render() {
    const {
      title,
      header,
      body,
      footer,
      scrollable,
      acceptLabel,
      cancelLabel,
      children,
      open,
      onAccept,
      onCancel,
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
          <DialogContent scrollable={scrollable}>
            {body}
            {children}
          </DialogContent>
        )}

        {(!!cancelLabel || !!acceptLabel) && (
          <DialogActions>
            {!!footer && { footer }}
            {!!cancelLabel && <DialogButton close>{cancelLabel}</DialogButton>}
            {!!acceptLabel && <DialogButton accept>{acceptLabel}</DialogButton>}
          </DialogActions>
        )}
      </Dialog>
    );
  }
}
