// @flow
import type { SimpleTagPropsT, CustomEventT } from '@rmwc/base';
import type { IconPropsT } from '@rmwc/icon';
import type { IconOptionsT } from '@rmwc/icon/defs';
import type { WithRipplePropsT } from '@rmwc/ripple';

import * as React from 'react';
import { MDCIconButtonToggle } from '@material/icon-button';
import { Icon } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';
import { simpleTag, withFoundation, syncFoundationProp } from '@rmwc/base';

export type IconButtonPropsT = {
  /** Controls the on / off state of the a toggleable button. */
  checked?: boolean,
  /** An onChange callback that receives a custom event. */
  onChange?: (evt: CustomEventT<{ isOn: boolean }>) => mixed,
  /** Makes the button disabled */
  disabled?: boolean,
  /** If specified, renders a toggle with this icon as the on state. */
  onIcon?: React.Node,
  /** Options for the onIcon */
  onIconOptions?: IconOptionsT
  /**  */
} & SimpleTagPropsT &
  IconPropsT &
  WithRipplePropsT;

export const IconButtonRoot: React.ComponentType<IconButtonPropsT> = withRipple(
  {
    unbounded: true
  }
)(
  simpleTag({
    displayName: 'IconButtonRoot',
    tag: 'button',
    classNames: (props: IconButtonPropsT) => [
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

type IconButtonIconPropsT = {
  on?: boolean
} & IconPropsT;

export const IconButtonIcon: React.ComponentType<IconButtonIconPropsT> = simpleTag(
  {
    displayName: 'IconButtonIcon',
    tag: Icon,
    classNames: (props: IconButtonIconPropsT) => [
      'mdc-icon-button__icon',
      {
        'mdc-icon-button__icon--on': props.on
      }
    ],
    consumeProps: ['on']
  }
);

class IconButtonToggle extends withFoundation({
  constructor: MDCIconButtonToggle
})<IconButtonPropsT> {
  static displayName = 'IconButton';

  on: boolean;
  initRipple_: Function;
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

  syncWithProps(nextProps: IconButtonPropsT) {
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

export const IconButton = ({
  icon,
  iconOptions,
  ...rest
}: IconButtonPropsT) => {
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
