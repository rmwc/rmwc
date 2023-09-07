import { useState } from 'react';
import { randomId } from './random-id';

export const useId = (
  prefix: string,
  props: { [key: string]: any }
): string => {
  const idToUse = props.id
    ? props.id
    : props.label
    ? `${prefix}-${props.label}`
    : randomId(prefix);
  const [id] = useState(idToUse);
  return id;
};
