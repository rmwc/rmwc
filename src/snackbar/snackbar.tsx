import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { MDCSnackbarFoundation, util, MDCSnackbar } from '@material/snackbar';
import { Button, ButtonProps } from '@rmwc/button';
import {
  componentFactory,
  FoundationComponent,
  handleDeprecations,
  closest
} from '@rmwc/base';
import { IconButton, IconButtonProps } from '@rmwc/icon-button';
import { Icon } from '@rmwc/icon';

/** Monkey patch the foundation to accept dynamic reasons rather than just "action" */
// @ts-ignore
MDCSnackbarFoundation.prototype.handleActionButtonClick = function(
  evt: any,
  reason: string
) {
  this.close(reason);
};

export type SnackbarOnOpenEventT = RMWC.CustomEventT<{}>;
export type SnackbarOnCloseEventT = RMWC.CustomEventT<{ reason?: string }>;

/** A Snackbar component for notifications. */
export interface SnackbarProps {
  /** Show the Snackbar. */
  open?: boolean;
  /** A callback thats fired when the Snackbar shows. */
  onOpen?: (evt: SnackbarOnOpenEventT) => void;
  /** A callback thats fired when the Snackbar hides. */
  onClose?: (evt: SnackbarOnCloseEventT) => void;
  /** A string or other renderable JSX to be used as the message body. */
  message?: React.ReactNode;
  /** One or more actions to add to the snackbar. */
  action?: React.ReactNode | React.ReactNode[];
  /** Milliseconds to show the Snackbar for. */
  timeout?: number;
  /** Places the action underneath the message text. */
  stacked?: boolean;
  /* Aligns the Snackbar to the start of the screen. */
  leading?: boolean;
  /* Shows a dismiss icon, */
  dismissIcon?: boolean | string;
  /** Whether or not your want clicking an action to close the Snackbar. */
  dismissesOnAction?: boolean;
  /** An icon for the snackbar */
  icon?: RMWC.IconPropT;
}

export interface DeprecatedSnackbarProps {
  /** DEPRECATED: Use open. */
  show?: boolean;
  /** DEPRECATED: Use onOpen. */
  onShow?: (evt: Event) => void;
  /** DEPRECATED: Use onClose. */
  onHide?: (evt: Event) => void;
  /** DEPRECATED: Use leading. */
  alignStart?: boolean;
  /** DEPRECATED: No longer applicable. */
  multiline?: boolean;
  /** DEPRECATED: Use stacked. */
  actionOnBottom?: boolean;
  /** DEPRECATED: Use the actions prop. */
  actionHandler?: () => void;
  /** DEPRECATED: Use the actions prop. */
  actionText?: React.ReactNode;
}

const SnackbarRoot = componentFactory<{}>({
  displayName: 'SnackbarRoot',
  classNames: (props: SnackbarProps) => [
    'mdc-snackbar',
    {
      'mdc-snackbar--leading': props.leading,
      'mdc-snackbar--stacked': props.stacked
    }
  ],
  defaultProps: {
    leading: false,
    'aria-live': 'assertive',
    'aria-atomic': true,
    'aria-hidden': true
  },
  consumeProps: ['leading', 'stacked']
});

const SnackbarLabel = componentFactory<{}>({
  displayName: 'SnackbarText',
  classNames: ['mdc-snackbar__label'],
  defaultProps: {
    role: 'status',
    'aria-live': 'polite'
  }
});

const SnackbarActions = componentFactory<{}>({
  displayName: 'SnackbarActions',
  classNames: ['mdc-snackbar__actions']
});

/** A button for a snackbar action. */
export interface SnackbarActionProps extends ButtonProps {
  /** An action returned in evt.detail.reason to the onClose handler. */
  action?: string;
}

/** A button for a snackbar action. */
export const SnackbarAction = componentFactory<SnackbarActionProps>({
  displayName: 'SnackbarAction',
  tag: Button,
  classNames: ['mdc-snackbar__action'],
  render: (
    {
      action = MDCSnackbarFoundation.strings.REASON_ACTION,
      ...rest
    }: SnackbarActionProps,
    ref: React.Ref<any>,
    Tag: any
  ) => {
    return <Tag {...rest} ref={ref} data-mdc-snackbar-action={action} />;
  }
});

