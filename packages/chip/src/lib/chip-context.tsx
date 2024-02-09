import { createContext, useContext } from 'react';
import { ChipApi } from './chip';

export type ChipContextT = {
  registerChip: (chip: ChipApi) => void;
  unregisterChip: (chip: ChipApi) => void;
  action?: boolean;
  input?: boolean;
  filter?: boolean;
};

export const ChipContext = createContext<ChipContextT>({
  registerChip: (chip: ChipApi) => {},
  unregisterChip: (chip: ChipApi) => {},
  action: false,
  input: false,
  filter: false
});

export const useChipContext = () => {
  const context = useContext(ChipContext);
  if (context == null) {
    throw new Error('useChipContext must be used within a ChipContextProvider');
  }
  return context;
};
