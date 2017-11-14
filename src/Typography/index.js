// @flow
import * as React from 'react';
import { simpleTag } from '../Base';

import type { SimpleTagPropsT } from '../Base';

export type TypographyPropsT = {
  /* prettier-ignore */
  /** The typography style. display4, display3, display2, display1, headline, title, subheading2, subheading1, body2, body1, caption, button. */
  use: 'display4' | 'display3' | 'display2' | 'display1' | 'headline' | 'title' | 'subheading2' | 'subheading1' | 'body2' | 'body1' | 'caption' | 'button',
  /** Sets adjust margin modifier for Typography. Should be accompanied by a type class. */
  adjustMargin: boolean
} & SimpleTagPropsT;

/**
 * The Typography Component
 */
export const Typography: React.ComponentType<TypographyPropsT> = simpleTag({
  displayName: 'Typography',
  defaultProps: {
    use: undefined,
    adjustMargin: false
  },
  tag: 'span',
  classNames: props => [
    {
      [`mdc-typography--${props.use}`]: props.use,
      'mdc-typography--adjust-margin': props.adjustMargin
    }
  ],
  consumeProps: ['use', 'adjustMargin']
});

export default Typography;
