// @flow

import * as React from 'react';
import { Icon } from '../Icon';
import { simpleTag } from '../Base';

/** A chip component. */
export const Chip = simpleTag({
  displayName: 'Chip',
  classNames: 'mdc-chip'
});

/** Text for a chip. */
export const ChipText = simpleTag({
  displayName: 'ChipText',
  classNames: 'mdc-chip__text'
});

type ChipIconPropsT = {
  /** Make it a leading icon */
  leading: boolean,
  /** Make it a trailing icon */
  trailing: boolean
};

/** Icons inside of a chip. This is an instance of the Icon component. */
export class ChipIcon extends simpleTag({
  displayName: 'ChipIcon',
  tag: Icon,
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
})<ChipIconPropsT> {
  render() {
    return super.render();
  }
}

/** A container for multiple Chip components. */
export const ChipSet = simpleTag({
  displayName: 'ChipSet',
  classNames: 'mdc-chip-set'
});
