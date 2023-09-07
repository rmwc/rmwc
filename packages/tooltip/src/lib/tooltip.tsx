import React from 'react';
import * as RMWC from '@rmwc/types';
import { classNames, createComponent, Tag } from '@rmwc/base';
import { useProviderContext } from '@rmwc/provider';
import { useToolTipFoundation } from './foundation';
import { AnchorBoundaryType, CssClasses } from '@material/tooltip';

export type TooltipActivationT = 'hover' | 'click' | 'focus';

/** A Tooltip component for displaying informative popover information. */
export interface TooltipProps {
  /** The overlay for the tooltip. */
  overlay: React.ReactNode;
  /** The children that the tooltip belongs to. Must be a single React element. */
  children: React.ReactNode;
  /** Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. */
  activateOn?: TooltipActivationT | TooltipActivationT[];
  /** Custom className to add to the tooltip overlay container. */
  className?: string;
  /** Delay in milliseconds before showing the tooltip when interacting via touch or mouse. */
  enterDelay?: number;
  /** Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. */
  leaveDelay?: number;
  /** Manually control the open state */
  open?: boolean;
  /** Whether or not to show an arrow on the Tooltip. Defaults to `false`. */
  showArrow?: boolean;
  /** Specify whether the anchor element is bounded (element has an identifiable boundary such as a button) or unbounded (element does not have a visually declared boundary such as a text link). */
  anchorBoundaryType?: AnchorBoundaryType;
  /** Specify whether tooltip should be persistent. Persistent tooltip are triggered by clicks. */
  isPersistent?: boolean;
}

export type TooltipHTMLProps = RMWC.HTMLProps<HTMLDivElement>;

/** A Tooltip component for displaying informative popover information. */
export const Tooltip: RMWC.ComponentType<
  TooltipProps,
  TooltipHTMLProps,
  'div'
> = createComponent<TooltipProps, TooltipHTMLProps>(function Tooltip(
  props,
  ref
) {
  const providerContext = useProviderContext();

  const { anchorEl, rootEl, uniqueId } = useToolTipFoundation(props);

  // merge together provider options
  const {
    isPersistent,
    showArrow = false,
    open,
    overlay
  } = {
    ...providerContext.tooltip,
    ...props
  };

  const isRich = typeof overlay !== 'string';

  const className = classNames('mdc-tooltip', {
    'mdc-tooltip--shown': open,
    'mdc-tooltip--rich': isRich,
    'rmwc-tooltip--show-arrow': showArrow
  });

  const child = React.Children.only(props.children);

  if (!React.isValidElement<React.HTMLProps<any>>(child)) {
    return null;
  }

  if (isRich) {
    return (
      <Tag tag="div" className="mdc-tooltip-wrapper--rich">
        {React.cloneElement(child, {
          ...anchorEl.props(child.props),
          ref: anchorEl.reactRef,
          'aria-describedby': uniqueId,
          'data-tooltip-id': uniqueId
        })}
        <Tag
          tag="div"
          className={`${CssClasses.RICH} mdc-tooltip`}
          id={uniqueId}
          role="tooltip"
          aria-hidden="true"
          ref={ref}
          element={rootEl}
          data-mdc-tooltip-persistent={isPersistent}
        >
          <div className="mdc-tooltip__surface mdc-tooltip__surface-animation">
            <div className="mdc-tooltip__content">{overlay}</div>
          </div>
        </Tag>
      </Tag>
    );
  }

  return (
    <>
      <Tag
        tag="div"
        className={className}
        id={uniqueId}
        role="tooltip"
        aria-hidden="true"
        ref={ref}
        element={rootEl}
        data-mdc-tooltip-persistent={open}
      >
        <div className="mdc-tooltip__surface mdc-tooltip__surface-animation">
          {overlay}
        </div>
      </Tag>
      <Tag tag="fragment" element={anchorEl} ref={anchorEl.reactRef}>
        {React.cloneElement(child, {
          ...anchorEl.props(child.props),
          'aria-describedby': uniqueId,
          'data-tooltip-id': uniqueId
        })}
      </Tag>
    </>
  );
});
