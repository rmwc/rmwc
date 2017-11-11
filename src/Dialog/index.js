// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { MDCDialog } from '@material/dialog/dist/mdc.dialog';

import Button from '../Button';
import { simpleTag, withMDC, noop } from '../Base';
import type { SimpleTagPropsT } from '../Base';

export const DialogRoot = simpleTag({
  name: 'DialogRoot',
  tag: 'aside',
  classNames: 'mdc-dialog',
  defaultProps: {
    role: 'alertdialog'
  }
});

export const DialogBackdrop = simpleTag({
  name: 'DialogBackdrop',
  classNames: 'mdc-dialog__backdrop'
});

export const DialogSurface = simpleTag({
  name: 'DialogSurface',
  classNames: 'mdc-dialog__surface'
});

export const DialogHeader = simpleTag({
  name: 'DialogHeader',
  tag: 'header',
  classNames: 'mdc-dialog__header'
});

export const DialogHeaderTitle = simpleTag({
  name: 'DialogHeaderTitle',
  tag: 'h2',
  classNames: 'mdc-dialog__header__title'
});

export const DialogBody = simpleTag({
  name: 'DialogBody',
  tag: 'section',
  classNames: 'mdc-dialog__body'
});

export const DialogFooter = simpleTag({
  name: 'DialogFooter',
  tag: 'footer',
  classNames: 'mdc-dialog__footer'
});

type DialogFooterButtonT = {
  /* Make it an accept Button. */
  accept?: boolean,
  /* Make it a cancel button. */
  cancel?: boolean
} & SimpleTagPropsT;

export const DialogFooterButton: React.ComponentType<
  DialogFooterButtonT
> = simpleTag({
  name: 'DialogFooterButton',
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
});

type DialogPropsT = {
  /* Whether or not the Dialog is showing. */
  open: boolean,
  /* Callback for when the accept Button is pressed. */
  onAccept: Event => mixed,
  /* Callback for when the Dialog was closed without acceptance. */
  onCancel: Event => mixed,
  /* Callback for when the Dialog closes. */
  onClose: Event => mixed
};

export const Dialog: React.ComponentType<DialogPropsT> = withMDC({
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
  ({ open, onAccept, onCancel, onClose, children, mdcElementRef, ...rest }) => {
    const template = children || <DialogTemplate />;

    return React.cloneElement(template, {
      ...template.props,
      ...rest,
      elementRef: mdcElementRef
    });
  }
);

type DialogTemplatePropsT = {
  title?: React.Node,
  header?: React.Node,
  body?: React.Node,
  footer?: React.Node,
  acceptLabel?: React.Node,
  cancelLabel?: React.Node,
  children?: React.Node
};

export const DialogTemplate = ({
  title,
  header,
  body,
  footer,
  acceptLabel,
  cancelLabel,
  children,
  ...rest
}: DialogTemplatePropsT) => (
  <DialogRoot {...rest}>
    <DialogSurface>
      {(!!title || !!header) && (
        <DialogHeader>
          {!!title && <DialogHeaderTitle>{title}</DialogHeaderTitle>}
          {!!header && { header }}
        </DialogHeader>
      )}
      {(!!body || children) && (
        <DialogBody>
          {body}
          {children}
        </DialogBody>
      )}

      {(!!cancelLabel || !!acceptLabel) && (
        <DialogFooter>
          {!!footer && { footer }}
          {!!cancelLabel && (
            <DialogFooterButton cancel>Decline</DialogFooterButton>
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

DialogTemplate.defaultProps = {
  title: undefined,
  header: undefined,
  body: undefined,
  footer: undefined,
  acceptLabel: 'Accept',
  cancelLabel: 'Cancel'
};

export default Dialog;
