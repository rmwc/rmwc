import { CustomEventT } from '@rmwc/base';
import { IconProps } from '@rmwc/icon';

import * as React from 'react';
//@ts-ignore
import { MDCChipFoundation } from '@material/chips';

import { Icon } from '@rmwc/icon';
import { FoundationComponent, Component } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';

export type ChipPropsT = {
  /** Text for your Chip. */
  text?: React.ReactNode;
  /** makes the Chip appear selected. */
  selected?: boolean;
  /** Instance of an Icon Component. */
  leadingIcon?: React.ReactNode;
  /** Instance of an Icon Component. */
  trailingIcon?: React.ReactNode;
  /** An optional chip ID that will be included in callback evt.detail. If this is not passed, RMWC will attempt to use the "key" prop if present.  */
  id?: string;
  /** Includes an optional checkmark for the chips selected state. */
  checkmark?: boolean;
  /** Additional children will be rendered in the text area. */
  children?: React.ReactNode;
  /** A callback for click or enter key. This should be used over onClick for accessibility reasons. */
  onInteraction?: (evt: CustomEventT<{ chipId: string }>) => void;
  /** A callback for click or enter key for the trailing icon. material-components-web always treats this as an intent to remove the chip. */
  onTrailingIconInteraction?: (evt: CustomEventT<{ chipId: string }>) => void;
  /** A callback that is fired once the chip is in an exited state from removing it. */
  onRemove?: (evt: CustomEventT<{ chipId: string }>) => void;
};

const ChipRoot = withRipple({})(
  class extends Component<ChipPropsT> {
    static displayName = 'ChipRoot';
    classNames = (props: ChipPropsT) => [
      'mdc-chip',
      {
        'mdc-chip--selected': props.selected
      }
    ];
    consumeProps = ['selected'];
  }
);

/** A Chip component. */
export class Chip extends FoundationComponent<ChipPropsT> {
  static displayName = 'Chip';
  root_: HTMLElement | null = null;
  trailingIcon_: HTMLElement | null = null;
  id: string = '';
  _reactInternalFiber: any;

  constructor(props: ChipPropsT) {
    super(props);
    this.createClassList('root_');

    [
      'handleInteraction_',
      'handleTransitionEnd_',
      'handleTrailingIconInteraction_'
    ].forEach(key => ((this as any)[key] = (this as any)[key].bind(this)));
  }

  handleInteraction_(evt: any) {
    evt.type === 'click' && this.props.onClick && this.props.onClick(evt);
    evt.type === 'keydown' && this.props.onKeyDown && this.props.onKeyDown(evt);
    return this.foundation_.handleInteraction(evt);
  }

  handleTransitionEnd_(evt: any) {
    return this.foundation_.handleTransitionEnd(evt);
  }

  handleTrailingIconInteraction_(evt: any) {
    return this.foundation_.handleTrailingIconInteraction(evt);
  }

  componentDidMount() {
    super.componentDidMount();

    this.id =
      this.root_ && this.root_.id
        ? this.root_.id
        : this._reactInternalFiber.key || `${Math.random()}`;
  }

  getDefaultFoundation() {
    return new MDCChipFoundation(
      /** @type {!MDCChipAdapter} */ (Object.assign({
        addClass: (className: string) => this.classList.root_.add(className),
        removeClass: (className: string) =>
          this.classList.root_.remove(className),
        hasClass: (className: string) => this.classList.root_.has(className),
        addClassToLeadingIcon: (className: string) => {
          // handled by props
        },
        removeClassFromLeadingIcon: (className: string) => {
          // handled by props
        },
        eventTargetHasClass: (target: HTMLElement, className: string) =>
          target.classList.contains(className),
        notifyInteraction: () =>
          this.emit(
            'onInteraction',
            { chipId: this.id },
            true /* shouldBubble */
          ),
        notifySelection: (selected: boolean) =>
          this.emit(
            'onSelect',
            { chipId: this.id, selected: selected },
            true /* shouldBubble */
          ),
        notifyTrailingIconInteraction: () =>
          this.emit(
            'onTrailingIconInteraction',
            { chipId: this.id },
            true /* shouldBubble */
          ),
        notifyRemoval: () =>
          this.emit(
            'onRemove',
            { chipId: this.id, root: this.root_ },
            true /* shouldBubble */
          ),
        getComputedStyleValue: (propertyName: string) =>
          this.root_ &&
          window.getComputedStyle(this.root_).getPropertyValue(propertyName),
        setStyleProperty: (propertyName: string, value: any) =>
          this.root_ && this.root_.style.setProperty(propertyName, value)
      }))
    );
  }