const SnackbarDismiss = componentFactory<IconButtonProps>({
  displayName: 'SnackbarDismiss',
  tag: IconButton,
  classNames: ['mdc-snackbar__dismiss']
});

/** A Snackbar component for notifications. */
export class Snackbar extends FoundationComponent<
  MDCSnackbarFoundation,
  SnackbarProps & DeprecatedSnackbarProps
> {
  static displayName = 'Snackbar';
  static defaultProps = {
    dismissesOnAction: true
  };

  constructor(props: SnackbarProps) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSurfaceClick = this.handleSurfaceClick.bind(this);
  }

  private root = this.createElement('root');
  isShowing_ = false;
  labelEl: HTMLElement | null = null;
  show: any;
  announce = util.announce;

  getDefaultFoundation() {
    /* eslint brace-style: "off" */
    return new MDCSnackbarFoundation({
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      announce: () => this.labelEl && this.announce(this.labelEl),
      notifyOpening: () => this.emit('onOpen', {}),
      notifyOpened: () => this.emit('onOpened', {}),
      notifyClosing: (reason: string) =>
        this.emit('onClose', reason ? { reason } : {}),
      notifyClosed: (reason: string) =>
        this.emit('onClosed', reason ? { reason } : {})
    });
  }

  sync(props: SnackbarProps, prevProps: SnackbarProps) {
    props = this.getPropsWithDeprecations(props);
    prevProps = this.getPropsWithDeprecations(prevProps);

    // open
    if (props.open !== prevProps.open && props.open) {
      this.foundation.open();
    }

    // timeout
    if (props.timeout !== prevProps.timeout) {
      // dont tell me what I can cant set my timeout too...
      // directly patch over using setTimeoutMs
      (this.foundation as any).autoDismissTimeoutMs_ = props.timeout;
    }
  }

  getPropsWithDeprecations(props: SnackbarProps) {
    return handleDeprecations(
      props,
      {
        show: 'open',
        onShow: 'onOpen',
        onHide: 'onClose',
        alignStart: 'leading',
        multiline: '',
        actionOnBottom: 'stacked',
        actionHandler: '',
        actionText: ''
      },
      'Snackbar'
    );
  }

  handleKeyDown(evt: React.KeyboardEvent & KeyboardEvent) {
    this.props.onKeyDown && this.props.onKeyDown(evt);
    this.foundation.handleKeyDown(evt);
  }

  handleSurfaceClick(evt: React.MouseEvent | MouseEvent) {
    if (evt.target instanceof Element) {
      let el = evt.target;
      const button = closest(el, '.mdc-button') as Element;
      if (button) {
        el = button;
      }

      if (
        this.props.dismissesOnAction &&
        el.classList.contains('mdc-snackbar__action')
      ) {
        this.foundation.handleActionButtonClick(
          evt as MouseEvent,
          // @ts-ignore
          el.dataset.mdcSnackbarAction
        );
      } else if (el.classList.contains('mdc-snackbar__dismiss')) {
        this.foundation.handleActionIconClick(evt as MouseEvent);
      }
    }
  }

  render() {
    // grab these before we try to correct them in the deprecation
    const { actionText, actionHandler } = this.props;

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
      dismissesOnAction,
      ...rest
    } = this.getPropsWithDeprecations(this.props);

    const actions = Array.isArray(action) ? action : action ? [action] : [];
    return (
      <SnackbarRoot
        {...this.root.props(rest)}
        ref={this.root.setRef}
        onKeyDown={this.handleKeyDown}
      >
        <div
          className="mdc-snackbar__surface"
          onClick={this.handleSurfaceClick}
        >
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
             * Fixes bug https://github.com/jamesmfriedman/rmwc/issues/418
             * Wrapping the content for accessibility so it can be announced for screen readers
             */}
            <div
              style={{ display: 'none' }}
              ref={(el: HTMLDivElement) => (this.labelEl = el)}
            />
          </SnackbarLabel>

          <SnackbarActions>
            {/** HANDLE DEPRECATED  */}
            {!!actionText && (
              <SnackbarAction onClick={actionHandler}>
                {actionText}
              </SnackbarAction>
            )}
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
      </SnackbarRoot>
    );
  }
}
