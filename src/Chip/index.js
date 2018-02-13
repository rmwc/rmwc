// @flow
import * as React from 'react';

import { simpleTag } from '../Base';

export const ChipRoot = simpleTag({
  displayName: 'ChipRoot',
  classNames: 'mdc-chip'
});

export const ChipText = simpleTag({
  displayName: 'ChipText',
  classNames: 'mdc-chip__text'
});

/** A container for multiple Chip components. */
export const ChipSet = simpleTag({
  displayName: 'ChipSet',
  classNames: 'mdc-chip-set'
});

/** A chip component. */
export const Chip = ({ children, ...rest }) => (
  <ChipRoot {...rest}>
    <ChipText>{children}</ChipText>
  </ChipRoot>
);

Chip.displayName = 'Chip';
