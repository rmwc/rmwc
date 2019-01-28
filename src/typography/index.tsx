import RMWC from '@rmwc/types';
import * as React from 'react';
import { componentFactory } from '@rmwc/base';

export type TypographyT =
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'headline4'
  | 'headline5'
  | 'headline6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

export interface TypographyProps {
  /** The typography style.*/
  use: TypographyT;
}

/** The Typography Component */
export const Typography = componentFactory<TypographyProps>({
  displayName: 'Typography',
  tag: 'span',
  classNames: (props: TypographyProps) => [
    {
      [`mdc-typography--${props.use}`]: props.use
    }
  ],
  consumeProps: ['use']
});
