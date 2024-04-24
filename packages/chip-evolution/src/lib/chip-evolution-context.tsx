import { createContext, useContext } from 'react';
import { ChipEvolutionApi } from './chip-evolution';

export type ChipEvolutionContextT = {
  registerChip: (chip: ChipEvolutionApi) => void;
  unregisterChip: (chip: ChipEvolutionApi) => void;
  action?: boolean;
  input?: boolean;
  filter?: boolean;
};

export const ChipEvolutionContext = createContext<ChipEvolutionContextT>({
  registerChip: (chip: ChipEvolutionApi) => {},
  unregisterChip: (chip: ChipEvolutionApi) => {},
  action: false,
  input: false,
  filter: false
});

export const useChipEvolutionContext = () => {
  const context = useContext(ChipEvolutionContext);
  if (context == null) {
    throw new Error(
      'useChipEvolutionContext must be used within a ChipEvolutionContextProvider'
    );
  }
  return context;
};
