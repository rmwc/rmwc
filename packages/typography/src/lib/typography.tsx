// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Tag, createComponent, useClassNames } from '@rmwc/base';
import { useProviderContext } from '@rmwc/provider';
import * as RMWC from '@rmwc/types';
import React from 'react';

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

export type TypographyHTMLProps = RMWC.HTMLProps<HTMLElement>;

/** The Typography Component */
export const Typography = createComponent<TypographyProps, TypographyHTMLProps>(
  function Typography(props, ref) {
    const { use, ...rest } = props;

    const providerContext = useProviderContext();

    const typographyOptions = providerContext.typography;

    const tag =
      typographyOptions?.[use] || typographyOptions?.defaultTag || 'span';

    const className = useClassNames(props, [
      {
        [`mdc-typography--${props.use}`]: props.use
      }
    ]);

    return <Tag tag={tag} {...rest} ref={ref} className={className} />;
  }
);
