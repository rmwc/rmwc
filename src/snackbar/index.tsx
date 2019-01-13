/**
 * Shows in browser notifications
 */

import { SimpleTagPropsT } from '@rmwc/base';

import * as React from 'react';
// @ts-ignore
import { MDCSnackbar } from '@material/snackbar/dist/mdc.snackbar';
// @ts-ignore
import { getCorrectEventName } from '@material/animation/dist/mdc.animation';
import Button from '@rmwc/button';
import {
  simpleTag,
  syncFoundationProp,
  withFoundation,
  noop
} from '@rmwc/base';

export type SnackbarPropsT = {
  /** Show the Snackbar. */
  show?: boolean;
  /** A callback thats fired when the Snackbar shows. */
  onShow?: () => void;
  /** A callback thats fired when the Snackbar hides. */
  onHide?: () => void;
  /** A string or other renderable JSX to be used as the message body. */
  message?: React.ReactNode;
  /** Milliseconds to show the Snackbar for. */
  timeout?: number;
  /** Callback that fires when action is pressed. The actionText property must be set to use this. */
  actionHandler?: () => void;
  /** Label for the action button. */
  actionText?: React.ReactNode;
  /** Lets the Snackbar text overflow onto multiple lines. */
  multiline?: boolean;
  /** Places the action underneath the message text. */
  actionOnBottom?: boolean;
  /** Whether or not the Snackbar dismisses on the action press. */
  dismissesOnAction?: boolean;
  /* Aligns the Snackbar to the start of the screen. */
  alignStart?: boolean;
} & SimpleTagPropsT;

export const SnackbarRoot = simpleTag({
  displayName: 'SnackbarRoot',
  classNames: (props: SnackbarPropsT) => [
    'mdc-snackbar',
    {
      'mdc-snackbar--align-start': props.alignStart
    }
  ],
  defaultProps: {
    alignStart: false,
    'aria-live': 'assertive',
    'aria-atomic': true,
    'aria-hidden': true
  },
  consumeProps: ['alignStart']
});

export const SnackbarText = simpleTag({
  displayName: 'SnackbarText',
  classNames: 'mdc-snackbar__text'
});

export const SnackbarActionWrapper = simpleTag({
  displayName: 'SnackbarActionWrapper',
  classNames: 'mdc-snackbar__action-wrapper'
});

export const SnackbarActionButton = simpleTag({
  displayName: 'SnackbarActionButton',
  tag: Button,
  classNames: 'mdc-snackbar__action-button'
});

/**
 * A Snackbar component for notifications.
 */
export class Snackbar extends withFoundation({
  constructor: MDCSnackbar,
  adapter: {
    removeClass: function(className: string) {
      // only remove if we still have a reference to our root.
      // @ts-ignore
      this.root_ && this.root_.classList.remove(className);
    },
    registerTransitionEndHandler: function(handler: any) {
      // only add if we still have a reference to our root.
      this.root_ &&
        // @ts-ignore
        this.root_.addEventListener(
          getCorrectEventName(window, 'transitionend'),
          handler
        );
    }
  }
})<SnackbarPropsT> {
  static displayName = 'Snackbar';

  static defaultProps = {
    show: false,
    onHide: noop,
    onShow: noop,
    message: undefined,
    timeout: undefined,
    actionHandler: undefined,
    actionText: undefined,
    multiline: false,
    actionOnBottom: false,
    dismissesOnAction: true
  };

  isShowing_ = false;
  dismissesOnAction: any;
  show: any;

  get isShowing() {
    return this.isShowing_;
  }

  set isShowing(isShowing: boolean) {
    this.isShowing_ = isShowing;
  }

  syncWithProps(nextProps: SnackbarPropsT) {
    syncFoundationProp(
      nextProps.dismissesOnAction,
      this.dismissesOnAction,
      () => (this.dismissesOnAction = !!nextProps.dismissesOnAction)
    );

    syncFoundationProp(nextProps.show, this.isShowing, () => {
      this.isShowing = !!nextProps.show;

      window.requestAnimationFrame(() => {
        if (nextProps.show) {
          const {
            message,
            timeout,
            actionHandler,
            actionText,
            multiline,
            actionOnBottom
          } = nextProps;

          this.show({
            message,
            timeout,
            actionHandler,
            actionText: actionText || ' ',
            multiline,
            actionOnBottom
          });
        }
      });
    });
  }

  render() {
    const {
      show,
      message,
      timeout,
      actionHandler,
      actionText,
      multiline,
      actionOnBottom,
      dismissesOnAction,
      onHide,
      onShow,
      children,
      ...rest
    } = this.props;

    const { root_ } = this.foundationRefs;

    const isJSX = typeof message === 'object';
    const snackbarTextStyle: { display?: string } = {};
    if (isJSX) {
      snackbarTextStyle.display = 'none';
    }

    const snackbarActionWrapperStyle = !actionText
      ? {
          display: 'none'
        }
      : {};

    /**
     * The double SnackbarText below is a hack to allow for rendering JSX
     * The real message gets rendered in the hidden container, and the second one is
     * ignored and shows th rendered content :)
     */
    return (
      <SnackbarRoot {...rest} elementRef={root_}>
        <SnackbarText style={snackbarTextStyle} />
        {isJSX && <SnackbarText>{message}</SnackbarText>}
        <SnackbarActionWrapper style={snackbarActionWrapperStyle}>
          <SnackbarActionButton />
        </SnackbarActionWrapper>
        {children}
      </SnackbarRoot>
    );
  }
}

export default Snackbar;
