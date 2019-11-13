import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { useTag, useClassNames } from '@rmwc/base';
import { Icon, IconProps } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';
import { useIconButtonFoundation } from './foundation';

/*********************************************************************
 * Events
 *********************************************************************/

export type IconButtonOnChangeEventT = RMWC.CustomEventT<{ isOn: boolean }>;

/*********************************************************************
 * Icon Button
 *********************************************************************/

/** An IconButton component that can also be used as a toggle. */
export interface IconButtonProps extends RMWC.WithRippleProps {
  /** Controls the on / off state of the a toggleable button. */
  checked?: boolean;
  /** An onChange callback that receives a custom event. evt.detail = { isOn: boolean } */
  onChange?: (evt: IconButtonOnChangeEventT) => void;
  /** Makes the button disabled */
  disabled?: boolean;
  /** Icon for the button */
  icon?: RMWC.IconPropT;
  /** If specified, renders a toggle with this icon as the on state. */
  onIcon?: RMWC.IconPropT;
}

/** An IconButton component that can also be used as a toggle. */
export const IconButton = React.forwardRef<
  any,
  IconButtonProps & RMWC.ComponentProps
>(function IconButton({ ...rest }, ref) {
  if (rest.onIcon) {
    return <IconButtonToggle {...rest} ref={ref} />;
  }

  return <IconButtonRoot aria-hidden="true" tag="button" {...rest} ref={ref} />;
});
IconButton.displayName = 'IconButton';

const IconButtonToggle = React.forwardRef<
  any,
  IconButtonProps & RMWC.ComponentProps
>(function IconButtonToggle(props, ref) {
  const { icon, onIcon, ...rest } = props;
  const { isOn, rootEl } = useIconButtonFoundation(props);

  return (
    <IconButtonToggleRoot
      aria-pressed={isOn}
      aria-hidden="true"
      {...rootEl.props(rest)}
      tag="button"
      ref={ref}
    >
      <IconButtonIcon icon={icon} />
      <IconButtonIcon icon={onIcon} on />
    </IconButtonToggleRoot>
  );
});

/*********************************************************************
 * Bits
 *********************************************************************/

const IconButtonRoot = withRipple({
  surface: false,
  unbounded: true
})(
  React.forwardRef<any, IconButtonProps & RMWC.ComponentProps>(
    function IconButtonRoot(props, ref) {
      const { checked, ...rest } = props;
      const className = useClassNames(props, [
        'mdc-icon-button',
        {
          'mdc-icon-button--on': checked
        }
      ]);
      return (
        <Icon
          role="button"
          tabIndex={0}
          {...rest}
          className={className}
          ref={ref}
        />
      );
    }
  )
);
IconButtonRoot.displayName = 'IconButtonRoot';

const IconButtonToggleRoot = withRipple({
  surface: false,
  unbounded: true
})(
  React.forwardRef<any, IconButtonProps & RMWC.ComponentProps>(
    function IconButtonToggleRoot(props, ref) {
      const { checked, ...rest } = props;
      const Tag = useTag(props, 'button');
      const className = useClassNames(props, [
        'mdc-icon-button',
        {
          'mdc-icon-button--on': checked
        }
      ]);
      return (
        <Tag
          role="button"
          tabIndex={0}
          {...rest}
          className={className}
          ref={ref}
        />
      );
    }
  )
);
IconButtonToggleRoot.displayName = 'IconButtonToggleRoot';

interface IconButtonIconProps extends IconProps {
  on?: boolean;
}

const IconButtonIcon = React.memo(function IconButtonIcon(
  props: IconButtonIconProps
) {
  const { on, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-icon-button__icon',
    {
      'mdc-icon-button__icon--on': props.on
    }
  ]);
  return <Icon {...rest} className={className} />;
});
IconButtonIcon.displayName = 'IconButtonIcon';
