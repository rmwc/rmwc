import { ComponentProps, CustomEventT } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';
import { IconOptionsT } from '@rmwc/icon/defs';
import { WithRipplePropsT } from '@rmwc/ripple';

import * as React from 'react';
//@ts-ignore
import { MDCIconButtonToggle } from '@material/icon-button';
import { Icon } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';
import {
  componentFactory,
  withFoundation,
  syncFoundationProp
} from '@rmwc/base';

export interface IconButtonProps
  extends ComponentProps,
    IconProps,
    WithRipplePropsT {
  /** Controls the on / off state of the a toggleable button. */
  checked?: boolean;
  /** An onChange callback that receives a custom event. */
  onChange?: (evt: CustomEventT<{ isOn: boolean }>) => void;
  /** Makes the button disabled */
  disabled?: boolean;
  /** If specified, renders a toggle with this icon as the on state. */
  onIcon?: React.ReactNode;
  /** Options for the onIcon */
  onIconOptions?: IconOptionsT;
}

export const IconButtonRoot = withRipple({
  unbounded: true
})(
  componentFactory({
    displayName: 'IconButtonRoot',
    tag: 'button',
    classNames: (props: IconButtonProps) => [
      'mdc-icon-button',
      {
        'mdc-icon-button--on': props.checked
      }
    ],
    defaultProps: {
      role: 'button',
      tabIndex: '0'
    },
    consumeProps: ['checked']
  })
);

export interface IconButtonIconProps extends IconProps {
  on?: boolean;
}

export const IconButtonIcon = componentFactory<IconButtonIconProps>({
  displayName: 'IconButtonIcon',
  tag: Icon,
  classNames: (props: IconButtonIconProps) => [
    'mdc-icon-button__icon',
    {
      'mdc-icon-button__icon--on': props.on
    }
  ],
  consumeProps: ['on']
});

class IconButtonToggle extends withFoundation({
  constructor: MDCIconButtonToggle
})<any> {
  static displayName = 'IconButton';

  on?: boolean;
  initRipple_: any;
  ripple_: any;

  /** Takes into account our checked prop */
  isOn() {
    if (this.props.checked !== undefined) {
      return this.props.checked;
    }

    return this.foundation_ && this.on;
  }

  initialize() {
    this.ripple_ = this.initRipple_();
    super.initialize();
  }

  syncWithProps(nextProps: IconButtonProps) {
    // checked
    syncFoundationProp(nextProps.checked, this.on, () => {
      this.on = !!nextProps.checked;
    });
  }

  render() {
    const {
      checked,
      icon,
      iconOptions,
      onIcon,
      onIconOptions,
      ...rest
    } = this.props;
    const { root_ } = this.foundationRefs;
    const tsxIsOn: any = this.isOn();

    return (
      <IconButtonRoot
        aria-pressed={tsxIsOn}
        aria-hidden="true"
        {...rest}
        elementRef={root_}
      >
        <IconButtonIcon icon={icon} iconOptions={iconOptions} />
        <IconButtonIcon icon={onIcon} iconOptions={onIconOptions} on />
      </IconButtonRoot>
    );
  }
}

export const IconButton = ({ icon, iconOptions, ...rest }: IconButtonProps) => {
  if (rest.onIcon) {
    return <IconButtonToggle {...rest} icon={icon} iconOptions={iconOptions} />;
  }

  return (
    <IconButtonRoot aria-hidden="true" {...rest}>
      <IconButtonIcon icon={icon} iconOptions={iconOptions} />
    </IconButtonRoot>
  );
};

export default IconButton;