  render() {
    const {
      onInteraction,
      onTrailingIconInteraction,
      onRemove,
      onSelect,
      leadingIcon,
      trailingIcon,
      checkmark,
      text,
      children,
      ...rest
    } = this.props;
    return (
      <ChipRoot
        tabIndex={0}
        {...rest}
        onClick={this.handleInteraction_}
        onKeyDown={this.handleInteraction_}
        onTransitionEnd={this.handleTransitionEnd_}
        elementRef={(el: HTMLElement) => (this.root_ = el)}
        className={this.classList.root_.renderToString()}
      >
        {!!leadingIcon &&
          renderChipIcon(leadingIcon, {
            leading: true,
            hidden: rest.selected && checkmark
          })}
        {!!checkmark && <ChipCheckmark />}
        <div className="mdc-chip__text">
          {text}
          {children}
        </div>
        {!!trailingIcon &&
          renderChipIcon(trailingIcon, {
            trailing: true,
            elementRef: (el: HTMLElement) => (this.trailingIcon_ = el),
            onClick: this.handleTrailingIconInteraction_,
            onKeyDown: this.handleTrailingIconInteraction_
          })}
      </ChipRoot>
    );
  }
}

/** A checkmark for chip selection and filtering. */
class ChipCheckmark extends React.Component<{}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="mdc-chip__checkmark">
        <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
          <path
            className="mdc-chip__checkmark-path"
            fill="none"
            stroke="black"
            d="M1.73,12.91 8.1,19.28 22.79,4.59"
          />
        </svg>
      </div>
    );
  }
}

type ChipIconProps = {
  /** Make it a leading icon */
  leading?: boolean;
  /** Make it a trailing icon */
  trailing?: boolean;
} & IconProps;

/** Icons inside of a chip. This is an instance of the Icon component. To make the icons interactive, add props tabIndex="0" and role="button". */
class ChipIconRoot extends Component<ChipIconProps> {
  static displayName = 'ChipIconRoot';
  tag = Icon;
  classNames = (props: ChipIconProps & { hidden?: boolean }) => {
    return [
      'mdc-chip__icon',
      {
        'mdc-chip__icon--leading': props.leading,
        'mdc-chip__icon--leading-hidden': props.hidden,
        'mdc-chip__icon--trailing': props.trailing
      }
    ];
  };
  consumeProps = ['trailing', 'leading'];
}

export const ChipIcon: React.ComponentType<ChipIconProps> = (
  props: ChipIconProps
) => {
  const hasInteractionHandler = Object.keys(props).some(p =>
    p.startsWith('on')
  );
  const trailingProps =
    props.trailing || hasInteractionHandler
      ? { role: 'button', tabIndex: 0 }
      : {};

  return <ChipIconRoot {...trailingProps} {...props} />;
};

ChipIcon.displayName = 'ChipIcon';

// handle leading and trailing icons
const renderChipIcon = (iconNode: any, props: any) => {
  if (
    (iconNode && typeof iconNode === 'string') ||
    (typeof iconNode === 'object' && iconNode.type !== ChipIcon)
  ) {
    return <ChipIcon icon={iconNode} {...props} />;
  }

  const icon = React.Children.only(iconNode);
  return React.cloneElement(icon, { ...icon.props, ...props });
};

export type ChipSetPropsT = {
  /** Creates a choice chipset */
  choice?: boolean;
  /** Creates a filter chipset */
  filter?: boolean;
};

/** @extends React.Component */
/** A container for multiple chips. */
export class ChipSet extends Component<ChipSetPropsT> {
  static displayName = 'ChipSet';
  classNames = (props: ChipSetPropsT) => [
    'mdc-chip-set',
    {
      'mdc-chip-set--choice': props.choice,
      'mdc-chip-set--filter': props.filter
    }
  ];
  consumeProps = ['filter', 'choice'];
}
