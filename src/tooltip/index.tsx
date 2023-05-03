import React from 'react';
import { classNames, createComponent, Tag } from '@rmwc/base';
import { useProviderContext } from '@rmwc/provider';
import { useToolTipFoundation } from './foundation';
import {
  AnchorBoundaryType,
  CssClasses,
  PositionWithCaret,
  XPosition,
  YPosition
} from '@material/tooltip';

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

export const ALIGN_MAP: {
  [key: string]: {
    xPos?: XPosition | undefined;
    yPos?: YPosition | undefined;
    withCaretPos?: PositionWithCaret | undefined;
  };
} = {
  left: { withCaretPos: PositionWithCaret.CENTER_SIDE_START },
  right: { withCaretPos: PositionWithCaret.CENTER_SIDE_END },
  bottom: { xPos: XPosition.CENTER, yPos: YPosition.BELOW },
  bottomLeft: { xPos: XPosition.START, yPos: YPosition.BELOW },
  bottomRight: { xPos: XPosition.END, yPos: YPosition.BELOW },
  top: { xPos: XPosition.CENTER, yPos: YPosition.ABOVE },
  topLeft: { xPos: XPosition.START, yPos: YPosition.ABOVE },
  topRight: { xPos: XPosition.END, yPos: YPosition.ABOVE }
};

/** A Tooltip component for displaying informative popover information. */
export interface TooltipProps {
  /** The overlay content for the tooltip. */
  content: React.ReactNode;
  /** The children that the tooltip belongs to. Must be a single React.child. */
  children: React.ReactChild;
  /** Activate the tooltip through one or more interactions. Defaults to `['hover', 'focus']`. */
  activateOn?: TooltipActivationT | TooltipActivationT[];
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
  /** Whether or not to show an arrow on the Tooltip. Defaults to `false`. */
  showArrow?: boolean;
  /** Specify whether the anchor element is bounded (element has an identifiable boundary such as a button) or unbounded (element does not have a visually declared boundary such as a text link). */
  anchorBoundaryType?: AnchorBoundaryType;
  /** Specify whether tooltip should be persistent. Persistent tooltip are triggered by clicks. */
  isPersistent?: boolean;
}

/** A Tooltip component for displaying informative popover information. */
export const Tooltip = createComponent<TooltipProps>(function Tooltip(
  props,
  ref
) {
  const providerContext = useProviderContext();

  const { anchorEl, rootEl } = useToolTipFoundation(props);

  // merge together provider options
  const {
    isPersistent,
    showArrow = false,
    open
  } = {
    ...providerContext.tooltip,
    ...props
  };

  const isRich = typeof props.content !== 'string';

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
      <RichTooltip>
        {React.cloneElement(child, {
          ...anchorEl.props(child.props),
          ref: anchorEl.reactRef,
          'aria-describedby': 'tooltip-id',
          'data-tooltip-id': 'tooltip-id'
        })}
        <Tag
          tag="div"
          className={`${CssClasses.RICH} mdc-tooltip`}
          id="tooltip-id"
          role="tooltip"
          aria-hidden="true"
          ref={ref}
          element={rootEl}
          data-mdc-tooltip-persistent={isPersistent && true}
        >
          <div className="mdc-tooltip__surface mdc-tooltip__surface-animation">
            <p className="mdc-tooltip__content">{props.content}</p>
          </div>
        </Tag>
      </RichTooltip>
    );
  }

  return (
    <>
      <Tag
        tag="div"
        className={className}
        id="tooltip-id"
        role="tooltip"
        aria-hidden="true"
        ref={ref}
        element={rootEl}
        data-mdc-tooltip-persistent={open}
      >
        <div className="mdc-tooltip__surface mdc-tooltip__surface-animation">
          {props.content}
        </div>
      </Tag>
      {React.cloneElement(child, {
        ...anchorEl.props(child.props),
        ref: anchorEl.reactRef,
        'aria-describedby': 'tooltip-id',
        'data-tooltip-id': 'tooltip-id'
      })}
    </>
  );
});

const RichTooltip = React.forwardRef(function RichTooltip(
  props: any,
  ref: React.Ref<any>
) {
  return (
    <Tag
      {...props}
      ref={ref}
      element={props.element}
      className="mdc-tooltip-wrapper--rich"
      tag="div"
    >
      {props.children}
    </Tag>
  );
});
