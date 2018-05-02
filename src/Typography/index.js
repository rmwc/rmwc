// @flow
import { simpleTag } from '../Base';

import type { SimpleTagPropsT } from '../Base';

export type TypographyPropsT = {
  /* prettier-ignore */
  /** The typography style.*/
  use: 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'headline6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline'
} & SimpleTagPropsT;

/**
 * The Typography Component
 */
export class Typography extends simpleTag({
  displayName: 'Typography',
  defaultProps: {
    use: undefined
  },
  tag: 'span',
  classNames: props => [
    {
      [`mdc-typography--${props.use}`]: props.use
    }
  ],
  consumeProps: ['use']
})<TypographyPropsT> {
  render() {
    return super.render();
  }
}

export default Typography;
