// @flow
import * as React from 'react';
import { withMDC, noop } from '../Base';

export type WithMDCDrawerPropsT = {
  /* Opens or closes the Drawer. */
  open: boolean,
  /* Callback that fires when the Drawer is closed. */
  onClose: (evt: Event) => mixed,
  /* Callback that fires when the Drawer is opened. */
  onOpen: (evt: Event) => mixed
};

type WithMDCDrawerOptsT = {
  mdcConstructor: Function,
  drawerConstructorName: string
};

export const withMDCDrawer = (
  { mdcConstructor, drawerConstructorName }: WithMDCDrawerOptsT = {}
) => (Component: React.ComponentType<any>) => {
  return withMDC({
    mdcConstructor,
    mdcEvents: {
      [`${drawerConstructorName}:open`]: (evt, props) => props.onOpen(evt),
      [`${drawerConstructorName}:close`]: (evt, props) => props.onClose(evt)
    },
    defaultProps: {
      open: false,
      onClose: noop,
      onOpen: noop
    },
    onMount: (props, api, inst) => {
      if (!api) return;

      // Reacts events are delegated to the body but Material is using stopPropagation, preventing any
      // onClick events in the drawer from firing/
      // Am unfortunate solution, monkeypatch the internal handlers to work without stopProp

      // store the handler
      const componentClickHandler = api.foundation_.componentClickHandler_;

      // remove the old one
      api.foundation_.adapter_.deregisterInteractionHandler(
        'click',
        api.foundation_.componentClickHandler_
      );

      // The drawer click handler only stopsProp, we are just going to remove it
      // and add logic to check if the drawer should close to the component click handler
      api.foundation_.adapter_.deregisterDrawerInteractionHandler(
        'click',
        api.foundation_.drawerClickHandler_
      );

      // replace with new function
      api.foundation_.componentClickHandler_ = evt => {
        const path = evt.composedPath ?
          evt.composedPath() :
          evt.deepPath || evt.path;
        const drawerClickedWasClicked = path.some(
          el =>
            el.classList &&
            el.classList.contains('mdc-temporary-drawer__drawer')
        );
        if (!drawerClickedWasClicked && componentClickHandler) {
          componentClickHandler(evt);
        }
      };

      // rebind
      api.foundation_.adapter_.registerInteractionHandler(
        'click',
        api.foundation_.componentClickHandler_
      );
    },
    onUpdate: (props, nextProps, api) => {
      if (api && api.open !== !!nextProps.open) {
        api.open = !!nextProps.open;
      }
    }
  })(props => <Component {...props} />);
};
