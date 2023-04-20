import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  MutableRefObject
} from 'react';
import { createPortal } from 'react-dom';
import * as RMWC from '@rmwc/types';
import { PortalContext } from './PortalContext';

const PORTAL_ID = 'rmwcPortal';

export type PortalPropT = Element | string | boolean | undefined | null;

export interface PortalProps
  extends Omit<RMWC.HTMLProps<HTMLDivElement>, 'id' | 'ref'> {}

export const Portal = (props: PortalProps): JSX.Element => {
  const portalContext = useContext(PortalContext);
  const setPortalElement = portalContext?.setPortalElement;

  const portalRef = useCallback(
    (node: HTMLDivElement) => {
      if (node !== null && setPortalElement) {
        setPortalElement(node);
      }
    },
    [setPortalElement]
  );

  return <div ref={portalRef} id={PORTAL_ID} {...props} />;
};

export function PortalChild({
  children,
  renderTo,
  menuSurfaceDomPositionRef
}: {
  children: React.ReactNode;
  renderTo?: PortalPropT;
  menuSurfaceDomPositionRef?: MutableRefObject<HTMLDivElement | null>;
}) {
  const [portalEl, setPortalEl] = useState<Element | undefined>();
  const { portalElement: portalElementFromContext } = useContext(PortalContext);

  useEffect(() => {
    let element: Element | undefined = undefined;

    if (renderTo === true && portalElementFromContext) {
      element = portalElementFromContext;
    } else if (renderTo === true) {
      element = document?.getElementById(PORTAL_ID) ?? undefined;

      if (!element) {
        console.warn(
          'No default Portal found. Did you forget to include it in the root of your app? `import { Portal } from "@rmwc/base";`'
        );
      }
    } else if (typeof renderTo === 'string') {
      element = document?.querySelector(renderTo) ?? undefined;

      if (!element) {
        console.warn(
          `The selector you provided for renderToPortal "${renderTo}" didn't find any elements.`
        );
      }
    } else if (renderTo instanceof Element) {
      element = renderTo;
    }

    if (element !== portalEl) {
      setPortalEl(element);
    }
  }, [renderTo, portalEl, portalElementFromContext]);

  // if renderTo defined, render children if we have the portalEl, else don't render anything.
  // menuSurfaceDomPositionRef is used to position the menu at the correct location on the menuSurfaceAnchor
  // when children is rendered in the portal
  if (renderTo) {
    if (portalEl) {
      return (
        <div ref={menuSurfaceDomPositionRef}>
          {createPortal(children, portalEl)}
        </div>
      );
    } else {
      return null;
    }
  }
  // if renderTo is not defined render the children directly.
  return <>{children}</>;
}
