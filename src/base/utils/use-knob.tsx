import { useState } from 'react';
import * as knobTypes from '@storybook/addon-knobs';

export const useKnob = (
  knobType: keyof typeof knobTypes,
  name: string,
  defaultValue: any
) => {
  const knobFunc = knobTypes[knobType] as any;
  const [stateValue, stateSetter] = useState(defaultValue);

  const knobValue = knobFunc(name, stateValue);
  if (knobValue !== stateValue) {
    stateSetter(knobValue);
  }
  return [stateValue, stateSetter];
};
