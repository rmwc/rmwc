// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { simpleTag } from '../Base';

import type { SimpleTagPropsT } from '../Base';

type TypographyPropsT = {
  /* The typography style. display4, display3, display2, display1, headline, title, subheading2, subheading1, body2, body1, caption, button. */
  use:
    | 'display4'
    | 'display3'
    | 'display2'
    | 'display1'
    | 'headline'
    | 'title'
    | 'subheading2'
    | 'subheading1'
    | 'body2'
    | 'body1'
    | 'caption'
    | 'button',
  /* Sets adjust margin modifier for Typography. Should be accompanied by a type class. */
  adjustMargin: boolean
} & SimpleTagPropsT;

export const Typography: React.ComponentType<TypographyPropsT> = simpleTag({
  name: 'Typography',
  tag: 'span',
  classNames: props => [
    {
      [`mdc-typography--${props.use}`]: props.use,
      'mdc-typography--adjust-margin': props.adjustMargin
    }
  ],
  defaultProps: {
    use: undefined,
    adjustMargin: false
  },
  consumeProps: ['use', 'adjustMargin']
});

export default Typography;
