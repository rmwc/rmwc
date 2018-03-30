// @flow
import * as React from 'react';
import { MDCDialog, util } from '@material/dialog/dist/mdc.dialog';

import Button from '../Button';
import { simpleTag, withMDC, noop } from '../Base';
import type { SimpleTagPropsT } from '../Base';
import { MDCRipple } from '@material/ripple/dist/mdc.ripple';

import { withFoundation } from '../Base/MDCFoundation';


export const DialogRoot = simpleTag({
  displayName: 'DialogRoot',
  defaultProps: {
    role: 'alertdialog'
  },
  tag: 'aside',
  classNames: 'mdc-dialog'
});

/** The Dialog backdrop */
export const DialogBackdrop = simpleTag({
  displayName: 'DialogBackdrop',
  classNames: 'mdc-dialog__backdrop'
});

/** The Dialog surface */
export const DialogSurface = simpleTag({
  displayName: 'DialogSurface',
  classNames: 'mdc-dialog__surface'
});

/** The Dialog header */
export const DialogHeader = simpleTag({
  displayName: 'DialogHeader',
  tag: 'header',
  classNames: 'mdc-dialog__header'
});

/** The Dialog title */
export const DialogHeaderTitle = simpleTag({
  displayName: 'DialogHeaderTitle',
  tag: 'h2',
  classNames: 'mdc-dialog__header__title'
});


type DialogBodyT = {
  /** Make it scrollable. */
  scrollable?: boolean
} & SimpleTagPropsT;

/** The Dialog body */
export class DialogBody extends simpleTag({
  displayName: 'DialogBody',
  tag: 'section',
  classNames: props => [
    'mdc-dialog__body',
    {
      'mdc-dialog__body--scrollable': props.scrollable
    }
  ],
  consumeProps: ['scrollable']
})<DialogBodyT> {
  render() {
    return super.render();
  }
}

/** The Dialog footer */
export const DialogFooter = simpleTag({
  displayName: 'DialogFooter',
  tag: 'footer',
  classNames: 'mdc-dialog__footer'
});

type DialogFooterButtonT = {
  /** Make it an accept button. */
  accept?: boolean,
  /** Make it a cancel button. */
  cancel?: boolean
} & SimpleTagPropsT;

/** A Dialog footer button */
export class DialogFooterButton extends simpleTag({
  displayName: 'DialogFooterButton',
  tag: Button,
  classNames: props => [
    'mdc-dialog__footer__button',
    {
      'mdc-dialog__footer__button--cancel': props.cancel,
      'mdc-dialog__footer__button--accept': props.accept
    }
  ],
  defaultProps: {
    accept: false,
    cancel: false
  },
  consumeProps: ['accept', 'cancel']
})<DialogFooterButtonT> {
  render() {
    return super.render();
  }
}

type DialogPropsT = {
  /** Whether or not the Dialog is showing. */
  open: boolean,
  /** Callback for when the accept Button is pressed. */
  onAccept: (evt: Event) => mixed,
  /** Callback for when the Dialog was closed without acceptance. */
  onCancel: (evt: Event) => mixed,
  /** Callback for when the Dialog closes. */
  onClose: (evt: Event) => mixed
};

export class Dialog extends withFoundation({
  constructor: MDCDialog,
  refs: [
    'root_'
  ],
  adapter: {}
})<DialogPropsT, {}> {
  static displayName = 'Dialog';

  componentDidMount(){
    super.componentDidMount()

    this.footerBtnRipples_ = [];
    const footerBtns = this.root_.querySelectorAll('.mdc-dialog__footer__button');
    for (let i = 0, footerBtn; footerBtn = footerBtns[i]; i++) {
      this.footerBtnRipples_.push(new MDCRipple(footerBtn));
    }

    this.focusTrap_ = util.createFocusTrapInstance(this.dialogSurface_, this.acceptButton_);
  }

  componentWillReceiveProps(newProps){
    super.componentWillReceiveProps(newProps);

    if(newProps.open){
      this.show();
    }
  }

  render() {
    const {
      open,
      onAccept,
      onCancel,
      onClose,
      mdcElementRef,
      ...rest
    } = this.props;

    const { root_ }  = this.foundationRefs;

    return <DialogRoot elementRef={root_} {...rest} />;
  }
}


type SimpleDialogPropsT = {
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
      ...rest
    } = this.props;

    return (
      <Dialog {...rest}>
        <DialogSurface>
          {(!!title || !!header) && (
            <DialogHeader>
              {!!title && <DialogHeaderTitle>{title}</DialogHeaderTitle>}
              {!!header && { header }}
            </DialogHeader>
          )}
          {(!!body || children) && (
            <DialogBody scrollable={scrollable}>
              {body}
              {children}
            </DialogBody>
          )}

          {(!!cancelLabel || !!acceptLabel) && (
            <DialogFooter>
              {!!footer && { footer }}
              {!!cancelLabel && (
                <DialogFooterButton cancel>{cancelLabel}</DialogFooterButton>
              )}
              {!!acceptLabel && (
                <DialogFooterButton accept>{acceptLabel}</DialogFooterButton>
              )}
            </DialogFooter>
          )}
        </DialogSurface>
        <DialogBackdrop />
      </Dialog>
    );
  }
}
