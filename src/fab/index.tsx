import * as React from 'react';
import { componentFactory } from '@rmwc/base';
import { withRipple, WithRippleProps } from '@rmwc/ripple';
import { Icon, IconProps, IconPropT } from '@rmwc/icon';

export interface FabProps extends WithRippleProps {
  /** Make the Fab smaller. */
  mini?: boolean;
  /** The icon for the FAB */
  icon?: IconPropT;
  /** A trialing icon for the FAB */
  trailingIcon?: IconPropT;
  /** Make the Fab extended with a label. */
  label?: React.ReactNode & any;
  /** Content specified as children. */
  children?: React.ReactNode;
  /** Animates the FAB out of view. When this class is removed, the FAB will return to view. */
  exited?: boolean;
}

export const FabRoot = withRipple({ surface: false })(
  componentFactory<FabProps>({
    displayName: 'FabRoot',
    tag: 'button',
    classNames: (props: FabProps) => [
      'mdc-fab',
      {
        'mdc-fab--mini': props.mini,
        'mdc-fab--exited': props.exited,
        'mdc-fab--extended': props.label
      }
    ],
    defaultProps: {
      cssOnly: false,
      mini: false
    },
    consumeProps: ['mini', 'cssOnly', 'exited', 'label', 'icon']
  })
);

export const FabIcon = componentFactory<IconProps>({
  displayName: 'FabIcon',
  tag: Icon,
  classNames: ['mdc-fab__icon']
});

export const FabLabel = componentFactory<{}>({
  displayName: 'FabLabel',
  classNames: ['mdc-fab__label']
});

/** A floating action button component */
export const Fab = ({
  children,
  label,
  icon,
  trailingIcon,
  ...rest
}: FabProps) => {
  if (trailingIcon && !label) {
    console.warn(
      `FAB 'trailingIcon' prop should only be used in conjunction with 'label'`
    );
  }
  return (
    <FabRoot label={label} {...rest}>
      {!!icon && <FabIcon icon={icon} />}
      {!!label && <FabLabel>{label}</FabLabel>}
      {children}
      {!!trailingIcon && <FabIcon icon={trailingIcon} />}
    </FabRoot>
  );
};
