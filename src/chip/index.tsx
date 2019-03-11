import * as RMWC from '@rmwc/types';
import * as React from 'react';

import { MDCChipFoundation } from '@material/chips';

import {
  FoundationComponent,
  componentFactory,
  randomId,
  deprecationWarning
} from '@rmwc/base';
import { withRipple } from '@rmwc/ripple';
import { Icon, IconProps } from '@rmwc/icon';

export interface ChipProps {
  /** Text for your Chip. */
  label?: React.ReactNode;
  /** makes the Chip appear selected. */
  selected?: boolean;
  /** Instance of an Icon Component. */
  icon?: RMWC.IconPropT;
  /** Instance of an Icon Component. */
  trailingIcon?: RMWC.IconPropT;
  /** An optional chip ID that will be included in callback evt.detail. If this is not passed, RMWC will attempt to use the "key" prop if present.  */
  id?: string;
  /** Includes an optional checkmark for the chips selected state. */
  checkmark?: boolean;
  /** Additional children will be rendered in the text area. */
  children?: React.ReactNode;
  /** A callback for click or enter key. This should be used over onClick for accessibility reasons. */
  onInteraction?: (evt: RMWC.CustomEventT<{ chipId: string }>) => void;
  /** A callback for click or enter key for the trailing icon. material-components-web always treats this as an intent to remove the chip. */
  onTrailingIconInteraction?: (
    evt: RMWC.CustomEventT<{ chipId: string }>
  ) => void;
  /** A callback that is fired once the chip is in an exited state from removing it. */
  onRemove?: (evt: RMWC.CustomEventT<{ chipId: string }>) => void;
}

export interface DeprecatedChipProps {
  /** Deprecated, use label instead */
  text?: React.ReactNode;
}

const ChipRoot = withRipple({})(
  componentFactory<ChipProps>({
    displayName: 'ChipRoot',
    classNames: (props: ChipProps) => [
      'mdc-chip',
      {
        'mdc-chip--selected': props.selected
      }
    ],
    consumeProps: ['selected']
  })
);

/** A Chip component. */
export class Chip extends FoundationComponent<
  MDCChipFoundation,
  ChipProps & DeprecatedChipProps
> {
  static displayName = 'Chip';

  private root = this.createElement('root');
  id: string = '';
  checkmarkEl: HTMLDivElement | null = null;
  _reactInternalFiber: any;

  constructor(props: ChipProps) {
    super(props);
    this.handleInteraction = this.handleInteraction.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleTrailingIconInteraction = this.handleTrailingIconInteraction.bind(
      this
    );
  }

  componentDidMount() {
    super.componentDidMount();

    this.id =
      this.root.ref && this.root.ref.id
        ? this.root.ref.id
        : this._reactInternalFiber.key || randomId('chip');
  }

  getDefaultFoundation() {
    return new MDCChipFoundation(
      /** @type {!MDCChipAdapter} */ (Object.assign({
        addClass: (className: string) => {
          this.root.addClass(className);
        },
        removeClass: (className: string) => this.root.removeClass(className),
        hasClass: (className: string) => this.root.hasClass(className),
        addClassToLeadingIcon: (className: string) => {
          // handled by props
        },
        removeClassFromLeadingIcon: (className: string) => {
          // handled by props
        },
        eventTargetHasClass: (target: HTMLElement, className: string) => {
          return (
            this.root.hasClass(className) ||
            target.classList.contains(className)
          );
        },
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
            { chipId: this.id, root: this.root.ref },
            true /* shouldBubble */
          ),
        getComputedStyleValue: (propertyName: string) =>
          this.root.ref &&
          window.getComputedStyle(this.root.ref).getPropertyValue(propertyName),
        setStyleProperty: (propertyName: string, value: any) => {
          this.root.setStyle(propertyName, value);
        },

        hasLeadingIcon: () => !!this.props.icon,
        getRootBoundingClientRect: () =>
          this.root.ref && this.root.ref.getBoundingClientRect(),
        getCheckmarkBoundingClientRect: () =>
          this.checkmarkEl && this.checkmarkEl.getBoundingClientRect()
      }))
    );
  }

  handleInteraction(
    evt: React.MouseEvent & React.KeyboardEvent & MouseEvent & KeyboardEvent
  ) {
    evt.type === 'click' && this.props.onClick && this.props.onClick(evt);
    evt.type === 'keydown' && this.props.onKeyDown && this.props.onKeyDown(evt);
    return this.foundation.handleInteraction(evt);
  }

  handleTransitionEnd(evt: React.TransitionEvent & TransitionEvent) {
    this.foundation.handleTransitionEnd(evt);
  }

  handleTrailingIconInteraction(evt: any) {
    return this.foundation.handleTrailingIconInteraction(evt);
  }

  render() {
    const {
      onInteraction,
      onTrailingIconInteraction,
      onRemove,
      onSelect,
      icon,
      trailingIcon,
      checkmark,
      text,
      label,
      children,
      ...rest
    } = this.props;

    let labelToUse = label;

    if (text) {
      deprecationWarning('Chip `text` is now `label`');
      labelToUse = text;
    }

    return (
      <ChipRoot
        tabIndex={0}
        {...this.root.props(rest)}
        onClick={this.handleInteraction}
        onKeyDown={this.handleInteraction}
        onTransitionEnd={this.handleTransitionEnd}
        ref={this.root.setRef}
      >
        {!!icon && (
          <ChipIcon icon={icon} leading hidden={rest.selected && checkmark} />
        )}
        {!!checkmark && (
          <ChipCheckmark elementRef={el => (this.checkmarkEl = el)} />
        )}
        <div className="mdc-chip__text">
          {labelToUse}
          {children}
        </div>
        {!!trailingIcon && (
          <ChipIcon
            icon={trailingIcon}
            trailing
            onClick={this.handleTrailingIconInteraction}
            onKeyDown={this.handleTrailingIconInteraction}
          />
        )}
      </ChipRoot>
    );
  }
}

/** A checkmark for chip selection and filtering. */
class ChipCheckmark extends React.Component<{
  elementRef: (el: HTMLDivElement | null) => void;
}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div ref={this.props.elementRef} className="mdc-chip__checkmark">
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

export interface ChipIconProps extends IconProps {
  /** Make it a leading icon */
  leading?: boolean;
  /** Make it a trailing icon */
  trailing?: boolean;
}

/** Icons inside of a chip. This is an instance of the Icon component. To make the icons interactive, add props tabIndex="0" and role="button". */
const ChipIconRoot = componentFactory<ChipIconProps>({
  displayName: 'ChipIconRoot',
  tag: Icon,
  classNames: (props: ChipIconProps & { hidden?: boolean }) => {
    return [
      'mdc-chip__icon',
      {
        'mdc-chip__icon--leading': props.leading,
        'mdc-chip__icon--leading-hidden': props.hidden,
        'mdc-chip__icon--trailing': props.trailing
      }
    ];
  },
  consumeProps: ['trailing', 'leading']
});

export const ChipIcon = (props: ChipIconProps & RMWC.ComponentProps) => {
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

export interface ChipSetProps {
  /** Creates a choice chipset */
  choice?: boolean;
  /** Creates a filter chipset */
  filter?: boolean;
}

/** A container for multiple chips. */
export const ChipSet = componentFactory<ChipSetProps>({
  displayName: 'ChipSet',
  classNames: (props: ChipSetProps) => [
    'mdc-chip-set',
    {
      'mdc-chip-set--choice': props.choice,
      'mdc-chip-set--filter': props.filter
    }
  ],
  consumeProps: ['filter', 'choice']
});
