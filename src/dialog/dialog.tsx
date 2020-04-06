import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { MDCDialogFoundation } from '@material/dialog';

import {
  useClassNames,
  Tag,
  createComponent,
  PortalPropT,
  PortalChild
} from '@rmwc/base';
import { Button, ButtonProps } from '@rmwc/button';
import { useDialogFoundation } from './foundation';

/*********************************************************************
 * Events
 *********************************************************************/

export type DialogOnOpenEventT = RMWC.CustomEventT<{}>;
export type DialogOnOpenedEventT = RMWC.CustomEventT<{}>;
export type DialogOnCloseEventT = RMWC.CustomEventT<{ action?: string }>;
export type DialogOnClosedEventT = RMWC.CustomEventT<{ action?: string }>;

/*********************************************************************
 * Dialogs
 *********************************************************************/

/** A Dialog component. */
export interface DialogProps {
  /** Whether or not the Dialog is showing. */
  open?: boolean;
  /** Callback for when the Dialog opens. */
  onOpen?: (evt: DialogOnOpenEventT) => void;
  /** Callback for when the Dialog finishes opening */
  onOpened?: (evt: DialogOnOpenedEventT) => void;
  /** Callback for when the Dialog beings to close. evt.detail = { action?: string }*/
  onClose?: (evt: DialogOnCloseEventT) => void;
  /** Callback for when the Dialog finishes closing. evt.detail = { action?: string }*/
  onClosed?: (evt: DialogOnCloseEventT) => void;
  /** Prevent the dialog from closing when the scrim is clicked or escape key is pressed. */
  preventOutsideDismiss?: boolean;
  /** Renders the dialog to a portal. Useful for situations where the dialog might be cutoff by an overflow: hidden container. You can pass "true" to render to the default RMWC portal. */
  renderToPortal?: PortalPropT;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCDialogFoundation>;
}

/** A Dialog component. */
export const Dialog = createComponent<DialogProps>(function Dialog(props, ref) {
  const { rootEl } = useDialogFoundation(props);

  const className = useClassNames(props, ['mdc-dialog']);

  const {
    children,
    open,
    onOpen,
    onOpened,
    onClose,
    onClosed,
    preventOutsideDismiss,
    foundationRef,
    renderToPortal,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  return (
    <PortalChild renderTo={renderToPortal}>
      <Tag {...rest} element={rootEl} className={className} ref={ref}>
        <div className="mdc-dialog__container">
          <div
            className="mdc-dialog__surface"
            role="alertdialog"
            aria-modal
            aria-labelledby={ariaLabelledby}
            aria-describedby={ariaDescribedBy}
          >
            {children}
          </div>
        </div>
        <DialogScrim disableInteraction={preventOutsideDismiss} />
      </Tag>
    </PortalChild>
  );
});

/** A SimpleDialog component for ease of use. */
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
}

export type SimpleDialogHTMLProps = RMWC.HTMLProps<
  HTMLDivElement,
  Omit<React.AllHTMLAttributes<HTMLDivElement>, 'title'>
>;

/** A SimpleDialog component for ease of use. */
export const SimpleDialog: RMWC.ComponentType<
  SimpleDialogProps,
  SimpleDialogHTMLProps,
  'div'
> = createComponent<SimpleDialogProps, SimpleDialogHTMLProps>(
  function SimpleDialog(
    {
      title,
      header,
      body,
      footer,
      acceptLabel = 'Accept',
      cancelLabel = 'Cancel',
      children,
      open,
      ...rest
    },
    ref
  ) {
    return (
      <Dialog open={open} {...rest} ref={ref}>
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

        {(!!cancelLabel || !!acceptLabel || !!footer) && (
          <DialogActions>
            {!!footer && footer}
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
);

/*********************************************************************
 * Bits
 *********************************************************************/

interface DialogScrimProps {
  disableInteraction?: boolean;
}

const DialogScrim = React.memo(function DialogScrim({
  disableInteraction
}: DialogScrimProps) {
  const style: React.CSSProperties = disableInteraction
    ? { pointerEvents: 'none' }
    : {};
  return <div className="mdc-dialog__scrim" style={style} />;
});

/** The Dialog title. */
export interface DialogTitleProps {}

/** The Dialog title. */
export const DialogTitle = createComponent<DialogTitleProps>(
  function DialogTitle(props, ref) {
    const className = useClassNames(props, ['mdc-dialog__title']);
    return <Tag tag="h2" {...props} ref={ref} className={className} />;
  }
);

/** The Dialog content. */
export interface DialogContentProps {}

/** The Dialog content. */
export const DialogContent = createComponent<DialogContentProps>(
  function DialogContent(props, ref) {
    const className = useClassNames(props, ['mdc-dialog__content']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** Actions container for the Dialog. */
export interface DialogActionsProps {}

/** Actions container for the Dialog. */
export const DialogActions = createComponent<DialogActionsProps>(
  function DialogActions(props, ref) {
    const className = useClassNames(props, ['mdc-dialog__actions']);
    return <Tag {...props} ref={ref} className={className} />;
  }
);

/** Action buttons for the Dialog. */
export interface DialogButtonProps extends ButtonProps {
  /** An action returned in evt.detail.action to the onClose handler. */
  action?: string;
  /** Indicates this is the default selected action when pressing enter */
  isDefaultAction?: boolean;
}

/** Action buttons for the Dialog. */
export const DialogButton = createComponent<DialogButtonProps>(
  function DialogButton(props, ref) {
    const className = useClassNames(props, ['mdc-dialog__button']);
    const { action = '', isDefaultAction, ...rest } = props;
    const defaultProp = !!isDefaultAction
      ? { [MDCDialogFoundation.strings.BUTTON_DEFAULT_ATTRIBUTE]: true }
      : {};

    return (
      <Button
        {...rest}
        {...defaultProp}
        ref={ref}
        className={className}
        data-mdc-dialog-action={action}
      />
    );
  }
);
