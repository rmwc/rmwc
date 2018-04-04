// @flow
import { simpleTag } from '../Base';

import type { SimpleTagPropsT } from '../Base';

export type TypographyPropsT = {
  /* prettier-ignore */
  /** The typography style.*/
  use: 'display4' | 'display3' | 'display2' | 'display1' | 'headline' | 'title' | 'subheading2' | 'subheading1' | 'body2' | 'body1' | 'caption' | 'button'
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
