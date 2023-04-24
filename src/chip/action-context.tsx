import React, { createContext, useContext } from 'react';
import { ActionApi } from './action';

export type ActionContextT = {
  registerAction: (action: ActionApi) => void;
  unregisterAction: (action: ActionApi) => void;
};

export const ActionContext = createContext<ActionContextT>({
  registerAction: (action: ActionApi) => {},
  unregisterAction: (action: ActionApi) => {}
});

export const useActionContext = () => {
  const context = useContext(ActionContext);
  if (context == null) {
    throw new Error(
      'useActionContext must be used within a ActionContextProvider'
    );
  }
  return context;
};
