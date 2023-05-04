import * as RMWC from '@rmwc/types';
import React from 'react';
import { withRipple } from '@rmwc/ripple';
import { Tag, useClassNames, createComponent } from '@rmwc/base';
import { useIsWrappedTouchTarget } from '@rmwc/touch-target';
import { useSegmentFoundation } from './foundation';

export interface SegmentProps extends RMWC.WithRippleProps {
  /** Make the button disabled */
  disabled?: boolean;
  /** Content specified as a label prop. */
  label?: React.ReactNode | string;
  /** Makes the button more touch friendly. This will automatically be set true if used inside of TouchTargetWrapper.*/
  touch?: boolean;
  /** Content specified as children. */
  children?: React.ReactNode;
  /** An Icon for the Button */
  icon?: React.ReactNode;
  /** A trailing icon for the Button */
  trailingIcon?: RMWC.IconPropT;
  /** Determines whether the button has been selected. */
  selected?: boolean;
}

export interface SegmentApi {
  setIsSingleSelect(isSingleSelect: boolean): void;
  index: number;
  setIndex(index: number): void;
  isSelected(): boolean;
  setSelected(): void;
  setUnselected(): void;
  getSegmentId(): string | undefined;
}

export type SegmentHTMLProps = RMWC.HTMLProps<HTMLButtonElement>;

export const Segment: RMWC.ComponentType<
  SegmentProps,
  SegmentHTMLProps,
  'button'
> = withRipple({
  surface: false
})(
  createComponent<SegmentProps, SegmentHTMLProps>(function Segment(props, ref) {
    const { children, label, icon, selected, touch, ...rest } = props;

    const { rootEl, isSingleSelect } = useSegmentFoundation(props);

    const isTouch = useIsWrappedTouchTarget(touch);

    const className = useClassNames(props, [
      'mdc-segmented-button__segment',
      {
        'mdc-segmented-button__segment--selected': selected,
        'mdc-segmented-button--touch': isTouch
      }
    ]);

    const selectedAccesibilityProps = isSingleSelect
      ? {
          'aria-checked': selected,
          role: 'radio'
        }
      : {
          'aria-pressed': selected
        };

    return (
      <Tag
        {...rest}
        tag="button"
        element={rootEl}
        className={className}
        ref={ref}
        {...selectedAccesibilityProps}
      >
        <div className="mdc-segmented-button__ripple"></div>
        {icon && (
          <i className="material-icons mdc-segmented-button__icon">{icon}</i>
        )}
        <div className="mdc-segmented-button__label">{label ?? children}</div>
      </Tag>
    );
  })
);
