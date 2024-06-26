import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCIconButtonToggleFoundation } from '@material/icon-button';
import { Tag, useClassNames, createComponent } from '@rmwc/base';
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
  /** Apply an aria label. */
  label?: string;
  /** An onChange callback that receives a custom event. evt.detail = { isOn: boolean } */
  onChange?: (evt: IconButtonOnChangeEventT) => void;
  /** Makes the button disabled */
  disabled?: boolean;
  /** Icon for the button */
  icon?: RMWC.IconPropT;
  /** If specified, renders a toggle with this icon as the on state. */
  onIcon?: RMWC.IconPropT;
  /** Advanced: A reference to the MDCFoundation. Only for Toggleable buttons. */
  foundationRef?: React.Ref<MDCIconButtonToggleFoundation>;
}

export type IconButtonHTMLProps = RMWC.HTMLProps<
  HTMLInputElement,
  Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'onChange'>
>;

/** An IconButton component that can also be used as a toggle. */
export const IconButton: RMWC.ComponentType<
  IconButtonProps,
  IconButtonHTMLProps,
  'button'
> = createComponent<IconButtonProps, IconButtonHTMLProps>(function IconButton(
  { ...rest },
  ref
) {
  if (rest.onIcon) {
    return <IconButtonToggle {...rest} ref={ref} />;
  }

  return <IconButtonRoot {...rest} ref={ref} />;
});

const IconButtonToggle = createComponent<IconButtonProps>(
  function IconButtonToggle(props, ref) {
    const { icon, onIcon, foundationRef, ...rest } = props;
    const { isOn, rootEl } = useIconButtonFoundation(props);

    return (
      <IconButtonToggleRoot
        aria-pressed={isOn}
        {...rootEl.props(rest)}
        tag="button"
        ref={ref}
      >
        <div className="mdc-icon-button__ripple"></div>
        <IconButtonIcon icon={icon} />
        <IconButtonIcon icon={onIcon} on />
      </IconButtonToggleRoot>
    );
  }
);

/*********************************************************************
 * Bits
 *********************************************************************/

const IconButtonRoot = withRipple({
  surface: false,
  unbounded: true
})(
  createComponent<IconButtonProps>(function IconButtonRoot(props, ref) {
    const { checked, label, foundationRef, children, icon, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-icon-button',
      {
        'mdc-icon-button--on': checked
      }
    ]);
    return (
      <Tag
        tag="button"
        role="button"
        tabIndex={0}
        aria-label={label}
        {...rest}
        className={className}
        ref={ref}
      >
        <div className="mdc-icon-button__ripple"></div>
        <Icon icon={icon} tag="i" />
      </Tag>
    );
  })
);

const IconButtonToggleRoot = withRipple({
  surface: false,
  unbounded: true
})(
  createComponent<IconButtonProps>(function IconButtonToggleRoot(props, ref) {
    const { checked, ...rest } = props;
    const className = useClassNames(props, [
      'mdc-icon-button',
      {
        'mdc-icon-button--on': checked
      }
    ]);
    return (
      <Tag
        tag="button"
        role="button"
        tabIndex={0}
        {...rest}
        className={className}
        ref={ref}
      />
    );
  })
);

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
