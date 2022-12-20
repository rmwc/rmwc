import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PORTAL_ID = 'rmwcPortal';

export type PortalPropT = Element | string | boolean | undefined | null;

export function Portal() {
  const el = useRef<HTMLDivElement | null>(null);

  return <div ref={el} id={PORTAL_ID} />;
}

export function PortalChild({
  children,
  renderTo,
  menuSurfaceDomPositionRef
}: {
  children: React.ReactNode;
  renderTo?: PortalPropT;
  menuSurfaceDomPositionRef?: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [portalEl, setPortalEl] = useState<Element | undefined>();

  useEffect(() => {
    let element: Element | undefined = undefined;

    if (renderTo === true) {
      element = document?.getElementById(PORTAL_ID) ?? undefined;

      !element &&
        console.warn(
          'No default Portal found. Did you forget to include it in the root of your app? `import { Portal } from "@rmwc/base";`'
        );
    } else if (typeof renderTo === 'string') {
      element = document?.querySelector(renderTo) ?? undefined;

      !element &&
        console.warn(
          `The selector you provided for renderToPortal "${renderTo}" didn't find any elements.`
        );
    } else if (renderTo instanceof Element) {
      element = renderTo;
    }
    if (element !== portalEl) {
      setPortalEl(element);
    }
  }, [renderTo, portalEl]);
  // if renderTo defined, render children if we have the portalEl, else don't render anything.
  // menuSurfaceDomPositionRef is used to position the menu at the correct location on the menuSurfaceAnchor
  // when children is rendered in the portal
  if (renderTo) {
    if (portalEl) {
      return (
        <div ref={menuSurfaceDomPositionRef}>
          {ReactDOM.createPortal(children, portalEl)}
        </div>
      );
    } else {
      return null;
    }
  }
  // if renderTo is not defined render the children directly.
  return <>{children}</>;
}
