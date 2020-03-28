import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';
import { Tag, useClassNames, createComponent } from '@rmwc/base';

/** A floating action button component */
export interface FabProps extends RMWC.WithRippleProps {
  /** Make the Fab smaller. */
  mini?: boolean;
  /** The icon for the FAB */
  icon?: RMWC.IconPropT;
  /** A trialing icon for the FAB */
  trailingIcon?: RMWC.IconPropT;
  /** Make the Fab extended with a label. */
  label?: React.ReactNode & any;
  /** Content specified as children. */
  children?: React.ReactNode;
  /** Animates the FAB out of view. When this class is removed, the FAB will return to view. */
  exited?: boolean;
}

/** A floating action button component */
export const Fab = withRipple({ surface: false })(
  createComponent<FabProps>(function Fab(props, ref) {
    const {
      children,
      label,
      icon,
      trailingIcon,
      mini,
      exited,
      ...rest
    } = props;

    const className = useClassNames(props, [
      'mdc-fab',
      {
        'mdc-fab--mini': mini,
        'mdc-fab--exited': exited,
        'mdc-fab--extended': label
      }
    ]);

    if (trailingIcon && !label) {
      console.warn(
        `FAB 'trailingIcon' prop should only be used in conjunction with 'label'`
      );
    }

    return (
      <Tag tag="button" label={label} {...rest} ref={ref} className={className}>
        <FabRipple />
        {!!icon && <FabIcon icon={icon} />}
        {!!label && <div className="mdc-fab__label">{label}</div>}
        {children}
        {!!trailingIcon && <FabIcon icon={trailingIcon} />}
      </Tag>
    );
  })
);

/*********************************************************************
 * Bits
 *********************************************************************/

const FabRipple = React.memo(function FabRipple() {
  return <div className="mdc-fab__ripple"></div>;
});

const FabIcon = React.memo(function FabIcon(props: IconProps) {
  return <Icon className="mdc-fab__icon" {...props} />;
});
