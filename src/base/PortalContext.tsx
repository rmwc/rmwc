import React, { createContext, useState } from 'react';

export interface PortalContextData {
  portalElement: HTMLDivElement | null;
  setPortalElement: ((element: HTMLDivElement) => void) | null;
}

export const portalContextDefaultValues = {
  portalElement: null,
  setPortalElement: null
};

export const PortalContext = createContext<PortalContextData>(
  portalContextDefaultValues
);

export const PortalProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider
      value={{
        portalElement: element,
        setPortalElement: setElement
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};
