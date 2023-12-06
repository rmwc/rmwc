import React from 'react';
import * as RMWC from '@rmwc/types';
import { classNames, createComponent, Tag, useId } from '@rmwc/base';
import { useToolTipFoundation } from './foundation';
import { AnchorBoundaryType } from '@material/tooltip';
import { TooltipActivationT, TooltipAlignT } from '@rmwc/provider';

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
  /** Control whether to stay open on hover. This is useful for interactive tooltips. */
  stayOpenOnHover?: boolean;
  /** Manually disable a tooltip being rich. This is useful when a custom overlay is needed. Defaults to true when content is a ReactNode. */
  rich?: boolean;
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

    const { isPersistent, open, overlay, rich } = {
      ...props
    };

    const uniqueId = useId('tooltip', props);

    const isRich = rich !== undefined ? rich : typeof overlay !== 'string';

    const className = classNames('mdc-tooltip', {
      'mdc-tooltip--rich': isRich,
      'rmwc-tooltip': rich === false
    });

    const child = React.Children.only(props.children);

    if (!React.isValidElement<React.HTMLProps<any>>(child)) {
      return null;
    }

    const tooltipRoot = () => (
      <>
        {React.cloneElement(child, {
          ...anchorEl.props(child.props),
          element: anchorEl,
          ref: anchorEl.reactRef,
          'aria-describedby': uniqueId,
          'data-tooltip-id': uniqueId
        })}
        <Tag
          tag="div"
          className={className}
          id={uniqueId}
          role={isRich ? 'dialog' : 'tooltip'}
          aria-hidden={isShown}
          ref={ref}
          element={rootEl}
          data-mdc-tooltip-persistent={open || isPersistent}
          tabIndex={isPersistent && -1}
        >
          <Tag
            tag="div"
            element={surfaceEl}
            className="mdc-tooltip__surface mdc-tooltip__surface-animation"
          >
            {overlay}
          </Tag>
        </Tag>
      </>
    );

    if (isRich) {
      return (
        <Tag tag="div" className="mdc-tooltip-wrapper--rich">
          {tooltipRoot()}
        </Tag>
      );
    }

    return tooltipRoot();
  }
);

export interface RichTooltipTitleProps {}

export const RichTooltipTitle = createComponent<RichTooltipTitleProps>(
  function RichTooltipTitle(props, ref) {
    const { children } = props;
    return (
      <Tag tag="h2" className="mdc-tooltip__title" {...props} ref={ref}>
        {children}
      </Tag>
    );
  }
);

export interface RichTooltipContentProps {}

export const RichTooltipContent = createComponent<RichTooltipContentProps>(
  function RichTooltipContent(props, ref) {
    const { children, ...rest } = props;
    return (
      <Tag tag="p" className="mdc-tooltip__content" {...rest} ref={ref}>
        {children}
      </Tag>
    );
  }
);

export interface RichTooltipActionsProps {}

export const RichTooltipActions = createComponent<RichTooltipActionsProps>(
  function RichTooltipActions(props, ref) {
    const { children, ...rest } = props;
    return (
      <Tag tag="p" className="mdc-tooltip--rich-actions" {...rest} ref={ref}>
        {children}
      </Tag>
    );
  }
);

export const RichTooltipLink = createComponent(
  function RichTooltipLink(props, ref) {
    const { href, children, ...rest } = props;
    return (
      <Tag
        tag="a"
        className="mdc-tooltip__content-link"
        href={href}
        {...rest}
        ref={ref}
      >
        {children}
      </Tag>
    );
  }
);

export interface SimpleRichTooltipProps {
  title?: string;
  body?: React.ReactNode;
  actions?: React.ReactNode;
}

export const SimpleRichTooltip = createComponent<SimpleRichTooltipProps>(
  function RichTooltipActions(props, ref) {
    const { title, body, actions } = props;
    return (
      <>
        {title && <RichTooltipTitle>{title}</RichTooltipTitle>}
        {body && <RichTooltipContent>{body}</RichTooltipContent>}
        {actions && <RichTooltipActions>{actions}</RichTooltipActions>}
      </>
    );
  }
);
