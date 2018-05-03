/**
 * Shows in browser notifications
 */
// @flow
import type { SimpleTagPropsT } from '../Base';

import * as React from 'react';
import { MDCSnackbar } from '@material/snackbar/dist/mdc.snackbar';
import { noop } from '../Base/utils/noop';
import Button from '../Button';
import { simpleTag, withMDC } from '../Base';

export const SnackbarRoot = simpleTag({
  displayName: 'SnackbarRoot',
  classNames: props => [
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

export type SnackbarPropsT = {
  /** Show the Snackbar. */
  show?: boolean,
  /** A callback thats fired when the Snackbar shows. */
  onShow?: () => mixed,
  /** A callback thats fired when the Snackbar hides. */
  onHide?: () => mixed,
  /** A string or other renderable JSX to be used as the message body. */
  message?: React.Node,
  /** Milliseconds to show the Snackbar for. */
  timeout?: number,
  /** Callback that fires when action is pressed. The actionText property must be set to use this. */
  actionHandler?: () => mixed,
  /** Label for the action button. */
  actionText?: React.Node,
  /** Lets the Snackbar text overflow onto multiple lines. */
  multiline?: boolean,
  /** Places the action underneath the message text. */
  actionOnBottom?: boolean,
  /** Whether or not the Snackbar dismisses on the action press. */
  dismissesOnAction?: boolean,
  /* Aligns the Snackbar to the start of the screen. */
  alignStart?: boolean
} & SimpleTagPropsT;

const showSnackbar = (props, api) => {
  const {
    message,
    timeout,
    actionHandler,
    actionText,
    multiline,
    actionOnBottom
  } = props;

  api.show({
    message,
    timeout,
    actionHandler,
    actionText: actionText || ' ',
    multiline,
    actionOnBottom
  });
};

/**
 * A Snackbar component for notifications.
 */
export const Snackbar = withMDC({
  mdcConstructor: MDCSnackbar,
  mdcElementRef: true,
  mdcEvents: {
    'MDCSnackbar:show': (evt, props, api) => props.onShow(evt),
    'MDCSnackbar:hide': (evt, props, api) => props.onHide(evt)
  },
  defaultProps: {
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
  },
  onUpdate: (props, nextProps, api) => {
    if (api) {
      const { show, dismissesOnAction } = nextProps;
      api.dismissesOnAction = dismissesOnAction;

      if ((!props || show !== props.show) && show) {
        showSnackbar(nextProps, api);
      }
    }
  }
})(
  class extends React.Component<SnackbarPropsT> {
    static displayName = 'Snackbar';

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
        // $FlowFixMe
        mdcElementRef,
        ...rest
      } = this.props;

      const isJSX = typeof message === 'object';
      const snackbarTextStyle = {};
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
        <SnackbarRoot elementRef={mdcElementRef} {...rest}>
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
);

export default Snackbar;
