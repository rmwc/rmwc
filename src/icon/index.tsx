import { IconOptionsT } from './defs';

import * as React from 'react';
import { withProviderContext, WithProviderContext } from '@rmwc/provider';
import { ComponentProps, componentFactory, classNames } from '@rmwc/base';
import { getIconStrategy } from './utils';

export const IconRoot = componentFactory({ displayName: 'IconRoot', tag: 'i' });

const renderLigature = ({ content, ...rest }: { content: React.ReactNode }) => (
  <IconRoot {...rest}>{content}</IconRoot>
);

const renderClassName = ({
  content,
  ...rest
}: {
  content: React.ReactNode;
}) => <IconRoot {...rest} />;

const renderUrl = ({ content, ...rest }: { content: string }) => (
  <IconRoot {...rest} tag="img" src={content} />
);

const renderComponent = ({
  content,
  ...rest
}: {
  content: React.ReactNode;
}) => <IconRoot {...rest}>{content}</IconRoot>;

const iconRenderMap: {
  [key: string]: ((content: any, ...rest: any) => React.ReactNode) | undefined;
} = {
  ligature: renderLigature,
  className: renderClassName,
  url: renderUrl,
  component: renderComponent,
  auto: undefined
};

export interface IconProps extends ComponentProps {
  /** The icon to use. This can be a string for a font icon, a url, or whatever the selected strategy needs. */
  icon?: React.ReactNode;
  /** Additional Icon Options. See the Icon component documentation. */
  iconOptions?: IconOptionsT;
}

/**
 * An Icon component. Most of these options can be set once globally, read the documentation on Provider for more info.
 */
export const Icon: React.ComponentType<IconProps> = withProviderContext()(
  ({
    icon,
    iconOptions = {},
    providerContext,
    ...rest
  }: IconProps & WithProviderContext) => {
    // Get provider options
    const {
      iconClassNameBase: defaultBasename,
      iconClassNamePrefix: defaultPrefix,
      iconStrategy: defaultStrategy,
      iconRender: defaultCustomRender
    } = providerContext;

    const content = icon;

    const strategyToUse = getIconStrategy(
      content,
      iconOptions.strategy || null,
      defaultStrategy || null
    );
    const prefixToUse = iconOptions.prefix || defaultPrefix;
    const basenameToUse =
      iconOptions.basename === undefined
        ? defaultBasename
        : iconOptions.basename;
    const iconClassName =
      strategyToUse === 'className' && typeof content === 'string'
        ? `${String(prefixToUse)}${content}`
        : null;

    const renderToUse =
      strategyToUse === 'custom'
        ? iconOptions.render || defaultCustomRender
        : !!strategyToUse && iconRenderMap[strategyToUse] !== undefined
        ? iconRenderMap[strategyToUse]
        : undefined;

    if (!renderToUse) {
      console.error(
        `Icon: rendering not implemented for ${String(strategyToUse)}.`
      );
      return null;
    }

    return (
      <React.Fragment>
        {renderToUse({
          ...rest,
          content,
          className: classNames(
            'rmwc-icon',
            basenameToUse,
            rest.className,
            iconClassName,
            {
              [`rmwc-icon--size-${iconOptions.size || ''}`]: !!iconOptions.size
            }
          )
        })}
      </React.Fragment>
    );
  }
);
