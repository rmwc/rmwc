import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { useProviderContext } from '@rmwc/provider';
import { useTag, useClassNames } from '@rmwc/base/component';

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

/** The Typography Component */
export interface TypographyProps {
  /** The typography style.*/
  use: TypographyT;
}

/** The Typography Component */
export const Typography = React.forwardRef<
  any,
  TypographyProps & RMWC.ComponentProps
>(function Typography(props, ref) {
  const {use, ...rest} = props;

  const providerContext = useProviderContext();

  const typographyOptions = providerContext.typography;

  const defaultTag = useTag(props, 'span');

  const Tag = typographyOptions?.[use] || typographyOptions?.defaultTag || defaultTag;
  
  const className = useClassNames(props, [
    {
      [`mdc-typography--${props.use}`]: props.use
    }
  ]);
      
  return <Tag {...rest} ref={ref} className={className} />;
});
Typography.displayName = 'Typography';
