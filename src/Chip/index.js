// @flow

import * as React from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { simpleTag, withRipple } from '../Base';
import { withFoundation, addClass, removeClass } from '../Base/MDCFoundation';

import { MDCChip } from '@material/chips/dist/mdc.chips';

/** A chip component. */
export const ChipRoot = withRipple()(
  simpleTag({
    displayName: 'ChipRoot',
    classNames: props => [
      'mdc-chip',
      {
        'mdc-chip--selected': props.selected
      }
    ],
    consumeProps: ['selected']
  })
);

type ChipPropsT = {
  /** A custom event you can use from MCW. You can also just use onClick instead. */
  onInteraction?: (evt: Event) => mixed,
  /** A custom event for the trailing icon that you can use from MCW. You can also just use onClick instead. */
  onTrailingIconInteraction?: (evt: Event) => mixed,
  /** makes the Chip appear selected. */
  selected?: boolean
};

export class Chip extends withFoundation({
  constructor: MDCChip,
  adapter: {
    addClass: addClass(),
    removeClass: removeClass()
  }
})<ChipPropsT> {
  static displayName = 'Chip';

  render() {
    const { onInteraction, onTrailingIconInteraction, ...rest } = this.props;
    const { root_ } = this.foundationRefs;
    return (
      <ChipRoot
        tabIndex={0}
        {...rest}
        elementRef={root_}
        className={classNames(this.props.className, [...this.state.classes])}
      />
    );
  }
}

/** Text for a chip. */
export const ChipText = simpleTag({
  displayName: 'ChipText',
  classNames: 'mdc-chip__text'
});

/** Icons inside of a chip. This is an instance of the Icon component. To make the icons interactive, add props tabIndex="0" and role="button". */
export const ChipIconRoot = simpleTag({
  displayName: 'ChipIconRoot',
  tag: Icon,
  defaultProps: {},
  classNames: props => {
    return [
      'mdc-chip__icon',
      {
        'mdc-chip__icon--leading': props.leading,
        'mdc-chip__icon--trailing': props.trailing
      }
    ];
  },
  consumeProps: ['trailing', 'leading']
});

type ChipIconPropsT = {
  /** Make it a leading icon */
  leading: boolean,
  /** Make it a trailing icon */
  trailing: boolean
};
export const ChipIcon = (props: ChipIconPropsT) => {
  const hasInteractionHandler = Object.keys(props).some(p =>
    p.startsWith('on')
  );
  const trailingProps =
    props.trailing || hasInteractionHandler ?
      { role: 'button', tabIndex: 0 } :
      {};

  return <ChipIconRoot {...trailingProps} {...props} />;
};

ChipIcon.displayName = 'ChipIcon';

/** A container for multiple Chip components. */
export const ChipSet = simpleTag({
  displayName: 'ChipSet',
  classNames: props => [
    'mdc-chip-set',
    {
      'mdc-chip-set--choice': props.choice,
      'mdc-chip-set--filter': props.filter
    }
  ],
  consumeProps: ['filter', 'choice']
});
