import React from 'react';
import { classNames } from '@rmwc/base';
import ReactTooltip from 'rc-tooltip';
import { useProviderContext } from '@rmwc/provider';

import "../rc-tooltip.css";

export type RCTooltipActivationT = 'hover' | 'click' | 'focus';

export type RCTooltipAlignT =
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

/** A Tooltip component for displaying informative popover information. */
export interface RCTooltipProps {
  /** The overlay content for the tooltip. */
  content: React.ReactNode;
  /** The children that the tooltip belongs to. Must be a ReactElement. */
  children: React.ReactElement;
  /** Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. */
  activateOn?: RCTooltipActivationT | RCTooltipActivationT[];
  /** Whether or not to show an arrow on the Tooltip. Defaults to `false`. */
  showArrow?: boolean;
  /** Custom className to add to the tooltip overlay container. */
  className?: string;
  /** Delay in milliseconds before showing the tooltip when interacting via touch or mouse. */
  enterDelay?: number;
  /** Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. */
  leaveDelay?: number;
  /** How to align the tooltip. Defaults to `top`. */
  align?: RCTooltipAlignT;
  /** Manually control the open state */
  open?: boolean;
}

/** A Tooltip component for displaying informative popover information. */
export const RCTooltip = function RCTooltip({
  children,
  content,
  className,
  open,
  ...rest
}: RCTooltipProps) {
  const providerContext = useProviderContext();

  // merge together provider options
  const {
    showArrow = false,
    enterDelay = 0,
    leaveDelay = 0,
    align = 'top',
    activateOn = ['hover', 'focus'] as RCTooltipActivationT[]
  } = {
    ...providerContext.tooltip,
    ...rest
  };

  return (
    <ReactTooltip
      {...(open !== undefined ? { visible: open } : {})}
      trigger={Array.isArray(activateOn) ? activateOn : [activateOn]}
      prefixCls="rmwc-rc-tooltip"
      placement={align}
      transitionName="rmwc-rc-tooltip-zoom"
      mouseEnterDelay={enterDelay / 1000}
      mouseLeaveDelay={leaveDelay / 1000}
      overlay={content}
      overlayClassName={classNames(className, {
        'rmwc-rc-tooltip--show-arrow': showArrow
      })}
      destroyTooltipOnHide
    >
      {children}
    </ReactTooltip>
  );
};
