/**
 * Shows in browser notifications
 */
// @flow
import * as React from 'react';
import { MDCSnackbar } from '@material/snackbar/dist/mdc.snackbar';
import { noop } from '../Base/noop';
import Button from '../Button';
import { simpleTag, withMDC } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type SnackbarRootT = {
  /* Aligns the Snackbar to the start of the screen. */
  alignStart?: boolean
} & SimpleTagPropsT;

export const SnackbarRoot: React.ComponentType<SnackbarRootT> = simpleTag({
  displayName: 'SnackbarRoot',
  classNames: props => [
    'mdc-snackbar',
    {
      'mdc-snackbar--align-start': props.alignStart
    }
  ],
  defaultProps: {
    "alignStart": false,
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

type SnackbarPropsT = {
  /** Show the Snackbar. */
  show?: boolean,
  /** A callback thats fired when the Snackbar closes. */
  onClose?: () => mixed,
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
  dismissesOnAction?: boolean
};

const showSnackbar = (props, api) => {
  const {
    message,
    timeout,
    actionHandler,
    actionText,
    multiline,
    actionOnBottom,
    onClose
  } = props;
  const timer = setTimeout(() => onClose(), timeout || 2750);
  const wrappedActionHandler =
    actionHandler && api.dismissesOnAction ?
      () => {
        actionHandler();
        clearTimeout(timer);
        onClose();
      } :
      actionHandler;

  api.show({
    message,
    timeout,
    actionHandler: wrappedActionHandler,
    actionText,
    multiline,
    actionOnBottom
  });
};

/**
 * @name Snackbar
 */
export const Snackbar = withMDC({
  mdcConstructor: MDCSnackbar,
  mdcElementRef: true,
  defaultProps: {
    show: false,
    onClose: noop,
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

      if ((props === undefined || show !== props.show) && show) {
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
        mdcElementRef,
        dismissesOnAction,
        onClose,
        ...rest
      } = this.props;

      const isJSX = typeof message === 'object';
      const snackbarTextStyle = {};
      if (isJSX) {
        snackbarTextStyle.display = 'none';
      }

      /**
       * The double SnackbarText below is a hack to allow for rendering JSX
       * The real message gets rendered in the hidden container, and the second one is
       * ignored and shows th rendered content :)
       */
      return (
        <SnackbarRoot elementRef={mdcElementRef} {...rest}>
          <SnackbarText style={snackbarTextStyle} />
          {isJSX && <SnackbarText>{message}</SnackbarText>}
          <SnackbarActionWrapper>
            <SnackbarActionButton />
          </SnackbarActionWrapper>
        </SnackbarRoot>
      );
    }
  }
);

export default Snackbar;
