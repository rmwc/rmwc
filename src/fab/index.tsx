import { componentFactory, ComponentProps } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';
import { WithRipplePropsT } from '@rmwc/ripple';

import * as React from 'react';
import { Icon } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';

export interface FabProps extends ComponentProps, IconProps, WithRipplePropsT {
  /** Make the Fab smaller. */
  mini?: boolean;
  /** Make the Fab extended with a label. */
  label?: React.ReactNode & any;
  /** Animates the FAB out of view. When this class is removed, the FAB will return to view. */
  exited?: boolean;
  /** Enable / disable the ripple. */
  ripple?: boolean;
}

export const FabRoot = withRipple({
  surface: false
})(
  componentFactory({
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

export const FabLabel = componentFactory({
  displayName: 'FabLabel',
  classNames: ['mdc-fab__label']
});

/** A floating action button component */
export const Fab = ({
  children,
  label,
  icon,
  iconOptions,
  ...rest
}: FabProps) => (
  <FabRoot {...rest}>
    <FabIcon icon={icon} iconOptions={iconOptions} />
    {!!label && <FabLabel>{label}</FabLabel>}
    {children}
  </FabRoot>
);
