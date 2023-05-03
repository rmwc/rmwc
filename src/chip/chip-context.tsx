import React, { createContext, useContext } from 'react';
import { ChipApi } from './chip';

export type ChipContextT = {
  registerChip: (chip: ChipApi) => void;
  unregisterChip: (chip: ChipApi) => void;
};

export const ChipContext = createContext<ChipContextT>({
  registerChip: (chip: ChipApi) => {},
  unregisterChip: (chip: ChipApi) => {}
});

export const useChipContext = () => {
  const context = useContext(ChipContext);
  if (context == null) {
    throw new Error('useChipContext must be used within a ChipContextProvider');
  }
  return context;
};
