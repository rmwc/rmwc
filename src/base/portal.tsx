import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PORTAL_ID = 'rmwcPortal';

export type PortalPropT = Element | string | boolean | undefined | null;

export function Portal() {
  const el = useRef(document.createElement('div'));

  return <div ref={el} id={PORTAL_ID} />;
}

export function PortalChild({
  children,
  renderTo
}: {
  children: React.ReactNode;
  renderTo?: PortalPropT;
}) {
  const [portalEl, setPortalEl] = useState<Element | undefined>();

  useEffect(() => {
    let element: Element | undefined = undefined;

    if (renderTo === true) {
      element = document.getElementById(PORTAL_ID) || undefined;
    } else if (typeof renderTo === 'string') {
      element = document.querySelector(renderTo) || undefined;
    } else if (renderTo instanceof Element) {
      element = renderTo;
    }

    if (element !== portalEl) {
      setPortalEl(element);
    }
  }, [renderTo, portalEl]);

  if (portalEl) {
    return ReactDOM.createPortal(children, portalEl);
  }

  return <>{children}</>;
}
