import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCSnackbarFoundation } from '@material/snackbar';
import { Button, ButtonProps } from '@rmwc/button';
import { useClassNames, Tag, createComponent } from '@rmwc/base';
import { useSnackbarFoundation } from './foundation';
import { IconButton, IconButtonProps } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';

/*********************************************************************
 * Events
 *********************************************************************/

export type SnackbarOnOpenEventT = RMWC.CustomEventT<{}>;
export type SnackbarOnCloseEventT = RMWC.CustomEventT<{ reason?: string }>;

/*********************************************************************
 * Snackbar
 *********************************************************************/

/** A Snackbar component for notifications. */
export interface SnackbarProps {
  /** Show the Snackbar. */
  open?: boolean;
  /** A callback thats fired when the Snackbar shows. */
  onOpen?: (evt: SnackbarOnOpenEventT) => void;
  /** A callback thats fired when the Snackbar hides. evt.detail = { reason?: string } */
  onClose?: (evt: SnackbarOnCloseEventT) => void;
  /** A string or other renderable JSX to be used as the message body. */
  message?: React.ReactNode;
  /** One or more actions to add to the snackbar. */
  action?: React.ReactNode | React.ReactNode[];
  /** Milliseconds to show the Snackbar for. Set to -1 to show indefinitely. */
  timeout?: number;
  /** Places the action underneath the message text. */
  stacked?: boolean;
  /* Aligns the Snackbar to the start of the screen. */
  leading?: boolean;
  /* Shows a dismiss icon, */
  dismissIcon?: boolean | RMWC.IconPropT;
  /** Whether or not your want clicking an action to close the Snackbar. */
  dismissesOnAction?: boolean;
  /** An icon for the snackbar */
  icon?: RMWC.IconPropT;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCSnackbarFoundation | null>;
}

export type SnackbarHTMLProps = RMWC.HTMLProps<
  HTMLDivElement,
  Omit<React.AllHTMLAttributes<HTMLDivElement>, 'action'>
>;

/** A Snackbar component for notifications. */
export const Snackbar: RMWC.ComponentType<
  SnackbarProps,
  SnackbarHTMLProps,
  'div'
> = createComponent<SnackbarProps, SnackbarHTMLProps>(
  function Snackbar(props, ref) {
    const { rootEl, surfaceEl, labelEl } = useSnackbarFoundation(props);

    const {
      open,
      message,
      timeout,
      dismissIcon,
      onOpen,
      onClose,
      children,
      action,
      icon,
      leading,
      stacked,
      dismissesOnAction,
      foundationRef,
      ...rest
    } = props;

    const className = useClassNames(props, [
      'mdc-snackbar',
      {
        'mdc-snackbar--leading': leading,
        'mdc-snackbar--stacked': stacked
      }
    ]);

    const actions: SnackbarProps['action'][] = Array.isArray(action)
      ? action
      : action
        ? [action]
        : [];

    return (
      <Tag
        {...rest}
        ref={ref}
        element={rootEl}
        aria-live="assertive"
        aria-atomic
        className={className}
      >
        <div {...surfaceEl.props({})} className="mdc-snackbar__surface">
          {!!icon && (
            <Icon
              style={{
                color: 'rgba(255, 255, 255, 0.87)',
                fill: 'currentColor',
                marginLeft: '1rem'
              }}
              icon={icon}
            />
          )}
          <SnackbarLabel>
            {message}
            {/**
             * Fixes bug https://github.com/rmwc/rmwc/issues/418
             * Wrapping the content for accessibility so it can be announced for screen readers
             */}
            <div
              style={{ display: 'none' }}
              ref={labelEl.reactRef as React.Ref<HTMLDivElement>}
            />
          </SnackbarLabel>

          <SnackbarActions>
            {actions.map((a, i) => (
              <React.Fragment key={i}>{a}</React.Fragment>
            ))}
            {dismissIcon && (
              <SnackbarDismiss
                icon={dismissIcon === true ? 'close' : dismissIcon}
              />
            )}
          </SnackbarActions>
          {children}
        </div>
      </Tag>
    );
  }
);

/*********************************************************************
 * Bits
 *********************************************************************/

function SnackbarLabel(props: { children: React.ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mdc-snackbar__label"
      {...props}
    />
  );
}

function SnackbarActions(props: { children: React.ReactNode }) {
  return <div className="mdc-snackbar__actions" {...props} />;
}

/** A button for a snackbar action. */
export interface SnackbarActionProps extends ButtonProps {
  /** An action returned in evt.detail.reason to the onClose handler. */
  action?: string;
}

/** A button for a snackbar action. */
export const SnackbarAction: RMWC.ComponentType<
  SnackbarActionProps,
  SnackbarHTMLProps,
  'button'
> = createComponent<SnackbarActionProps, SnackbarHTMLProps>(
  function SnackbarAction(props, ref) {
    const className = useClassNames(props, ['mdc-snackbar__action']);
    const { action = MDCSnackbarFoundation.strings.REASON_ACTION, ...rest } =
      props;
    return (
      <Button
        {...rest}
        className={className}
        ref={ref}
        data-mdc-snackbar-action={action}
      />
    );
  }
);

function SnackbarDismiss(props: IconButtonProps) {
  return <IconButton {...props} className="rmwc-snackbar__dismiss" />;
}
