import React from 'react';
import { classNames } from '@rmwc/base';
import ReactTooltip from 'rc-tooltip';
import { useProviderContext } from '@rmwc/provider';

export type TooltipActivationT = 'hover' | 'click' | 'focus';

export type TooltipAlignT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

/** A Tooltip component for displaying informative popover information. */
export interface TooltipProps {
  /** The overlay content for the tooltip. */
  content: React.ReactNode;
  /** The children that the tooltip belongs to. Must be a single React.child. */
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  /** Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. */
  activateOn?: TooltipActivationT | TooltipActivationT[];
  /** Whether or not to show an arrow on the Tooltip. Defaults to `false`. */
  showArrow?: boolean;
  /** Custom className to add to the tooltip overlay container. */
  className?: string;
  /** Delay in milliseconds before showing the tooltip when interacting via touch or mouse. */
  enterDelay?: number;
  /** Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. */
  leaveDelay?: number;
  /** How to align the tooltip. Defaults to `top`. */
  align?: TooltipAlignT;
  /** Manually control the open state */
  open?: boolean;
}

/** A Tooltip component for displaying informative popover information. */
export const Tooltip = function Tooltip({
  children,
  content,
  className,
  open,
  ...rest
}: TooltipProps) {
  const providerContext = useProviderContext();

  // merge together provider options
  const {
    showArrow = false,
    enterDelay = 0,
    leaveDelay = 0,
    align = 'top',
    activateOn = ['hover', 'focus'] as TooltipActivationT[]
  } = {
    ...providerContext.tooltip,
    ...rest
  };

  return (
    <ReactTooltip
      {...(open !== undefined ? { visible: open } : {})}
      trigger={Array.isArray(activateOn) ? activateOn : [activateOn]}
      prefixCls="rmwc-tooltip"
      placement={align}
      transitionName="rmwc-tooltip-zoom"
      mouseEnterDelay={enterDelay / 1000}
      mouseLeaveDelay={leaveDelay / 1000}
      overlay={content}
      overlayClassName={classNames(className, {
        'rmwc-tooltip--show-arrow': showArrow
      })}
      destroyTooltipOnHide
    >
      {children}
    </ReactTooltip>
  );
};
