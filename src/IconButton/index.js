// @flow
import type { SimpleTagPropsT, CustomEventT } from '../Base';
import type { IconPropsT } from '../Icon';

import * as React from 'react';
import { MDCIconButtonToggle } from '@material/icon-button/dist/mdc.iconButton';
import { Icon } from '../Icon';
import { getIconStrategy } from '../Icon/utils';
import { simpleTag, withFoundation, syncFoundationProp } from '../Base';

export type IconButtonPropsT = {
  /** A label for non-toggleable buttons */
  label?: React.Node,
  /** The icon to use when a toggleable button is on. */
  onContent?: React.Node,
  /** The label to use when a toggleable button is on. */
  onLabel?: React.Node,
  /** The icon to use when a toggleable button is off. */
  offContent?: React.Node,
  /** The label to use when a toggleable button is off. */
  offLabel?: React.Node,
  /** Controls the on / off state of the a toggleable button. */
  checked?: boolean,
  /** An onChange callback that receives a custom event. */
  onChange?: (evt: CustomEventT<{ isOn: boolean }>) => mixed,
  /** Makes the button disabled */
  disabled?: boolean
} & SimpleTagPropsT &
  IconPropsT;

export const IconButtonRoot = simpleTag({
  displayName: 'IconButtonRoot',
  tag: Icon,
  classNames: 'mdc-icon-button',
  defaultProps: {
    role: 'button',
    tabIndex: '0'
  }
});

export class IconButton extends withFoundation({
  constructor: MDCIconButtonToggle,
  adapter: {
    /**
     * A hack to get uncontrolled Icons to render
     * setText is only used to set the iconContent.
     * We are controlling the content through React
     * So here, we just use it as a queue to re-render
     */
    setText: function() {
      this.forceUpdate();
    }
  }
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
      this.foundation_ && this.foundation_.refreshToggleData();
    });
  }

  renderIcon() {
    const {
      use,
      children,
      onContent,
      offContent,
      onLabel,
      offLabel,
      checked,
      ...rest
    } = this.props;

    const iconContent =
      this.isOn() && onContent ? onContent : offContent || use || children;
    const strategy = getIconStrategy(iconContent, 'auto', null);
    const opts: mixed[] = ['url', 'component'];
    if (opts.indexOf(strategy) !== -1) {
      return <Icon {...rest} use={iconContent} />;
    }

    return iconContent;
  }

  render() {
    const {
      checked,
      onContent,
      offContent,
      onLabel,
      offLabel,
      label,
      apiRef,
      use,
      ...rest
    } = this.props;
    const ariaPressed = this.isOn();
    const ariaLabel = label || offLabel;

    return (
      <IconButtonRoot
        tag="button"
        {...rest}
        use={this.renderIcon()}
        elementRef={this.foundationRefs.root_}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-hidden="true"
        data-toggle-on-content={onContent}
        data-toggle-on-label={onLabel}
        data-toggle-off-content={offContent}
        data-toggle-off-label={offLabel}
      />
    );
  }
}

export default IconButton;
