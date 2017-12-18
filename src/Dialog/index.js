// @flow
import * as React from 'react';
import { MDCDialog } from '@material/dialog/dist/mdc.dialog';

import Button from '../Button';
import { simpleTag, withMDC, noop } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export const DialogRoot = simpleTag({
  displayName: 'DialogRoot',
  defaultProps: {
    role: 'alertdialog'
  },
  tag: 'aside',
  classNames: props => [
    'mdc-dialog',
    {
      'mdc-dialog--theme-dark': props.themeDark
    }
  ],
  consumeProps: ['themeDark']
});

export const DialogBackdrop = simpleTag({
  displayName: 'DialogBackdrop',
  classNames: 'mdc-dialog__backdrop'
});

export const DialogSurface = simpleTag({
  displayName: 'DialogSurface',
  classNames: 'mdc-dialog__surface'
});

export const DialogHeader = simpleTag({
  displayName: 'DialogHeader',
  tag: 'header',
  classNames: 'mdc-dialog__header'
});

export const DialogHeaderTitle = simpleTag({
  displayName: 'DialogHeaderTitle',
  tag: 'h2',
  classNames: 'mdc-dialog__header__title'
});

export const DialogBody = simpleTag({
  displayName: 'DialogBody',
  tag: 'section',
  classNames: props => [
    'mdc-dialog__body',
    {
      'mdc-dialog__body--scrollable': props.scrollable
    }
  ],
  consumeProps: ['scrollable']
});

export const DialogFooter = simpleTag({
  displayName: 'DialogFooter',
  tag: 'footer',
  classNames: 'mdc-dialog__footer'
});

type DialogFooterButtonT = {
  /* Make it an accept Button. */
  accept?: boolean,
  /* Make it a cancel button. */
  cancel?: boolean
} & SimpleTagPropsT;

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
  onClose: (evt: Event) => mixed,
  /** Use the dark theme */
  themeDark: boolean
};

export const Dialog = withMDC({
  mdcConstructor: MDCDialog,
  mdcElementRef: true,
  mdcEvents: {
    'MDCDialog:accept': (evt, props) => {
      props.onAccept(evt);
      props.onClose(evt);
    },
    'MDCDialog:cancel': (evt, props) => {
      props.onCancel(evt);
      props.onClose(evt);
    }
  },
  defaultProps: {
    open: false,
    themeDark: false,
    onAccept: noop,
    onCancel: noop,
    onClose: noop
  },
  onUpdate: (props, nextProps, api) => {
    if (api && api.open !== !!nextProps.open) {
      nextProps.open ? api.show() : api.close();
    }
  }
})(
  class extends React.Component<DialogPropsT> {
    static displayName = 'Dialog';

    render() {
      const {
        open,
        onAccept,
        onCancel,
        onClose,
        children,
        mdcElementRef,
        ...rest
      } = this.props;
      const template = children || <DefaultDialogTemplate />;

      return React.cloneElement(template, {
        ...template.props,
        ...rest,
        elementRef: mdcElementRef
      });
    }
  }
);

type DefaultDialogTemplatePropsT = {
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
};

export class DefaultDialogTemplate extends React.Component<
  DefaultDialogTemplatePropsT
> {
  static defaultProps = {
    title: undefined,
    header: undefined,
    body: undefined,
    footer: undefined,
    scrollable: undefined,
    acceptLabel: 'Accept',
    cancelLabel: 'Cancel'
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
      <DialogRoot {...rest}>
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
      </DialogRoot>
    );
  }
}

export default Dialog;
