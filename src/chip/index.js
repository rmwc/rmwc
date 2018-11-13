// @flow
import type { CustomEventT } from '@rmwc/base';
import type { IconPropsT } from '@rmwc/icon';

import * as React from 'react';
import { MDCChipFoundation } from '@material/chips/dist/mdc.chips';

import { Icon } from '@rmwc/icon';
import { FoundationComponent, Component } from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';

export type ChipPropsT = {
  /** Text for your Chip. */
  label?: React.Node,
  /** makes the Chip appear selected. */
  selected?: boolean,
  /** Instance of an Icon Component. */
  leadingIcon?: React.Node,
  /** Instance of an Icon Component. */
  trailingIcon?: React.Node,
  /** An optional chip ID that will be included in callback evt.detail. If this is not passed, RMWC will attempt to use the "key" prop if present.  */
  id?: string,
  /** Includes an optional checkmark for the chips selected state. */
  checkmark?: boolean,
  /** Additional children will be rendered in the text area. */
  children?: React.Node,
  /** A callback for click or enter key. This should be used over onClick for accessibility reasons. */
  onInteraction?: (evt: CustomEventT<{ chipId: string }>) => mixed,
  /** A callback for click or enter key for the trailing icon. material-components-web always treats this as an intent to remove the chip. */
  onTrailingIconInteraction?: (evt: CustomEventT<{ chipId: string }>) => mixed,
  /** A callback that is fired once the chip is in an exited state from removing it. */
  onRemove?: (evt: CustomEventT<{ chipId: string }>) => mixed
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

export class Chip extends FoundationComponent<ChipPropsT> {
  static displayName = 'Chip';
  root_: HTMLElement | null;
  trailingIcon_: HTMLElement | null;
  leadingIcon_: any;
  handleInteraction_: any;
  handleTransitionEnd_: any;
  handleTrailingIconInteraction_: any;
  INTERACTION_EVENTS = ['click', 'keydown'];
  id: string;
  _reactInternalFiber: any;

  constructor(props: ChipPropsT) {
    super(props);
    this.createClassList('root_');
  }

  componentDidMount() {
    super.componentDidMount();
    this.id =
      this.root_ && this.root_.id
        ? this.root_.id
        : this._reactInternalFiber.key || `${Math.random()}`;
    this.handleInteraction_ = evt => this.foundation_.handleInteraction(evt);
    this.handleTransitionEnd_ = evt =>
      this.foundation_.handleTransitionEnd(evt);
    this.handleTrailingIconInteraction_ = evt =>
      this.foundation_.handleTrailingIconInteraction(evt);

    this.INTERACTION_EVENTS.forEach(evtType => {
      this.root_ &&
        this.root_.addEventListener(evtType, this.handleInteraction_);
    });
    this.root_ &&
      this.root_.addEventListener('transitionend', this.handleTransitionEnd_);

    if (this.trailingIcon_) {
      this.INTERACTION_EVENTS.forEach(evtType => {
        this.trailingIcon_ &&
          this.trailingIcon_.addEventListener(
            evtType,
            this.handleTrailingIconInteraction_
          );
      });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();

    this.INTERACTION_EVENTS.forEach(evtType => {
      this.root_ &&
        this.root_.removeEventListener(evtType, this.handleInteraction_);
    });
    this.root_ &&
      this.root_.removeEventListener(
        'transitionend',
        this.handleTransitionEnd_
      );

    if (this.trailingIcon_) {
      this.INTERACTION_EVENTS.forEach(evtType => {
        this.trailingIcon_ &&
          this.trailingIcon_.removeEventListener(
            evtType,
            this.handleTrailingIconInteraction_
          );
      });
    }
  }

  getDefaultFoundation() {
    return new MDCChipFoundation(
      /** @type {!MDCChipAdapter} */ (Object.assign({
        addClass: className => this.classList.root_.add(className),
        removeClass: className => this.classList.root_.remove(className),
        hasClass: className => this.classList.root_.has(className),
        addClassToLeadingIcon: className => {
          if (this.leadingIcon_) {
            this.leadingIcon_.classList.add(className);
          }
        },
        removeClassFromLeadingIcon: className => {
          if (this.leadingIcon_) {
            this.leadingIcon_.classList.remove(className);
          }
        },
        eventTargetHasClass: (target, className) =>
          target.classList.contains(className),
        notifyInteraction: () =>
          this.emit(
            'onInteraction',
            { chipId: this.id },
            true /* shouldBubble */
          ),
        notifySelection: selected =>
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
        getComputedStyleValue: propertyName =>
          window.getComputedStyle(this.root_).getPropertyValue(propertyName),
        setStyleProperty: (propertyName, value) =>
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
      label,
      children,
      ...rest
    } = this.props;
    return (
      <ChipRoot
        tabIndex={0}
        {...rest}
        elementRef={el => (this.root_ = el)}
        className={this.classList.root_.renderToString()}
      >
        {!!leadingIcon &&
          renderChipIcon(leadingIcon, {
            leading: true,
            hidden: rest.selected && checkmark
          })}
        {!!checkmark && <ChipCheckmark />}
        <div className="mdc-chip__text">
          {label}
          {children}
        </div>
        {!!trailingIcon &&
          renderChipIcon(trailingIcon, {
            trailing: true,
            elementRef: el => (this.trailingIcon_ = el)
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

type ChipIconPropsT = {
  /** Make it a leading icon */
  leading?: boolean,
  /** Make it a trailing icon */
  trailing?: boolean
} & IconPropsT;

/** Icons inside of a chip. This is an instance of the Icon component. To make the icons interactive, add props tabIndex="0" and role="button". */
class ChipIconRoot extends Component<ChipIconPropsT> {
  static displayName = 'ChipIconRoot';
  tag = Icon;
  classNames = (props: ChipIconPropsT & { hidden?: boolean }) => {
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

const ChipIcon: React.ComponentType<ChipIconPropsT> = (
  props: ChipIconPropsT
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
const renderChipIcon = (iconNode, props) => {
  if (
    (iconNode && typeof iconNode === 'string') ||
    (typeof iconNode === 'object' && iconNode.type !== ChipIcon)
  ) {
    return <ChipIcon icon={iconNode} {...props} />;
  }

  return iconNode;
};

export type ChipSetPropsT = {
  /** Creates a choice chipset */
  choice?: boolean,
  /** Creates a filter chipset */
  filter?: boolean
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
