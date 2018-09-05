// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';
import type { IconPropsT } from '../Icon';
import type { IconOptionsT } from '../Icon/defs';
import type { WithRipplePropsT } from '../Ripple';

import * as React from 'react';
import { MDCIconButtonToggle } from '@material/icon-button/dist/mdc.iconButton';
import { Icon } from '../Icon';
import { withRipple } from '../Ripple';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

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

export const IconButtonRoot = withRipple({ unbounded: true })(
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

export const IconButtonIcon = simpleTag({
  displayName: 'IconButtonIcon',
  tag: Icon,
  classNames: (props: { on: boolean }) => [
    'mdc-icon-button__icon',
    {
      'mdc-icon-button__icon--on': props.on
    }
  ],
  consumeProps: ['on']
});

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

    return (
      <IconButtonRoot
        aria-pressed={this.isOn()}
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
