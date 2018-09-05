// @flow
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { simpleTag } from '../Base';

import type { SimpleTagPropsT } from '../Base';

export type TypographyPropsT = {
  /* prettier-ignore */
  /** The typography style.*/
  use: 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'headline6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline'
} & SimpleTagPropsT;

const TypographyRoot = simpleTag({
  displayName: 'Typography',
  defaultProps: {
    use: undefined
  },
  tag: 'span',
  classNames: (props: TypographyPropsT) => [
    {
      [`mdc-typography--${props.use}`]: props.use
    }
  ],
  consumeProps: ['use']
});

/**
 * The Typography Component
 */
export const Typography: React.ComponentType<TypographyPropsT> = (
  props: TypographyPropsT
) => <TypographyRoot {...props} />;

Typography.displayName = 'Typography';

export default Typography;
