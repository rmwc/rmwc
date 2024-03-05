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

const TAG_MAP: Record<TypographyT, string> = {
  headline1: 'span',
  headline2: 'span',
  headline3: 'span',
  headline4: 'span',
  headline5: 'span',
  headline6: 'span',
  subtitle1: 'span',
  subtitle2: 'span',
  body1: 'span',
  body2: 'span',
  caption: 'span',
  button: 'span',
  overline: 'span'
};

/** The Typography Component */
export const Typography = createComponent<TypographyProps, TypographyHTMLProps>(
  function Typography(props, ref) {
    const { use, ...rest } = props;

    const providerContext = useProviderContext();

    const typographyOptions = providerContext.typography;

    const tag =
      typographyOptions?.[use] || typographyOptions?.defaultTag || TAG_MAP[use];

    const className = useClassNames(props, [
      {
        [`mdc-typography--${props.use}`]: props.use
      }
    ]);

    return <Tag tag={tag} {...rest} ref={ref} className={className} />;
  }
);
