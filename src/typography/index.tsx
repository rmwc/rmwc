import * as RMWC from '@rmwc/types';
import * as React from 'react';
import { componentFactory } from '@rmwc/base';
import {
  withProviderContext,
  WithProviderContext,
  RMWCProviderProps
} from '@rmwc/provider';

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

const TypographyRoot = componentFactory<TypographyProps>({
  displayName: 'Typography',
  tag: 'span',
  classNames: (props: TypographyProps) => [
    {
      [`mdc-typography--${props.use}`]: props.use
    }
  ],
  consumeProps: ['use']
});

/** The Typography Component */
export const Typography = withProviderContext()(
  React.forwardRef<
    any,
    TypographyProps & RMWC.ComponentProps & Partial<WithProviderContext>
  >(function Typography({ providerContext = {}, ...rest }, ref) {
    const typographyOptions = providerContext.typography;
    const tag =
      (typographyOptions
        ? typographyOptions[rest.use] || typographyOptions.defaultTag
        : undefined) || rest.tag;
    return <TypographyRoot {...rest} tag={tag} ref={ref} />;
  })
);
