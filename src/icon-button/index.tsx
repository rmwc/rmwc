import * as React from 'react';
//@ts-ignore
import { MDCIconButtonToggleFoundation } from '@material/icon-button';
import {
  componentFactory,
  ComponentProps,
  FoundationComponent,
  CustomEventT
} from '@rmwc/base';
import { deprecationWarning } from '@rmwc/base/utils/deprecation';
import { Icon, IconPropT, IconProps, getIconStrategy } from '@rmwc/icon';
import { withRipple, WithRippleProps } from '@rmwc/ripple';

export interface IconButtonProps extends WithRippleProps {
  /** Controls the on / off state of the a toggleable button. */
  checked?: boolean;
  /** An onChange callback that receives a custom event. */
  onChange?: (evt: CustomEventT<{ isOn: boolean }>) => void;
  /** Makes the button disabled */
  disabled?: boolean;
  /** Icon for the button */
  icon?: IconPropT;
  /** If specified, renders a toggle with this icon as the on state. */
  onIcon?: IconPropT;
}

export interface DeprecatedIconButtonProps {
  /** DEPRECATED: Pass options directly to icon */
  iconOptions?: any;
  /** DEPRECATED: Pass options directly to onIcon */
  onIconOptions?: any;
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

class IconButtonToggle extends FoundationComponent<
  IconButtonProps & DeprecatedIconButtonProps
> {
  static displayName = 'IconButton';

  constructor(props: IconButtonProps & ComponentProps) {
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
    const { icon, iconOptions, onIcon, onIconOptions, ...rest } = this.props;

    if (iconOptions || onIconOptions) {
      deprecationWarning(
        'IconButton component props iconOptions and onIconOptions must be passed directly to the icon and onIcon prop. This issue has NOT been automatically fixed for you, please update your code.'
      );
    }

    return (
      <IconButtonRoot
        aria-pressed={this.isOn()}
        aria-hidden="true"
        {...this.propsList.root_.all(rest)}
        onClick={this.handleClick}
        className={this.classList.root_.renderToString()}
      >
        <IconButtonIcon icon={icon} />
        <IconButtonIcon icon={onIcon} on />
      </IconButtonRoot>
    );
  }
}

export const IconButton = ({
  icon,
  ...rest
}: IconButtonProps & ComponentProps) => {
  if (rest.onIcon) {
    return <IconButtonToggle {...rest} icon={icon} />;
  }

  const strategy = getIconStrategy(icon, 'auto', null);
  // URLs are image tags and need to be wrapped
  if (strategy === 'url')
    return (
      <IconButtonRoot aria-hidden="true" {...rest}>
        <IconButtonIcon icon={icon} />
      </IconButtonRoot>
    );

  return <IconButtonRoot aria-hidden="true" {...rest} tag={Icon} icon={icon} />;
};

export default IconButton;
