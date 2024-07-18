import React, { ReactNode } from 'react';
import * as RMWC from '@rmwc/types';
import {
  classNames,
  createComponent,
  PortalChild,
  PortalPropT,
  Tag,
  useId
} from '@rmwc/base';
import { useToolTipFoundation } from './foundation';
import { AnchorBoundaryType } from '@material/tooltip';
import { TooltipAlignT } from '@rmwc/provider';

/** A Tooltip component for displaying informative popover information. */
export interface TooltipProps {
  /** How to align the tooltip. */
  align?: TooltipAlignT;
  /** The overlay for the tooltip. */
  overlay?: React.ReactNode;
  /** The children that the tooltip belongs to. Must be a single React element. */
  children: React.ReactNode;
  /** Custom className to add to the tooltip overlay container. */
  className?: string;
  /** Delay in milliseconds before showing the tooltip when interacting via touch or mouse. */
  enterDelay?: number;
  /** Delay in milliseconds before hiding the tooltip when interacting via touch or mouse. */
  leaveDelay?: number;
  /** Specify whether the anchor element is bounded (element has an identifiable boundary such as a button) or unbounded (element does not have a visually declared boundary such as a text link). */
  anchorBoundaryType?: AnchorBoundaryType;
  /** Renders the tooltip to a portal. Defaults to true. */
  renderToPortal?: PortalPropT;
}

export type TooltipHTMLProps = RMWC.HTMLProps<HTMLDivElement>;

/** A Tooltip component for displaying informative popover information. */
export const Tooltip: RMWC.ComponentType<
  TooltipProps,
  TooltipHTMLProps,
  'div'
> = createComponent<TooltipProps, TooltipHTMLProps>(
  function Tooltip(props, ref) {
    const {
      anchorEl,
      rootEl,
      isShown,
      surfaceEl,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleTransitionEnd,
      handleTouchstart,
      handleTouchend
    } = useToolTipFoundation(props);

    const { overlay, renderToPortal = true } = {
      ...props
    };

    const uniqueId = useId('tooltip', props);

    const className = classNames('mdc-tooltip');

    const child = React.Children.only(props.children);

    if (!React.isValidElement<React.HTMLProps<any>>(child)) {
      return null;
    }

    return (
      <>
        {React.cloneElement(child, {
          ...anchorEl.props(child.props),
          element: anchorEl,
          ref: anchorEl.reactRef,
          'aria-describedby': uniqueId,
          'data-tooltip-id': uniqueId,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onFocus: handleFocus,
          onTouchStart: handleTouchstart,
          onTouchEnd: handleTouchend
        })}
        <PortalChild renderTo={renderToPortal}>
          <Tag
            tag="div"
            className={className}
            id={uniqueId}
            role="tooltip"
            aria-hidden={isShown}
            ref={ref}
            element={rootEl}
            onTransitionEnd={handleTransitionEnd}
          >
            <Tag
              tag="div"
              element={surfaceEl}
              className="mdc-tooltip__surface mdc-tooltip__surface-animation"
            >
              {overlay}
            </Tag>
          </Tag>
        </PortalChild>
      </>
    );
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

export interface RichTooltipProps extends TooltipProps {
  title?: ReactNode;
  body?: ReactNode;
  actions?: ReactNode;
  link?: ReactNode;
  isPersistent?: boolean;
}

export const RichTooltip: RMWC.ComponentType<
  RichTooltipProps,
  TooltipHTMLProps,
  'div'
> = createComponent<RichTooltipProps, TooltipHTMLProps>(
  function RichTooltip(props, ref) {
    const {
      anchorEl,
      rootEl,
      isShown,
      surfaceEl,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleTransitionEnd,
      handleClick,
      handleTouchstart,
      handleTouchend
    } = useToolTipFoundation(props);

    const { title, body, actions, link, isPersistent, overlay } = {
      ...props
    };

    const uniqueId = useId('tooltip', props);

    const className = classNames('mdc-tooltip', 'mdc-tooltip--rich');

    const eventHandlers = isPersistent
      ? { onClick: handleClick }
      : {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onFocus: handleFocus,
          onTouchStart: handleTouchstart,
          onTouchEnd: handleTouchend
        };

    const child = React.Children.only(props.children);
    if (!React.isValidElement<React.HTMLProps<any>>(child)) {
      return null;
    }

    return (
      <Tag tag="div" className="mdc-tooltip-wrapper--rich">
        {React.cloneElement(child, {
          ...anchorEl.props(child.props),
          element: anchorEl,
          ref: anchorEl.reactRef,
          'aria-describedby': uniqueId,
          'aria-haspopup': 'dialog',
          'data-tooltip-id': uniqueId,
          ...eventHandlers
        })}
        <Tag
          tag="div"
          className={className}
          id={uniqueId}
          role={actions ? 'dialog' : 'tooltip'}
          aria-hidden={isShown}
          ref={ref}
          element={rootEl}
          data-mdc-tooltip-persistent={isPersistent}
          tabIndex={isPersistent && -1}
          onTransitionEnd={handleTransitionEnd}
          onMouseEnter={!isPersistent && handleMouseEnter}
          onMouseLeave={!isPersistent && handleMouseLeave}
        >
          <Tag
            tag="div"
            element={surfaceEl}
            className="mdc-tooltip__surface mdc-tooltip__surface-animation"
          >
            {overlay}
            {title && <RichTooltipTitle>{title}</RichTooltipTitle>}
            <RichTooltipContent>
              {body}
              {link}
            </RichTooltipContent>
            {actions && <RichTooltipActions>{actions}</RichTooltipActions>}
          </Tag>
        </Tag>
      </Tag>
    );
  }
);
