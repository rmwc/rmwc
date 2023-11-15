import React from 'react';
import * as RMWC from '@rmwc/types';
import { classNames, createComponent, Tag, useId } from '@rmwc/base';
import { useToolTipFoundation } from './foundation';
import { AnchorBoundaryType } from '@material/tooltip';
import { TooltipAlignT } from './types';

export type TooltipActivationT = 'hover' | 'click' | 'focus';

/** A Tooltip component for displaying informative popover information. */
export interface TooltipProps {
  /** How to align the tooltip. */
  align?: TooltipAlignT;
  /** The overlay for the tooltip. */
  overlay?: React.ReactNode;
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
  /** Specify whether the anchor element is bounded (element has an identifiable boundary such as a button) or unbounded (element does not have a visually declared boundary such as a text link). */
  anchorBoundaryType?: AnchorBoundaryType;
  /** Specify whether tooltip should be persistent. Persistent tooltip are triggered by clicks. */
  isPersistent?: boolean;
  /** MCW comes with default styling for rich tooltips. This prop specifies whether to disable such default styling. */
  disableRichStyling?: boolean;
  /** Control whether to stay open on hover. This is useful for interactive tooltips. */
  stayOpenOnHover?: boolean;
}

export type TooltipHTMLProps = RMWC.HTMLProps<HTMLDivElement>;

/** A Tooltip component for displaying informative popover information. */
export const Tooltip: RMWC.ComponentType<
  TooltipProps,
  TooltipHTMLProps,
  'div'
> = createComponent<TooltipProps, TooltipHTMLProps>(
  function Tooltip(props, ref) {
    const { anchorEl, rootEl, isShown, surfaceEl } =
      useToolTipFoundation(props);

    // merge together provider options
    const {
      disableRichStyling = false,
      isPersistent,
      open,
      overlay
    } = {
      ...props
    };

    const uniqueId = useId('tooltip', props);

    const isRich = typeof overlay !== 'string';

    const className = classNames('mdc-tooltip', {
      'mdc-tooltip--rich': isRich && !disableRichStyling,
      'rmwc-tooltip': disableRichStyling
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
            tabIndex={isPersistent && -1}
            tag="div"
            className={className}
            id={uniqueId}
            role={isRich ? 'dialog' : 'tooltip'}
            aria-hidden={isShown}
            ref={ref}
            element={rootEl}
            data-mdc-tooltip-persistent={isPersistent}
          >
            <div className="mdc-tooltip__surface mdc-tooltip__surface-animation">
              {overlay}
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
          aria-hidden={isShown}
          ref={ref}
          element={rootEl}
          data-mdc-tooltip-persistent={open || isPersistent}
        >
          <Tag
            tag="div"
            element={surfaceEl}
            className="mdc-tooltip__surface mdc-tooltip__surface-animation"
          >
            {overlay}
          </Tag>
        </Tag>
        {React.cloneElement(child, {
          ...anchorEl.props(child.props),
          element: anchorEl,
          ref: anchorEl.reactRef,
          'aria-describedby': uniqueId,
          'data-tooltip-id': uniqueId
        })}
      </>
    );
  }
);

export interface RichTooltipTitleProps {}

export const RichTooltipTitle = createComponent<RichTooltipTitleProps>(
  function RichTooltipTitle(props, ref) {
    const { children } = props;
    return (
      <Tag {...props} tag="h2" className="mdc-tooltip__title" ref={ref}>
        {children}
      </Tag>
    );
  }
);

export interface RichTooltipContentProps {}

export const RichTooltipContent = createComponent<RichTooltipContentProps>(
  function RichTooltipContent(props, ref) {
    const { children } = props;
    return (
      <Tag {...props} tag="p" className="mdc-tooltip__content" ref={ref}>
        {children}
      </Tag>
    );
  }
);

export interface RichTooltipActionsProps {}

export const RichTooltipActions = createComponent<RichTooltipActionsProps>(
  function RichTooltipActions(props, ref) {
    const { children } = props;
    return (
      <Tag {...props} tag="p" className="mdc-tooltip--rich-actions" ref={ref}>
        {children}
      </Tag>
    );
  }
);
