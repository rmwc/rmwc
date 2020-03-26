import * as React from 'react';

type ListContextT = {
  getClassName: (index: number) => string[] ;
};

export const ListContext = React.createContext<ListContextT>({
  getClassName: (index: number) => [],
});
