import { ComponentProps, CustomEventT, FoundationComponent } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';
import { IconOptionsT } from '@rmwc/icon/defs';
import { WithRippleProps } from '@rmwc/ripple';

import * as React from 'react';
//@ts-ignore
import { MDCIconButtonToggleFoundation } from '@material/icon-button';
import { Icon } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';
import { componentFactory } from '@rmwc/base';

export interface IconButtonProps
  extends ComponentProps,
    IconProps,
    WithRippleProps {
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
  componentFactory<IconButtonProps>({
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

class IconButtonToggle extends FoundationComponent<IconButtonProps> {
  static displayName = 'IconButton';

  constructor(props: IconButtonProps) {
    super(props);
    this.createClassList('root_');
    this.createPropsList('root_');

    this.handleClick = this.handleClick.bind(this);
  }

  get on() {
    return this.foundation && this.foundation.isOn();
  }

  set on(isOn) {
    this.foundation.toggle(isOn);
  }

  getDefaultFoundation() {
    return new MDCIconButtonToggleFoundation({
      addClass: (className: string) => this.classList.root_.add(className),
      removeClass: (className: string) =>
        this.classList.root_.remove(className),
      hasClass: (className: string) => this.classList.root_.has(className),
      setAttr: (attrName: string, attrValue: string | number | null) =>
        this.propsList.root_.add(attrName, attrValue),
      notifyChange: (evtData: { isOn: boolean }) =>
        this.emit('onChange', evtData)
    });
  }

  /** Takes into account our checked prop */
  isOn() {
    if (this.props.checked !== undefined) {
      return this.props.checked;
    }

    return this.on;
  }

  sync(nextProps: IconButtonProps) {
    // checked
    if (nextProps.checked !== undefined && this.on !== nextProps.checked) {
      this.on = !!nextProps.checked;
    }
  }

  handleClick(evt: React.MouseEvent<HTMLButtonElement>) {
    this.props.onClick && this.props.onClick(evt);
    this.foundation.handleClick(evt);
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
    return (
      <IconButtonRoot
        aria-pressed={this.isOn()}
        aria-hidden="true"
        {...this.propsList.root_.all(rest)}
        onClick={this.handleClick}
        className={this.classList.root_.renderToString()}
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
