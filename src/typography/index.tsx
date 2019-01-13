
// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { Component } from '@rmwc/base';

export type TypographyPropsT = {
  /* prettier-ignore */
  /** The typography style.*/
  use: 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'headline6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline'
};

/** @extends React.Component */
/** The Typography Component */
export class Typography extends Component<TypographyPropsT> {
  static displayName = 'Typography';
  tag = 'span';
  classNames = (props: TypographyPropsT) => [
    {
      [`mdc-typography--${props.use}`]: props.use
    }
  ];
  consumeProps = ['use'];
}
