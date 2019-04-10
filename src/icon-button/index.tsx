import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { MDCIconButtonToggleFoundation } from '@material/icon-button';
import {
  componentFactory,
  FoundationComponent,
  deprecationWarning
} from '@rmwc/base';
import { Icon, IconProps } from '@rmwc/icon';
import { withRipple } from '@rmwc/ripple';

/** An IconButton component that can also be used as a toggle. */
export interface IconButtonProps extends RMWC.WithRippleProps {
  /** Controls the on / off state of the a toggleable button. */
  checked?: boolean;
  /** An onChange callback that receives a custom event. */
  onChange?: (evt: RMWC.CustomEventT<{ isOn: boolean }>) => void;
  /** Makes the button disabled */
  disabled?: boolean;
  /** Icon for the button */
  icon?: RMWC.IconPropT;
  /** If specified, renders a toggle with this icon as the on state. */
  onIcon?: RMWC.IconPropT;
}

export interface DeprecatedIconButtonProps {
  /** DEPRECATED: Pass options directly to icon */
  iconOptions?: any;
  /** DEPRECATED: Pass options directly to onIcon */
  onIconOptions?: any;
}

const IconButtonRoot = withRipple({
  surface: false,
  unbounded: true
})(
  componentFactory<IconButtonProps>({
    displayName: 'IconButtonRoot',
    tag: Icon,
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

const IconButtonToggleRoot = withRipple({
  surface: false,
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

interface IconButtonIconProps extends IconProps {
  on?: boolean;
}

const IconButtonIcon = componentFactory<IconButtonIconProps>({
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
  MDCIconButtonToggleFoundation,
  IconButtonProps & DeprecatedIconButtonProps
> {
  static displayName = 'IconButton';

  private root = this.createElement('root');

  constructor(props: IconButtonProps & RMWC.ComponentProps) {
    super(props);
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
      addClass: (className: string) => this.root.addClass(className),
      removeClass: (className: string) => this.root.removeClass(className),
      hasClass: (className: string) => this.root.hasClass(className),
      setAttr: (attrName: string, attrValue: string | number | null) =>
        this.root.setProp(attrName as any, attrValue),
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
    this.foundation.handleClick();
  }

  render() {
    const { icon, iconOptions, onIcon, onIconOptions, ...rest } = this.props;

    if (iconOptions || onIconOptions) {
      deprecationWarning(
        'IconButton component props iconOptions and onIconOptions must be passed directly to the icon and onIcon prop. This issue has NOT been automatically fixed for you, please update your code.'
      );
    }

    return (
      <IconButtonToggleRoot
        aria-pressed={this.isOn()}
        aria-hidden="true"
        {...this.root.props(rest)}
        tag="button"
        onClick={this.handleClick}
      >
        <IconButtonIcon icon={icon} />
        <IconButtonIcon icon={onIcon} on />
      </IconButtonToggleRoot>
    );
  }
}

/** An IconButton component that can also be used as a toggle. */
export const IconButton = ({
  ...rest
}: IconButtonProps & RMWC.ComponentProps) => {
  if (rest.onIcon) {
    return <IconButtonToggle {...rest} />;
  }

  return <IconButtonRoot aria-hidden="true" tag="button" {...rest} />;
};

IconButton.displayName = 'IconButton';
