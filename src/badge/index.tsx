import * as RMWC from '@rmwc/types';
import React from 'react';
import { useClassNames, Tag, createComponent } from '@rmwc/base';

/** A Badge component for indicating alerts or counts. */
export interface BadgeProps {
  /** How to align the badge. */
  align?: 'end' | 'start' | 'inline';
  /** A label or count for the badge. */
  label?: React.ReactNode | number;
  /** A value to inset the badge alignment by, useful for positioning the badge on different shaped components. */
  inset?: string | number;
  /** Animates the badge out of view. When this class is removed, the badge will return to view. */
  exited?: boolean;
}

/** A Badge component for indicating alerts or counts. */
export const Badge = createComponent<BadgeProps>(function Badge(props, ref) {
  const { align = 'end', label, style, exited, inset, ...rest } = props;

  const className = useClassNames(props, [
    'rmwc-badge',
    `rmwc-badge--align-${align}`,
    {
      'rmwc-badge--no-content': !(label ?? false),
      'rmwc-badge--exited': exited
    }
  ]);

  const finalStyle =
    inset !== undefined
      ? {
          ...style,
          '--rmwc-badge-inset': inset
        }
      : style;

  return (
    <Tag {...rest} style={finalStyle} className={className} ref={ref}>
      {label ?? <>&nbsp;</>}
    </Tag>
  );
});

/** An anchor component for badges. */
export interface BadgeAnchorProps {}

/** An anchor component for badges. */
export const BadgeAnchor = createComponent<BadgeAnchorProps>(
  function BadgeAnchor(props, ref) {
    const { children, ...rest } = props;

    const className = useClassNames(props, ['rmwc-badge-anchor']);
    return (
      <Tag {...rest} className={className} ref={ref}>
        {children}
      </Tag>
    );
  }
);
