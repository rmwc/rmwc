import React, { useContext } from 'react';

export type SegmentedButtonContextT = {
  registerSegment: (segment: any) => void;
  unregisterSegment: (segment: any) => void;
  selectType: 'multiple' | 'single';
};

export const SegmentedButtonContext =
  React.createContext<SegmentedButtonContextT>({
    registerSegment: (segment: any) => {},
    unregisterSegment: (segment: any) => {},
    selectType: 'multiple'
  });

export const SegmentedButtonProvider = ({
  value,
  children
}: {
  value: SegmentedButtonContextT;
  children: React.ReactNode;
}) => {
  return (
    <SegmentedButtonContext.Provider value={value}>
      {children}
    </SegmentedButtonContext.Provider>
  );
};

export const useSegmentedButton = () => {
  const context = useContext(SegmentedButtonContext);
  if (!context) {
    throw new Error(
      'useSegmentedButton must be used within an SegmentedButtonProvider'
    );
  }
  return context;
};
